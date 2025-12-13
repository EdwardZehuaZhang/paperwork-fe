import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MagnifyingGlass, FunnelSimple } from '@phosphor-icons/react';

export interface SelectItem {
  value: string;
  label: string;
}

interface DataTableToolbarProps {
  search: string;
  setSearch: (v: string) => void;
  categoryItems: SelectItem[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  sortItems: SelectItem[];
  sortBy: string;
  setSortBy: (v: string) => void;
  tagItems: string[];
  activeTags: string[];
  toggleTag: (tag: string) => void;
}

export function DataTableToolbar(props: DataTableToolbarProps) {
  const { search, setSearch, categoryItems, selectedCategory, setSelectedCategory, sortItems, sortBy, setSortBy, tagItems, activeTags, toggleTag } = props;

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <MagnifyingGlass size={18} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows..."
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] h-10 rounded-lg">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categoryItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-10 rounded-lg">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {tagItems.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 transition-colors">
                <FunnelSimple size={16} />
                <span>Filter by tags</span>
                {activeTags.length > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs rounded-full">{activeTags.length}</Badge>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {tagItems.map((tag) => (
                <DropdownMenuItem 
                  key={tag} 
                  onClick={() => toggleTag(tag)}
                  className="flex items-center justify-between"
                >
                  <span>{tag}</span>
                  {activeTags.includes(tag) && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {activeTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="cursor-pointer px-3 py-1 hover:bg-secondary/80 transition-colors"
              onClick={() => toggleTag(tag)}
            >
              {tag}
              <span className="ml-1.5 text-muted-foreground hover:text-foreground">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataTableToolbar;