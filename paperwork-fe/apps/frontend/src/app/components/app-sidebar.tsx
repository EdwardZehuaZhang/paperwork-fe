"use client"

import * as React from "react"
import {
  type LucideIcon,
  Bot,
  ClipboardList,
  DollarSign,
  FileText,
  Settings2,
  Briefcase,
  Calendar,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/auth/auth-context"
import { RequestStorageAPI } from "@/features/request-storage/request-storage"

// Workflow type to icon mapping
const workflowTypeIconMap: Record<string, LucideIcon> = {
  "Expense Request": DollarSign,
  "Leave Request": Calendar,
  "Contract Review": FileText,
  "Document Approval": ClipboardList,
  "Budget Request": Briefcase,
  // Add more mappings as needed
}

const getIconForWorkflow = (templateName: string): LucideIcon => {
  return workflowTypeIconMap[templateName] || Briefcase
}

// Main navigation items
const navMainItems = [
  {
    title: "Requests",
    url: "/requests",
    icon: Briefcase,
  },
  {
    title: "Approvals",
    url: "/approvals",
    icon: ClipboardList,
  },
  {
    title: "Workflows",
    url: "/workflows",
    icon: Bot,
  },
  {
    title: "Organisation",
    url: "/organisation",
    icon: Settings2,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const [currentDepartmentId, setCurrentDepartmentId] = React.useState(user.departmentId)
  const [ongoingRequests, setOngoingRequests] = React.useState<
    Array<{
      name: string
      url: string
      icon: LucideIcon
    }>
  >([])

  // Load ongoing requests on mount
  React.useEffect(() => {
    const loadOngoingRequests = async () => {
      try {
        const allRequests = await RequestStorageAPI.getAll()
        const ongoing = allRequests.filter((r) => r.status === "in_progress")

        const projects = ongoing.map((request) => ({
          name: request.templateName,
          url: `/requests/${request.id}`,
          icon: getIconForWorkflow(request.templateName),
        }))

        setOngoingRequests(projects)
      } catch (error) {
        console.error("Failed to load ongoing requests:", error)
        setOngoingRequests([])
      }
    }

    loadOngoingRequests()
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          currentTeamId={currentDepartmentId}
          onTeamChange={setCurrentDepartmentId}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavProjects projects={ongoingRequests} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            displayName: user.displayName,
            email: user.email,
            initials: user.initials,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
