import type { User } from '../types/identity';

export const users: User[] = [
  {
    id: 'user-requester',
    email: 'requester@paperwork.local',
    displayName: 'Basic Requester',
    departmentId: 'dept-finance',
    roles: {
      canStartRequests: true,
      isApprover: false,
      canManageWorkflows: false,
      isOrgAdmin: false,
    },
  },
  {
    id: 'user-approver',
    email: 'approver@paperwork.local',
    displayName: 'Requester + Approver',
    departmentId: 'dept-finance',
    roles: {
      canStartRequests: true,
      isApprover: true,
      canManageWorkflows: false,
      isOrgAdmin: false,
    },
  },
  {
    id: 'user-owner',
    email: 'owner@paperwork.local',
    displayName: 'Workflow Owner',
    departmentId: 'dept-hr',
    roles: {
      canStartRequests: true,
      isApprover: false,
      canManageWorkflows: true,
      isOrgAdmin: false,
    },
  },
  {
    id: 'user-power',
    email: 'power@paperwork.local',
    displayName: 'Power User',
    departmentId: 'dept-legal',
    roles: {
      canStartRequests: true,
      isApprover: true,
      canManageWorkflows: true,
      isOrgAdmin: false,
    },
  },
  {
    id: 'user-admin',
    email: 'admin@paperwork.local',
    displayName: 'Organisation Admin',
    departmentId: 'dept-hr',
    roles: {
      canStartRequests: true,
      isApprover: true,
      canManageWorkflows: true,
      isOrgAdmin: true,
    },
  },
];
