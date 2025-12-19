import React, { memo, useState, useRef, useEffect } from 'react';

export interface SheetHeaderComponentProps {
  displayName?: string;
  columnIndex?: number;
  onTokenInsert?: (token: string) => void;
  tokenOptions?: Array<{
    label: string;
    value: string;
    group?: string;
  }>;
}

export const SheetHeaderComponent = memo(
  ({ displayName, columnIndex, onTokenInsert, tokenOptions = [] }: SheetHeaderComponentProps) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Group tokens by category
    const groupedTokens = tokenOptions.reduce(
      (acc, token) => {
        const group = token.group || 'Other';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(token);
        return acc;
      },
      {} as Record<string, typeof tokenOptions>,
    );

    const handleAddClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowMenu(!showMenu);
    };

    const handleTokenSelect = (value: string) => {
      if (onTokenInsert) {
        onTokenInsert(value);
      }
      setShowMenu(false);
    };

    // Close menu on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
            buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
          setShowMenu(false);
        }
      };

      if (showMenu) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [showMenu]);

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '0.5rem' }}>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {displayName}
        </span>
        <button
          ref={buttonRef}
          className="sheet-header-button"
          onClick={handleAddClick}
          title="Insert token"
          style={{
            position: 'relative',
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            cursor: 'pointer',
            backgroundColor: 'var(--ax-ui-surface-secondary-default)',
            border: '0.0625rem solid var(--ax-ui-stroke-primary-default)',
            borderRadius: '0.25rem',
          }}
        >
          +
        </button>

        {showMenu && tokenOptions.length > 0 && (
          <div
            ref={menuRef}
            className="sheet-token-menu"
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.25rem',
              minWidth: '200px',
            }}
          >
            {Object.entries(groupedTokens).map(([group, tokens]) => (
              <div key={group} className="sheet-token-menu-group">
                <div className="sheet-token-menu-group-label">{group}</div>
                {tokens.map((token) => (
                  <div
                    key={token.value}
                    className="sheet-token-menu-item"
                    onClick={() => handleTokenSelect(token.value)}
                  >
                    {token.label}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

SheetHeaderComponent.displayName = 'SheetHeaderComponent';
