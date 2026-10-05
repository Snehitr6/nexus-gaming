import { useMemo, useState } from "react";

import {
  Bell,
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  LogOut,
  Search,
  Settings,
  Star,
  Trophy,
  UserPlus,
  X,
  Zap,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Footer from "../components/Footer";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import ActivityTable from "../components/ActivityTable";
import GamePlayer from "../components/GamePlayer";

import {
  games,
  stats,
  chartData,
  activities,
} from "../data/dashboardData";

import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout, updateUser } = useAuth();

  const [activeSection, setActiveSection] =
    useState("overview");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [playingGame, setPlayingGame] =
    useState(null);

  const [selectedGame, setSelectedGame] =
    useState(null);

  const [selectedActivity, setSelectedActivity] =
    useState(null);

  const [toast, setToast] = useState("");

  const [notificationCount] = useState(2);

  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    autoPlay: true,
  });

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  /* =====================================================
     SECTION NAVIGATION
  ===================================================== */

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     PLAY GAME
  ===================================================== */

  const handlePlayGame = (game) => {
    if (!game) return;

    setSelectedGame(null);
    setPlayingGame(game);
  };

  const handleCloseGame = () => {
    setPlayingGame(null);
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredGames = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    if (!query) {
      return games;
    }

    return games.filter((game) => {
      return (
        String(game.title || "")
          .toLowerCase()
          .includes(query) ||
        String(game.genre || "")
          .toLowerCase()
          .includes(query) ||
        String(game.platform || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [searchQuery]);

  /* =====================================================
     FRIEND ACTION
  ===================================================== */

  const handleFriendAction = (friend) => {
    showToast(
      `${friend?.name || "Friend"} added successfully`
    );
  };

  /* =====================================================
     SETTINGS
  ===================================================== */

  const handleSettingChange = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));

    showToast("Settings updated");
  };

  /* =====================================================
     GAME CARD
  ===================================================== */

  const GameCard = ({ game }) => {
    const progress = Number(
      game.progress ?? 0
    );

    return (
      <article
        className="
          group
          overflow-hidden

          rounded-2xl

          border
          border-slate-200

          bg-white

          shadow-sm

          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-violet-300
          hover:shadow-xl
          hover:shadow-violet-500/10

          dark:border-white/10
          dark:bg-[#0c0c11]
          dark:hover:border-violet-500/40
        "
      >
        {/* GAME IMAGE */}

        <div
          className="
            relative
            mx-3
            mt-3
            overflow-hidden
            rounded-xl

            bg-slate-100

            dark:bg-white/5
          "
        >
          <div className="aspect-[16/10]">
            <img
              src={game.image}
              alt={game.title}
              className="
                h-full
                w-full
                object-cover

                transition-transform
                duration-500

                group-hover:scale-105
              "
            />
          </div>

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/75
              via-black/5
              to-transparent
            "
          />

          {/* STATUS */}

          <div
            className="
              absolute
              left-3
              top-3

              rounded-full

              bg-emerald-500/90

              px-2.5
              py-1

              text-[8px]
              font-black
              uppercase
              tracking-wider

              text-white
            "
          >
            {game.status || "PLAYING"}
          </div>

          {/* DETAILS */}

          <button
            type="button"
            onClick={() => setSelectedGame(game)}
            aria-label={`View ${game.title}`}
            className="
              absolute
              right-3
              top-3

              flex
              h-8
              w-8

              items-center
              justify-center

              rounded-lg

              border
              border-white/20

              bg-black/40

              text-white

              backdrop-blur-md

              transition

              hover:bg-black/70
            "
          >
            <ChevronRight size={14} />
          </button>

          {/* IMAGE TITLE */}

          <div
            className="
              absolute
              bottom-3
              left-3
              right-3
            "
          >
            <h3
              className="
                truncate

                text-base
                font-black

                text-white
              "
            >
              {game.title}
            </h3>

            <p
              className="
                mt-0.5

                text-[9px]
                font-medium

                text-white/70
              "
            >
              {game.genre}
            </p>
          </div>
        </div>

        {/* GAME INFO */}

        <div className="p-3.5">
          {/* PROGRESS */}

          <div className="flex items-center justify-between">
            <span
              className="
                text-[8px]
                font-black
                uppercase
                tracking-wider

                text-slate-400

                dark:text-white/35
              "
            >
              Progress
            </span>

            <span
              className="
                text-[10px]
                font-black

                text-violet-600

                dark:text-violet-400
              "
            >
              {progress}%
            </span>
          </div>

          {/* PROGRESS BAR */}

          <div
            className="
              mt-2
              h-1.5

              overflow-hidden

              rounded-full

              bg-slate-100

              dark:bg-white/10
            "
          >
            <div
              className="
                h-full

                rounded-full

                bg-gradient-to-r
                from-violet-500
                via-fuchsia-500
                to-cyan-400

                transition-all
                duration-700
              "
              style={{
                width: `${Math.min(
                  100,
                  Math.max(0, progress)
                )}%`,
              }}
            />
          </div>

          {/* RATING */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
            "
          >
            <div className="flex items-center gap-1.5">
              <Star
                size={12}
                className="
                  fill-yellow-400
                  text-yellow-400
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold

                  text-slate-700

                  dark:text-white/80
                "
              >
                {game.rating || "4.9"}
              </span>
            </div>

            <span
              className="
                text-[9px]
                font-medium

                text-slate-400

                dark:text-white/35
              "
            >
              {game.players || "12.4K"} playing
            </span>
          </div>

          {/* =================================================
              PLAY NOW
          ================================================= */}

          <button
            type="button"
            onClick={() => handlePlayGame(game)}
            className="
              mt-4

              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-gradient-to-r
              from-violet-600
              via-fuchsia-500
              to-cyan-400

              px-4
              py-3

              text-[10px]
              font-black
              uppercase
              tracking-wide

              text-white

              shadow-lg
              shadow-violet-500/20

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:shadow-xl

              active:scale-[0.98]
            "
          >
            <Gamepad2 size={14} />

            Play Now

            <ChevronRight size={13} />
          </button>
        </div>
      </article>
    );
  };

  /* =====================================================
     OVERVIEW
  ===================================================== */

  const OverviewSection = () => {
    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32

          pt-5

          dark:bg-[#050507]

          sm:px-6
          sm:pb-28

          lg:px-8
          lg:pb-10
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >
          {/* HEADER */}

          <div>
            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.2em]

                text-violet-500
              "
            >
              Command Center
            </p>

            <h1
              className="
                mt-2

                text-2xl
                font-black
                tracking-tight

                text-slate-950

                dark:text-white

                sm:text-3xl
              "
            >
              Welcome back,{" "}
              {user?.name?.split(" ")[0] ||
                "Player"}
            </h1>

            <p
              className="
                mt-2

                text-xs

                text-slate-500

                dark:text-white/40
              "
            >
              Continue your gaming journey.
            </p>
          </div>

          {/* STATS */}

          <div
            className="
              mt-6

              grid
              grid-cols-2
              gap-3

              lg:grid-cols-4
            "
          >
            {stats.map((item) => (
              <StatCard
                key={item.title}
                {...item}
              />
            ))}
          </div>

          {/* CHART + ACTIVITY */}

          <div
            className="
              mt-5

              grid
              gap-5

              lg:grid-cols-[1.5fr_1fr]
            "
          >
            <RevenueChart
              data={chartData}
            />

            <div
              className="
                rounded-2xl

                border
                border-slate-200

                bg-white

                p-5

                dark:border-white/10
                dark:bg-[#0c0c11]
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-[9px]
                      font-black
                      uppercase
                      tracking-wider

                      text-violet-500
                    "
                  >
                    Recent Activity
                  </p>

                  <h2
                    className="
                      mt-1

                      text-lg
                      font-black

                      text-slate-950

                      dark:text-white
                    "
                  >
                    Your Activity
                  </h2>
                </div>

                <Zap
                  size={18}
                  className="text-violet-500"
                />
              </div>

              <div className="mt-4">
                <ActivityTable
                  items={
                    activities?.slice(
                      0,
                      5
                    ) || []
                  }
                  onActivityClick={
                    setSelectedActivity
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* =====================================================
     DISCOVER
  ===================================================== */

  const DiscoverSection = () => {
    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32

          pt-5

          dark:bg-[#050507]

          sm:px-6
          sm:pb-28

          lg:px-8
          lg:pb-10
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
          "
        >
          <p
            className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.2em]

              text-violet-500
            "
          >
            Discover
          </p>

          <h1
            className="
              mt-2

              text-2xl
              font-black

              text-slate-950

              dark:text-white

              sm:text-3xl
            "
          >
            Find Your Next Game
          </h1>

          {/* SEARCH */}

          <div
            className="
              relative
              mt-4
              max-w-xl
            "
          >
            <Search
              size={16}
              className="
                pointer-events-none

                absolute
                left-3
                top-1/2

                -translate-y-1/2

                text-slate-400

                dark:text-white/30
              "
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(
                  event.target.value
                )
              }
              placeholder="Search games..."
              className="
                h-11
                w-full

                rounded-xl

                border
                border-slate-200

                bg-white

                pl-10
                pr-4

                text-xs

                text-slate-900

                outline-none

                placeholder:text-slate-400

                focus:border-violet-400
                focus:ring-4
                focus:ring-violet-500/10

                dark:border-white/10
                dark:bg-[#0c0c11]
                dark:text-white
                dark:placeholder:text-white/30
              "
            />
          </div>

          {/* GAMES */}

          <div
            className="
              mt-5

              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2

              lg:grid-cols-3

              xl:grid-cols-4
            "
          >
            {filteredGames.map((game) => (
              <GameCard
                key={
                  game.id ||
                  game.title
                }
                game={game}
              />
            ))}
          </div>

          {/* EMPTY */}

          {filteredGames.length === 0 && (
            <div
              className="
                mt-8

                rounded-2xl

                border
                border-dashed
                border-slate-300

                bg-white

                p-10

                text-center

                dark:border-white/10
                dark:bg-[#0c0c11]
              "
            >
              <Gamepad2
                size={30}
                className="
                  mx-auto
                  text-violet-500
                "
              />

              <h3
                className="
                  mt-4

                  font-black

                  text-slate-950

                  dark:text-white
                "
              >
                No games found
              </h3>

              <p
                className="
                  mt-1

                  text-xs

                  text-slate-500

                  dark:text-white/40
                "
              >
                Try another game name
                or genre.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  };

  /* =====================================================
     LIBRARY
  ===================================================== */

  const LibrarySection = () => {
    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32

          pt-5

          dark:bg-[#050507]

          sm:px-6
          lg:px-8
          lg:pb-10
        "
      >
        <div className="mx-auto max-w-[1500px]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
            Library
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            My Games
          </h1>

          <div
            className="
              mt-5

              grid
              grid-cols-1
              gap-4

              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {games.map((game) => (
              <GameCard
                key={
                  game.id ||
                  game.title
                }
                game={game}
              />
            ))}
          </div>
        </div>
      </section>
    );
  };

  /* =====================================================
     ACHIEVEMENTS
  ===================================================== */

  const AchievementsSection = () => {
    const achievementList = [
      [
        "First Victory",
        "Win your first game",
        "Completed",
      ],
      [
        "Rising Star",
        "Reach level 25",
        "Completed",
      ],
      [
        "Elite Player",
        "Reach level 50",
        "In Progress",
      ],
      [
        "Explorer",
        "Play 10 different games",
        "Completed",
      ],
      [
        "Night Owl",
        "Play after midnight",
        "Completed",
      ],
      [
        "Champion",
        "Earn 100 achievements",
        "In Progress",
      ],
    ];

    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32
          pt-5

          dark:bg-[#050507]

          sm:px-6
          lg:px-8
          lg:pb-10
        "
      >
        <div className="mx-auto max-w-[1200px]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
            Achievements
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Your Achievements
          </h1>

          <div
            className="
              mt-6

              grid
              gap-4

              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {achievementList.map(
              ([title, text, status]) => (
                <div
                  key={title}
                  className="
                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    p-5

                    dark:border-white/10
                    dark:bg-[#0c0c11]
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-11
                        w-11

                        items-center
                        justify-center

                        rounded-xl

                        bg-violet-50

                        text-violet-600

                        dark:bg-violet-500/10
                        dark:text-violet-400
                      "
                    >
                      <Trophy size={20} />
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-slate-950 dark:text-white">
                        {title}
                      </h3>

                      <p className="mt-1 text-[10px] text-slate-500 dark:text-white/40">
                        {text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <CheckCircle2
                      size={13}
                      className={
                        status ===
                        "Completed"
                          ? "text-emerald-500"
                          : "text-slate-400"
                      }
                    />

                    <span className="text-[9px] font-bold text-slate-500 dark:text-white/40">
                      {status}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  };

  /* =====================================================
     FRIENDS
  ===================================================== */

  const FriendsSection = () => {
    const friends = [
      {
        name: "Jordan Lee",
        game: "Cyber Horizon",
      },
      {
        name: "Maya Chen",
        game: "Neon Racers",
      },
      {
        name: "Ryan Cole",
        game: "Shadow Realm",
      },
      {
        name: "Ava Smith",
        game: "Dark Protocol",
      },
    ];

    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32
          pt-5

          dark:bg-[#050507]

          sm:px-6
          lg:px-8
          lg:pb-10
        "
      >
        <div className="mx-auto max-w-[1000px]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
            Community
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Gaming Friends
          </h1>

          <div className="mt-6 space-y-3">
            {friends.map((friend) => (
              <div
                key={friend.name}
                className="
                  flex
                  items-center
                  justify-between
                  gap-4

                  rounded-2xl

                  border
                  border-slate-200

                  bg-white

                  p-4

                  dark:border-white/10
                  dark:bg-[#0c0c11]
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0

                      items-center
                      justify-center

                      rounded-full

                      bg-gradient-to-br
                      from-violet-500
                      to-cyan-400

                      text-sm
                      font-black
                      text-white
                    "
                  >
                    {friend.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-black text-slate-950 dark:text-white">
                      {friend.name}
                    </h3>

                    <p className="mt-1 truncate text-[10px] text-slate-500 dark:text-white/40">
                      Playing {friend.game}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleFriendAction(
                      friend
                    )
                  }
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1.5

                    rounded-xl

                    border
                    border-violet-200

                    bg-violet-50

                    px-3
                    py-2

                    text-[9px]
                    font-black

                    text-violet-600

                    dark:border-violet-500/20
                    dark:bg-violet-500/10
                    dark:text-violet-400
                  "
                >
                  <UserPlus size={12} />

                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const NotificationsSection = () => {
    const notifications = [
      {
        title: "New achievement unlocked",
        text: "You unlocked Rising Star.",
      },
      {
        title: "Friend is online",
        text: "Maya Chen started playing Neon Racers.",
      },
      {
        title: "Game update available",
        text: "Cyber Horizon has a new update.",
      },
    ];

    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32
          pt-5

          dark:bg-[#050507]

          sm:px-6
          lg:px-8
          lg:pb-10
        "
      >
        <div className="mx-auto max-w-[900px]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
            Updates
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Notifications
          </h1>

          <div className="mt-6 space-y-3">
            {notifications.map(
              (notification) => (
                <div
                  key={notification.title}
                  className="
                    flex
                    gap-4

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    p-4

                    dark:border-white/10
                    dark:bg-[#0c0c11]
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      bg-violet-50

                      text-violet-600

                      dark:bg-violet-500/10
                      dark:text-violet-400
                    "
                  >
                    <Bell size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-slate-950 dark:text-white">
                      {notification.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                      {notification.text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    );
  };

  /* =====================================================
     SETTINGS
  ===================================================== */

  const SettingsSection = () => {
    return (
      <section
        className="
          min-h-screen

          bg-slate-50

          px-4

          pb-32
          pt-5

          dark:bg-[#050507]

          sm:px-6
          lg:px-8
          lg:pb-10
        "
      >
        <div className="mx-auto max-w-[800px]">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-violet-500">
            Preferences
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Settings
          </h1>

          <div
            className="
              mt-6

              overflow-hidden

              rounded-2xl

              border
              border-slate-200

              bg-white

              dark:border-white/10
              dark:bg-[#0c0c11]
            "
          >
            {[
              [
                "notifications",
                "Notifications",
                "Receive gaming and friend updates.",
              ],
              [
                "sound",
                "Game Sound",
                "Enable sound effects inside games.",
              ],
              [
                "autoPlay",
                "Auto Play",
                "Automatically continue your sessions.",
              ],
            ].map(
              ([key, title, description]) => (
                <div
                  key={key}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4

                    border-b
                    border-slate-100

                    p-5

                    last:border-0

                    dark:border-white/5
                  "
                >
                  <div>
                    <h3 className="text-sm font-black text-slate-950 dark:text-white">
                      {title}
                    </h3>

                    <p className="mt-1 text-[10px] text-slate-500 dark:text-white/40">
                      {description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleSettingChange(
                        key
                      )
                    }
                    className={`
                      relative
                      h-6
                      w-11
                      shrink-0
                      rounded-full
                      transition

                      ${
                        settings[key]
                          ? "bg-violet-600"
                          : "bg-slate-200 dark:bg-white/10"
                      }
                    `}
                  >
                    <span
                      className={`
                        absolute
                        top-1
                        h-4
                        w-4
                        rounded-full
                        bg-white
                        shadow
                        transition

                        ${
                          settings[key]
                            ? "left-6"
                            : "left-1"
                        }
                      `}
                    />
                  </button>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              updateUser({
                name:
                  user?.name ||
                  "Alex Morgan",
              });

              showToast(
                "Profile updated"
              );
            }}
            className="
              mt-5

              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-violet-600

              px-5
              py-3

              text-xs
              font-black
              text-white

              transition

              hover:bg-violet-700
            "
          >
            <Settings size={14} />

            Save Settings
          </button>

          <button
            type="button"
            onClick={logout}
            className="
              mt-3

              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-red-200

              bg-red-50

              px-5
              py-3

              text-xs
              font-black

              text-red-600

              dark:border-red-500/20
              dark:bg-red-500/10
              dark:text-red-400
            "
          >
            <LogOut size={14} />

            Sign Out
          </button>
        </div>
      </section>
    );
  };

  /* =====================================================
     CONTENT
  ===================================================== */

  const renderContent = () => {
    switch (activeSection) {
      case "discover":
        return <DiscoverSection />;

      case "library":
        return <LibrarySection />;

      case "achievements":
        return <AchievementsSection />;

      case "friends":
        return <FriendsSection />;

      case "notifications":
        return <NotificationsSection />;

      case "settings":
        return <SettingsSection />;

      case "overview":
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div
      className="
        min-h-screen

        bg-slate-50

        text-slate-950

        dark:bg-[#050507]
        dark:text-white
      "
    >
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
        onSectionChange={
          handleSectionChange
        }
        notificationCount={
          notificationCount
        }
      />

      {/* =================================================
          MAIN CONTENT

          IMPORTANT:
          78px top padding = mobile navbar
          90px bottom padding = mobile bottom nav
      ================================================= */}

      <main
        className="
          min-h-screen

          pt-[78px]
          pb-[90px]

          lg:pl-[250px]

          lg:pt-[72px]
          lg:pb-0
        "
      >
        {renderContent()}
      </main>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div className="lg:pl-[250px]">
        <Footer
          onSectionChange={
            handleSectionChange
          }
        />
      </div>

      {/* =================================================
          MOBILE BOTTOM NAV
      ================================================= */}

      <MobileNav
        activeSection={activeSection}
        onSectionChange={
          handleSectionChange
        }
        notificationCount={
          notificationCount
        }
      />

      {/* =================================================
          GAME PLAYER
      ================================================= */}

      {playingGame && (
        <GamePlayer
          game={playingGame}
          onExit={handleCloseGame}
        />
      )}

      {/* =================================================
          GAME DETAILS MODAL
      ================================================= */}

      {selectedGame && (
        <div
          className="
            fixed
            inset-0
            z-[99990]

            flex
            items-center
            justify-center

            bg-black/70

            p-4

            backdrop-blur-md
          "
          onClick={() =>
            setSelectedGame(null)
          }
        >
          <div
            className="
              relative

              w-full
              max-w-lg

              overflow-hidden

              rounded-3xl

              border
              border-white/10

              bg-white

              shadow-2xl

              dark:bg-[#0c0c11]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={() =>
                setSelectedGame(null)
              }
              className="
                absolute
                right-4
                top-4
                z-10

                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-xl

                bg-black/50

                text-white

                backdrop-blur-md
              "
            >
              <X size={16} />
            </button>

            <div className="aspect-video">
              <img
                src={selectedGame.image}
                alt={selectedGame.title}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>

            <div className="p-5">
              <p
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-wider

                  text-violet-500
                "
              >
                {selectedGame.genre}
              </p>

              <h2
                className="
                  mt-1

                  text-xl
                  font-black

                  text-slate-950

                  dark:text-white
                "
              >
                {selectedGame.title}
              </h2>

              <div
                className="
                  mt-4

                  grid
                  grid-cols-3
                  gap-2
                "
              >
                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-3

                    dark:bg-white/5
                  "
                >
                  <span className="block text-[7px] font-black uppercase text-slate-400">
                    Progress
                  </span>

                  <strong className="mt-1 block text-sm font-black text-violet-600 dark:text-violet-400">
                    {selectedGame.progress ??
                      0}
                    %
                  </strong>
                </div>

                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-3

                    dark:bg-white/5
                  "
                >
                  <span className="block text-[7px] font-black uppercase text-slate-400">
                    Rating
                  </span>

                  <strong className="mt-1 block text-sm font-black text-slate-950 dark:text-white">
                    {selectedGame.rating ||
                      "4.9"}
                  </strong>
                </div>

                <div
                  className="
                    rounded-xl
                    bg-slate-50
                    p-3

                    dark:bg-white/5
                  "
                >
                  <span className="block text-[7px] font-black uppercase text-slate-400">
                    Players
                  </span>

                  <strong className="mt-1 block text-sm font-black text-slate-950 dark:text-white">
                    {selectedGame.players ||
                      "12.4K"}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  handlePlayGame(
                    selectedGame
                  )
                }
                className="
                  mt-5

                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-gradient-to-r
                  from-violet-600
                  via-fuchsia-500
                  to-cyan-400

                  px-5
                  py-3.5

                  text-xs
                  font-black

                  text-white

                  shadow-lg
                  shadow-violet-500/20

                  transition

                  hover:-translate-y-0.5
                "
              >
                <Gamepad2 size={15} />

                Play {selectedGame.title}

                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          ACTIVITY MODAL
      ================================================= */}

      {selectedActivity && (
        <div
          className="
            fixed
            inset-0
            z-[99980]

            flex
            items-center
            justify-center

            bg-black/60

            p-4

            backdrop-blur-sm
          "
          onClick={() =>
            setSelectedActivity(null)
          }
        >
          <div
            className="
              w-full
              max-w-md

              rounded-2xl

              border
              border-slate-200

              bg-white

              p-6

              dark:border-white/10
              dark:bg-[#0c0c11]
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-center justify-between">
              <h2 className="font-black text-slate-950 dark:text-white">
                Activity Details
              </h2>

              <button
                type="button"
                onClick={() =>
                  setSelectedActivity(
                    null
                  )
                }
                className="
                  flex
                  h-8
                  w-8

                  items-center
                  justify-center

                  rounded-lg

                  bg-slate-100

                  text-slate-500

                  dark:bg-white/5
                  dark:text-white/60
                "
              >
                <X size={14} />
              </button>
            </div>

            <pre
              className="
                mt-5

                overflow-auto

                rounded-xl

                bg-slate-50

                p-4

                text-[10px]

                text-slate-600

                dark:bg-white/5
                dark:text-white/50
              "
            >
              {JSON.stringify(
                selectedActivity,
                null,
                2
              )}
            </pre>
          </div>
        </div>
      )}

      {/* =================================================
          TOAST
      ================================================= */}

      {toast && (
        <div
          className="
            fixed

            bottom-24
            left-1/2

            z-[100000]

            -translate-x-1/2

            rounded-xl

            border
            border-slate-200

            bg-white

            px-4
            py-3

            text-[10px]
            font-black

            text-slate-900

            shadow-2xl

            dark:border-white/10
            dark:bg-[#121218]
            dark:text-white

            lg:bottom-5
          "
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default Dashboard;