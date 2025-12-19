import { NavLink } from 'react-router-dom';

function LinkItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'block rounded-md px-3 py-2 text-sm',
          isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
        ].join(' ')
      }
      end={to === '/'}
    >
      {label}
    </NavLink>
  );
}

export function SidebarNavigation() {
  return (
    <nav className="p-3">
      <div className="mb-2 px-3 py-2 text-xs font-medium text-muted-foreground">Paperwork</div>
      <div className="space-y-1">
        <LinkItem to="/" label="Home" />
        <LinkItem to="/requests" label="Requests" />
        <LinkItem to="/approvals" label="Approvals" />
        <LinkItem to="/workflows" label="Workflows" />
        <LinkItem to="/organisation" label="Organisation" />
      </div>
    </nav>
  );
}
