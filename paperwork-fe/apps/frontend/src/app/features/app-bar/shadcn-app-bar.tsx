"use client"

import React, { useState, useContext, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import {
  FloppyDisk,
  FolderOpen,
  ArrowUUpLeft,
  ArrowUUpRight,
  PencilSimple,
  PencilSimpleSlash,
  Sun,
  MoonStars,
  DotsThree,
  DotsThreeVertical,
  Export,
  DownloadSimple,
  Image as ImageIcon,
  TreeStructure,
  Translate,
} from '@phosphor-icons/react';

import Logo from '../../../assets/workflow-builder-logo.svg?react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import useStore from '@/store/store';
import { useTheme } from '@/hooks/use-theme';
import { IntegrationContext } from '@/features/integration/components/integration-variants/context/integration-context-wrapper';
import { openExportModal } from '@/features/integration/components/import-export/export-modal/open-export-modal';
import { openImportModal } from '@/features/integration/components/import-export/import-modal/open-import-modal';
import { SavingStatus } from '@/features/integration/components/saving-status/saving-status';
import { useAutoSave } from '@/features/integration/hooks/use-auto-save';
import { useAutoSaveOnClose } from '@/features/integration/hooks/use-auto-save-on-close';

export function ShadcnAppBar() {
  const { t } = useTranslation();
  const documentName = useStore((state) => state.documentName || 'Untitled');
  const isReadOnlyMode = useStore((store) => store.isReadOnlyMode);
  const setDocumentName = useStore((state) => state.setDocumentName);
  const setToggleReadOnlyMode = useStore((store) => store.setToggleReadOnlyMode);
  
  const { theme, toggleTheme } = useTheme();
  const { onSave } = useContext(IntegrationContext);

  const [isEditingName, setIsEditingName] = useState(false);

  // Initialize auto-save hooks
  useAutoSave();
  useAutoSaveOnClose();

  // Handlers - now defined inside component to access state
  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 128) return;
    setDocumentName(event.target.value);
  }, [setDocumentName]);

  const handleNameBlur = useCallback(() => {
    setIsEditingName(false);
  }, []);

  const handleNameKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  }, []);

  const handleUndo = useCallback(() => {
    // Trigger Ctrl+Z keyboard shortcut for undo
    const event = new KeyboardEvent('keydown', {
      key: 'z',
      code: 'KeyZ',
      ctrlKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }, []);

  const handleRedo = useCallback(() => {
    // Trigger Ctrl+Shift+Z keyboard shortcut for redo
    const event = new KeyboardEvent('keydown', {
      key: 'z',
      code: 'KeyZ',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true,
    });
    document.dispatchEvent(event);
  }, []);

  const handleLanguageChange = useCallback((language: string) => {
    // Change language using i18n
    i18n.changeLanguage(language);
  }, []);

  const handleRefreshLayout = useCallback(() => {
    // Placeholder for refresh layout functionality
    console.log('Refresh Layout clicked');
  }, []);

  const handleSave = useCallback(() => {
    (async () => {
      const didSave = await onSave({ isAutoSave: false });

      // Also persist to the workflow collection storage (update existing workflow if possible).
      // This prevents duplicates when returning to the workflow list.
      if (didSave === 'success' && globalThis.__persistWorkflowToCollection) {
        try {
          await globalThis.__persistWorkflowToCollection();
        } catch {
          // Ignore: integration save already reported status to the user.
        }
      }
    })();
  }, [onSave]);

  const handleOpenWorkflows = useCallback(() => {
    // Call the global navigation function
    if (globalThis.__navigateToCollection) {
      globalThis.__navigateToCollection();
    }
  }, []);

  return (
    <nav className="w-full rounded-full border border-border bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-8">
        {/* Left: Logo and toolbar */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center">
            <Logo style={{ width: '40px', height: '16px' }} />
          </div>

          {/* Toolbar buttons */}
          <div className="flex items-center gap-1">
            {/* Save Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title={t('tooltips.save')}
              onClick={handleSave}
            >
              <SavingStatus />
              <FloppyDisk size={16} weight="regular" />
            </Button>

            {/* Open File Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title={t('tooltips.open')}
              onClick={handleOpenWorkflows}
            >
              <FolderOpen size={16} weight="regular" />
            </Button>

            {/* Undo Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title={t('tooltips.undo', 'Undo')}
              onClick={handleUndo}
            >
              <ArrowUUpLeft size={16} weight="regular" />
            </Button>

            {/* Redo Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              title={t('tooltips.redo', 'Redo')}
              onClick={handleRedo}
            >
              <ArrowUUpRight size={16} weight="regular" />
            </Button>

            {/* Optional plugin extension point - additional tools can be added here */}
          </div>
        </div>

        {/* Center: Breadcrumb navigation */}
        <div className="flex-1 flex items-center justify-center px-4 min-w-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button onClick={() => console.log('Home clicked')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {t('header.folderName')}
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      title={t('tooltips.pickTheProject')}
                      aria-label={t('tooltips.pickTheProject')}
                    >
                      <DotsThree size={16} weight="bold" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => console.log('Duplicate to drafts clicked')}>
                      {t('header.projectSelection.duplicateToDrafts')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isEditingName && !isReadOnlyMode ? (
                  <Input
                    type="text"
                    value={documentName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    autoFocus
                    className="h-8 max-w-[180px] text-sm font-medium"
                  />
                ) : (
                  <BreadcrumbPage 
                    className={isReadOnlyMode ? '' : 'cursor-pointer'}
                    onClick={() => {
                      if (!isReadOnlyMode) {
                        setIsEditingName(true);
                      }
                    }}
                  >
                    {documentName}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1">
          {/* Edit/Read mode toggle */}
          <ToggleGroup 
            type="single" 
            value={isReadOnlyMode ? 'readonly' : 'edit'}
            onValueChange={(value) => {
              if (value === 'edit' || value === 'readonly') {
                setToggleReadOnlyMode(value === 'readonly');
              }
            }}
            className="rounded-xl border border-input"
          >
            <ToggleGroupItem 
              value="edit" 
              aria-label={t('appBar.editMode') || 'Edit mode'}
              className="rounded-l-lg"
              title={t('appBar.editMode') || 'Edit mode'}
            >
              <PencilSimple size={16} weight="regular" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="readonly" 
              aria-label={t('appBar.readOnlyMode') || 'Read-only mode'}
              className="rounded-r-lg"
              title={t('appBar.readOnlyMode') || 'Read-only mode'}
            >
              <PencilSimpleSlash size={16} weight="regular" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Dark/Light mode toggle */}
          <ToggleGroup 
            type="single" 
            value={theme === 'dark' ? 'dark' : 'light'}
            onValueChange={() => {
              toggleTheme();
            }}
            className="rounded-xl border border-input"
          >
            <ToggleGroupItem 
              value="light" 
              aria-label={t('appBar.lightMode') || 'Light mode'}
              className="rounded-l-lg"
              title={t('appBar.lightMode') || 'Light mode'}
            >
              <Sun size={16} weight="regular" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="dark" 
              aria-label={t('appBar.darkMode') || 'Dark mode'}
              className="rounded-r-lg"
              title={t('appBar.darkMode') || 'Dark mode'}
            >
              <MoonStars size={16} weight="regular" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Refresh Layout button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title={t('tooltips.layout', 'Refresh Layout')}
            onClick={handleRefreshLayout}
          >
            <TreeStructure size={16} weight="regular" />
          </Button>

          {/* Language dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title={t('tooltips.changeLanguage', 'Change Language')}
                aria-label={t('tooltips.changeLanguage', 'Change Language')}
              >
                <Translate size={16} weight="regular" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('es')}>Español</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('de')}>Deutsch</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu button with Export/Import/Save as Image */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title={t('tooltips.menu')}
                aria-label={t('tooltips.menu')}
              >
                <DotsThreeVertical size={16} weight="regular" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={openExportModal}>
                <Export size={16} weight="regular" className="mr-2" />
                {t('importExport.export')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openImportModal}>
                <DownloadSimple size={16} weight="regular" className="mr-2" />
                {t('importExport.import')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Save as Image clicked')}>
                <ImageIcon size={16} weight="regular" className="mr-2" />
                {t('header.controls.saveAsImage')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
