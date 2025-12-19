import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

function getBreadcrumbTitle(pathname: string): string {
  const pathMap: Record<string, string> = {
    '/': 'Home',
    '/requests': 'Requests',
    '/approvals': 'Approvals',
    '/workflows': 'Workflows',
    '/organisation': 'Organisation',
  };

  // Check exact match first
  if (pathMap[pathname]) return pathMap[pathname];

  // Check if it's a detail page
  if (pathname.startsWith('/requests/')) return 'Request Detail';

  // Default fallback
  return 'Page';
}

export function AppLayout() {
  const location = useLocation();
  const breadcrumbTitle = getBreadcrumbTitle(location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
