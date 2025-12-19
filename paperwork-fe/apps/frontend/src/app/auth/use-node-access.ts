import type { User } from '../types/identity';

export function canCompleteNode(
  user: User,
  node: { assignedUserIds?: string[]; assignedDepartmentIds?: string[] },
) {
  const assignedUserIds = node.assignedUserIds ?? [];
  const assignedDepartmentIds = node.assignedDepartmentIds ?? [];

  if (assignedUserIds.includes(user.id)) return true;
  if (assignedDepartmentIds.includes(user.departmentId)) return true;
  return false;
}
