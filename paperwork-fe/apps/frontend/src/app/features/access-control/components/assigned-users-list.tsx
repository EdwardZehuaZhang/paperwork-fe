import { X } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { users } from '../../../mock-data/users'

interface AssignedUsersListProps {
  userIds: string[]
  onRemove?: (userId: string) => void
}

export function AssignedUsersList({ userIds, onRemove }: AssignedUsersListProps) {
  if (userIds.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {userIds.map((userId) => {
        const user = users.find((u: typeof users[0]) => u.id === userId)
        if (!user) return null

        return (
          <div
            key={userId}
            className="flex items-center gap-2 rounded-md bg-muted px-2 py-1"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{user.displayName}</span>
            {onRemove && (
              <button
                onClick={() => onRemove(userId)}
                className="ml-1 rounded hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
