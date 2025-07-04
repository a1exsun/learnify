// Import is already correct, no changes needed
import { Tabs } from '@affine/component/ui/tabs';
import {
  // AddPageButton,
  // AppDownloadButton,
  AppSidebar,
  // MenuItem,
  // MenuLinkItem,
  QuickSearchInput,
  SidebarContainer,
  SidebarScrollableContainer,
} from '@affine/core/modules/app-sidebar/views';
// import { ExternalMenuLinkItem } from '@affine/core/modules/app-sidebar/views/menu-item/external-menu-link-item';
import { AuthService } from '@affine/core/modules/cloud';
// import { WorkspaceDialogService } from '@affine/core/modules/dialogs';
import { CMDKQuickSearchService } from '@affine/core/modules/quicksearch/services/cmdk';
import type { Workspace } from '@affine/core/modules/workspace';
// import { useI18n } from '@affine/i18n';
// import { track } from '@affine/track';
import type { Store } from '@blocksuite/affine/store';
// import {
//   AllDocsIcon,
//   // ImportIcon,
//   // JournalIcon,
//   SettingsIcon,
// } from '@blocksuite/icons/rc';
// useService,
import { useLiveData, useServices } from '@toeverything/infra';
import type { ReactElement } from 'react';
import { memo, useCallback } from 'react';

// import {
//   CollapsibleSection,
//   NavigationPanelCollections,
//   NavigationPanelFavorites,
//   NavigationPanelMigrationFavorites,
//   NavigationPanelOrganize,
//   NavigationPanelTags,
// } from '../../desktop/components/navigation-panel';
import { WorkbenchService } from '../../modules/workbench';
import { FlashcardsNavigator } from '../learnify/flashcards/navigator';
import { MindMapsNavigator } from '../learnify/mind-maps/navigator';
import { NotesNavigator } from '../learnify/notes/navigator';
import { PodcastsNavigator } from '../learnify/podcasts/navigator';
import { ProgressNavigator } from '../learnify/progress/navigator';
import { AddLinkButton } from '../learnify/sources/buttons/add-link-button';
import { RecordButton } from '../learnify/sources/buttons/record-button';
import { UploadButton } from '../learnify/sources/buttons/upload-button';
import { NavigationPanelSources } from '../learnify/sources/navigator';
import { WorkspaceNavigator } from '../workspace-selector';
import {
  bottomContainer,
  featurePanelWrapper,
  navigationWrapper,
  progressWrapper,
  quickSearch,
  quickSearchAndNewPage,
  referenceHeader,
  referenceWrapper,
  scrollableWrapper,
  tabsContentWrapper,
  tabsListCustom,
  tabsWrapper,
  workspaceAndUserWrapper,
  workspaceWrapper,
} from './index.css';
// import { InviteMembersButton } from './invite-members-button';
// import { AppSidebarJournalButton } from './journal-button';
// import { NotificationButton } from './notification-button';
import { SidebarAudioPlayer } from './sidebar-audio-player';
// import { TemplateDocEntrance } from './template-doc-entrance';
// import { TrashButton } from './trash-button';
// import { UpdaterButton } from './updater-button';
import UserInfo from './user-info';

export type RootAppSidebarProps = {
  isPublicWorkspace: boolean;
  onOpenQuickSearchModal: () => void;
  currentWorkspace: Workspace;
  // openPage: (pageId: string) => void;
  createPage: () => Store;
  paths: {
    // all: (workspaceId: string) => string;
    // trash: (workspaceId: string) => string;
    // shared: (workspaceId: string) => string;
  };
};

// const AllDocsButton = () => {
//   const t = useI18n();
//   const { workbenchService } = useServices({
//     WorkbenchService,
//   });
//   const workbench = workbenchService.workbench;
//   const allPageActive = useLiveData(
//     workbench.location$.selector(location => location.pathname === '/all')
//   );

//   return (
//     <MenuLinkItem icon={<AllDocsIcon />} active={allPageActive} to={'/all'}>
//       <span data-testid="all-pages">
//         {t['com.affine.workspaceSubPath.all']()}
//       </span>
//     </MenuLinkItem>
//   );
// };

/**
 * This is for the whole affine app sidebar.
 * This component wraps the app sidebar in `@affine/component` with logic and data.
 *
 */
export const RootAppSidebar = memo((): ReactElement => {
  // workbenchService, authService, authService
  const { cMDKQuickSearchService, workbenchService } = useServices({
    WorkbenchService,
    CMDKQuickSearchService,
    AuthService,
  });

  // const sessionStatus = useLiveData(authService.session.status$);
  // const t = useI18n();
  // const workspaceDialogService = useService(WorkspaceDialogService);
  const workbench = workbenchService.workbench;
  const workspaceSelectorOpen = useLiveData(workbench.workspaceSelectorOpen$);
  const onOpenQuickSearchModal = useCallback(() => {
    cMDKQuickSearchService.toggle();
  }, [cMDKQuickSearchService]);

  const onWorkspaceSelectorOpenChange = useCallback(
    (open: boolean) => {
      workbench.setWorkspaceSelectorOpen(open);
    },
    [workbench]
  );

  // const onOpenSettingModal = useCallback(() => {
  //   workspaceDialogService.open('setting', {
  //     activeTab: 'appearance',
  //   });
  //   track.$.navigationPanel.$.openSettings();
  // }, [workspaceDialogService]);

  // const handleOpenDocs = useCallback(
  //   (result: {
  //     docIds: string[];
  //     entryId?: string;
  //     isWorkspaceFile?: boolean;
  //   }) => {
  //     const { docIds, entryId, isWorkspaceFile } = result;
  //     // If the imported file is a workspace file, open the entry page.
  //     if (isWorkspaceFile && entryId) {
  //       workbench.openDoc(entryId);
  //     } else if (!docIds.length) {
  //       return;
  //     }
  //     // Open all the docs when there are multiple docs imported.
  //     if (docIds.length > 1) {
  //       workbench.openAll();
  //     } else {
  //       // Otherwise, open the only doc.
  //       workbench.openDoc(docIds[0]);
  //     }
  //   },
  //   [workbench]
  // );

  // const onOpenImportModal = useCallback(() => {
  //   track.$.navigationPanel.importModal.open();
  //   workspaceDialogService.open('import', undefined, payload => {
  //     if (!payload) {
  //       return;
  //     }
  //     handleOpenDocs(payload);
  //   });
  // }, [workspaceDialogService, handleOpenDocs]);

  return (
    <AppSidebar>
      <SidebarContainer>
        <div className={workspaceAndUserWrapper}>
          <div className={workspaceWrapper}>
            <WorkspaceNavigator
              showEnableCloudButton
              showSyncStatus
              open={workspaceSelectorOpen}
              onOpenChange={onWorkspaceSelectorOpenChange}
              dense={false}
            />
          </div>
          <div className={quickSearchAndNewPage}>
            <QuickSearchInput
              className={quickSearch}
              data-testid="slider-bar-quick-search-button"
              data-event-props="$.navigationPanel.$.quickSearch"
              onClick={onOpenQuickSearchModal}
            />
          </div>
          <UserInfo />
        </div>
        <div className={featurePanelWrapper}>
          <Tabs.Root defaultValue="mindmap" className={tabsWrapper}>
            <Tabs.List className={tabsListCustom}>
              <Tabs.Trigger value="mindmap">MindMaps</Tabs.Trigger>
              <Tabs.Trigger value="notes">Notes</Tabs.Trigger>
              <Tabs.Trigger value="flashcards">Flashcards</Tabs.Trigger>
              <Tabs.Trigger value="podcasts">Podcasts</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="mindmap" className={tabsContentWrapper}>
              <MindMapsNavigator />
            </Tabs.Content>
            <Tabs.Content value="notes" className={tabsContentWrapper}>
              <NotesNavigator />
            </Tabs.Content>
            <Tabs.Content value="flashcards" className={tabsContentWrapper}>
              <FlashcardsNavigator />
            </Tabs.Content>
            <Tabs.Content value="podcasts" className={tabsContentWrapper}>
              <PodcastsNavigator />
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className={progressWrapper}>
          <ProgressNavigator />
        </div>
        <div className={referenceWrapper}>
          <div className={referenceHeader}>{'Reference Materials'}</div>
          <UploadButton />
          <AddLinkButton />
          <RecordButton />
        </div>

        {/* <AllDocsButton /> */}
        {/* <AppSidebarJournalButton /> */}
        {/* {sessionStatus === 'authenticated' && <NotificationButton />} */}
        {/* <MenuItem
          data-testid="slider-bar-workspace-setting-button"
          icon={<SettingsIcon />}
          onClick={onOpenSettingModal}
        >
          <span data-testid="settings-modal-trigger">
            {t['com.affine.settingSidebar.title']()}
          </span>
        </MenuItem> */}
      </SidebarContainer>
      <SidebarScrollableContainer className={scrollableWrapper}>
        <div className={navigationWrapper}>
          <NavigationPanelSources />
        </div>
        {/* <NavigationPanelFavorites /> */}
        {/* <NavigationPanelOrganize /> */}
        {/* <NavigationPanelMigrationFavorites /> */}
        {/* <NavigationPanelTags /> */}
        {/* <NavigationPanelCollections /> */}
        {/* <CollapsibleSection
          name="others"
          title={t['com.affine.rootAppSidebar.others']()}
          contentStyle={{ padding: '6px 8px 0 8px' }}
        >
          <TrashButton />
          <MenuItem
            data-testid="slider-bar-import-button"
            icon={<ImportIcon />}
            onClick={onOpenImportModal}
          >
            <span data-testid="import-modal-trigger">{t['Import']()}</span>
          </MenuItem>
          <InviteMembersButton />
          <TemplateDocEntrance />
          <ExternalMenuLinkItem
            href="https://affine.pro/blog?tag=Release+Note"
            icon={<JournalIcon />}
            label={t['com.affine.app-sidebar.learn-more']()}
          />
        </CollapsibleSection> */}
      </SidebarScrollableContainer>
      <SidebarContainer className={bottomContainer}>
        <SidebarAudioPlayer />
        {/* {BUILD_CONFIG.isElectron ? <UpdaterButton /> : <AppDownloadButton />} */}
      </SidebarContainer>
    </AppSidebar>
  );
});

RootAppSidebar.displayName = 'memo(RootAppSidebar)';
