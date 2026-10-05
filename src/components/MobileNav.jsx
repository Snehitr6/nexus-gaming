import {
  Bell,
  Gamepad2,
  Home,
  Library,
  Trophy,
  Users,
} from "lucide-react";

const items = [
  {
    label: "Home",
    icon: Home,
    section: "overview",
  },
  {
    label: "Games",
    icon: Gamepad2,
    section: "discover",
  },
  {
    label: "Library",
    icon: Library,
    section: "library",
  },
  {
    label: "Awards",
    icon: Trophy,
    section: "achievements",
  },
  {
    label: "Friends",
    icon: Users,
    section: "friends",
  },
  {
    label: "Alerts",
    icon: Bell,
    section: "notifications",
  },
];

function MobileNav({
  activeSection,
  onSectionChange,
  notificationCount = 0,
}) {
  const handleClick = (section) => {
    onSectionChange?.(section);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className="mobile-nav"
      aria-label="Mobile navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;

        const active =
          activeSection === item.section ||
          (
            item.section === "overview" &&
            !activeSection
          );

        return (
          <button
            key={item.section}
            type="button"
            className={active ? "active" : ""}
            onClick={() => handleClick(item.section)}
            aria-label={item.label}
          >
            <Icon
              size={18}
              strokeWidth={active ? 2.4 : 1.8}
            />

            <span>{item.label}</span>

            {item.section === "notifications" &&
              notificationCount > 0 && (
                <span className="notification-badge">
                  {notificationCount > 9
                    ? "9+"
                    : notificationCount}
                </span>
              )}
          </button>
        );
      })}
    </nav>
  );
}

export default MobileNav;