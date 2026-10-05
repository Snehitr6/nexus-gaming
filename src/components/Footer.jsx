import {
  ArrowUp,
  Gamepad2,
  Github,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

function Footer({ onSectionChange }) {
  const { darkMode } = useTheme();

  const goTo = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`
        border-t
        transition-colors
        duration-500
        ${
          darkMode
            ? "border-white/[0.07] bg-[#050507] text-white"
            : "border-slate-200 bg-white text-slate-950"
        }
      `}
    >
      {/* MAIN FOOTER */}

      <div
        className="
          mx-auto
          grid
          max-w-[1500px]
          gap-12
          px-5
          py-14
          sm:px-8
          lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]
          lg:px-12
        "
      >
        {/* BRAND */}

        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-600
                via-fuchsia-500
                to-cyan-400
                shadow-lg
                shadow-violet-500/20
              "
            >
              <Gamepad2
                size={20}
                className="text-white"
              />
            </div>

            <div>
              <h3
                className={`
                  text-base
                  font-black
                  tracking-[0.12em]
                  ${
                    darkMode
                      ? "text-white"
                      : "text-slate-950"
                  }
                `}
              >
                NEXUS
              </h3>

              <p
                className={`
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  ${
                    darkMode
                      ? "text-slate-500"
                      : "text-slate-400"
                  }
                `}
              >
                Gaming Command Center
              </p>
            </div>
          </div>

          <p
            className={`
              mt-5
              max-w-sm
              text-xs
              leading-6
              ${
                darkMode
                  ? "text-slate-500"
                  : "text-slate-500"
              }
            `}
          >
            Your futuristic gaming command center for
            games, achievements, friends, progress, and
            everything in between.
          </p>

          {/* SOCIAL */}

          <div className="mt-6 flex items-center gap-2">
            {[
              {
                icon: Github,
                label: "GitHub",
              },
              {
                icon: Twitter,
                label: "Twitter",
              },
              {
                icon: Instagram,
                label: "Instagram",
              },
              {
                icon: Youtube,
                label: "YouTube",
              },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className={`
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  border
                  transition
                  ${
                    darkMode
                      ? "border-white/10 bg-white/[0.03] text-slate-500 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
                      : "border-slate-200 bg-white text-slate-500 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                  }
                `}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* PLATFORM */}

        <div>
          <h4
            className={`
              text-[10px]
              font-black
              uppercase
              tracking-[0.14em]
              ${
                darkMode
                  ? "text-white"
                  : "text-slate-950"
              }
            `}
          >
            Platform
          </h4>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => goTo("discover")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              Discover Games
            </button>

            <button
              type="button"
              onClick={() => goTo("library")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              My Library
            </button>

            <button
              type="button"
              onClick={() => goTo("achievements")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              Achievements
            </button>

            <button
              type="button"
              onClick={() => goTo("friends")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              Friends
            </button>
          </div>
        </div>

        {/* COMMUNITY */}

        <div>
          <h4
            className={`
              text-[10px]
              font-black
              uppercase
              tracking-[0.14em]
              ${
                darkMode
                  ? "text-white"
                  : "text-slate-950"
              }
            `}
          >
            Community
          </h4>

          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => goTo("friends")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              Gaming Friends
            </button>

            <button
              type="button"
              onClick={() => goTo("notifications")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              Notifications
            </button>

            <button
              type="button"
              onClick={() => goTo("settings")}
              className={`
                block
                text-xs
                transition
                ${
                  darkMode
                    ? "text-slate-500 hover:text-white"
                    : "text-slate-500 hover:text-violet-600"
                }
              `}
            >
              Settings
            </button>
          </div>
        </div>

        {/* STATUS */}

        <div>
          <h4
            className={`
              text-[10px]
              font-black
              uppercase
              tracking-[0.14em]
              ${
                darkMode
                  ? "text-white"
                  : "text-slate-950"
              }
            `}
          >
            NEXUS Status
          </h4>

          <div
            className={`
              mt-5
              rounded-2xl
              border
              p-4
              transition-colors
              duration-500
              ${
                darkMode
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-slate-200 bg-white shadow-sm"
              }
            `}
          >
            <div className="flex items-center gap-2">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.8)]
                "
              />

              <span
                className={`
                  text-[10px]
                  font-black
                  ${
                    darkMode
                      ? "text-white"
                      : "text-slate-800"
                  }
                `}
              >
                All systems operational
              </span>
            </div>

            <p
              className={`
                mt-3
                text-[9px]
                leading-5
                ${
                  darkMode
                    ? "text-slate-500"
                    : "text-slate-400"
                }
              `}
            >
              Games, profiles, achievements and community
              services are online.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div
        className={`
          border-t
          ${
            darkMode
              ? "border-white/[0.07]"
              : "border-slate-200"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            gap-4
            px-5
            py-5
            sm:px-8
            lg:px-12
          "
        >
          <p
            className={`
              text-[9px]
              ${
                darkMode
                  ? "text-slate-600"
                  : "text-slate-400"
              }
            `}
          >
            © 2026 NEXUS Gaming Command Center
          </p>

          <button
            type="button"
            onClick={backToTop}
            className={`
              flex
              items-center
              gap-2
              text-[10px]
              font-bold
              transition
              ${
                darkMode
                  ? "text-slate-500 hover:text-white"
                  : "text-slate-500 hover:text-violet-600"
              }
            `}
          >
            Back to top

            <span
              className={`
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                border
                ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-slate-200 bg-white"
                }
              `}
            >
              <ArrowUp size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;