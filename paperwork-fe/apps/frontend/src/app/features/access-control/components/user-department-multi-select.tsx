import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { users } from '../../../mock-data/users'
import { departments } from '../../../mock-data/departments'
import { cn } from '@/lib/utils'

interface UserDepartmentMultiSelectProps {
  selectedUserIds: string[]
  selectedDepartmentIds: string[]
  isPublic: boolean
  onSelectionChange: (userIds: string[], departmentIds: string[], isPublic: boolean) => void
}

export function UserDepartmentMultiSelect({
  selectedUserIds,
  selectedDepartmentIds,
  isPublic,
  onSelectionChange,
}: UserDepartmentMultiSelectProps) {
  const [open, setOpen] = useState(false)

  const toggleUser = (userId: string) => {
    const newUserIds = selectedUserIds.includes(userId)
      ? selectedUserIds.filter(id => id !== userId)
      : [...selectedUserIds, userId]
    onSelectionChange(newUserIds, selectedDepartmentIds, false)
  }

  const toggleDepartment = (deptId: string) => {
    const newDeptIds = selectedDepartmentIds.includes(deptId)
      ? selectedDepartmentIds.filter(id => id !== deptId)
      : [...selectedDepartmentIds, deptId]
    onSelectionChange(selectedUserIds, newDeptIds, false)
  }

  const togglePublic = () => {
    onSelectionChange(selectedUserIds, selectedDepartmentIds, !isPublic)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-12 justify-between"
        >
          <span className="flex-1 min-w-0 text-left truncate">
            Add users or departments...
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search users or departments..." />
          <CommandList className="max-h-80">
            <CommandEmpty>No user or department found.</CommandEmpty>

            {/* Everyone Option */}
            <CommandGroup heading="Access Level">
              <CommandItem
                value="everyone"
                onSelect={togglePublic}
                className="cursor-pointer"
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    isPublic ? 'opacity-100' : 'opacity-0'
                  )}
                />
                Everyone
              </CommandItem>
            </CommandGroup>

            {/* Users */}
            <CommandGroup heading="Users">
              {users.map((user: typeof users[0]) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={() => toggleUser(user.id)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedUserIds.includes(user.id) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {user.displayName}
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Departments */}
            <CommandGroup heading="Departments">
              {departments.map((dept: typeof departments[0]) => (
                <CommandItem
                  key={dept.id}
                  value={dept.id}
                  onSelect={() => toggleDepartment(dept.id)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedDepartmentIds.includes(dept.id) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {dept.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
