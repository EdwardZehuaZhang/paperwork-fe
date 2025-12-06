"use client"

import React, { useState } from 'react';
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

export function ShadcnNavbarDemo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [documentName, setDocumentName] = useState('Untitled');
  const [isEditingName, setIsEditingName] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 128) return;
    setDocumentName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <nav className="w-full bg-white border-b border-slate-200" style={{ padding: '0.75rem 1rem' }}>
      <div className="flex items-center justify-between" style={{ gap: '2rem' }}>
        {/* Left: Logo and toolbar */}
        <div className="flex items-center" style={{ gap: '2rem' }}>
          {/* Logo */}
          <div className="flex items-center">
            <svg width="40" height="16" viewBox="0 0 55 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Workflow Builder Logo">
                <path id="Vector" d="M51.1847 0.0967331H46.6515C44.9018 0.0967331 43.4828 1.51569 43.4828 3.2654V8.16968C43.4828 9.18006 42.2631 9.68726 41.5466 8.97543L33.5415 1.01788C32.9477 0.427487 32.1447 0.0967331 31.3081 0.0967331H24.9104C23.1607 0.0967331 21.7417 1.51569 21.7417 3.2654V8.14016C21.7417 9.1492 20.5241 9.65707 19.8069 8.94726L11.797 1.01385C11.204 0.426145 10.4023 0.0967331 9.56766 0.0967331H3.16865C1.41895 0.0967331 0 1.51569 0 3.2654V9.65506C0 10.4957 0.334107 11.3014 0.92785 11.8959L9.94269 20.9108C10.5371 21.5052 11.3429 21.8386 12.1835 21.8386H18.5731C20.3228 21.8386 21.7417 20.4197 21.7417 18.67V13.765C21.7417 12.7553 22.9614 12.2474 23.678 12.9592L31.6865 20.9175C32.2802 21.5072 33.0833 21.8386 33.9199 21.8386H40.3148C42.0645 21.8386 43.4835 20.4197 43.4835 18.67V12.1032C43.4835 11.4759 43.992 10.9673 44.6193 10.9673H51.1861C52.9358 10.9673 54.3547 9.54838 54.3547 7.79867V3.2654C54.3547 1.51569 52.9358 0.0967331 51.1861 0.0967331H51.1847Z" fill="currentColor"></path>
              </g>
            </svg>
          </div>

          {/* Toolbar buttons */}
          <div className="flex items-center" style={{ gap: '0.5rem' }}>
            <button 
              title="Save"
              className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              style={{ width: '32px', height: '32px', padding: '0' }}
              onClick={() => console.log('Save clicked')}
            >
              <FloppyDisk size={16} className="text-slate-700" weight="regular" />
            </button>

            <button 
              title="Open"
              className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              style={{ width: '32px', height: '32px', padding: '0' }}
              onClick={() => console.log('Open clicked')}
            >
              <FolderOpen size={16} className="text-slate-700" weight="regular" />
            </button>

            <button 
              title="Undo"
              className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              style={{ width: '32px', height: '32px', padding: '0' }}
              onClick={() => console.log('Undo clicked')}
            >
              <ArrowUUpLeft size={16} className="text-slate-700" weight="regular" />
            </button>

            <button 
              title="Redo"
              className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              style={{ width: '32px', height: '32px', padding: '0' }}
              onClick={() => console.log('Redo clicked')}
            >
              <ArrowUUpRight size={16} className="text-slate-700" weight="regular" />
            </button>
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
                    Home
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className="flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors"
                      style={{ width: '32px', height: '32px', padding: '0' }}
                      title="More navigation"
                    >
                      <DotsThree size={16} className="text-slate-600" weight="bold" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => console.log('Projects clicked')}>Projects</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Drafts clicked')}>Drafts</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Archived clicked')}>Archived</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <button 
                    onClick={() => console.log('Documents clicked')}
                    className="text-sm font-medium"
                  >
                    Documents
                  </button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isEditingName && !isEditMode ? (
                  <input
                    type="text"
                    value={documentName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={handleNameKeyDown}
                    autoFocus
                    className="font-medium text-slate-900 px-2 py-1 border border-slate-300 rounded-xl min-w-0 max-w-[150px] text-sm"
                  />
                ) : (
                  <BreadcrumbPage 
                    className="cursor-pointer"
                    onClick={() => !isEditMode && setIsEditingName(true)}
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
            value={isEditMode ? 'edit' : 'readonly'}
            onValueChange={(val) => {
              if (val === 'edit' || val === 'readonly') {
                setIsEditMode(val === 'edit');
              }
            }}
            className="border border-slate-200 rounded-xl"
          >
            <ToggleGroupItem 
              value="edit" 
              aria-label="Edit mode"
              className="rounded-l-lg"
              title="Edit mode"
            >
              <PencilSimple size={16} weight="regular" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="readonly" 
              aria-label="Read-only mode"
              className="rounded-r-lg"
              title="Read-only mode"
            >
              <PencilSimpleSlash size={16} weight="regular" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Dark/Light mode toggle */}
          <ToggleGroup 
            type="single" 
            value={isDarkMode ? 'dark' : 'light'}
            onValueChange={(val) => {
              if (val === 'dark' || val === 'light') {
                setIsDarkMode(val === 'dark');
              }
            }}
            className="border border-slate-200 rounded-xl"
          >
            <ToggleGroupItem 
              value="light" 
              aria-label="Light mode"
              className="rounded-l-lg"
              title="Light mode"
            >
              <Sun size={16} weight="regular" />
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="dark" 
              aria-label="Dark mode"
              className="rounded-r-lg"
              title="Dark mode"
            >
              <MoonStars size={16} weight="regular" />
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Refresh Layout button */}
          <button 
            title="Refresh Layout"
            className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
            style={{ width: '32px', height: '32px', padding: '0' }}
            onClick={() => console.log('Refresh Layout clicked')}
          >
            <TreeStructure size={16} className="text-slate-700" weight="regular" />
          </button>

          {/* Language dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                title="Change Language"
                className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
                style={{ width: '32px', height: '32px', padding: '0' }}
              >
                <Translate size={16} className="text-slate-700" weight="regular" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log('English selected')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Spanish selected')}>Spanish</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('French selected')}>French</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('German selected')}>German</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Menu button with Export/Import/Save as Image */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                title="Menu"
                className="flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
                style={{ width: '32px', height: '32px', padding: '0' }}
              >
                <DotsThreeVertical size={16} className="text-slate-700" weight="regular" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log('Export clicked')}>
                <Export size={16} weight="regular" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Import clicked')}>
                <DownloadSimple size={16} weight="regular" />
                Import
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Save as Image clicked')}>
                <ImageIcon size={16} weight="regular" />
                Save as Image
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
