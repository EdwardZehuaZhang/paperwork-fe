export type RoleFlags = {
  canStartRequests: boolean;
  isApprover: boolean;
  canManageWorkflows: boolean;
  isOrgAdmin: boolean;
};

export type User = {
  id: string;
  email: string;
  displayName: string;
  departmentId: string;
  initials: string;
  roles: RoleFlags;
};

export type Department = {
  id: string;
  name: string;
  color?: string;
};
