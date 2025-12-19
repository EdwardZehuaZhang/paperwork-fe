"use client"

import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { departments } from "@/mock-data/departments"

const getDepartmentColor = (color?: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
    emerald: "bg-emerald-500",
  }
  return colorMap[color || "blue"] || "bg-slate-500"
}

export function TeamSwitcher({
  onTeamChange,
  currentTeamId,
}: {
  onTeamChange?: (teamId: string) => void
  currentTeamId: string
}) {
  const { isMobile } = useSidebar()
  const activeTeam = departments.find((d) => d.id === currentTeamId) || departments[0]

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className={`${getDepartmentColor(activeTeam.color)} text-white flex aspect-square size-8 items-center justify-center rounded-lg text-xs font-semibold`}>
                {activeTeam.name.slice(0, 1)}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">Department</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Departments
            </DropdownMenuLabel>
            {departments.map((dept, index) => (
              <DropdownMenuItem
                key={dept.id}
                onClick={() => onTeamChange?.(dept.id)}
                className="gap-2 p-2"
              >
                <div className={`flex size-6 items-center justify-center rounded-md border ${getDepartmentColor(dept.color)}`}>
                  <span className="text-white text-xs font-semibold">{dept.name.slice(0, 1)}</span>
                </div>
                {dept.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add department</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
