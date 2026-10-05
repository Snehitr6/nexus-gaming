import { useEffect, useState } from "react";
import { Gamepad2, ShieldCheck, Zap } from "lucide-react";

function NexusLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("INITIALIZING NEXUS");
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const messages = [
      "INITIALIZING NEXUS",
      "CONNECTING GAME NETWORK",
      "LOADING PLAYER PROFILE",
      "SYNCHRONIZING LIBRARY",
      "CALIBRATING COMMAND CENTER",
      "ESTABLISHING SECURE SESSION",
      "SYSTEM READY",
    ];

    let currentProgress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 7 + 2;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        setProgress(100);
        setMessage("SYSTEM READY");

        setTimeout(() => {
          setClosing(true);

          setTimeout(() => {
            onComplete?.();
          }, 750);
        }, 550);

        return;
      }

      setProgress(Math.floor(currentProgress));

      const nextMessageIndex = Math.min(
        Math.floor(currentProgress / 15),
        messages.length - 1
      );

      if (nextMessageIndex !== messageIndex) {
        messageIndex = nextMessageIndex;
        setMessage(messages[messageIndex]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`
        nexus-loader
        ${closing ? "nexus-loader--closing" : ""}
      `}
    >
      {/* BACKGROUND */}

      <div className="nexus-loader__background" />

      <div className="nexus-loader__grid" />

      <div className="nexus-loader__noise" />

      {/* TOP BAR */}

      <div className="nexus-loader__top">
        <div className="nexus-loader__top-left">
          <span className="nexus-loader__live-dot" />
          NEXUS SYSTEM
        </div>

        <div className="nexus-loader__top-right">
          SECURE CONNECTION
        </div>
      </div>

      {/* CORNER HUD */}

      <div className="nexus-loader__corner nexus-loader__corner--tl" />
      <div className="nexus-loader__corner nexus-loader__corner--tr" />
      <div className="nexus-loader__corner nexus-loader__corner--bl" />
      <div className="nexus-loader__corner nexus-loader__corner--br" />

      {/* SCAN LINE */}

      <div className="nexus-loader__scan" />

      {/* CENTER */}

      <div className="nexus-loader__center">

        {/* HUD RINGS */}

        <div className="nexus-loader__rings">

          <div className="nexus-loader__ring nexus-loader__ring--one" />

          <div className="nexus-loader__ring nexus-loader__ring--two" />

          <div className="nexus-loader__ring nexus-loader__ring--three" />

          <div className="nexus-loader__crosshair">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* LOGO */}

          <div className="nexus-loader__logo">
            <div className="nexus-loader__logo-icon">
              <Gamepad2 size={38} />
            </div>
          </div>

          {/* ORBIT DOTS */}

          <span className="nexus-loader__orbit-dot nexus-loader__orbit-dot--one" />
          <span className="nexus-loader__orbit-dot nexus-loader__orbit-dot--two" />
          <span className="nexus-loader__orbit-dot nexus-loader__orbit-dot--three" />

        </div>

        {/* BRAND */}

        <div className="nexus-loader__brand">
          <div className="nexus-loader__brand-name">
            NEXUS
          </div>

          <div className="nexus-loader__brand-subtitle">
            GAMING COMMAND CENTER
          </div>
        </div>

        {/* SYSTEM STATUS */}

        <div className="nexus-loader__status">
          <span className="nexus-loader__status-icon">
            <Zap size={12} />
          </span>

          <span>{message}</span>
        </div>

        {/* PROGRESS */}

        <div className="nexus-loader__progress-wrapper">

          <div className="nexus-loader__progress-info">
            <span>SYSTEM BOOT</span>

            <span>
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <div className="nexus-loader__progress-track">
            <div
              className="nexus-loader__progress-bar"
              style={{
                width: `${progress}%`,
              }}
            />

            <div
              className="nexus-loader__progress-glow"
              style={{
                left: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* DIAGNOSTICS */}

        <div className="nexus-loader__diagnostics">

          <div className="nexus-loader__diagnostic">
            <ShieldCheck size={12} />
            <span>SECURE</span>
          </div>

          <div className="nexus-loader__diagnostic">
            <span className="nexus-loader__mini-dot" />
            NETWORK
          </div>

          <div className="nexus-loader__diagnostic">
            <span className="nexus-loader__mini-dot" />
            ONLINE
          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="nexus-loader__bottom">
        <span>NX-2026</span>

        <span>
          BUILD 01.26.09
        </span>

        <span>
          ALL SYSTEMS NOMINAL
        </span>
      </div>

      {/* EXIT FLASH */}

      <div className="nexus-loader__flash" />
    </div>
  );
}

export default NexusLoader;