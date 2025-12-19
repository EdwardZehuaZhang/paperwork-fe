import { Badge } from '@/components/ui/badge'
import { AssignedUsersList } from './assigned-users-list'
import { AssignedDepartmentsList } from './assigned-departments-list'

interface AssignedItemsDisplayProps {
  userIds: string[]
  departmentIds: string[]
  isPublic: boolean
  onRemoveUser?: (userId: string) => void
  onRemoveDepartment?: (departmentId: string) => void
}

export function AssignedItemsDisplay({
  userIds,
  departmentIds,
  isPublic,
  onRemoveUser,
  onRemoveDepartment,
}: AssignedItemsDisplayProps) {
  if (isPublic && userIds.length === 0 && departmentIds.length === 0) {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="border-gray-300 text-gray-700 rounded-full">
          Everyone
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {isPublic && (
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-gray-300 text-gray-700 rounded-full">
            Everyone
          </Badge>
        </div>
      )}
      <AssignedUsersList userIds={userIds} onRemove={onRemoveUser} />
      <AssignedDepartmentsList
        departmentIds={departmentIds}
        onRemove={onRemoveDepartment}
      />
    </div>
  )
}
