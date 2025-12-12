"use client"

import React, { useState, useContext, useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@synergycodes/overflow-ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@synergycodes/overflow-ui';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@synergycodes/overflow-ui';
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

  // Hover state handlers for buttons
  const handleButtonMouseEnter = useCallback((event_: React.MouseEvent<HTMLButtonElement>) => {
    event_.currentTarget.style.backgroundColor = theme === 'dark' ? '#333333' : '#f1f5f9';
  }, [theme]);

  const handleButtonMouseLeave = useCallback((event_: React.MouseEvent<HTMLButtonElement>) => {
    event_.currentTarget.style.backgroundColor = 'transparent';
  }, []);

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
    onSave({ isAutoSave: false });
  }, [onSave]);

  return (
    <nav 
      className="w-full transition-colors border shadow-sm" 
      style={{ 
        padding: '0.75rem 1rem',
        backgroundColor: `hsl(var(--card))`,
        borderColor: `hsl(var(--border))`,
        borderRadius: '9999px',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      }}
    >
      <div className="flex items-center justify-between" style={{ gap: '2rem' }}>
        {/* Left: Logo and toolbar */}
        <div className="flex items-center" style={{ gap: '2rem' }}>
          {/* Logo */}
          <div className="flex items-center">
            <Logo style={{ width: '40px', height: '16px' }} />
          </div>

          {/* Toolbar buttons */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            {/* Save Button */}
            <button 
              title={t('tooltips.save')}
              className="flex items-center justify-center rounded-xl transition-colors"
              style={{ 
                width: '32px', 
                height: '32px', 
                padding: '0',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={handleSave}
            >
              <SavingStatus />
              <FloppyDisk size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
            </button>

            {/* Open File Button */}
            <button 
              title={t('tooltips.open')}
              className="flex items-center justify-center rounded-xl transition-colors"
              style={{ 
                width: '32px', 
                height: '32px', 
                padding: '0',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={() => console.log('Open clicked')}
            >
              <FolderOpen size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
            </button>

            {/* Undo Button */}
            <button 
              title={t('tooltips.undo', 'Undo')}
              className="flex items-center justify-center rounded-xl transition-colors"
              style={{ 
                width: '32px', 
                height: '32px', 
                padding: '0',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={handleUndo}
            >
              <ArrowUUpLeft size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
            </button>

            {/* Redo Button */}
            <button 
              title={t('tooltips.redo', 'Redo')}
              className="flex items-center justify-center rounded-xl transition-colors"
              style={{ 
                width: '32px', 
                height: '32px', 
                padding: '0',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
              onClick={handleRedo}
            >
              <ArrowUUpRight size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
            </button>

            {/* Optional plugin extension point - additional tools can be added here */}
          </div>
        </div>

        {/* Center: Breadcrumb navigation */}
        <div className="flex-1 flex items-center justify-center px-4 min-w-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button 
                    onClick={() => console.log('Home clicked')}
                    className="text-sm font-medium"
                  >
                    {t('header.folderName')}
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="flex items-center justify-center rounded-lg transition-colors"
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        padding: '0',
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={handleButtonMouseEnter}
                      onMouseLeave={handleButtonMouseLeave}
                      title={t('tooltips.pickTheProject')}
                    >
                      <DotsThree size={16} style={{ color: theme === 'dark' ? '#9ca3af' : '#475569' }} weight="bold" />
                    </button>
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
                  <input
                    type="text"
                    value={documentName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    autoFocus
                    className="font-medium px-2 py-1 border rounded-xl min-w-0 max-w-[150px] text-sm"
                    style={{
                      color: theme === 'dark' ? '#f3f4f6' : '#0f172a',
                      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#ffffff',
                      borderColor: theme === 'dark' ? '#4b5563' : '#cbd5e1'
                    }}
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
        <div className="flex items-center" style={{ gap: '0.5rem' }}>
          {/* Edit/Read mode toggle */}
          <ToggleGroup 
            type="single" 
            value={isReadOnlyMode ? 'readonly' : 'edit'}
            onValueChange={(value) => {
              if (value === 'edit' || value === 'readonly') {
                setToggleReadOnlyMode(value === 'readonly');
              }
            }}
            className="border rounded-xl"
            style={{ borderColor: theme === 'dark' ? '#4b5563' : '#e2e8f0' }}
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
            className="border rounded-xl"
            style={{ borderColor: theme === 'dark' ? '#4b5563' : '#e2e8f0' }}
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
          <button 
            title={t('tooltips.layout', 'Refresh Layout')}
            className="flex items-center justify-center rounded-xl transition-colors"
            style={{ 
              width: '32px', 
              height: '32px', 
              padding: '0',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            onClick={handleRefreshLayout}
          >
            <TreeStructure size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
          </button>

          {/* Language dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                title={t('tooltips.changeLanguage', 'Change Language')}
                className="flex items-center justify-center rounded-xl transition-colors"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  padding: '0',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
              >
                <Translate size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
              </button>
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
              <button 
                title={t('tooltips.menu')}
                className="flex items-center justify-center rounded-xl transition-colors"
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  padding: '0',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
              >
                <DotsThreeVertical size={16} style={{ color: theme === 'dark' ? '#e5e7eb' : '#334155' }} weight="regular" />
              </button>
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
