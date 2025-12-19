import { Outlet } from 'react-router-dom';
import { SidebarNavigation } from './sidebar-navigation';

export function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-card">
        <SidebarNavigation />
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
