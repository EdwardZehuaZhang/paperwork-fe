import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import useStore from '@/store/store'
import { UserDepartmentMultiSelect, AssignedItemsDisplay } from './components'

interface NodeAccess {
  nodeId: string
  nodeLabel: string
  userIds: string[]
  departmentIds: string[]
  isPublic: boolean
}

export function BulkAccessDialog() {
  const nodes = useStore((state) => state.nodes)
  const setNodeProperties = useStore((state) => state.setNodeProperties)
  const [nodeAccess, setNodeAccess] = useState<Record<string, NodeAccess>>(() => {
    // Initialize with current node access settings
    const initial: Record<string, NodeAccess> = {}
    for (const node of nodes) {
      // Filter to form nodes (nodes with type 'node' that can be forms/sheets)
      if (node.data?.type === 'node') {
        const props = node.data.properties as Record<string, unknown>
        initial[node.id] = {
          nodeId: node.id,
          nodeLabel: (props?.label as string) || node.id,
          userIds: (props?.assignedUserIds as string[]) || [],
          departmentIds: (props?.assignedDepartmentIds as string[]) || [],
          isPublic: (props?.isPublic as boolean) ?? true, // Default to public if not set
        }
      }
    }
    return initial
  })

  const handleSelectionChange = (
    nodeId: string,
    userIds: string[],
    departmentIds: string[],
    isPublic: boolean
  ) => {
    setNodeAccess((previous) => ({
      ...previous,
      [nodeId]: {
        ...previous[nodeId],
        userIds,
        departmentIds,
        isPublic,
      },
    }))
  }

  const handleSave = () => {
    // Save all changes to store - merge with existing properties
    for (const access of Object.values(nodeAccess)) {
      const node = nodes.find((n) => n.id === access.nodeId)
      if (node) {
        const currentProps = node.data.properties as Record<string, unknown>
        setNodeProperties(access.nodeId, {
          ...currentProps,
          assignedUserIds: access.userIds,
          assignedDepartmentIds: access.departmentIds,
          isPublic: access.isPublic,
        })
      }
    }
  }

  const formNodes = Object.values(nodeAccess)

  if (formNodes.length === 0) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Manage node access"
            aria-label="Manage node access"
          >
            <Share2 size={16} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Access</DialogTitle>
            <DialogDescription>
              No form or approval nodes available
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Create form or approval nodes to manage their access settings.
          </p>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          title="Manage node access"
          aria-label="Manage node access"
        >
          <Share2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Node Access</DialogTitle>
          <DialogDescription>
            Configure who can access each form node in your workflow
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {formNodes.map((access, index) => (
              <div key={access.nodeId} className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">{access.nodeLabel}</h4>
                  <p className="text-xs text-muted-foreground">
                    Node ID: {access.nodeId}
                  </p>
                </div>

                <UserDepartmentMultiSelect
                  selectedUserIds={access.userIds}
                  selectedDepartmentIds={access.departmentIds}
                  isPublic={access.isPublic}
                  onSelectionChange={(userIds, deptIds, isPublic) =>
                    handleSelectionChange(access.nodeId, userIds, deptIds, isPublic)
                  }
                />

                <AssignedItemsDisplay
                  userIds={access.userIds}
                  departmentIds={access.departmentIds}
                  isPublic={access.isPublic}
                  onRemoveUser={(userId) =>
                    handleSelectionChange(
                      access.nodeId,
                      access.userIds.filter((id) => id !== userId),
                      access.departmentIds,
                      access.isPublic
                    )
                  }
                  onRemoveDepartment={(deptId) =>
                    handleSelectionChange(
                      access.nodeId,
                      access.userIds,
                      access.departmentIds.filter((id) => id !== deptId),
                      access.isPublic
                    )
                  }
                />

                {index < formNodes.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
