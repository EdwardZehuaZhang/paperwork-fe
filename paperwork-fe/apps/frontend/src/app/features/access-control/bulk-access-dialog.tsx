import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
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

const accessManagedNodeTypes = new Set(['form', 'approval', 'sheet'])

export function BulkAccessDialog() {
  const nodes = useStore((state) => state.nodes)
  const setNodeProperties = useStore((state) => state.setNodeProperties)
  const [open, setOpen] = useState(false)
  const accessManagedNodes = useMemo(
    () => nodes.filter((node) => accessManagedNodeTypes.has(node.data?.type)),
    [nodes]
  )

  const [nodeAccess, setNodeAccess] = useState<Record<string, NodeAccess>>({})

  useEffect(() => {
    // Keep dialog state in sync with diagram nodes (important when the workflow loads async).
    // Preserve any unsaved edits already made in the dialog.
    setNodeAccess((previous) => {
      const next: Record<string, NodeAccess> = {}

      for (const node of accessManagedNodes) {
        const props = node.data.properties as Record<string, unknown>
        const existing = previous[node.id]

        next[node.id] = {
          nodeId: node.id,
          nodeLabel: (props?.label as string) || node.id,
          userIds: existing?.userIds ?? (props?.assignedUserIds as string[]) ?? [],
          departmentIds:
            existing?.departmentIds ?? (props?.assignedDepartmentIds as string[]) ?? [],
          isPublic: existing?.isPublic ?? ((props?.isPublic as boolean) ?? true),
        }
      }

      return next
    })
  }, [accessManagedNodes])

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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="default"
            size="sm"
            className="mx-2"
            title="Publish Workflow"
            aria-label="Publish Workflow"
          >
            Publish Workflow
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Access</DialogTitle>
            <DialogDescription>
              No form, approval, or sheet nodes available
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Add a form, approval, or sheet node to your workflow to manage its access settings.
          </p>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="default"
          size="sm"
          className="mx-2"
          title="Publish Workflow"
          aria-label="Publish Workflow"
        >
          Publish Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Node Access</DialogTitle>
          <DialogDescription>
            Configure who can access each form, approval, and sheet node in your workflow
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
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              handleSave()
              setOpen(false)
              toast.success('Workflow published')
            }}
          >
            Save and Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
