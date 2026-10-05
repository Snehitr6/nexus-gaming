import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Home,
  Library,
  LogOut,
  Settings,
  Trophy,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: Home,
  },
  {
    id: "discover",
    label: "Discover",
    icon: Gamepad2,
  },
  {
    id: "library",
    label: "My Library",
    icon: Library,
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
  },
  {
    id: "friends",
    label: "Friends",
    icon: Users,
  },
];

const accountItems = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

function Sidebar({
  activeSection = "overview",
  onSectionChange,
  isOpen = false,
  onClose,
  collapsed = false,
  onCollapsedChange,
  notificationCount = 2,
}) {
  const { user, logout } = useAuth();

  const handleNavigation = (section) => {
    if (typeof onSectionChange === "function") {
      onSectionChange(section);
    }

    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();

    if (typeof onClose === "function") {
      onClose();
    }
  };

  const getInitials = () => {
    if (!user?.name) return "NX";

    return user.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const renderNavigationButton = (item) => {
    const Icon = item.icon;
    const isActive = activeSection === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavigation(item.id)}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        title={collapsed ? item.label : undefined}
        className={`group relative flex w-full items-center rounded-xl transition-all duration-300 ${
          collapsed
            ? "justify-center px-3 py-3"
            : "gap-4 px-3 py-3"
        } ${
          isActive
            ? "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
        }`}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-500 to-fuchsia-500 shadow-[0_0_12px_rgba(139,92,246,0.65)]" />
        )}

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400"
              : "text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-700 dark:text-slate-500 dark:group-hover:bg-slate-800 dark:group-hover:text-slate-200"
          }`}
        >
          <Icon
            size={19}
            strokeWidth={isActive ? 2.4 : 2}
          />
        </span>

        {!collapsed && (
          <span className="flex-1 text-left text-sm font-semibold">
            {item.label}
          </span>
        )}

        {!collapsed && item.id === "notifications" && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1.5 text-[10px] font-black text-white shadow-sm shadow-violet-500/30">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950 ${
          collapsed ? "w-[88px]" : "w-[260px]"
        } ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-[76px] shrink-0 items-center border-b border-slate-100 dark:border-slate-800 ${
            collapsed
              ? "justify-center px-4"
              : "justify-between px-5"
          }`}
        >
          <button
            type="button"
            onClick={() => handleNavigation("overview")}
            className="group flex items-center gap-3"
            title="NEXUS Overview"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20 transition-all duration-300 group-hover:scale-105">
              <Gamepad2 size={21} />
            </span>

            {!collapsed && (
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                NEXUS
              </span>
            )}
          </button>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          {/* Main */}
          <div>
            {!collapsed && (
              <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
                Gaming Hub
              </p>
            )}

            <nav className="space-y-1.5">
              {navigationItems.map(renderNavigationButton)}
            </nav>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-slate-100 dark:bg-slate-800" />

          {/* Account */}
          <div>
            {!collapsed && (
              <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
                Account
              </p>
            )}

            <nav className="space-y-1.5">
              {accountItems.map(renderNavigationButton)}
            </nav>
          </div>
        </div>

        {/* Bottom Profile */}
        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <div
            className={`rounded-xl bg-slate-50 p-2.5 dark:bg-slate-900 ${
              collapsed ? "flex justify-center" : ""
            }`}
          >
            <div
              className={`flex items-center ${
                collapsed ? "justify-center" : "gap-3"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-black text-white">
                {getInitials()}
              </div>

              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                      {user?.name || "NEXUS Player"}
                    </p>

                    <p className="truncate text-[11px] text-slate-400 dark:text-slate-500">
                      Level {user?.level || 42}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    title="Logout"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              )}
            </div>

            {collapsed && (
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
                className="mt-2 flex h-8 w-full items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Collapse Button - Desktop */}
        <div className="hidden border-t border-slate-100 p-3 dark:border-slate-800 lg:block">
          <button
            type="button"
            onClick={() => {
              if (typeof onCollapsedChange === "function") {
                onCollapsedChange(!collapsed);
              }
            }}
            className={`flex w-full items-center rounded-xl py-2.5 text-slate-400 transition-all duration-200 hover:bg-slate-50 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200 ${
              collapsed ? "justify-center" : "justify-center gap-2"
            }`}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={17} />
            ) : (
              <>
                <ChevronLeft size={17} />
                <span className="text-xs font-bold">
                  Collapse
                </span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar Spacer */}
      <div
        className={`hidden shrink-0 transition-all duration-300 lg:block ${
          collapsed ? "w-[88px]" : "w-[260px]"
        }`}
      />
    </>
  );
}

export default Sidebar;