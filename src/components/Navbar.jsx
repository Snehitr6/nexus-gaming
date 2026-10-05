import {
  Gamepad2,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

function Navbar({
  onMenuClick,
  onSectionChange,
}) {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSection = (section) => {
    onSectionChange?.(section);
  };

  return (
    <header className="app-navbar">
      <div className="flex h-full w-full items-center justify-between px-3 sm:px-5 lg:px-8">

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="flex min-w-0 items-center gap-3">

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={19} />
          </button>

          {/* LOGO */}
          <button
            type="button"
            onClick={handleHome}
            className="flex shrink-0 items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20">
              <Gamepad2 size={20} />
            </span>

            <span className="hidden text-[18px] font-black tracking-[0.16em] text-slate-950 sm:block">
              NEXUS
            </span>
          </button>
        </div>

        {/* =================================================
            DESKTOP NAV
        ================================================= */}

        <nav className="hidden items-center gap-8 lg:flex">
          <button
            type="button"
            onClick={() =>
              handleSection("overview")
            }
            className="text-sm font-medium text-slate-500 hover:text-violet-600"
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() =>
              handleSection("discover")
            }
            className="text-sm font-medium text-slate-500 hover:text-violet-600"
          >
            Discover
          </button>

          <button
            type="button"
            onClick={() =>
              handleSection("library")
            }
            className="text-sm font-medium text-slate-500 hover:text-violet-600"
          >
            Library
          </button>

          <button
            type="button"
            onClick={() =>
              handleSection("friends")
            }
            className="text-sm font-medium text-slate-500 hover:text-violet-600"
          >
            Friends
          </button>
        </nav>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex shrink-0 items-center gap-2">

          {/* SEARCH */}
          <div className="relative">
            {searchOpen && (
              <input
                autoFocus
                type="search"
                placeholder="Search games..."
                className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-xl outline-none focus:border-violet-400"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setSearchOpen(false);
                  }
                }}
              />
            )}

            <button
              type="button"
              onClick={() =>
                setSearchOpen(
                  (current) => !current
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600"
              aria-label="Search"
            >
              {searchOpen ? (
                <X size={18} />
              ) : (
                <Search size={18} />
              )}
            </button>
          </div>

          {/* THEME */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <ThemeToggle />
          </div>

          {/* DESKTOP PROFILE */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() =>
                setProfileOpen(
                  (current) => !current
                )
              }
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2.5 hover:border-violet-300"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-black text-white">
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "P"}
              </span>

              <span className="max-w-[90px] truncate text-sm font-semibold text-slate-700">
                {user?.name || "Player"}
              </span>

              <UserRound
                size={16}
                className="text-slate-400"
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    handleSection("settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                >
                  <Settings size={16} />
                  Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <UserRound size={16} />
                  Logout
                </button>

              </div>
            )}
          </div>

          {/* MOBILE PROFILE */}
          <button
            type="button"
            onClick={() =>
              setProfileOpen(
                (current) => !current
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-violet-500/20 lg:hidden"
            aria-label="Profile"
          >
            {user?.name
              ?.charAt(0)
              ?.toUpperCase() || "P"}
          </button>

          {/* MOBILE PROFILE MENU */}
          {profileOpen && (
            <div className="absolute right-3 top-[62px] z-[1100] w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl lg:hidden">

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  handleSection("settings");
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 hover:bg-violet-50"
              >
                <Settings size={17} />
                Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <UserRound size={17} />
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;