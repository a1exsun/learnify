import { Button, IconButton, Menu, MenuItem } from '@affine/component';
import { DocDisplayMetaService } from '@affine/core/modules/doc-display-meta';
import { WorkbenchService } from '@affine/core/modules/workbench';
import { stopPropagation } from '@affine/core/utils';
import { useI18n } from '@affine/i18n';
import { EmbedSyncedDocBlockComponent } from '@blocksuite/affine/blocks/embed-doc';
import { isPeekable, peek } from '@blocksuite/affine/components/peek';
import { DisposableGroup } from '@blocksuite/affine/global/disposable';
import { Bound } from '@blocksuite/affine/global/gfx';
import type { EmbedSyncedDocModel } from '@blocksuite/affine-model';
import {
  ArrowDownSmallIcon,
  CenterPeekIcon,
  ExpandFullIcon,
  LinkedPageIcon,
  OpenInNewIcon,
  SplitViewIcon,
  ToggleDownIcon,
  ToggleRightIcon,
} from '@blocksuite/icons/rc';
import type { BlockStdScope } from '@blocksuite/std';
import { batch } from '@preact/signals-core';
import { useLiveData, useService } from '@toeverything/infra';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CopyLinkButton, DocInfoButton } from './common';
import * as styles from './edgeless-block-header.css';

const ToggleButton = ({ model }: { model: EmbedSyncedDocModel }) => {
  const [isFolded, setIsFolded] = useState(model.isFolded);
  const t = useI18n();

  useEffect(() => {
    const disposables = new DisposableGroup();
    disposables.add(
      model.props.preFoldHeight$.subscribe(value => setIsFolded(!!value))
    );
    // the height may be changed by dragging selected rect
    disposables.add(
      model.xywh$.subscribe(value => {
        const bound = Bound.deserialize(value);
        const preFoldHeight = model.props.preFoldHeight$.peek();
        if (
          bound.h !== styles.headerHeight &&
          preFoldHeight !== undefined &&
          bound.h !== preFoldHeight
        ) {
          model.props.preFoldHeight$.value = 0;
        }
      })
    );

    return () => disposables.dispose();
  }, [model.props.preFoldHeight$, model.xywh$]);

  const toggle = useCallback(() => {
    model.doc.captureSync();

    batch(() => {
      const { x, y, w, h } = model.elementBound;
      if (model.isFolded) {
        model.props.xywh$.value = `[${x},${y},${w},${model.props.preFoldHeight$.peek() ?? 1}]`;
        model.props.preFoldHeight$.value = 0;
      } else {
        model.props.preFoldHeight$.value = h;
        model.props.xywh$.value = `[${x},${y},${w},${styles.headerHeight}]`;
      }
    });
  }, [model]);

  return (
    <IconButton
      className={styles.button}
      size={styles.iconSize}
      onClick={toggle}
      tooltip={
        isFolded
          ? t['com.affine.editor.edgeless-embed-synced-doc-header.unfold']()
          : t['com.affine.editor.edgeless-embed-synced-doc-header.fold']()
      }
      icon={isFolded ? <ToggleRightIcon /> : <ToggleDownIcon />}
    />
  );
};

const Title = ({ model }: { model: EmbedSyncedDocModel }) => {
  const docDisplayMetaService = useService(DocDisplayMetaService);
  const title = useLiveData(
    docDisplayMetaService.title$(model.props.pageId, {
      title: model.props.title,
      reference: true,
    })
  );

  return (
    <div
      className={styles.titleContainer}
      data-collapsed={!!model.props.preFoldHeight}
      data-testid="edgeless-embed-synced-doc-title"
    >
      <LinkedPageIcon />
      <span className={styles.embedSyncedDocTitle}>{title}</span>
    </div>
  );
};

const EmbedSyncedDocInfoButton = ({
  model,
}: {
  model: EmbedSyncedDocModel;
}) => {
  return (
    <DocInfoButton
      docId={model.props.pageId}
      data-testid="edgeless-embed-synced-doc-info-button"
    />
  );
};

const EmbedSyncedDocCopyLinkButton = ({
  model,
}: {
  model: EmbedSyncedDocModel;
}) => {
  return (
    <CopyLinkButton
      pageId={model.props.pageId}
      data-testid="edgeless-embed-synced-doc-copy-link-button"
    />
  );
};

const OpenButton = ({ model }: { model: EmbedSyncedDocModel }) => {
  const t = useI18n();
  const workbench = useService(WorkbenchService).workbench;

  const open = useCallback(() => {
    workbench.openDoc({
      docId: model.props.pageId,
    });
  }, [model.props.pageId, workbench]);

  return (
    <Button
      className={styles.button}
      variant="plain"
      size="custom"
      onClick={open}
      prefixStyle={{
        width: `${styles.iconSize}px`,
        height: `${styles.iconSize}px`,
      }}
      prefix={<ExpandFullIcon />}
    >
      <span className={styles.buttonText}>
        {t['com.affine.editor.edgeless-embed-synced-doc-header.open']()}
      </span>
    </Button>
  );
};

const MoreMenu = ({
  model,
  std,
}: {
  model: EmbedSyncedDocModel;
  std: BlockStdScope;
}) => {
  const t = useI18n();
  const workbench = useService(WorkbenchService).workbench;

  const controls = useMemo(() => {
    return [
      {
        type: 'open-in-active-view',
        label: t['com.affine.peek-view-controls.open-doc'](),
        icon: <ExpandFullIcon />,
        onClick: () => {
          workbench.openDoc(model.props.pageId);
        },
        enabled: true,
      },
      {
        type: 'open-in-center-peek',
        label: t['com.affine.peek-view-controls.open-doc-in-center-peek'](),
        icon: <CenterPeekIcon />,
        onClick: () => {
          const block = std.view.getBlock(model.id);
          if (
            !(
              block instanceof EmbedSyncedDocBlockComponent && isPeekable(block)
            )
          )
            return;
          peek(block);
        },
        enabled: true,
      },
      {
        type: 'open-in-split-view',
        label: t['com.affine.peek-view-controls.open-doc-in-split-view'](),
        icon: <SplitViewIcon />,
        onClick: () => {
          workbench.openDoc(model.props.pageId, { at: 'beside' });
        },
        enabled: BUILD_CONFIG.isElectron,
      },
      {
        type: 'open-in-new-tab',
        label: t['com.affine.peek-view-controls.open-doc-in-new-tab'](),
        icon: <OpenInNewIcon />,
        onClick: () => {
          workbench.openDoc(model.props.pageId, {
            at: 'new-tab',
          });
        },
        enabled: true,
      },
    ].filter(({ enabled }) => enabled);
  }, [model.id, model.props.pageId, std.view, t, workbench]);

  return (
    <Menu
      items={controls.map(option => (
        <MenuItem
          key={option.type}
          type="default"
          prefixIcon={option.icon}
          onClick={option.onClick}
        >
          {option.label}
        </MenuItem>
      ))}
      contentOptions={{
        align: 'center',
      }}
    >
      <IconButton
        className={styles.button}
        size={styles.iconSize}
        icon={<ArrowDownSmallIcon />}
        onDoubleClickCapture={stopPropagation}
      />
    </Menu>
  );
};

export const EdgelessEmbedSyncedDocHeader = ({
  model,
  std,
}: {
  model: EmbedSyncedDocModel;
  std: BlockStdScope;
}) => {
  return (
    <div className={styles.header} onPointerDown={stopPropagation}>
      <ToggleButton model={model} />
      <Title model={model} />
      <OpenButton model={model} />
      <MoreMenu model={model} std={std} />
      <EmbedSyncedDocInfoButton model={model} />
      <EmbedSyncedDocCopyLinkButton model={model} />
    </div>
  );
};
