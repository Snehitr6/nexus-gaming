import {
  Bell,
  Gamepad2,
  Home,
  Library,
  Settings,
  Trophy,
  Users,
} from "lucide-react";

const mainNavigation = [
  {
    label: "Overview",
    icon: Home,
    path: "/dashboard",
  },
  {
    label: "Discover",
    icon: Gamepad2,
    path: "/dashboard",
  },
  {
    label: "My Library",
    icon: Library,
    path: "/dashboard",
  },
  {
    label: "Achievements",
    icon: Trophy,
    path: "/dashboard",
  },
  {
    label: "Friends",
    icon: Users,
    path: "/dashboard",
  },
];

const bottomNavigation = [
  {
    label: "Notifications",
    icon: Bell,
    path: "/dashboard",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/dashboard",
  },
];

export { mainNavigation, bottomNavigation };

export default mainNavigation;