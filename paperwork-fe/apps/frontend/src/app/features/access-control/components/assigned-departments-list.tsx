import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { departments } from '../../../mock-data/departments'

interface AssignedDepartmentsListProps {
  departmentIds: string[]
  onRemove?: (departmentId: string) => void
}

const colorBorderMap: Record<string, string> = {
  blue: 'border-blue-300 text-blue-700',
  green: 'border-green-300 text-green-700',
  purple: 'border-purple-300 text-purple-700',
  orange: 'border-orange-300 text-orange-700',
  red: 'border-red-300 text-red-700',
  cyan: 'border-cyan-300 text-cyan-700',
  pink: 'border-pink-300 text-pink-700',
  emerald: 'border-emerald-300 text-emerald-700',
}

export function AssignedDepartmentsList({
  departmentIds,
  onRemove,
}: AssignedDepartmentsListProps) {
  if (departmentIds.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {departmentIds.map((deptId) => {
        const dept = departments.find((d: typeof departments[0]) => d.id === deptId)
        if (!dept) return null

        const colorClass = colorBorderMap[dept.color || 'blue']

        return (
          <Badge
            key={deptId}
            variant="outline"
            className={`gap-1 rounded-full ${colorClass}`}
          >
            {dept.name}
            {onRemove && (
              <button
                onClick={() => onRemove(deptId)}
                className="ml-1"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        )
      })}
    </div>
  )
}
