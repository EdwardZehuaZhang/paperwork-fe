import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useStore from '@/store/store'
import { WorkflowBuilderNode } from 'apps/types/src/node-data'
import {
  UserDepartmentMultiSelect,
  AssignedItemsDisplay,
} from '@/features/access-control/components'

type Props = {
  node: WorkflowBuilderNode
}

export function NodeAccessProperties({ node }: Props) {
  const setNodeProperties = useStore((state) => state.setNodeProperties)

  const properties = node.data.properties as Record<string, unknown>
  const userIds = (properties?.assignedUserIds as string[]) || []
  const departmentIds = (properties?.assignedDepartmentIds as string[]) || []
  const isPublic = (properties?.isPublic as boolean) ?? true

  const handleSelectionChange = (
    newUserIds: string[],
    newDepartmentIds: string[],
    newIsPublic: boolean
  ) => {
    setNodeProperties(node.id, {
      ...properties,
      assignedUserIds: newUserIds,
      assignedDepartmentIds: newDepartmentIds,
      isPublic: newIsPublic,
    })
  }

  const handleRemoveUser = (userId: string) => {
    const newUserIds = userIds.filter((id: string) => id !== userId)
    handleSelectionChange(newUserIds, departmentIds, isPublic)
  }

  const handleRemoveDepartment = (departmentId: string) => {
    const newDepartmentIds = departmentIds.filter((id: string) => id !== departmentId)
    handleSelectionChange(userIds, newDepartmentIds, isPublic)
  }

  return (
    <Accordion type="single" collapsible defaultValue="access">
      <AccordionItem value="access" className="border-b-0">
        <AccordionTrigger>Access</AccordionTrigger>
        <AccordionContent className="pb-6">
          <div className="space-y-3">
            <UserDepartmentMultiSelect
              selectedUserIds={userIds}
              selectedDepartmentIds={departmentIds}
              isPublic={isPublic}
              onSelectionChange={handleSelectionChange}
            />

            <AssignedItemsDisplay
              userIds={userIds}
              departmentIds={departmentIds}
              isPublic={isPublic}
              onRemoveUser={handleRemoveUser}
              onRemoveDepartment={handleRemoveDepartment}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
