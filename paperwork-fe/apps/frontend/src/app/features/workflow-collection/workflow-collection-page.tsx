import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutGrid, 
  List as ListIcon, 
  Plus, 
  Search, 
  MoreVertical, 
  Share2, 
  Pencil, 
  Copy, 
  Trash2, 
  Filter, 
  Check,
  FileText
} from 'lucide-react';
import { Icon } from '@workflow-builder/icons';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';
import { Workflow, ViewMode, SortBy } from './types';
import { WorkflowStorageAPI } from './api/workflow-storage';

class IconErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Swallow icon resolution errors (unknown icon name) and show a safe fallback.
    console.warn('Workflow thumbnail icon failed to render:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function SafeWorkflowIcon({
  name,
  size,
  className,
}: {
  name: string | undefined;
  size: 'small' | 'medium';
  className?: string;
}) {
  const fallbackSizeClass = size === 'small' ? 'h-4 w-4' : 'h-5 w-5';

  if (!name) {
    return <FileText className={cn(fallbackSizeClass, className)} />;
  }

  return (
    <IconErrorBoundary fallback={<FileText className={cn(fallbackSizeClass, className)} />}>
      <Icon name={name as any} size={size} />
    </IconErrorBoundary>
  );
}

// --- Types & Interfaces ---

interface WorkflowCollectionPageProps {
  onWorkflowSelect?: (workflowId: string) => void;
  onCreateNew?: () => void;
}

// --- Main Component ---

export function WorkflowCollectionPage({ onWorkflowSelect, onCreateNew }: WorkflowCollectionPageProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('date-desc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [renameDialog, setRenameDialog] = useState<{ open: boolean; workflowId: string; currentName: string }>({
    open: false, workflowId: '', currentName: ''
  });
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; workflowId: string; workflowName: string }>({
    open: false, workflowId: '', workflowName: ''
  });

  // Load workflows
  const loadWorkflows = async () => {
    setLoading(true);
    try {
      const data = await WorkflowStorageAPI.getAll();
      setWorkflows(data);
    } catch (error) {
      console.error('Error loading workflows:', error);
      toast.error('Failed to load workflows');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkflows();
  }, []);

  // Derived state
  const categories = useMemo(() => {
    const cats = new Set(workflows.map(w => w.category).filter(Boolean) as string[]);
    return ['all', ...Array.from(cats)];
  }, [workflows]);

  const allTags = useMemo(() => {
    const tags = new Set(workflows.flatMap(w => w.tags || []));
    return Array.from(tags).sort();
  }, [workflows]);

  const filteredWorkflows = useMemo(() => {
    let filtered = [...workflows];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(w => 
        w.name.toLowerCase().includes(query) ||
        w.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(w => w.category === selectedCategory);
    }

    if (activeTags.length > 0) {
      filtered = filtered.filter(w => {
        const tags = w.tags || [];
        return activeTags.every(t => tags.includes(t));
      });
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'date-asc': return a.dateModified.getTime() - b.dateModified.getTime();
        case 'date-desc': return b.dateModified.getTime() - a.dateModified.getTime();
        default: return 0;
      }
    });

    return filtered;
  }, [workflows, searchQuery, sortBy, selectedCategory, activeTags]);

  // Handlers
  const handleRename = async (newName: string) => {
    try {
      await WorkflowStorageAPI.rename(renameDialog.workflowId, newName);
      await loadWorkflows();
      setRenameDialog({ open: false, workflowId: '', currentName: '' });
      toast.success('Workflow renamed successfully');
    } catch (error) {
      console.error('Error renaming workflow:', error);
      toast.error('Failed to rename workflow');
    }
  };

  const handleDelete = async () => {
    try {
      await WorkflowStorageAPI.delete(deleteDialog.workflowId);
      await loadWorkflows();
      setDeleteDialog({ open: false, workflowId: '', workflowName: '' });
      toast.success('Workflow deleted');
    } catch (error) {
      console.error('Error deleting workflow:', error);
      toast.error('Failed to delete workflow');
    }
  };

  const handleDuplicate = async (workflowId: string) => {
    try {
      await WorkflowStorageAPI.duplicate(workflowId);
      await loadWorkflows();
      toast.success('Workflow duplicated');
    } catch (error) {
      console.error('Error duplicating workflow:', error);
      toast.error('Failed to duplicate workflow');
    }
  };

  const handleShare = async (workflowId: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/workflows/${workflowId}`;
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied to clipboard');
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1400px] space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Workflows</h1>
            <p className="text-muted-foreground">
              Manage and organize your workflow templates
            </p>
          </div>
          <Button onClick={onCreateNew} size="lg" className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            New Workflow
          </Button>
        </div>

        <Separator />

        {/* Toolbar */}
        <WorkflowToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          sortBy={sortBy}
          setSortBy={setSortBy}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
          allTags={allTags}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Content */}
        {loading ? (
          <LoadingSkeletons viewMode={viewMode} />
        ) : filteredWorkflows.length === 0 ? (
          <EmptyState 
            hasFilters={searchQuery !== '' || selectedCategory !== 'all' || activeTags.length > 0}
            onClearFilters={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setActiveTags([]);
            }}
          />
        ) : viewMode === 'grid' ? (
          <WorkflowGrid 
            workflows={filteredWorkflows}
            onSelect={onWorkflowSelect}
            onShare={handleShare}
            onRename={(id: string, name: string) => setRenameDialog({ open: true, workflowId: id, currentName: name })}
            onDuplicate={handleDuplicate}
            onDelete={(id: string, name: string) => setDeleteDialog({ open: true, workflowId: id, workflowName: name })}
          />
        ) : (
          <WorkflowList 
            workflows={filteredWorkflows}
            onSelect={onWorkflowSelect}
            onShare={handleShare}
            onRename={(id: string, name: string) => setRenameDialog({ open: true, workflowId: id, currentName: name })}
            onDuplicate={handleDuplicate}
            onDelete={(id: string, name: string) => setDeleteDialog({ open: true, workflowId: id, workflowName: name })}
          />
        )}

        {/* Dialogs */}
        <RenameWorkflowDialog 
          open={renameDialog.open}
          currentName={renameDialog.currentName}
          onOpenChange={(open: boolean) => !open && setRenameDialog(prev => ({ ...prev, open: false }))}
          onConfirm={handleRename}
        />

        <DeleteWorkflowDialog 
          open={deleteDialog.open}
          workflowName={deleteDialog.workflowName}
          onOpenChange={(open: boolean) => !open && setDeleteDialog(prev => ({ ...prev, open: false }))}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}

// --- Sub-Components ---

function WorkflowToolbar({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory, categories,
  sortBy, setSortBy,
  activeTags, setActiveTags, allTags,
  viewMode, setViewMode
}: {
  searchQuery: string; setSearchQuery: (v: string) => void;
  selectedCategory: string; setSelectedCategory: (v: string) => void; categories: string[];
  sortBy: SortBy; setSortBy: (v: SortBy) => void;
  activeTags: string[]; setActiveTags: (v: string[]) => void; allTags: string[];
  viewMode: ViewMode; setViewMode: (v: ViewMode) => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-muted/30 p-2 rounded-xl border">
      <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto flex-1">
        <div className="relative w-full sm:w-64 lg:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background border-muted-foreground/20"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[160px] bg-background border-muted-foreground/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TagFilterPopover 
            allTags={allTags}
            activeTags={activeTags}
            onToggleTag={(tag) => {
              setActiveTags(activeTags.includes(tag) 
                ? activeTags.filter(t => t !== tag) 
                : [...activeTags, tag]
              );
            }}
          />

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
            <SelectTrigger className="w-[160px] bg-background border-muted-foreground/20">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest first</SelectItem>
              <SelectItem value="date-asc">Oldest first</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-background rounded-lg border border-muted-foreground/20 p-1 self-end lg:self-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Grid view</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>List view</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

function TagFilterPopover({ 
  allTags, activeTags, onToggleTag 
}: { 
  allTags: string[], activeTags: string[], onToggleTag: (tag: string) => void 
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          role="combobox" 
          aria-expanded={open}
          className="justify-between bg-background border-muted-foreground/20 min-w-[120px]"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 opacity-70" />
            <span>Tags</span>
            {activeTags.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                {activeTags.length}
              </Badge>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filter tags..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {allTags.map((tag) => (
                <CommandItem
                  key={tag}
                  value={tag}
                  onSelect={() => onToggleTag(tag)}
                >
                  <div className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    activeTags.includes(tag) ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                  )}>
                    <Check className="h-3 w-3" />
                  </div>
                  <span>{tag}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {activeTags.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => activeTags.forEach(t => onToggleTag(t))}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function WorkflowGrid({ workflows, onSelect, onShare, onRename, onDuplicate, onDelete }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {workflows.map((workflow: Workflow) => (
        <WorkflowCard 
          key={workflow.id} 
          workflow={workflow}
          onSelect={onSelect}
          onShare={onShare}
          onRename={onRename}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function WorkflowCard({ workflow, onSelect, onShare, onRename, onDuplicate, onDelete }: any) {
  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/50 cursor-pointer"
      onClick={() => onSelect?.(workflow.id)}
    >
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
          <SafeWorkflowIcon name={workflow.thumbnailIcon} size="medium" className="text-primary" />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <CardTitle className="text-base font-semibold truncate leading-tight">
            {workflow.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-xs">
            <span>{formatDate(workflow.dateModified)}</span>
            <span className="text-muted-foreground/40">•</span>
            <span>{workflow.nodeCount} nodes</span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100" onClick={e => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={(e) => { e.stopPropagation(); onShare(workflow.id); }}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <WorkflowActionsMenu 
            workflow={workflow} 
            onRename={onRename} 
            onDuplicate={onDuplicate} 
            onDelete={onDelete} 
          />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          {workflow.category && (
            <Badge variant="secondary" className="font-medium">
              {workflow.category}
            </Badge>
          )}
          {workflow.tags?.slice(0, 4).map((tag: string) => (
            <Badge key={tag} variant="outline" className="font-normal text-muted-foreground">
              {tag}
            </Badge>
          ))}
          {(workflow.tags?.length || 0) > 4 && (
            <Badge variant="outline" className="font-normal text-muted-foreground">
              +{workflow.tags!.length - 4}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowList({ workflows, onSelect, onShare, onRename, onDuplicate, onDelete }: any) {
  return (
    <div className="flex flex-col gap-3">
      {workflows.map((workflow: Workflow) => (
        <WorkflowRow
          key={workflow.id}
          workflow={workflow}
          onSelect={onSelect}
          onShare={onShare}
          onRename={onRename}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

function WorkflowRow({ workflow, onSelect, onShare, onRename, onDuplicate, onDelete }: any) {
  return (
    <Card 
      className="group flex items-center p-3 gap-4 transition-all hover:shadow-sm hover:border-primary/50 cursor-pointer"
      onClick={() => onSelect?.(workflow.id)}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <SafeWorkflowIcon name={workflow.thumbnailIcon} size="small" className="text-primary" />
      </div>
      
      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2 min-w-0">
          <h3 className="font-medium truncate">{workflow.name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            {formatDate(workflow.dateModified)} • {workflow.nodeCount} nodes
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          {workflow.category && (
            <Badge variant="secondary" className="text-xs">{workflow.category}</Badge>
          )}
        </div>

        <div className="hidden md:flex items-center gap-1 flex-wrap">
          {workflow.tags?.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal text-muted-foreground">
              {tag}
            </Badge>
          ))}
          {(workflow.tags?.length || 0) > 2 && (
            <span className="text-xs text-muted-foreground">+{workflow.tags!.length - 2}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={(e) => { e.stopPropagation(); onShare(workflow.id); }}
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <WorkflowActionsMenu 
          workflow={workflow} 
          onRename={onRename} 
          onDuplicate={onDuplicate} 
          onDelete={onDelete} 
        />
      </div>
    </Card>
  );
}

function WorkflowActionsMenu({ workflow, onRename, onDuplicate, onDelete }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">More actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onRename(workflow.id, workflow.name); }}>
          <Pencil className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onDuplicate(workflow.id); }}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-destructive focus:text-destructive"
          onClick={(e) => { e.stopPropagation(); onDelete(workflow.id, workflow.name); }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RenameWorkflowDialog({ open, currentName, onOpenChange, onConfirm }: any) {
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (open) setName(currentName);
  }, [open, currentName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Workflow</DialogTitle>
          <DialogDescription>
            Enter a new name for your workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workflow name"
            onKeyDown={(e) => e.key === 'Enter' && name.trim() && onConfirm(name)}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onConfirm(name)} disabled={!name.trim()}>Rename</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteWorkflowDialog({ open, workflowName, onOpenChange, onConfirm }: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Workflow</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{workflowName}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EmptyState({ hasFilters, onClearFilters }: { hasFilters: boolean; onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
      <div className="bg-muted/50 p-4 rounded-full">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">No workflows found</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          {hasFilters 
            ? "We couldn't find any workflows matching your filters. Try adjusting your search or filters."
            : "Get started by creating your first workflow template."}
        </p>
      </div>
      {hasFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear all filters
        </Button>
      )}
    </div>
  );
}

function LoadingSkeletons({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center p-3 gap-4 border rounded-lg">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="flex flex-row gap-4 pb-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// --- Utils ---

function formatDate(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
