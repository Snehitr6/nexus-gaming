import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        darkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      title={
        darkMode
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className={`
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        transition-all
        duration-300

        ${
          darkMode
            ? "border-white/10 bg-white/[0.06] text-yellow-300 hover:bg-yellow-400/10"
            : "border-slate-200 bg-white text-violet-600 hover:bg-violet-50"
        }
      `}
    >
      {darkMode ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
}

export default ThemeToggle;