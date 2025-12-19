import type { User } from '../types/identity';

export function canStartTemplate(user: User, discoverableByDepartments?: string[]) {
  if (!user.roles.canStartRequests) return false;
  if (!discoverableByDepartments || discoverableByDepartments.length === 0) return true;
  return discoverableByDepartments.includes(user.departmentId);
}
