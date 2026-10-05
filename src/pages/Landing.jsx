import { useEffect, useState } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Library,
  Play,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

import { games } from "../data/dashboardData";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Landing() {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();

  const [activeGame, setActiveGame] = useState(0);

  const featuredGames = [
    {
      title: "Cyber Horizon",
      genre: "Action RPG",
      description:
        "Explore a neon-powered future where every decision shapes the city.",
      image:
        "https://media.easy-peasy.ai/f04d72c6-824e-4346-852f-9c3628f1beda/b780fcc1-b15f-47f1-8433-e6da4119b0a0_thumb.webp",
      players: "12.4K",
      rating: "4.9",
    },
    {
      title: "Neon Racers",
      genre: "Racing",
      description:
        "Race through futuristic cities and dominate the neon streets.",
      image:
        "https://assets.production.jabali.ai/121a0da8-7383-4a2f-b717-30a636547e10/e222c42e-bca0-46c5-a6ed-e0289e6e23ec",
      players: "8.7K",
      rating: "4.7",
    },
    {
      title: "Shadow Realm",
      genre: "Adventure",
      description:
        "Enter a mysterious world filled with ancient secrets and powerful enemies.",
      image:
        "https://hooked-assets-bucket.s3.us-east-2.amazonaws.com/presets/cyberpunk-anime/1.webp",
      players: "6.3K",
      rating: "4.8",
    },
  ];

  const currentGame = featuredGames[activeGame];

  /* =========================================================
     AUTO SLIDER
  ========================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveGame(
        (current) => (current + 1) % featuredGames.length
      );
    }, 8000);

    return () => window.clearInterval(timer);
  }, []);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleEnter = () => {
    window.location.href = isAuthenticated
      ? "/dashboard"
      : "/login";
  };

  const handleLibrary = () => {
    window.location.href = isAuthenticated
      ? "/dashboard"
      : "/login";
  };

  const nextGame = () => {
    setActiveGame(
      (current) => (current + 1) % featuredGames.length
    );
  };

  const previousGame = () => {
    setActiveGame(
      (current) =>
        (current - 1 + featuredGames.length) %
        featuredGames.length
    );
  };

  /* =========================================================
     THEME CLASSES
  ========================================================= */

  const page = darkMode
    ? "bg-[#050507] text-white"
    : "bg-white text-slate-950";

  const navbar = darkMode
    ? "border-white/[0.08] bg-[#050507]/95"
    : "border-slate-200/80 bg-white/95";

  const navText = darkMode
    ? "text-slate-400 hover:text-white"
    : "text-slate-500 hover:text-violet-600";

  const mutedText = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  const card = darkMode
    ? "border-white/[0.08] bg-white/[0.035]"
    : "border-slate-200 bg-white shadow-sm";

  const softCard = darkMode
    ? "border-white/[0.07] bg-white/[0.025]"
    : "border-slate-200 bg-white shadow-sm";

  const secondaryButton = darkMode
    ? "border-white/10 bg-white/[0.04] text-slate-200 hover:border-violet-400/40 hover:bg-white/[0.07]"
    : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600";

  const sectionMuted = darkMode
    ? "border-white/[0.07] bg-[#08080d]"
    : "border-slate-100 bg-slate-50/60";

  return (
    <div
      className={`
        min-h-screen
        overflow-x-hidden
        transition-colors
        duration-500
        ${page}
      `}
    >
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`
          fixed
          left-0
          right-0
          top-0
          z-[100]
          border-b
          backdrop-blur-xl
          transition-colors
          duration-500
          ${navbar}
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[72px]
            max-w-[1500px]
            items-center
            justify-between
            px-5
            sm:px-8
            lg:px-12
          "
        >
          {/* LOGO */}

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-3"
          >
            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
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
                className="relative z-10 text-white"
              />
            </div>

            <div className="text-left">
              <div
                className={`
                  text-base
                  font-black
                  tracking-tight
                  ${darkMode ? "text-white" : "text-slate-950"}
                `}
              >
                NEXUS
              </div>

              <div
                className={`
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  ${darkMode ? "text-slate-500" : "text-slate-400"}
                `}
              >
                Gaming
              </div>
            </div>
          </button>

          {/* NAVIGATION */}

          <nav className="hidden items-center gap-8 md:flex">
            <button
              type="button"
              onClick={() => scrollToSection("games")}
              className={`text-xs font-bold transition ${navText}`}
            >
              Games
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("features")}
              className={`text-xs font-bold transition ${navText}`}
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("community")}
              className={`text-xs font-bold transition ${navText}`}
            >
              Community
            </button>
          </nav>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleLibrary}
              className={`
                hidden
                h-10
                items-center
                gap-2
                rounded-xl
                border
                px-4
                text-xs
                font-bold
                transition
                sm:flex
                ${secondaryButton}
              `}
            >
              <Library size={15} />
              My Library
            </button>

            <button
              type="button"
              onClick={handleEnter}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                via-fuchsia-500
                to-fuchsia-500
                px-4
                text-xs
                font-black
                text-white
                shadow-lg
                shadow-violet-500/20
                transition
                hover:-translate-y-0.5
                hover:shadow-violet-500/30
              "
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}

              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main>
        {/* ===================================================
            HERO
        =================================================== */}

        <section
          id="home"
          className={`
            relative
            flex
            min-h-screen
            items-center
            overflow-hidden
            px-5
            pb-16
            pt-[105px]
            transition-colors
            duration-500
            sm:px-8
            lg:px-12
            ${darkMode ? "bg-[#050507]" : "bg-white"}
          `}
        >
          {/* GRID */}

          <div
            className={`
              pointer-events-none
              absolute
              inset-0
              transition-opacity
              duration-500
              ${darkMode ? "opacity-100" : "opacity-[0.45]"}
            `}
            style={{
              backgroundImage: darkMode
                ? "linear-gradient(rgba(124,58,237,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.09) 1px, transparent 1px)"
                : "linear-gradient(rgba(124,58,237,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.055) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 90%)",
            }}
          />

          {/* PURPLE GLOW */}

          <div
            className={`
              pointer-events-none
              absolute
              -left-40
              top-20
              h-[500px]
              w-[500px]
              rounded-full
              blur-[130px]
              transition-colors
              duration-500
              ${
                darkMode
                  ? "bg-violet-950/40"
                  : "bg-violet-100"
              }
            `}
          />

          {/* CYAN GLOW */}

          <div
            className={`
              pointer-events-none
              absolute
              -right-40
              bottom-0
              h-[450px]
              w-[450px]
              rounded-full
              blur-[130px]
              transition-colors
              duration-500
              ${
                darkMode
                  ? "bg-cyan-950/30"
                  : "bg-cyan-100"
              }
            `}
          />

          <div className="relative mx-auto w-full max-w-[1500px]">
            <div
              className="
                grid
                items-center
                gap-12
                lg:grid-cols-[1.05fr_0.95fr]
                lg:gap-10
              "
            >
              {/* LEFT */}

              <div className="max-w-2xl">
                {/* BADGE */}

                <div
                  className={`
                    mb-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    px-4
                    py-2
                    shadow-sm
                    ${
                      darkMode
                        ? "border-violet-500/30 bg-violet-500/10"
                        : "border-violet-200 bg-violet-50"
                    }
                  `}
                >
                  <span
                    className="
                      h-2
                      w-2
                      animate-pulse
                      rounded-full
                      bg-violet-500
                    "
                  />

                  <span
                    className={`
                      text-[9px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      ${
                        darkMode
                          ? "text-violet-300"
                          : "text-violet-600"
                      }
                    `}
                  >
                    Gaming Command Center
                  </span>
                </div>

                {/* HEADING */}

                <h1
                  className={`
                    text-5xl
                    font-black
                    leading-[0.94]
                    tracking-[-0.055em]
                    sm:text-6xl
                    lg:text-7xl
                    ${
                      darkMode
                        ? "text-white"
                        : "text-slate-950"
                    }
                  `}
                >
                  Your games.
                  <br />

                  <span
                    className="
                      bg-gradient-to-r
                      from-violet-600
                      via-fuchsia-500
                      to-cyan-400
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Your universe.
                  </span>
                </h1>

                {/* DESCRIPTION */}

                <p
                  className={`
                    mt-6
                    max-w-xl
                    text-sm
                    leading-7
                    sm:text-base
                    ${mutedText}
                  `}
                >
                  NEXUS brings your games, achievements,
                  friends, progress, and gaming activity into
                  one futuristic command center.
                </p>

                {/* BUTTONS */}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleEnter}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-slate-950
                      px-5
                      py-3.5
                      text-xs
                      font-black
                      text-white
                      shadow-xl
                      shadow-slate-900/10
                      transition
                      hover:-translate-y-1
                      hover:bg-violet-600
                    "
                  >
                    {isAuthenticated
                      ? "Open Dashboard"
                      : "Enter NEXUS"}

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      scrollToSection("games")
                    }
                    className={`
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      border
                      px-5
                      py-3.5
                      text-xs
                      font-black
                      transition
                      hover:-translate-y-1
                      ${secondaryButton}
                    `}
                  >
                    <Gamepad2 size={14} />

                    Explore Games
                  </button>
                </div>

                {/* STATS */}

                <div
                  className="
                    mt-10
                    grid
                    max-w-lg
                    grid-cols-3
                    gap-3
                  "
                >
                  {[
                    ["27K+", "Games Played"],
                    ["1.2K+", "Active Players"],
                    ["84K+", "Achievements"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className={`
                        rounded-2xl
                        border
                        p-4
                        transition-colors
                        duration-500
                        ${softCard}
                      `}
                    >
                      <p
                        className={`
                          text-lg
                          font-black
                          sm:text-xl
                          ${
                            darkMode
                              ? "text-white"
                              : "text-slate-950"
                          }
                        `}
                      >
                        {value}
                      </p>

                      <p
                        className={`
                          mt-1
                          text-[8px]
                          font-black
                          uppercase
                          tracking-wider
                          ${
                            darkMode
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        `}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT GAME CARD */}

              <div className="relative mx-auto w-full max-w-[720px]">
                {/* OUTER GLOW */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -inset-7
                    rounded-[38px]
                    border
                    ${
                      darkMode
                        ? "border-violet-500/20"
                        : "border-violet-100"
                    }
                  `}
                />

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -inset-12
                    rounded-[52px]
                    border
                    ${
                      darkMode
                        ? "border-cyan-500/10"
                        : "border-cyan-100"
                    }
                  `}
                />

                {/* CARD */}

                <div
                  className={`
                    relative
                    overflow-hidden
                    rounded-[28px]
                    border
                    p-2
                    shadow-2xl
                    transition-colors
                    duration-500
                    ${
                      darkMode
                        ? "border-white/[0.08] bg-white/[0.03] shadow-violet-950/20"
                        : "border-slate-200 bg-white shadow-slate-300/40"
                    }
                  `}
                >
                  <div
                    className="
                      relative
                      aspect-[4/3.5]
                      overflow-hidden
                      rounded-[22px]
                    "
                  >
                    {/* IMAGE */}

                    <img
                      src={currentGame.image}
                      alt={currentGame.title}
                      className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        transition-all
                        duration-700
                      "
                    />

                    {/* IMAGE OVERLAY */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/20
                        to-transparent
                      "
                    />

                    {/* FEATURED */}

                    <div
                      className="
                        absolute
                        left-5
                        top-5
                        flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/20
                        bg-white/90
                        px-3
                        py-1.5
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.15em]
                        text-slate-800
                        shadow-lg
                        backdrop-blur-md
                      "
                    >
                      <SparklesIcon />

                      Featured Game
                    </div>

                    {/* ARROWS */}

                    <div
                      className="
                        absolute
                        right-5
                        top-5
                        flex
                        gap-2
                      "
                    >
                      <button
                        type="button"
                        onClick={previousGame}
                        aria-label="Previous game"
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/20
                          bg-black/30
                          text-white
                          backdrop-blur-md
                          transition
                          hover:bg-black/50
                        "
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={nextGame}
                        aria-label="Next game"
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/20
                          bg-black/30
                          text-white
                          backdrop-blur-md
                          transition
                          hover:bg-black/50
                        "
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* GAME INFO */}

                    <div
                      className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        p-5
                        sm:p-7
                      "
                    >
                      <div
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.2em]
                          text-cyan-300
                        "
                      >
                        {currentGame.genre}
                      </div>

                      <h2
                        className="
                          mt-2
                          text-3xl
                          font-black
                          tracking-tight
                          text-white
                          sm:text-4xl
                        "
                      >
                        {currentGame.title}
                      </h2>

                      <p
                        className="
                          mt-2
                          max-w-md
                          text-xs
                          leading-5
                          text-white/75
                        "
                      >
                        {currentGame.description}
                      </p>

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                          gap-4
                        "
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-[10px]
                              font-bold
                              text-white/80
                            "
                          >
                            <Users size={12} />

                            {currentGame.players}
                          </span>

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-[10px]
                              font-bold
                              text-white/80
                            "
                          >
                            <Star
                              size={12}
                              className="fill-yellow-400 text-yellow-400"
                            />

                            {currentGame.rating}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleEnter}
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-xl
                            bg-white
                            px-4
                            py-3
                            text-[10px]
                            font-black
                            text-slate-950
                            shadow-lg
                            transition
                            hover:-translate-y-0.5
                            hover:bg-cyan-300
                          "
                        >
                          Play Now

                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GAME SELECTOR */}

                <div
                  className={`
                    relative
                    mx-3
                    -mt-3
                    rounded-2xl
                    border
                    p-2
                    shadow-xl
                    transition-colors
                    duration-500
                    ${
                      darkMode
                        ? "border-white/[0.08] bg-[#0b0b10]"
                        : "border-slate-200 bg-white"
                    }
                  `}
                >
                  <div className="grid grid-cols-3 gap-1">
                    {featuredGames.map((game, index) => (
                      <button
                        key={game.title}
                        type="button"
                        onClick={() =>
                          setActiveGame(index)
                        }
                        className={`
                          flex
                          min-w-0
                          items-center
                          gap-2
                          rounded-xl
                          p-2
                          text-left
                          transition
                          ${
                            activeGame === index
                              ? darkMode
                                ? "bg-violet-500/15"
                                : "bg-violet-50"
                              : darkMode
                                ? "hover:bg-white/[0.05]"
                                : "hover:bg-slate-50"
                          }
                        `}
                      >
                        <div
                          className="
                            h-9
                            w-9
                            shrink-0
                            overflow-hidden
                            rounded-lg
                          "
                        >
                          <img
                            src={game.image}
                            alt={game.title}
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`
                              truncate
                              text-[9px]
                              font-black
                              ${
                                activeGame === index
                                  ? "text-violet-500"
                                  : darkMode
                                    ? "text-slate-200"
                                    : "text-slate-700"
                              }
                            `}
                          >
                            {game.title}
                          </p>

                          <p
                            className={`
                              truncate
                              text-[8px]
                              ${
                                darkMode
                                  ? "text-slate-500"
                                  : "text-slate-400"
                              }
                            `}
                          >
                            {game.genre}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ACHIEVEMENT */}

                <div
                  className={`
                    absolute
                    -bottom-6
                    -left-5
                    hidden
                    w-[190px]
                    rounded-2xl
                    border
                    p-4
                    shadow-xl
                    sm:block
                    ${
                      darkMode
                        ? "border-white/[0.08] bg-[#0b0b10]"
                        : "border-slate-200 bg-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-violet-50
                        text-violet-600
                      "
                    >
                      <Trophy size={18} />
                    </div>

                    <div>
                      <p
                        className={`
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-wider
                          ${
                            darkMode
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        `}
                      >
                        Achievement
                      </p>

                      <p
                        className={`
                          mt-0.5
                          text-xs
                          font-black
                          ${
                            darkMode
                              ? "text-white"
                              : "text-slate-900"
                          }
                        `}
                      >
                        Night Runner
                      </p>
                    </div>
                  </div>

                  <div
                    className={`
                      mt-3
                      h-1.5
                      overflow-hidden
                      rounded-full
                      ${
                        darkMode
                          ? "bg-white/10"
                          : "bg-slate-100"
                      }
                    `}
                  >
                    <div
                      className="
                        h-full
                        w-[84%]
                        rounded-full
                        bg-gradient-to-r
                        from-violet-500
                        to-cyan-400
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            POPULAR GAMES
        =================================================== */}

        <section
          id="games"
          className={`
            border-t
            px-5
            py-24
            transition-colors
            duration-500
            sm:px-8
            lg:px-12
            ${sectionMuted}
          `}
        >
          <div className="mx-auto max-w-[1500px]">
            <div
              className="
                mb-10
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.2em]
                    text-violet-600
                  "
                >
                  Explore
                </p>

                <h2
                  className={`
                    mt-2
                    text-3xl
                    font-black
                    tracking-tight
                    sm:text-4xl
                    ${
                      darkMode
                        ? "text-white"
                        : "text-slate-950"
                    }
                  `}
                >
                  Popular Games
                </h2>

                <p
                  className={`
                    mt-2
                    max-w-xl
                    text-sm
                    ${mutedText}
                  `}
                >
                  Discover games that are currently
                  dominating the NEXUS community.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLibrary}
                className={`
                  flex
                  w-fit
                  items-center
                  gap-2
                  text-xs
                  font-black
                  transition
                  ${
                    darkMode
                      ? "text-slate-400 hover:text-violet-400"
                      : "text-slate-500 hover:text-violet-600"
                  }
                `}
              >
                View Library

                <ArrowRight size={14} />
              </button>
            </div>

            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {games.slice(0, 6).map((game) => (
                <div
                  key={game.id}
                  className={`
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-violet-400/50
                    hover:shadow-xl
                    hover:shadow-violet-500/10
                    ${card}
                  `}
                >
                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-transparent
                        to-transparent
                      "
                    />

                    <div
                      className="
                        absolute
                        bottom-4
                        left-4
                        right-4
                      "
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-black text-white">
                            {game.title}
                          </h3>

                          <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/60">
                            {game.genre}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-[10px] font-black text-white">
                          <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={12}
                          />

                          {game.rating}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`
                          text-[9px]
                          font-bold
                          ${
                            darkMode
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        `}
                      >
                        {game.players} players
                      </span>

                      <span
                        className={`
                          text-[9px]
                          font-bold
                          ${
                            darkMode
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        `}
                      >
                        {game.platform}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleEnter}
                      className={`
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        py-2.5
                        text-[10px]
                        font-black
                        transition
                        ${
                          darkMode
                            ? "border-white/10 bg-white/[0.04] text-slate-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                        }
                      `}
                    >
                      <Play
                        size={12}
                        fill="currentColor"
                      />

                      View Game
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================
            FEATURES
        =================================================== */}

        <section
          id="features"
          className={`
            border-t
            px-5
            py-24
            transition-colors
            duration-500
            sm:px-8
            lg:px-12
            ${darkMode ? "border-white/[0.07] bg-[#050507]" : "border-slate-100 bg-white"}
          `}
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mx-auto max-w-2xl text-center">
              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.2em]
                  text-cyan-500
                "
              >
                Built for Players
              </p>

              <h2
                className={`
                  mt-2
                  text-3xl
                  font-black
                  sm:text-4xl
                  ${
                    darkMode
                      ? "text-white"
                      : "text-slate-950"
                  }
                `}
              >
                Everything in one command center.
              </h2>

              <p
                className={`
                  mt-3
                  text-sm
                  leading-6
                  ${mutedText}
                `}
              >
                NEXUS gives you the tools you need to manage
                your gaming life without the clutter.
              </p>
            </div>

            <div
              className="
                mt-12
                grid
                gap-5
                md:grid-cols-2
                lg:grid-cols-4
              "
            >
              {[
                {
                  icon: Gamepad2,
                  title: "Game Library",
                  text: "Keep your entire collection organized and ready to play.",
                },
                {
                  icon: Trophy,
                  title: "Achievements",
                  text: "Track milestones and chase your next achievement.",
                },
                {
                  icon: Users,
                  title: "Gaming Friends",
                  text: "See what your friends are playing and join sessions.",
                },
                {
                  icon: Zap,
                  title: "Live Progress",
                  text: "Track XP, levels, play time, and gaming performance.",
                },
              ].map(
                ({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className={`
                      group
                      rounded-2xl
                      border
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-violet-400/50
                      hover:shadow-xl
                      hover:shadow-violet-500/10
                      ${card}
                    `}
                  >
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        ${
                          darkMode
                            ? "bg-violet-500/10 text-violet-400"
                            : "bg-violet-50 text-violet-600"
                        }
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    <h3
                      className={`
                        mt-5
                        font-black
                        ${
                          darkMode
                            ? "text-white"
                            : "text-slate-950"
                        }
                      `}
                    >
                      {title}
                    </h3>

                    <p
                      className={`
                        mt-2
                        text-xs
                        leading-5
                        ${mutedText}
                      `}
                    >
                      {text}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ===================================================
            COMMUNITY
        =================================================== */}

        <section
          id="community"
          className={`
            border-t
            px-5
            py-24
            transition-colors
            duration-500
            sm:px-8
            lg:px-12
            ${
              darkMode
                ? "border-white/[0.07] bg-[#08080d]"
                : "border-slate-100 bg-slate-50"
            }
          `}
        >
          <div className="mx-auto max-w-[1200px]">
            <div
              className={`
                relative
                overflow-hidden
                rounded-[28px]
                border
                p-7
                shadow-xl
                transition-colors
                duration-500
                sm:p-10
                lg:p-14
                ${
                  darkMode
                    ? "border-violet-500/20 bg-[#0b0b12]"
                    : "border-violet-100 bg-white shadow-violet-500/5"
                }
              `}
            >
              {/* GLOWS */}

              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-72
                  w-72
                  rounded-full
                  blur-[100px]
                  ${
                    darkMode
                      ? "bg-violet-950/40"
                      : "bg-violet-100"
                  }
                `}
              />

              <div
                className={`
                  pointer-events-none
                  absolute
                  -bottom-20
                  left-1/3
                  h-60
                  w-60
                  rounded-full
                  blur-[100px]
                  ${
                    darkMode
                      ? "bg-cyan-950/30"
                      : "bg-cyan-100"
                  }
                `}
              />

              <div
                className="
                  relative
                  grid
                  items-center
                  gap-10
                  lg:grid-cols-[1fr_auto]
                "
              >
                {/* LEFT */}

                <div>
                  <div className="flex items-center gap-2">
                    <Users
                      size={14}
                      className="text-fuchsia-500"
                    />

                    <span
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.2em]
                        text-fuchsia-500
                      "
                    >
                      Join the Community
                    </span>
                  </div>

                  <h2
                    className={`
                      mt-5
                      max-w-2xl
                      text-4xl
                      font-black
                      leading-tight
                      tracking-tight
                      sm:text-5xl
                      ${
                        darkMode
                          ? "text-white"
                          : "text-slate-950"
                      }
                    `}
                  >
                    Your next gaming session
                    is already waiting.
                  </h2>

                  <p
                    className={`
                      mt-5
                      max-w-xl
                      text-sm
                      leading-7
                      ${mutedText}
                    `}
                  >
                    Build your library, connect with your
                    friends, chase achievements, and make
                    every session count.
                  </p>

                  <button
                    type="button"
                    onClick={handleEnter}
                    className="
                      group
                      mt-7
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-slate-950
                      px-5
                      py-3.5
                      text-xs
                      font-black
                      text-white
                      transition
                      hover:-translate-y-0.5
                      hover:bg-violet-600
                    "
                  >
                    Enter NEXUS

                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {/* STATS */}

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-3
                    lg:w-[250px]
                  "
                >
                  {[
                    ["27K+", "PLAYERS"],
                    ["1.2K+", "GAMES"],
                    ["84K+", "ACHIEVEMENTS"],
                    ["4.9", "RATING"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className={`
                        flex
                        aspect-square
                        flex-col
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        transition-colors
                        duration-500
                        ${
                          darkMode
                            ? "border-white/[0.08] bg-white/[0.03]"
                            : "border-slate-200 bg-white shadow-sm"
                        }
                      `}
                    >
                      <p
                        className={`
                          text-xl
                          font-black
                          ${
                            darkMode
                              ? "text-white"
                              : "text-slate-950"
                          }
                        `}
                      >
                        {value}
                      </p>

                      <p
                        className={`
                          mt-1
                          text-[7px]
                          font-black
                          tracking-wider
                          ${
                            darkMode
                              ? "text-slate-500"
                              : "text-slate-400"
                          }
                        `}
                      >
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer
        onSectionChange={(section) => {
          if (section === "overview") {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            return;
          }

          if (section === "discover") {
            scrollToSection("games");
            return;
          }

          if (section === "library") {
            handleLibrary();
            return;
          }

          if (section === "achievements") {
            scrollToSection("features");
            return;
          }

          if (section === "friends") {
            scrollToSection("community");
            return;
          }

          if (section === "settings") {
            handleEnter();
            return;
          }

          scrollToSection("community");
        }}
      />
    </div>
  );
}

/* =========================================================
   FEATURED ICON
========================================================= */

function SparklesIcon() {
  return (
    <span
      className="
        flex
        h-4
        w-4
        items-center
        justify-center
        rounded-full
        bg-violet-100
        text-violet-600
      "
    >
      <Zap size={9} />
    </span>
  );
}

export default Landing;