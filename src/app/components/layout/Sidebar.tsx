import { NavLink } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  FileText,
  FolderOpen,
  MessageSquare,
  UsersRound,
  BarChart3,
  Settings,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '../ui/utils';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Files', href: '/files', icon: FolderOpen },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Team', href: '/team', icon: UsersRound },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="flex h-full flex-col border-r border-border/40 bg-card/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">ClientPortal</h1>
            <p className="text-[10px] text-muted-foreground">Agency Dashboard</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-accent lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <Separator className="bg-border/40" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  'hover:bg-accent/80 hover:text-accent-foreground',
                  isActive
                    ? 'bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400 shadow-sm'
                    : 'text-muted-foreground'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isActive
                        ? 'text-violet-600 dark:text-violet-400'
                        : 'text-muted-foreground group-hover:text-accent-foreground'
                    )}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border/40 p-4">
        <div className="rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
              <span className="text-sm font-semibold text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@agency.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
