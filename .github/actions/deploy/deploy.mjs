import { execSync } from 'node:child_process';

const {
  APP_VERSION,
  BUILD_TYPE,
  DEPLOY_HOST,
  CANARY_DEPLOY_HOST,
  GIT_SHORT_HASH,
  DATABASE_URL,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  GCLOUD_CONNECTION_NAME,
  CLOUD_SQL_IAM_ACCOUNT,
  APP_IAM_ACCOUNT,
  REDIS_SERVER_HOST,
  REDIS_SERVER_PASSWORD,
  STATIC_IP_NAME,
  AFFINE_INDEXER_SEARCH_PROVIDER,
  AFFINE_INDEXER_SEARCH_ENDPOINT,
  AFFINE_INDEXER_SEARCH_API_KEY,
} = process.env;

const buildType = BUILD_TYPE || 'canary';

const isProduction = buildType === 'stable';
const isBeta = buildType === 'beta';
const isInternal = buildType === 'internal';

const replicaConfig = {
  stable: {
    web: 3,
    graphql: Number(process.env.PRODUCTION_GRAPHQL_REPLICA) || 3,
    sync: Number(process.env.PRODUCTION_SYNC_REPLICA) || 3,
    renderer: Number(process.env.PRODUCTION_RENDERER_REPLICA) || 3,
    doc: Number(process.env.PRODUCTION_DOC_REPLICA) || 3,
  },
  beta: {
    web: 2,
    graphql: Number(process.env.BETA_GRAPHQL_REPLICA) || 2,
    sync: Number(process.env.BETA_SYNC_REPLICA) || 2,
    renderer: Number(process.env.BETA_RENDERER_REPLICA) || 2,
    doc: Number(process.env.BETA_DOC_REPLICA) || 2,
  },
  canary: {
    web: 1,
    graphql: 1,
    sync: 1,
    renderer: 1,
    doc: 1,
  },
};

const cpuConfig = {
  beta: {
    web: '200m',
    graphql: '500m',
    sync: '500m',
    doc: '500m',
    renderer: '200m',
  },
  canary: {
    web: '200m',
    graphql: '500m',
    sync: '500m',
    doc: '500m',
    renderer: '200m',
  },
};

// 安全转义shell参数的辅助函数
const escapeShellArg = arg => {
  if (!arg) return '""';
  // 如果包含特殊字符，用单引号包围并转义内部的单引号
  if (/[^a-zA-Z0-9._-]/.test(arg)) {
    return `'${arg.replace(/'/g, `'\\''`)}'`;
  }
  return arg;
};

const createHelmCommand = ({ isDryRun }) => {
  const flag = isDryRun ? '--dry-run' : '--atomic';
  const imageTag = `${buildType}-${GIT_SHORT_HASH}`;
  const redisAndPostgres =
    DATABASE_URL && REDIS_SERVER_HOST
      ? [
          `--set        cloud-sql-proxy.enabled=true`,
          `--set-string cloud-sql-proxy.database.connectionName=${escapeShellArg(GCLOUD_CONNECTION_NAME)}`,
          `--set-string global.database.host=${escapeShellArg(DATABASE_URL)}`,
          `--set-string global.database.user=${escapeShellArg(DATABASE_USERNAME)}`,
          `--set-string global.database.password=${escapeShellArg(DATABASE_PASSWORD)}`,
          `--set-string global.database.name=${escapeShellArg(DATABASE_NAME)}`,
          `--set-string global.redis.host=${escapeShellArg(REDIS_SERVER_HOST)}`,
          `--set-string global.redis.password=${escapeShellArg(REDIS_SERVER_PASSWORD || '')}`,
        ]
      : [];
  const indexerOptions = [
    `--set-string global.indexer.provider="${AFFINE_INDEXER_SEARCH_PROVIDER}"`,
    `--set-string global.indexer.endpoint="${AFFINE_INDEXER_SEARCH_ENDPOINT}"`,
    `--set-string global.indexer.apiKey="${AFFINE_INDEXER_SEARCH_API_KEY}"`,
  ];
  const serviceAnnotations = [
    `--set-json   web.serviceAccount.annotations="{ \\"iam.gke.io/gcp-service-account\\": \\"${APP_IAM_ACCOUNT}\\" }"`,
    `--set-json   graphql.serviceAccount.annotations="{ \\"iam.gke.io/gcp-service-account\\": \\"${APP_IAM_ACCOUNT}\\" }"`,
    `--set-json   sync.serviceAccount.annotations="{ \\"iam.gke.io/gcp-service-account\\": \\"${APP_IAM_ACCOUNT}\\" }"`,
    `--set-json   doc.serviceAccount.annotations="{ \\"iam.gke.io/gcp-service-account\\": \\"${APP_IAM_ACCOUNT}\\" }"`,
  ].concat(
    isProduction || isBeta || isInternal
      ? [
          `--set-json   web.service.annotations="{ \\"cloud.google.com/neg\\": \\"{\\\\\\"ingress\\\\\\": true}\\" }"`,
          `--set-json   graphql.service.annotations="{ \\"cloud.google.com/neg\\": \\"{\\\\\\"ingress\\\\\\": true}\\" }"`,
          `--set-json   sync.service.annotations="{ \\"cloud.google.com/neg\\": \\"{\\\\\\"ingress\\\\\\": true}\\" }"`,
          `--set-json   cloud-sql-proxy.serviceAccount.annotations="{ \\"iam.gke.io/gcp-service-account\\": \\"${CLOUD_SQL_IAM_ACCOUNT}\\" }"`,
          `--set-json   cloud-sql-proxy.nodeSelector="{ \\"iam.gke.io/gke-metadata-server-enabled\\": \\"true\\" }"`,
        ]
      : []
  );

  const cpu = cpuConfig[buildType];
  const resources = cpu
    ? [
        `--set        web.resources.requests.cpu="${cpu.web}"`,
        `--set        web.resources.requests.memory="1Gi"`,
        `--set        graphql.resources.requests.cpu="${cpu.graphql}"`,
        `--set        graphql.resources.requests.memory="1Gi"`,
        `--set        sync.resources.requests.cpu="${cpu.sync}"`,
        `--set        sync.resources.requests.memory="1Gi"`,
        `--set        doc.resources.requests.cpu="${cpu.doc}"`,
        `--set        doc.resources.requests.memory="1Gi"`,
        `--set        renderer.resources.requests.cpu="${cpu.renderer}"`,
        `--set        renderer.resources.requests.memory="1Gi"`,
      ]
    : [];

  const replica = replicaConfig[buildType] || replicaConfig.canary;

  const namespace = isProduction
    ? 'production'
    : isBeta
      ? 'beta'
      : isInternal
        ? 'internal'
        : 'dev';

  const host = DEPLOY_HOST || CANARY_DEPLOY_HOST;
  const deployCommand = [
    `helm upgrade --install learnify .github/helm/affine`,
    `--namespace  ${namespace}`,
    `--set-string global.deployment.type="affine"`,
    `--set-string global.deployment.platform="gcp"`,
    `--set-string global.app.buildType="${buildType}"`,
    `--set        global.ingress.enabled=true`,
    `--set-json   global.ingress.annotations="{ \\"kubernetes.io/ingress.allow-http\\": \\"true\\", \\"kubernetes.io/ingress.global-static-ip-name\\": \\"${STATIC_IP_NAME}\\" }"`,
    `--set-string global.ingress.className="gce"`,
    `--set-string global.ingress.host="${host}"`,
    `--set-string global.version="${APP_VERSION}"`,
    ...redisAndPostgres,
    ...indexerOptions,
    `--set        web.replicaCount=${replica.web}`,
    `--set-string web.image.tag="${imageTag}"`,
    `--set        graphql.replicaCount=${replica.graphql}`,
    `--set-string graphql.image.tag="${imageTag}"`,
    `--set-string graphql.app.host="${host}"`,
    `--set        sync.replicaCount=${replica.sync}`,
    `--set-string sync.image.tag="${imageTag}"`,
    `--set-string renderer.image.tag="${imageTag}"`,
    `--set-string renderer.app.host="${host}"`,
    `--set        renderer.replicaCount=${replica.renderer}`,
    `--set-string doc.image.tag="${imageTag}"`,
    `--set-string doc.app.host="${host}"`,
    `--set        doc.replicaCount=${replica.doc}`,
    ...serviceAnnotations,
    ...resources,
    `--timeout 20m`,
    flag,
  ].join(' ');
  return deployCommand;
};

const output = execSync(createHelmCommand({ isDryRun: true }), {
  encoding: 'utf-8',
  stdio: ['inherit', 'pipe', 'inherit'],
});
const templates = output
  .split('---')
  .filter(yml => !yml.split('\n').some(line => line.trim() === 'kind: Secret'))
  .join('---');
console.log(templates);

// 添加调试信息
console.log('=== Helm Command Debug ===');
const finalCommand = createHelmCommand({ isDryRun: false });
console.log('Command:', finalCommand);
console.log('=== Environment Variables ===');
console.log('DATABASE_URL:', DATABASE_URL ? 'SET' : 'NOT SET');
console.log('REDIS_SERVER_HOST:', REDIS_SERVER_HOST ? 'SET' : 'NOT SET');
console.log(
  'REDIS_SERVER_PASSWORD:',
  REDIS_SERVER_PASSWORD ? 'SET' : 'NOT SET'
);
console.log('BUILD_TYPE:', buildType);
console.log(
  'NAMESPACE:',
  isProduction
    ? 'production'
    : isBeta
      ? 'beta'
      : isInternal
        ? 'internal'
        : 'dev'
);
console.log('=========================');

try {
  execSync(finalCommand, {
    encoding: 'utf-8',
    stdio: 'inherit',
  });
  console.log('✅ 部署成功完成!');
} catch (error) {
  console.error('❌ 部署失败:', error.message);
  console.log('正在检查 pod 状态...');

  const namespace = isProduction
    ? 'production'
    : isBeta
      ? 'beta'
      : isInternal
        ? 'internal'
        : 'dev';

  try {
    // 检查 pod 状态
    const podStatus = execSync(
      `kubectl get pods -n ${namespace} -l app.kubernetes.io/instance=learnify`,
      {
        encoding: 'utf-8',
        stdio: 'pipe',
      }
    );
    console.log('Pod 状态:');
    console.log(podStatus);

    // 检查最近的事件
    const events = execSync(
      `kubectl get events -n ${namespace} --sort-by='.lastTimestamp' | tail -20`,
      {
        encoding: 'utf-8',
        stdio: 'pipe',
      }
    );
    console.log('最近的事件:');
    console.log(events);
  } catch (debugError) {
    console.error('无法获取调试信息:', debugError.message);
  }

  throw error;
}
