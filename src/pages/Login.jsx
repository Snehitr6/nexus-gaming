import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Gamepad2,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const { darkMode } = useTheme();

  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "player@nexus.com",
    password: "password123",
    name: "",
    remember: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const from =
    location.state?.from || "/dashboard";

  /* =========================================================
     FORM
  ========================================================= */

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (mode === "signup" && !form.name.trim()) {
      nextErrors.name = "Enter your player name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password =
        "Enter your password.";
    } else if (form.password.length < 6) {
      nextErrors.password =
        "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 650)
    );

    login(form.email);

    setLoading(false);

    navigate(from, {
      replace: true,
    });
  };

  /* =========================================================
     DEMO LOGIN
  ========================================================= */

  const handleDemoLogin = async () => {
    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 500)
    );

    login("player@nexus.com");

    setLoading(false);

    navigate("/dashboard", {
      replace: true,
    });
  };

  /* =========================================================
     HOME
  ========================================================= */

  const handleHome = () => {
    navigate("/");
  };

  /* =========================================================
     THEME
  ========================================================= */

  const pageBackground = darkMode
    ? "bg-[#050507]"
    : "bg-white";

  const mainText = darkMode
    ? "text-white"
    : "text-slate-950";

  const mutedText = darkMode
    ? "text-slate-400"
    : "text-slate-500";

  const borderColor = darkMode
    ? "border-white/[0.08]"
    : "border-slate-200";

  const inputBackground = darkMode
    ? "bg-white/[0.035]"
    : "bg-white";

  const inputText = darkMode
    ? "text-white"
    : "text-slate-900";

  return (
    <div
      className={`
        min-h-screen
        overflow-x-hidden
        transition-colors
        duration-500
        ${pageBackground}
      `}
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)"
            : "linear-gradient(rgba(124,58,237,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* =====================================================
          GLOWS
      ===================================================== */}

      <div
        className={`
          pointer-events-none
          fixed
          -left-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          blur-[140px]
          transition-colors
          duration-500
          ${
            darkMode
              ? "bg-violet-950/35"
              : "bg-violet-100"
          }
        `}
      />

      <div
        className={`
          pointer-events-none
          fixed
          -right-40
          bottom-0
          h-[450px]
          w-[450px]
          rounded-full
          blur-[140px]
          transition-colors
          duration-500
          ${
            darkMode
              ? "bg-cyan-950/25"
              : "bg-cyan-100"
          }
        `}
      />

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className={`
          fixed
          left-0
          right-0
          top-0
          z-50
          border-b
          backdrop-blur-xl
          transition-colors
          duration-500
          ${
            darkMode
              ? "border-white/[0.08] bg-[#050507]/90"
              : "border-slate-200 bg-white/90"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[70px]
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
            onClick={handleHome}
            className="flex items-center gap-3"
          >
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

            <span
              className={`
                text-base
                font-black
                tracking-[0.14em]
                ${mainText}
              `}
            >
              NEXUS
            </span>
          </button>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              type="button"
              onClick={handleHome}
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
                ${
                  darkMode
                    ? "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }
              `}
            >
              <ArrowLeft size={14} />

              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          relative
          flex
          min-h-screen
          items-center
          justify-center
          px-4
          pb-10
          pt-28
          sm:px-6
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1180px]
          "
        >
          {/* =================================================
              LOGIN CARD
          ================================================= */}

          <div
            className={`
              overflow-hidden
              rounded-[28px]
              border
              shadow-2xl
              transition-colors
              duration-500
              ${
                darkMode
                  ? "border-white/[0.09] bg-[#0a0a0d] shadow-black/40"
                  : "border-slate-200 bg-white shadow-slate-300/30"
              }
            `}
          >
            <div
              className="
                grid
                lg:grid-cols-2
              "
            >
              {/* =================================================
                  LEFT PANEL
              ================================================= */}

              <section
                className={`
                  relative
                  hidden
                  overflow-hidden
                  p-8
                  lg:block
                  lg:p-12
                  ${
                    darkMode
                      ? "bg-gradient-to-br from-violet-950/35 via-[#0c0b13] to-cyan-950/20"
                      : "bg-gradient-to-br from-violet-50 via-white to-cyan-50"
                  }
                `}
              >
                {/* GLOW */}

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -right-32
                    top-20
                    h-80
                    w-80
                    rounded-full
                    blur-[100px]
                    ${
                      darkMode
                        ? "bg-violet-700/15"
                        : "bg-violet-100"
                    }
                  `}
                />

                <div
                  className={`
                    pointer-events-none
                    absolute
                    -bottom-32
                    -left-20
                    h-80
                    w-80
                    rounded-full
                    blur-[100px]
                    ${
                      darkMode
                        ? "bg-cyan-700/10"
                        : "bg-cyan-100"
                    }
                  `}
                />

                <div className="relative">
                  {/* BADGE */}

                  <div
                    className={`
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      px-3
                      py-1.5
                      ${
                        darkMode
                          ? "border-violet-500/30 bg-violet-500/10"
                          : "border-violet-200 bg-violet-50"
                      }
                    `}
                  >
                    <Sparkles
                      size={12}
                      className="text-violet-500"
                    />

                    <span
                      className="
                        text-[9px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-violet-500
                      "
                    >
                      Player Access
                    </span>
                  </div>

                  {/* HEADING */}

                  <h1
                    className={`
                      mt-8
                      max-w-lg
                      text-4xl
                      font-black
                      leading-[1]
                      tracking-[-0.04em]
                      sm:text-5xl
                      ${
                        darkMode
                          ? "text-white"
                          : "text-slate-950"
                      }
                    `}
                  >
                    Welcome back to
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
                      your world.
                    </span>
                  </h1>

                  <p
                    className={`
                      mt-6
                      max-w-lg
                      text-sm
                      leading-6
                      ${mutedText}
                    `}
                  >
                    Your games, achievements, friends, and
                    progress are waiting. Step back into the
                    NEXUS command center.
                  </p>

                  {/* FEATURES */}

                  <div className="mt-10 space-y-3">
                    <LoginFeature
                      icon={Trophy}
                      title="Track every achievement"
                      description="Keep your progress moving forward."
                      darkMode={darkMode}
                      color="violet"
                    />

                    <LoginFeature
                      icon={Users}
                      title="Stay connected"
                      description="See what your friends are playing."
                      darkMode={darkMode}
                      color="cyan"
                    />

                    <LoginFeature
                      icon={Zap}
                      title="Level up faster"
                      description="Turn every session into progress."
                      darkMode={darkMode}
                      color="fuchsia"
                    />
                  </div>

                  {/* SMALL STATUS */}

                  <div
                    className={`
                      mt-10
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      px-4
                      py-3
                      ${
                        darkMode
                          ? "border-white/[0.07] bg-white/[0.025]"
                          : "border-slate-200 bg-white"
                      }
                    `}
                  >
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
                        text-[9px]
                        font-bold
                        ${
                          darkMode
                            ? "text-slate-400"
                            : "text-slate-500"
                        }
                      `}
                    >
                      NEXUS services are operational
                    </span>
                  </div>
                </div>
              </section>

              {/* =================================================
                  RIGHT LOGIN PANEL
              ================================================= */}

              <section
                className={`
                  relative
                  p-6
                  sm:p-8
                  lg:p-12
                  ${
                    darkMode
                      ? "bg-[#0a0a0d]"
                      : "bg-white"
                  }
                `}
              >
                <div className="mx-auto max-w-[460px]">
                  {/* TITLE */}

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
                      Player Login
                    </p>

                    <h2
                      className={`
                        mt-3
                        text-3xl
                        font-black
                        tracking-tight
                        sm:text-4xl
                        ${mainText}
                      `}
                    >
                      {mode === "login"
                        ? "Enter the Nexus."
                        : "Create your Nexus."}
                    </h2>

                    <p
                      className={`
                        mt-2
                        text-xs
                        ${mutedText}
                      `}
                    >
                      {mode === "login"
                        ? "Sign in to continue your gaming journey."
                        : "Create your player account and start your journey."}
                    </p>
                  </div>

                  {/* FORM */}

                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                  >
                    {/* NAME */}

                    {mode === "signup" && (
                      <div>
                        <label
                          className={`
                            mb-2
                            block
                            text-[9px]
                            font-black
                            uppercase
                            tracking-wider
                            ${
                              darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                            }
                          `}
                        >
                          Player Name
                        </label>

                        <div className="relative">
                          <UserPlus
                            size={15}
                            className={`
                              absolute
                              left-4
                              top-1/2
                              -translate-y-1/2
                              ${
                                darkMode
                                  ? "text-slate-500"
                                  : "text-slate-400"
                              }
                            `}
                          />

                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your player name"
                            className={`
                              h-12
                              w-full
                              rounded-xl
                              border
                              pl-11
                              pr-4
                              text-sm
                              outline-none
                              transition
                              ${
                                darkMode
                                  ? "border-white/10 bg-white/[0.035] text-white placeholder:text-slate-600 focus:border-violet-500/60"
                                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-violet-400"
                              }
                            `}
                          />
                        </div>

                        {errors.name && (
                          <p className="mt-1.5 text-[10px] font-medium text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>
                    )}

                    {/* EMAIL */}

                    <div>
                      <label
                        className={`
                          mb-2
                          block
                          text-[9px]
                          font-black
                          uppercase
                          tracking-wider
                          ${
                            darkMode
                              ? "text-slate-400"
                              : "text-slate-500"
                          }
                        `}
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail
                          size={15}
                          className={`
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            ${
                              darkMode
                                ? "text-slate-500"
                                : "text-slate-400"
                            }
                          `}
                        />

                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="player@nexus.com"
                          autoComplete="email"
                          className={`
                            h-12
                            w-full
                            rounded-xl
                            border
                            pl-11
                            pr-4
                            text-sm
                            outline-none
                            transition
                            ${inputBackground}
                            ${inputText}
                            ${
                              darkMode
                                ? "border-white/10 placeholder:text-slate-600 focus:border-violet-500/60"
                                : "border-slate-200 placeholder:text-slate-400 focus:border-violet-400"
                            }
                          `}
                        />
                      </div>

                      {errors.email && (
                        <p className="mt-1.5 text-[10px] font-medium text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* PASSWORD */}

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label
                          className={`
                            text-[9px]
                            font-black
                            uppercase
                            tracking-wider
                            ${
                              darkMode
                                ? "text-slate-400"
                                : "text-slate-500"
                            }
                          `}
                        >
                          Password
                        </label>

                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() =>
                              setErrors((current) => ({
                                ...current,
                                password:
                                  "Password reset is available after account verification.",
                              }))
                            }
                            className="
                              text-[10px]
                              font-bold
                              text-violet-500
                              transition
                              hover:text-fuchsia-500
                            "
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <Lock
                          size={15}
                          className={`
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            ${
                              darkMode
                                ? "text-slate-500"
                                : "text-slate-400"
                            }
                          `}
                        />

                        <input
                          type={
                            showPassword
                              ? "text"
                              : "password"
                          }
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          autoComplete={
                            mode === "login"
                              ? "current-password"
                              : "new-password"
                          }
                          className={`
                            h-12
                            w-full
                            rounded-xl
                            border
                            pl-11
                            pr-12
                            text-sm
                            outline-none
                            transition
                            ${inputBackground}
                            ${inputText}
                            ${
                              darkMode
                                ? "border-white/10 placeholder:text-slate-600 focus:border-violet-500/60"
                                : "border-slate-200 placeholder:text-slate-400 focus:border-violet-400"
                            }
                          `}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword(
                              (current) => !current
                            )
                          }
                          className={`
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            transition
                            ${
                              darkMode
                                ? "text-slate-500 hover:text-white"
                                : "text-slate-400 hover:text-slate-700"
                            }
                          `}
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={15} />
                          ) : (
                            <Eye size={15} />
                          )}
                        </button>
                      </div>

                      {errors.password && (
                        <p className="mt-1.5 text-[10px] font-medium text-red-500">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* REMEMBER */}

                    {mode === "login" && (
                      <label className="flex cursor-pointer items-center gap-3">
                        <input
                          type="checkbox"
                          name="remember"
                          checked={form.remember}
                          onChange={handleChange}
                          className="
                            h-5
                            w-5
                            cursor-pointer
                            appearance-none
                            rounded-md
                            border
                            border-violet-500
                            bg-violet-600
                            checked:bg-violet-600
                          "
                        />

                        <span
                          className={`
                            text-[10px]
                            font-bold
                            ${
                              darkMode
                                ? "text-slate-500"
                                : "text-slate-500"
                            }
                          `}
                        >
                          Remember this device
                        </span>
                      </label>
                    )}

                    {/* SUBMIT */}

                    <button
                      type="submit"
                      disabled={loading}
                      className="
                        group
                        flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-violet-600
                        via-fuchsia-500
                        to-fuchsia-500
                        text-sm
                        font-black
                        text-white
                        shadow-lg
                        shadow-violet-500/20
                        transition
                        hover:-translate-y-0.5
                        hover:shadow-violet-500/30
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {loading
                        ? "Connecting..."
                        : mode === "login"
                          ? "Enter NEXUS"
                          : "Create Account"}

                      {!loading && (
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      )}
                    </button>

                    {/* DEMO */}

                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={loading}
                        className={`
                          flex
                          h-11
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          text-xs
                          font-black
                          transition
                          disabled:opacity-50
                          ${
                            darkMode
                              ? "border-cyan-500/20 bg-cyan-500/[0.04] text-cyan-300 hover:bg-cyan-500/10"
                              : "border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
                          }
                        `}
                      >
                        <Gamepad2 size={15} />

                        Quick Demo Login
                      </button>
                    )}
                  </form>

                  {/* SWITCH MODE */}

                  <div className="mt-8 text-center">
                    <span
                      className={`
                        text-[10px]
                        ${mutedText}
                      `}
                    >
                      {mode === "login"
                        ? "New to NEXUS?"
                        : "Already have an account?"}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setMode((current) =>
                          current === "login"
                            ? "signup"
                            : "login"
                        );

                        setErrors({});
                      }}
                      className="
                        ml-2
                        text-[10px]
                        font-black
                        text-violet-500
                        transition
                        hover:text-fuchsia-500
                      "
                    >
                      {mode === "login"
                        ? "Create account"
                        : "Sign in"}
                    </button>
                  </div>

                  {/* SECURITY */}

                  <div
                    className={`
                      mt-8
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-wider
                      ${
                        darkMode
                          ? "text-slate-600"
                          : "text-slate-400"
                      }
                    `}
                  >
                    <ShieldCheck size={12} />

                    Secure & protected player session
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function LoginFeature({
  icon: Icon,
  title,
  description,
  darkMode,
  color,
}) {
  const colors = {
    violet: darkMode
      ? "bg-violet-500/10 text-violet-400"
      : "bg-violet-50 text-violet-600",

    cyan: darkMode
      ? "bg-cyan-500/10 text-cyan-400"
      : "bg-cyan-50 text-cyan-600",

    fuchsia: darkMode
      ? "bg-fuchsia-500/10 text-fuchsia-400"
      : "bg-fuchsia-50 text-fuchsia-600",
  };

  return (
    <div
      className={`
        flex
        items-center
        gap-4
        rounded-2xl
        border
        p-4
        transition-colors
        duration-500
        ${
          darkMode
            ? "border-white/[0.07] bg-white/[0.025]"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${colors[color]}
        `}
      >
        <Icon size={18} />
      </div>

      <div>
        <h3
          className={`
            text-xs
            font-black
            ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }
          `}
        >
          {title}
        </h3>

        <p
          className={`
            mt-1
            text-[9px]
            ${
              darkMode
                ? "text-slate-500"
                : "text-slate-400"
            }
          `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default Login;