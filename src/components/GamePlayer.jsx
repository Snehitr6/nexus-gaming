import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Car,
  Crosshair,
  Gamepad2,
  Maximize,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";

/*
  NEXUS MULTI-GAME PLAYER

  Games:
  1. Cyber Horizon  -> Shooter
  2. Neon Racers    -> Racing
  3. Shadow Realm   -> Adventure
  4. Aether Wars    -> Strategy
  5. Velocity X     -> Racing
  6. Dark Protocol  -> Tactical Shooter
*/

function GamePlayer({ game, onExit }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  const keysRef = useRef({});
  const mouseRef = useRef({
    x: 0,
    y: 0,
    down: false,
  });

  const audioRef = useRef(null);

  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  const [stats, setStats] = useState({
    score: 0,
    health: 100,
    energy: 100,
    level: 1,
    kills: 0,
    lap: 1,
    totalLaps: 3,
    speed: 0,
    progress: 0,
    crystals: 0,
    territory: 0,
  });

  const playerRef = useRef({});
  const objectsRef = useRef([]);
  const bulletsRef = useRef([]);
  const particlesRef = useRef([]);

  const gameName = game?.title || "Cyber Horizon";

  const mode = (() => {
    switch (gameName) {
      case "Neon Racers":
        return "racing";

      case "Velocity X":
        return "speed";

      case "Shadow Realm":
        return "adventure";

      case "Aether Wars":
        return "strategy";

      case "Dark Protocol":
        return "tactical";

      case "Cyber Horizon":
      default:
        return "shooter";
    }
  })();

  const colors = {
    shooter: {
      primary: "#8b5cf6",
      secondary: "#22d3ee",
      danger: "#f43f5e",
    },
    tactical: {
      primary: "#ef4444",
      secondary: "#f59e0b",
      danger: "#dc2626",
    },
    racing: {
      primary: "#ec4899",
      secondary: "#22d3ee",
      danger: "#f97316",
    },
    speed: {
      primary: "#facc15",
      secondary: "#ef4444",
      danger: "#fb7185",
    },
    adventure: {
      primary: "#a855f7",
      secondary: "#22c55e",
      danger: "#ef4444",
    },
    strategy: {
      primary: "#3b82f6",
      secondary: "#22d3ee",
      danger: "#ef4444",
    },
  }[mode];

  /* =====================================================
     AUDIO
  ===================================================== */

  const playSound = useCallback(
    (frequency = 440, duration = 0.06) => {
      if (!soundEnabled) return;

      try {
        if (!audioRef.current) {
          audioRef.current = new window.AudioContext();
        }

        const context = audioRef.current;

        if (context.state === "suspended") {
          context.resume();
        }

        const oscillator = context.createOscillator();
        const gain = context.createGain();

        oscillator.type = "square";
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(
          0.035,
          context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          context.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();
        oscillator.stop(
          context.currentTime + duration
        );
      } catch {
        // Sound is optional.
      }
    },
    [soundEnabled]
  );

  /* =====================================================
     PARTICLES
  ===================================================== */

  const particles = useCallback(
    (x, y, count = 10, type = "normal") => {
      for (let i = 0; i < count; i += 1) {
        const angle =
          Math.random() * Math.PI * 2;

        const speed =
          30 + Math.random() * 180;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.3 + Math.random() * 0.6,
          maxLife: 0.3 + Math.random() * 0.6,
          size: 1 + Math.random() * 3,
          type,
        });
      }
    },
    []
  );

  /* =====================================================
     CANVAS RESIZE
  ===================================================== */

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const rect =
      canvas.getBoundingClientRect();

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    canvas.width =
      rect.width * dpr;

    canvas.height =
      rect.height * dpr;

    const context =
      canvas.getContext("2d");

    context.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );
  }, []);

  /* =====================================================
     RESET
  ===================================================== */

  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    objectsRef.current = [];
    bulletsRef.current = [];
    particlesRef.current = [];

    if (
      mode === "racing" ||
      mode === "speed"
    ) {
      playerRef.current = {
        x: width / 2,
        y: height - 130,
        width: 30,
        height: 55,
        speed: 0,
        maxSpeed:
          mode === "speed" ? 700 : 520,
        health: 100,
        score: 0,
        distance: 0,
        lap: 1,
        totalLaps: 3,
        nitro: 100,
        invulnerable: 0,
      };

      for (let i = 0; i < 12; i += 1) {
        objectsRef.current.push({
          type: "obstacle",
          x:
            70 +
            Math.random() *
              (width - 140),
          y:
            -100 -
            Math.random() * 900,
          width: 34,
          height: 60,
          speed:
            120 +
            Math.random() * 120,
          color:
            i % 2 === 0
              ? "#ec4899"
              : "#22d3ee",
        });
      }
    } else if (mode === "adventure") {
      playerRef.current = {
        x: width / 2,
        y: height / 2,
        radius: 17,
        speed: 230,
        health: 100,
        energy: 100,
        score: 0,
        crystals: 0,
        level: 1,
        invulnerable: 0,
      };

      for (let i = 0; i < 12; i += 1) {
        objectsRef.current.push({
          type: i % 3 === 0 ? "enemy" : "crystal",
          x: 50 + Math.random() * (width - 100),
          y: 90 + Math.random() * (height - 160),
          radius: i % 3 === 0 ? 16 : 9,
          health: 2,
          rotation: Math.random() * 6,
        });
      }
    } else if (mode === "strategy") {
      playerRef.current = {
        x: width / 2,
        y: height / 2,
        score: 0,
        health: 100,
        territory: 20,
        energy: 100,
        units: 5,
        enemyUnits: 7,
        selected: null,
      };

      for (let i = 0; i < 8; i += 1) {
        objectsRef.current.push({
          type: "base",
          x: 80 + Math.random() * (width - 160),
          y: 100 + Math.random() * (height - 200),
          radius: 28,
          owner: i === 0 ? "player" : "neutral",
          capture: i === 0 ? 100 : 0,
          selected: false,
        });
      }
    } else {
      playerRef.current = {
        x: width / 2,
        y: height / 2,
        radius: 18,
        speed: 280,
        health: 100,
        energy: 100,
        score: 0,
        kills: 0,
        level: 1,
        xp: 0,
        cooldown: 0,
        invulnerable: 0,
      };

      for (let i = 0; i < 8; i += 1) {
        spawnEnemy(width, height);
      }
    }

    setStats({
      score: 0,
      health: 100,
      energy: 100,
      level: 1,
      kills: 0,
      lap: 1,
      totalLaps: 3,
      speed: 0,
      progress: 0,
      crystals: 0,
      territory: 20,
    });

    setGameOver(false);
    setPaused(false);

    playSound(300, 0.12);
  }, [mode, playSound]);

  /* =====================================================
     SPAWN SHOOTER ENEMY
  ===================================================== */

  const spawnEnemy = (
    width,
    height
  ) => {
    const side =
      Math.floor(Math.random() * 4);

    let x;
    let y;

    if (side === 0) {
      x = -30;
      y = Math.random() * height;
    } else if (side === 1) {
      x = width + 30;
      y = Math.random() * height;
    } else if (side === 2) {
      x = Math.random() * width;
      y = -30;
    } else {
      x = Math.random() * width;
      y = height + 30;
    }

    objectsRef.current.push({
      type: "enemy",
      x,
      y,
      radius: 15,
      speed: 60 + Math.random() * 90,
      health: 2,
      maxHealth: 2,
      damage: 10,
      rotation: 0,
    });
  };

  /* =====================================================
     SHOOT
  ===================================================== */

  const shoot = useCallback(() => {
    if (
      paused ||
      gameOver ||
      !(
        mode === "shooter" ||
        mode === "tactical"
      )
    ) {
      return;
    }

    const player = playerRef.current;

    if (player.cooldown > 0) return;

    if (player.energy < 5) return;

    const mouse = mouseRef.current;

    const dx =
      mouse.x - player.x;

    const dy =
      mouse.y - player.y;

    const distance =
      Math.sqrt(dx * dx + dy * dy) || 1;

    bulletsRef.current.push({
      x: player.x,
      y: player.y,
      vx: (dx / distance) * 700,
      vy: (dy / distance) * 700,
      radius: 4,
      life: 1,
    });

    player.energy -= 5;
    player.cooldown = 0.14;

    particles(
      player.x,
      player.y,
      4,
      "shoot"
    );

    playSound(720, 0.04);
  }, [
    gameOver,
    mode,
    paused,
    particles,
    playSound,
  ]);

  /* =====================================================
     UPDATE SHOOTER
  ===================================================== */

  const updateShooter = useCallback(
    (delta) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const player = playerRef.current;

      let mx = 0;
      let my = 0;

      if (
        keysRef.current.w ||
        keysRef.current.ArrowUp
      ) {
        my -= 1;
      }

      if (
        keysRef.current.s ||
        keysRef.current.ArrowDown
      ) {
        my += 1;
      }

      if (
        keysRef.current.a ||
        keysRef.current.ArrowLeft
      ) {
        mx -= 1;
      }

      if (
        keysRef.current.d ||
        keysRef.current.ArrowRight
      ) {
        mx += 1;
      }

      const length =
        Math.sqrt(mx * mx + my * my) || 1;

      player.x +=
        (mx / length) *
        player.speed *
        delta;

      player.y +=
        (my / length) *
        player.speed *
        delta;

      player.x = Math.max(
        player.radius,
        Math.min(
          width - player.radius,
          player.x
        )
      );

      player.y = Math.max(
        player.radius,
        Math.min(
          height - player.radius,
          player.y
        )
      );

      player.energy = Math.min(
        100,
        player.energy + 14 * delta
      );

      if (player.cooldown > 0) {
        player.cooldown -= delta;
      }

      if (player.invulnerable > 0) {
        player.invulnerable -= delta;
      }

      if (mouseRef.current.down) {
        shoot();
      }

      if (Math.random() < delta * 1.7) {
        spawnEnemy(width, height);
      }

      objectsRef.current =
        objectsRef.current.filter(
          (enemy) => {
            if (enemy.type !== "enemy") {
              return true;
            }

            const dx =
              player.x - enemy.x;

            const dy =
              player.y - enemy.y;

            const distance =
              Math.sqrt(
                dx * dx + dy * dy
              ) || 1;

            enemy.x +=
              (dx / distance) *
              enemy.speed *
              delta;

            enemy.y +=
              (dy / distance) *
              enemy.speed *
              delta;

            enemy.rotation +=
              delta * 2;

            if (
              distance <
              player.radius +
                enemy.radius
            ) {
              if (
                player.invulnerable <= 0
              ) {
                player.health -=
                  enemy.damage;

                player.invulnerable =
                  0.5;

                particles(
                  player.x,
                  player.y,
                  12,
                  "damage"
                );

                playSound(100, 0.08);
              }

              return false;
            }

            return true;
          }
        );

      bulletsRef.current =
        bulletsRef.current.filter(
          (bullet) => {
            bullet.x +=
              bullet.vx * delta;

            bullet.y +=
              bullet.vy * delta;

            bullet.life -= delta;

            let hit = false;

            objectsRef.current =
              objectsRef.current.filter(
                (enemy) => {
                  if (
                    enemy.type !==
                    "enemy"
                  ) {
                    return true;
                  }

                  const dx =
                    bullet.x - enemy.x;

                  const dy =
                    bullet.y - enemy.y;

                  const distance =
                    Math.sqrt(
                      dx * dx +
                        dy * dy
                    );

                  if (
                    distance <
                    bullet.radius +
                      enemy.radius
                  ) {
                    hit = true;

                    enemy.health -= 1;

                    particles(
                      bullet.x,
                      bullet.y,
                      6,
                      "hit"
                    );

                    if (
                      enemy.health <= 0
                    ) {
                      player.kills += 1;
                      player.score += 100;
                      player.xp += 50;

                      particles(
                        enemy.x,
                        enemy.y,
                        20,
                        "enemy"
                      );

                      playSound(180, 0.08);

                      return false;
                    }
                  }

                  return true;
                }
              );

            return (
              !hit &&
              bullet.life > 0 &&
              bullet.x > -30 &&
              bullet.x < width + 30 &&
              bullet.y > -30 &&
              bullet.y < height + 30
            );
          }
        );

      if (
        player.xp >=
        player.level * 500
      ) {
        player.xp = 0;
        player.level += 1;
        player.health = 100;

        particles(
          player.x,
          player.y,
          35,
          "level"
        );

        playSound(900, 0.15);
      }

      if (player.health <= 0) {
        player.health = 0;
        setGameOver(true);
      }
    },
    [particles, playSound, shoot]
  );

  /* =====================================================
     UPDATE RACING
  ===================================================== */

  const updateRacing = useCallback(
    (delta) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const player = playerRef.current;

      const accelerating =
        keysRef.current.w ||
        keysRef.current.ArrowUp;

      const braking =
        keysRef.current.s ||
        keysRef.current.ArrowDown;

      const left =
        keysRef.current.a ||
        keysRef.current.ArrowLeft;

      const right =
        keysRef.current.d ||
        keysRef.current.ArrowRight;

      if (accelerating) {
        player.speed +=
          360 * delta;
      } else {
        player.speed -=
          120 * delta;
      }

      if (braking) {
        player.speed -=
          280 * delta;
      }

      player.speed = Math.max(
        0,
        Math.min(
          player.maxSpeed,
          player.speed
        )
      );

      if (left) {
        player.x -=
          250 * delta;
      }

      if (right) {
        player.x +=
          250 * delta;
      }

      player.x = Math.max(
        25,
        Math.min(
          width - 25,
          player.x
        )
      );

      if (
        (keysRef.current.Shift ||
          keysRef.current.shift) &&
        player.nitro > 0
      ) {
        player.speed +=
          500 * delta;

        player.nitro -=
          35 * delta;
      } else {
        player.nitro = Math.min(
          100,
          player.nitro + 8 * delta
        );
      }

      const roadMovement =
        player.speed * delta;

      objectsRef.current.forEach(
        (object) => {
          object.y += roadMovement;

          if (
            object.y >
            height + 100
          ) {
            object.y = -100;

            object.x =
              70 +
              Math.random() *
                (width - 140);

            player.score += 25;
          }

          const hitX =
            Math.abs(
              player.x - object.x
            ) <
            (player.width +
              object.width) /
              2;

          const hitY =
            Math.abs(
              player.y - object.y
            ) <
            (player.height +
              object.height) /
              2;

          if (
            hitX &&
            hitY &&
            player.invulnerable <= 0
          ) {
            player.health -= 20;
            player.speed *= 0.55;
            player.invulnerable = 1;

            particles(
              player.x,
              player.y,
              20,
              "damage"
            );

            playSound(100, 0.1);
          }
        }
      );

      if (player.invulnerable > 0) {
        player.invulnerable -=
          delta;
      }

      player.distance +=
        player.speed * delta;

      const lapLength =
        2200;

      player.lap =
        1 +
        Math.floor(
          player.distance /
            lapLength
        );

      if (
        player.lap >
        player.totalLaps
      ) {
        player.lap =
          player.totalLaps;

        setGameOver(true);
      }

      if (player.health <= 0) {
        player.health = 0;
        setGameOver(true);
      }
    },
    [particles, playSound]
  );

  /* =====================================================
     UPDATE ADVENTURE
  ===================================================== */

  const updateAdventure = useCallback(
    (delta) => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      const player = playerRef.current;

      let mx = 0;
      let my = 0;

      if (
        keysRef.current.w ||
        keysRef.current.ArrowUp
      ) {
        my -= 1;
      }

      if (
        keysRef.current.s ||
        keysRef.current.ArrowDown
      ) {
        my += 1;
      }

      if (
        keysRef.current.a ||
        keysRef.current.ArrowLeft
      ) {
        mx -= 1;
      }

      if (
        keysRef.current.d ||
        keysRef.current.ArrowRight
      ) {
        mx += 1;
      }

      const length =
        Math.sqrt(mx * mx + my * my) || 1;

      player.x +=
        (mx / length) *
        player.speed *
        delta;

      player.y +=
        (my / length) *
        player.speed *
        delta;

      player.x = Math.max(
        player.radius,
        Math.min(
          width - player.radius,
          player.x
        )
      );

      player.y = Math.max(
        player.radius + 55,
        Math.min(
          height - player.radius,
          player.y
        )
      );

      objectsRef.current =
        objectsRef.current.filter(
          (object) => {
            object.rotation +=
              delta;

            const distance =
              Math.hypot(
                player.x - object.x,
                player.y - object.y
              );

            if (
              object.type ===
                "crystal" &&
              distance <
                player.radius +
                  object.radius +
                  8
            ) {
              player.crystals += 1;
              player.score += 150;
              player.energy = Math.min(
                100,
                player.energy + 20
              );

              particles(
                object.x,
                object.y,
                20,
                "crystal"
              );

              playSound(650, 0.08);

              return false;
            }

            if (
              object.type === "enemy"
            ) {
              const dx =
                player.x -
                object.x;

              const dy =
                player.y -
                object.y;

              const enemyDistance =
                Math.hypot(
                  dx,
                  dy
                ) || 1;

              object.x +=
                (dx / enemyDistance) *
                55 *
                delta;

              object.y +=
                (dy / enemyDistance) *
                55 *
                delta;

              if (
                enemyDistance <
                player.radius +
                  object.radius
              ) {
                player.health -=
                  15 * delta;

                particles(
                  player.x,
                  player.y,
                  2,
                  "damage"
                );
              }
            }

            return true;
          }
        );

      player.energy = Math.min(
        100,
        player.energy + 7 * delta
      );

      if (
        player.crystals >= 8
      ) {
        player.level = 2;
      }

      if (player.health <= 0) {
        player.health = 0;
        setGameOver(true);
      }
    },
    [particles, playSound]
  );

  /* =====================================================
     UPDATE STRATEGY
  ===================================================== */

  const updateStrategy = useCallback(
    (delta) => {
      const player = playerRef.current;

      player.energy = Math.min(
        100,
        player.energy + 10 * delta
      );

      objectsRef.current.forEach(
        (base) => {
          if (
            base.owner ===
            "player"
          ) {
            base.capture = Math.min(
              100,
              base.capture +
                8 * delta
            );
          } else if (
            base.owner ===
            "neutral"
          ) {
            if (
              Math.random() <
              delta * 0.03
            ) {
              base.capture +=
                10 * delta;

              if (
                base.capture >=
                100
              ) {
                base.owner =
                  "enemy";
                base.capture = 100;
              }
            }
          } else if (
            base.owner ===
            "enemy"
          ) {
            if (
              Math.random() <
              delta * 0.025
            ) {
              player.territory =
                Math.max(
                  0,
                  player.territory -
                    1
                );
            }
          }
        }
      );

      if (
        player.territory >=
        80
      ) {
        player.score += 10;
      }

      if (
        player.territory <=
        0
      ) {
        setGameOver(true);
      }
    },
    []
  );

  /* =====================================================
     UPDATE
  ===================================================== */

  const updateGame = useCallback(
    (delta) => {
      if (
        mode === "racing" ||
        mode === "speed"
      ) {
        updateRacing(delta);
      } else if (
        mode === "adventure"
      ) {
        updateAdventure(delta);
      } else if (
        mode === "strategy"
      ) {
        updateStrategy(delta);
      } else {
        updateShooter(delta);
      }

      particlesRef.current =
        particlesRef.current.filter(
          (particle) => {
            particle.x +=
              particle.vx * delta;

            particle.y +=
              particle.vy * delta;

            particle.life -= delta;

            particle.vx *= 0.94;
            particle.vy *= 0.94;

            return particle.life > 0;
          }
        );

      const player =
        playerRef.current;

      setStats({
        score: Math.floor(
          player.score || 0
        ),
        health: Math.max(
          0,
          Math.floor(
            player.health ?? 100
          )
        ),
        energy: Math.max(
          0,
          Math.floor(
            player.energy ?? 100
          )
        ),
        level: player.level || 1,
        kills: player.kills || 0,
        lap: player.lap || 1,
        totalLaps:
          player.totalLaps || 3,
        speed: Math.floor(
          player.speed || 0
        ),
        progress:
          player.distance
            ? Math.min(
                100,
                (player.distance /
                  2200) *
                  100
              )
            : 0,
        crystals:
          player.crystals || 0,
        territory:
          player.territory || 0,
      });
    },
    [
      mode,
      updateAdventure,
      updateRacing,
      updateShooter,
      updateStrategy,
    ]
  );

  /* =====================================================
     DRAW BACKGROUND
  ===================================================== */

  const drawBackground = (
    context,
    width,
    height
  ) => {
    let background;

    if (
      mode === "racing" ||
      mode === "speed"
    ) {
      background =
        context.createLinearGradient(
          0,
          0,
          0,
          height
        );

      background.addColorStop(
        0,
        "#05030b"
      );

      background.addColorStop(
        0.5,
        "#13051d"
      );

      background.addColorStop(
        1,
        "#020617"
      );
    } else if (
      mode === "adventure"
    ) {
      background =
        context.createLinearGradient(
          0,
          0,
          width,
          height
        );

      background.addColorStop(
        0,
        "#030712"
      );

      background.addColorStop(
        0.5,
        "#160b25"
      );

      background.addColorStop(
        1,
        "#03140f"
      );
    } else {
      background =
        context.createLinearGradient(
          0,
          0,
          width,
          height
        );

      background.addColorStop(
        0,
        "#02030a"
      );

      background.addColorStop(
        0.5,
        "#0c0620"
      );

      background.addColorStop(
        1,
        "#020617"
      );
    }

    context.fillStyle = background;

    context.fillRect(
      0,
      0,
      width,
      height
    );
  };

  /* =====================================================
     DRAW GRID
  ===================================================== */

  const drawGrid = (
    context,
    width,
    height
  ) => {
    context.save();

    context.strokeStyle =
      "rgba(139,92,246,0.10)";

    context.lineWidth = 1;

    const grid = 45;

    const offset =
      (performance.now() / 35) %
      grid;

    for (
      let x = -grid + offset;
      x < width + grid;
      x += grid
    ) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (
      let y = -grid + offset;
      y < height + grid;
      y += grid
    ) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    context.restore();
  };

  /* =====================================================
     DRAW RACING
  ===================================================== */

  const drawRacing = (
    context,
    width,
    height
  ) => {
    const player =
      playerRef.current;

    /* Road */

    context.fillStyle =
      "#111827";

    context.fillRect(
      width * 0.18,
      0,
      width * 0.64,
      height
    );

    /* Road borders */

    context.fillStyle =
      "#ec4899";

    context.fillRect(
      width * 0.18,
      0,
      5,
      height
    );

    context.fillStyle =
      "#22d3ee";

    context.fillRect(
      width * 0.82,
      0,
      5,
      height
    );

    /* Lane lines */

    const laneOffset =
      (performance.now() *
        (0.3 +
          player.speed / 500)) %
      80;

    context.strokeStyle =
      "rgba(255,255,255,0.3)";

    context.lineWidth = 3;

    for (
      let lane = 1;
      lane < 3;
      lane += 1
    ) {
      const x =
        width *
        (0.18 +
          0.64 *
            (lane / 3));

      for (
        let y =
          -80 + laneOffset;
        y < height;
        y += 80
      ) {
        context.beginPath();

        context.moveTo(
          x,
          y
        );

        context.lineTo(
          x,
          y + 40
        );

        context.stroke();
      }
    }

    /* Obstacles */

    objectsRef.current.forEach(
      (object) => {
        context.save();

        context.translate(
          object.x,
          object.y
        );

        context.shadowBlur = 20;
        context.shadowColor =
          object.color;

        context.fillStyle =
          object.color;

        context.beginPath();

        context.roundRect(
          -object.width / 2,
          -object.height / 2,
          object.width,
          object.height,
          8
        );

        context.fill();

        context.shadowBlur = 0;

        context.fillStyle =
          "rgba(0,0,0,0.45)";

        context.fillRect(
          -object.width / 2 + 6,
          -object.height / 2 + 10,
          object.width - 12,
          8
        );

        context.restore();
      }
    );

    /* Player car */

    context.save();

    context.translate(
      player.x,
      player.y
    );

    if (
      player.invulnerable > 0 &&
      Math.floor(
        player.invulnerable * 12
      ) %
        2 ===
        0
    ) {
      context.globalAlpha = 0.4;
    }

    context.shadowBlur = 30;
    context.shadowColor =
      colors.primary;

    context.fillStyle =
      colors.primary;

    context.beginPath();

    context.roundRect(
      -15,
      -27,
      30,
      55,
      9
    );

    context.fill();

    context.shadowBlur = 0;

    context.fillStyle =
      "#020617";

    context.beginPath();

    context.roundRect(
      -9,
      -12,
      18,
      17,
      4
    );

    context.fill();

    context.fillStyle =
      "#f8fafc";

    context.fillRect(
      -12,
      18,
      6,
      5
    );

    context.fillRect(
      6,
      18,
      6,
      5
    );

    context.restore();
  };

  /* =====================================================
     DRAW ADVENTURE
  ===================================================== */

  const drawAdventure = (
    context,
    width,
    height
  ) => {
    const player =
      playerRef.current;

    /* terrain circles */

    for (let i = 0; i < 30; i += 1) {
      const x =
        (i * 137) %
        width;

      const y =
        (i * 83) %
        height;

      context.fillStyle =
        i % 2 === 0
          ? "rgba(34,197,94,0.06)"
          : "rgba(168,85,247,0.06)";

      context.beginPath();

      context.arc(
        x,
        y,
        20 + (i % 5) * 8,
        0,
        Math.PI * 2
      );

      context.fill();
    }

    /* objects */

    objectsRef.current.forEach(
      (object) => {
        context.save();

        context.translate(
          object.x,
          object.y
        );

        context.rotate(
          object.rotation
        );

        if (
          object.type ===
          "crystal"
        ) {
          context.shadowBlur = 25;
          context.shadowColor =
            "#22c55e";

          context.fillStyle =
            "#22c55e";

          context.beginPath();

          context.moveTo(
            0,
            -object.radius
          );

          context.lineTo(
            object.radius,
            0
          );

          context.lineTo(
            0,
            object.radius
          );

          context.lineTo(
            -object.radius,
            0
          );

          context.closePath();

          context.fill();
        } else {
          context.shadowBlur = 25;
          context.shadowColor =
            "#ef4444";

          context.strokeStyle =
            "#ef4444";

          context.fillStyle =
            "#16070d";

          context.lineWidth = 3;

          context.beginPath();

          context.arc(
            0,
            0,
            object.radius,
            0,
            Math.PI * 2
          );

          context.fill();
          context.stroke();

          context.fillStyle =
            "#ef4444";

          context.fillRect(
            -3,
            -3,
            6,
            6
          );
        }

        context.restore();
      }
    );

    /* player */

    context.save();

    context.translate(
      player.x,
      player.y
    );

    context.shadowBlur = 30;
    context.shadowColor =
      "#a855f7";

    context.fillStyle =
      "#8b5cf6";

    context.beginPath();

    context.arc(
      0,
      0,
      player.radius,
      0,
      Math.PI * 2
    );

    context.fill();

    context.shadowBlur = 0;

    context.fillStyle =
      "#020617";

    context.beginPath();

    context.arc(
      0,
      0,
      player.radius - 6,
      0,
      Math.PI * 2
    );

    context.fill();

    context.restore();
  };

  /* =====================================================
     DRAW STRATEGY
  ===================================================== */

  const drawStrategy = (
    context,
    width,
    height
  ) => {
    context.save();

    context.strokeStyle =
      "rgba(59,130,246,0.12)";

    context.lineWidth = 1;

    for (
      let x = 0;
      x < width;
      x += 55
    ) {
      context.beginPath();

      context.moveTo(x, 0);
      context.lineTo(x, height);

      context.stroke();
    }

    for (
      let y = 0;
      y < height;
      y += 55
    ) {
      context.beginPath();

      context.moveTo(0, y);
      context.lineTo(width, y);

      context.stroke();
    }

    context.restore();

    objectsRef.current.forEach(
      (base) => {
        let color =
          "#64748b";

        if (
          base.owner ===
          "player"
        ) {
          color = "#3b82f6";
        }

        if (
          base.owner ===
          "enemy"
        ) {
          color = "#ef4444";
        }

        context.save();

        context.shadowBlur = 25;
        context.shadowColor =
          color;

        context.fillStyle =
          "rgba(2,6,23,0.9)";

        context.strokeStyle =
          color;

        context.lineWidth = 3;

        context.beginPath();

        context.arc(
          base.x,
          base.y,
          base.radius,
          0,
          Math.PI * 2
        );

        context.fill();
        context.stroke();

        context.shadowBlur = 0;

        context.fillStyle =
          color;

        context.beginPath();

        context.arc(
          base.x,
          base.y,
          9,
          0,
          Math.PI * 2
        );

        context.fill();

        context.restore();

        /* capture bar */

        context.fillStyle =
          "rgba(255,255,255,0.08)";

        context.fillRect(
          base.x - 28,
          base.y + 38,
          56,
          5
        );

        context.fillStyle =
          color;

        context.fillRect(
          base.x - 28,
          base.y + 38,
          56 *
            (base.capture / 100),
          5
        );
      }
    );

    /* center command */

    context.save();

    context.strokeStyle =
      "rgba(34,211,238,0.4)";

    context.setLineDash([
      6,
      8
    ]);

    context.beginPath();

    context.arc(
      width / 2,
      height / 2,
      80,
      0,
      Math.PI * 2
    );

    context.stroke();

    context.restore();
  };

  /* =====================================================
     DRAW SHOOTER
  ===================================================== */

  const drawShooter = (
    context,
    width,
    height
  ) => {
    objectsRef.current.forEach(
      (enemy) => {
        if (
          enemy.type !==
          "enemy"
        ) {
          return;
        }

        context.save();

        context.translate(
          enemy.x,
          enemy.y
        );

        context.rotate(
          enemy.rotation
        );

        context.shadowBlur = 25;

        context.shadowColor =
          colors.danger;

        context.strokeStyle =
          colors.danger;

        context.fillStyle =
          "#020617";

        context.lineWidth = 3;

        context.beginPath();

        context.moveTo(
          0,
          -enemy.radius
        );

        context.lineTo(
          enemy.radius,
          0
        );

        context.lineTo(
          0,
          enemy.radius
        );

        context.lineTo(
          -enemy.radius,
          0
        );

        context.closePath();

        context.fill();
        context.stroke();

        context.restore();

        context.fillStyle =
          "rgba(255,255,255,0.1)";

        context.fillRect(
          enemy.x - 15,
          enemy.y - 25,
          30,
          3
        );

        context.fillStyle =
          colors.danger;

        context.fillRect(
          enemy.x - 15,
          enemy.y - 25,
          15,
          3
        );
      }
    );

    bulletsRef.current.forEach(
      (bullet) => {
        context.save();

        context.shadowBlur = 18;

        context.shadowColor =
          colors.secondary;

        context.fillStyle =
          colors.secondary;

        context.beginPath();

        context.arc(
          bullet.x,
          bullet.y,
          bullet.radius,
          0,
          Math.PI * 2
        );

        context.fill();

        context.restore();
      }
    );

    const player =
      playerRef.current;

    const mouse =
      mouseRef.current;

    const angle =
      Math.atan2(
        mouse.y - player.y,
        mouse.x - player.x
      );

    context.save();

    context.translate(
      player.x,
      player.y
    );

    context.rotate(angle);

    if (
      player.invulnerable > 0 &&
      Math.floor(
        player.invulnerable * 15
      ) %
        2 ===
        0
    ) {
      context.globalAlpha = 0.35;
    }

    context.shadowBlur = 35;

    context.shadowColor =
      colors.primary;

    context.fillStyle =
      colors.primary;

    context.beginPath();

    context.arc(
      0,
      0,
      player.radius,
      0,
      Math.PI * 2
    );

    context.fill();

    context.shadowBlur = 0;

    context.fillStyle =
      "#020617";

    context.beginPath();

    context.arc(
      0,
      0,
      player.radius - 5,
      0,
      Math.PI * 2
    );

    context.fill();

    context.fillStyle =
      colors.secondary;

    context.fillRect(
      7,
      -4,
      28,
      8
    );

    context.restore();

    /* Crosshair */

    if (
      mouse.x > 0 &&
      mouse.y > 0
    ) {
      context.save();

      context.strokeStyle =
        "rgba(255,255,255,0.75)";

      context.lineWidth = 1;

      context.beginPath();

      context.arc(
        mouse.x,
        mouse.y,
        12,
        0,
        Math.PI * 2
      );

      context.stroke();

      context.beginPath();

      context.moveTo(
        mouse.x - 20,
        mouse.y
      );

      context.lineTo(
        mouse.x - 6,
        mouse.y
      );

      context.moveTo(
        mouse.x + 6,
        mouse.y
      );

      context.lineTo(
        mouse.x + 20,
        mouse.y
      );

      context.moveTo(
        mouse.x,
        mouse.y - 20
      );

      context.lineTo(
        mouse.x,
        mouse.y - 6
      );

      context.moveTo(
        mouse.x,
        mouse.y + 6
      );

      context.lineTo(
        mouse.x,
        mouse.y + 20
      );

      context.stroke();

      context.restore();
    }
  };

  /* =====================================================
     DRAW PARTICLES
  ===================================================== */

  const drawParticles = (
    context
  ) => {
    particlesRef.current.forEach(
      (particle) => {
        const alpha =
          Math.max(
            0,
            particle.life /
              particle.maxLife
          );

        let color =
          colors.primary;

        if (
          particle.type ===
          "damage"
        ) {
          color =
            colors.danger;
        }

        if (
          particle.type ===
          "crystal"
        ) {
          color =
            "#22c55e";
        }

        if (
          particle.type ===
          "level"
        ) {
          color =
            "#facc15";
        }

        context.save();

        context.globalAlpha =
          alpha;

        context.fillStyle = color;

        context.shadowBlur = 12;

        context.shadowColor =
          color;

        context.beginPath();

        context.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        context.fill();

        context.restore();
      }
    );
  };

  /* =====================================================
     DRAW
  ===================================================== */

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context =
      canvas.getContext("2d");

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    context.clearRect(
      0,
      0,
      width,
      height
    );

    drawBackground(
      context,
      width,
      height
    );

    if (
      mode === "racing" ||
      mode === "speed"
    ) {
      drawRacing(
        context,
        width,
        height
      );
    } else if (
      mode === "adventure"
    ) {
      drawAdventure(
        context,
        width,
        height
      );
    } else if (
      mode === "strategy"
    ) {
      drawStrategy(
        context,
        width,
        height
      );
    } else {
      drawGrid(
        context,
        width,
        height
      );

      drawShooter(
        context,
        width,
        height
      );
    }

    drawParticles(context);
  }, [
    mode,
  ]);

  /* =====================================================
     GAME LOOP
  ===================================================== */

  useEffect(() => {
    resizeCanvas();
    resetGame();

    const resize = () => {
      resizeCanvas();
    };

    window.addEventListener(
      "resize",
      resize
    );

    const loop = (time) => {
      const delta = Math.min(
        (time -
          lastTimeRef.current) /
          1000,
        0.035
      );

      lastTimeRef.current =
        time;

      if (
        !paused &&
        !gameOver
      ) {
        updateGame(delta);
      }

      drawGame();

      animationRef.current =
        requestAnimationFrame(
          loop
        );
    };

    animationRef.current =
      requestAnimationFrame(
        loop
      );

    return () => {
      window.removeEventListener(
        "resize",
        resize
      );

      cancelAnimationFrame(
        animationRef.current
      );
    };
  }, [
    drawGame,
    gameOver,
    paused,
    resetGame,
    resizeCanvas,
    updateGame,
  ]);

  /* =====================================================
     KEYBOARD
  ===================================================== */

  useEffect(() => {
    const keyDown = (event) => {
      const key =
        event.key.length === 1
          ? event.key.toLowerCase()
          : event.key;

      keysRef.current[key] =
        true;

      if (
        key === " " ||
        key === "Spacebar"
      ) {
        event.preventDefault();

        if (
          mode === "shooter" ||
          mode === "tactical"
        ) {
          shoot();
        }
      }

      if (
        key === "p" ||
        key === "Escape"
      ) {
        if (!gameOver) {
          setPaused(
            (value) => !value
          );
        }
      }
    };

    const keyUp = (event) => {
      const key =
        event.key.length === 1
          ? event.key.toLowerCase()
          : event.key;

      keysRef.current[key] =
        false;
    };

    window.addEventListener(
      "keydown",
      keyDown
    );

    window.addEventListener(
      "keyup",
      keyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        keyDown
      );

      window.removeEventListener(
        "keyup",
        keyUp
      );
    };
  }, [
    gameOver,
    mode,
    shoot,
  ]);

  /* =====================================================
     MOUSE
  ===================================================== */

  const updateMouse = (
    event
  ) => {
    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const rect =
      canvas.getBoundingClientRect();

    mouseRef.current.x =
      event.clientX -
      rect.left;

    mouseRef.current.y =
      event.clientY -
      rect.top;
  };

  /* =====================================================
     STRATEGY CLICK
  ===================================================== */

  const handleCanvasClick = (
    event
  ) => {
    if (
      mode !== "strategy"
    ) {
      return;
    }

    const canvas =
      canvasRef.current;

    if (!canvas) return;

    const rect =
      canvas.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const y =
      event.clientY -
      rect.top;

    const player =
      playerRef.current;

    objectsRef.current.forEach(
      (base) => {
        const distance =
          Math.hypot(
            x - base.x,
            y - base.y
          );

        if (
          distance <
          base.radius + 15
        ) {
          if (
            base.owner !==
            "player"
          ) {
            if (
              player.energy >=
              20
            ) {
              player.energy -= 20;
              base.owner =
                "player";
              base.capture = 20;

              player.territory =
                Math.min(
                  100,
                  player.territory +
                    10
                );

              player.score +=
                250;

              particles(
                base.x,
                base.y,
                25,
                "level"
              );

              playSound(
                700,
                0.12
              );
            }
          }
        }
      }
    );
  };

  const handleMouseDown = (
    event
  ) => {
    updateMouse(event);

    if (
      mode === "strategy"
    ) {
      handleCanvasClick(event);
      return;
    }

    mouseRef.current.down =
      true;

    shoot();
  };

  const handleMouseUp = () => {
    mouseRef.current.down =
      false;
  };

  /* =====================================================
     FULLSCREEN
  ===================================================== */

  const toggleFullscreen =
    async () => {
      try {
        if (
          !document.fullscreenElement
        ) {
          await containerRef.current?.requestFullscreen();

          setFullscreen(true);
        } else {
          await document.exitFullscreen();

          setFullscreen(false);
        }
      } catch {
        setFullscreen(false);
      }
    };

  /* =====================================================
     EXIT
  ===================================================== */

  const exitGame = () => {
    if (
      document.fullscreenElement
    ) {
      document
        .exitFullscreen()
        .catch(() => {});
    }

    if (audioRef.current) {
      try {
        audioRef.current.close();
      } catch {
        // Ignore.
      }
    }

    if (
      typeof onExit ===
      "function"
    ) {
      onExit();
    }
  };

  /* =====================================================
     GAME ICON
  ===================================================== */

  const GameIcon =
    mode === "racing" ||
    mode === "speed"
      ? Car
      : mode === "adventure"
        ? Sparkles
        : mode === "strategy"
          ? Swords
          : Crosshair;

  /* =====================================================
     GAME DESCRIPTION
  ===================================================== */

  const getDescription = () => {
    if (mode === "racing") {
      return "Race through neon streets";
    }

    if (mode === "speed") {
      return "Push your speed to the limit";
    }

    if (mode === "adventure") {
      return "Explore the Shadow Realm";
    }

    if (mode === "strategy") {
      return "Capture the battlefield";
    }

    if (mode === "tactical") {
      return "Complete the tactical mission";
    }

    return "Survive the cyber assault";
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] overflow-hidden bg-black text-white"
    >
      {/* HEADER */}

      <header className="absolute left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-black/55 px-3 backdrop-blur-xl sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={exitGame}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
            title="Exit game"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
            <GameIcon
              size={18}
              style={{
                color:
                  colors.primary,
              }}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{
                  backgroundColor:
                    colors.secondary,
                  boxShadow: `0 0 12px ${colors.secondary}`,
                }}
              />

              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40">
                Live Gameplay
              </span>
            </div>

            <h1 className="truncate text-sm font-black sm:text-base">
              {gameName}
            </h1>
          </div>
        </div>

        {/* DESKTOP STATS */}

        <div className="hidden items-center gap-2 lg:flex">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
              Score
            </p>

            <p
              className="text-sm font-black"
              style={{
                color:
                  colors.secondary,
              }}
            >
              {stats.score.toLocaleString()}
            </p>
          </div>

          {mode === "racing" ||
          mode === "speed" ? (
            <>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                  Speed
                </p>

                <p className="text-sm font-black text-white">
                  {stats.speed}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                  Lap
                </p>

                <p className="text-sm font-black text-white">
                  {stats.lap}/
                  {stats.totalLaps}
                </p>
              </div>
            </>
          ) : mode ===
            "adventure" ? (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                Crystals
              </p>

              <p className="text-sm font-black text-green-400">
                {stats.crystals}/8
              </p>
            </div>
          ) : mode ===
            "strategy" ? (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                Territory
              </p>

              <p className="text-sm font-black text-blue-400">
                {stats.territory}%
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-white/30">
                Level
              </p>

              <p className="text-sm font-black text-violet-400">
                {stats.level}
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() =>
              setSoundEnabled(
                (value) => !value
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white sm:h-10 sm:w-10"
            title={
              soundEnabled
                ? "Mute"
                : "Enable sound"
            }
          >
            {soundEnabled ? (
              <Volume2 size={17} />
            ) : (
              <VolumeX size={17} />
            )}
          </button>

          <button
            type="button"
            onClick={
              toggleFullscreen
            }
            className="hidden h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white sm:flex"
            title="Fullscreen"
          >
            <Maximize size={17} />
          </button>

          <button
            type="button"
            onClick={() =>
              setPaused(
                (value) => !value
              )
            }
            disabled={gameOver}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white disabled:opacity-30 sm:h-10 sm:w-10"
            title={
              paused
                ? "Resume"
                : "Pause"
            }
          >
            {paused ? (
              <Play
                size={17}
                fill="currentColor"
              />
            ) : (
              <Pause size={17} />
            )}
          </button>
        </div>
      </header>

      {/* CANVAS */}

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full touch-none ${
          mode === "strategy"
            ? "cursor-pointer"
            : "cursor-none"
        }`}
        onMouseMove={updateMouse}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          mouseRef.current.down =
            false;
        }}
        onContextMenu={(event) =>
          event.preventDefault()
        }
      />

      {/* GAME MODE LABEL */}

      <div className="absolute left-4 top-20 z-20 hidden sm:block">
        <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-2 backdrop-blur-xl">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
            Mission
          </p>

          <p className="mt-1 text-xs font-bold text-white/70">
            {getDescription()}
          </p>
        </div>
      </div>

      {/* BOTTOM HUD */}

      <div className="absolute bottom-5 left-4 z-30 w-72 max-w-[calc(100%-2rem)]">
        {/* HEALTH */}

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield
              size={13}
              className="text-emerald-400"
            />

            <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
              Health
            </span>
          </div>

          <span className="text-[10px] font-black text-emerald-300">
            {stats.health}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all"
            style={{
              width: `${stats.health}%`,
            }}
          />
        </div>

        {/* SECOND BAR */}

        {mode === "racing" ||
        mode === "speed" ? (
          <>
            <div className="mb-2 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap
                  size={13}
                  className="text-yellow-400"
                />

                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                  Nitro
                </span>
              </div>

              <span className="text-[10px] font-black text-yellow-300">
                {Math.floor(
                  playerRef.current
                    .nitro || 0
                )}
                %
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-red-500"
                style={{
                  width: `${playerRef.current.nitro || 0}%`,
                }}
              />
            </div>
          </>
        ) : mode ===
          "strategy" ? (
          <>
            <div className="mb-2 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy
                  size={13}
                  className="text-blue-400"
                />

                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                  Territory
                </span>
              </div>

              <span className="text-[10px] font-black text-blue-300">
                {stats.territory}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{
                  width: `${stats.territory}%`,
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap
                  size={13}
                  className="text-violet-400"
                />

                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">
                  Energy
                </span>
              </div>

              <span className="text-[10px] font-black text-violet-300">
                {stats.energy}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400"
                style={{
                  width: `${stats.energy}%`,
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* CONTROLS */}

      <div className="absolute bottom-5 right-5 z-30 hidden rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl lg:block">
        <p className="mb-3 text-[8px] font-black uppercase tracking-[0.2em] text-white/30">
          Controls
        </p>

        <div className="space-y-2 text-[10px] font-bold text-white/50">
          {mode === "strategy" ? (
            <>
              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  CLICK
                </span>

                Capture Base
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  P
                </span>

                Pause
              </div>
            </>
          ) : mode === "racing" ||
            mode === "speed" ? (
            <>
              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  WASD
                </span>

                Steer
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  SHIFT
                </span>

                Nitro
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  P
                </span>

                Pause
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  WASD
                </span>

                Move
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  MOUSE
                </span>

                Aim
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded border border-white/10 bg-white/5 px-2 py-1 text-white/70">
                  CLICK
                </span>

                Shoot
              </div>
            </>
          )}
        </div>
      </div>

      {/* PAUSED */}

      {paused && !gameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950/95 p-7 text-center">
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor:
                  `${colors.primary}18`,
                color:
                  colors.primary,
              }}
            >
              <Pause size={28} />
            </div>

            <p className="mt-5 text-[9px] font-black uppercase tracking-[0.25em] text-white/30">
              Session Paused
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Game Paused
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Your progress is safe.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setPaused(false)
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white transition hover:brightness-110"
                style={{
                  backgroundColor:
                    colors.primary,
                }}
              >
                <Play
                  size={16}
                  fill="currentColor"
                />
                Resume
              </button>

              <button
                type="button"
                onClick={exitGame}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER */}

      {gameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-lg">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/95 p-7 text-center shadow-2xl">
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
              style={{
                backgroundColor:
                  `${colors.primary}18`,
                color:
                  colors.primary,
              }}
            >
              {mode ===
              "racing" ||
              mode === "speed" ? (
                <Trophy size={36} />
              ) : (
                <Gamepad2 size={36} />
              )}
            </div>

            <p
              className="mt-5 text-[9px] font-black uppercase tracking-[0.25em]"
              style={{
                color:
                  colors.primary,
              }}
            >
              {mode ===
                "racing" ||
              mode === "speed"
                ? "Race Finished"
                : "Session Complete"}
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {mode ===
                "racing" ||
              mode === "speed"
                ? "Finish!"
                : "Game Over"}
            </h2>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Sparkles
                  size={17}
                  className="mx-auto text-cyan-400"
                />

                <p className="mt-2 text-lg font-black">
                  {stats.score.toLocaleString()}
                </p>

                <p className="text-[8px] uppercase tracking-widest text-white/30">
                  Score
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Zap
                  size={17}
                  className="mx-auto text-violet-400"
                />

                <p className="mt-2 text-lg font-black">
                  {stats.level}
                </p>

                <p className="text-[8px] uppercase tracking-widest text-white/30">
                  Level
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Trophy
                  size={17}
                  className="mx-auto text-yellow-400"
                />

                <p className="mt-2 text-lg font-black">
                  {mode ===
                    "racing" ||
                  mode === "speed"
                    ? `${stats.lap}/${stats.totalLaps}`
                    : mode ===
                        "adventure"
                      ? stats.crystals
                      : mode ===
                          "strategy"
                        ? `${stats.territory}%`
                        : stats.kills}
                </p>

                <p className="text-[8px] uppercase tracking-widest text-white/30">
                  {mode ===
                    "racing" ||
                  mode === "speed"
                    ? "Laps"
                    : mode ===
                        "adventure"
                      ? "Crystals"
                      : mode ===
                          "strategy"
                        ? "Territory"
                        : "Kills"}
                </p>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={resetGame}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-black text-white transition hover:brightness-110"
                style={{
                  backgroundColor:
                    colors.primary,
                }}
              >
                <RotateCcw size={17} />
                Play Again
              </button>

              <button
                type="button"
                onClick={exitGame}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE CONTROLS */}

      {(mode === "racing" ||
        mode === "speed" ||
        mode === "adventure" ||
        mode === "shooter" ||
        mode === "tactical") && (
        <div className="absolute bottom-5 right-5 z-30 flex h-32 w-32 lg:hidden">
          <button
            type="button"
            onTouchStart={() => {
              keysRef.current.w = true;
              keysRef.current.ArrowUp = true;
            }}
            onTouchEnd={() => {
              keysRef.current.w = false;
              keysRef.current.ArrowUp = false;
            }}
            className="absolute left-1/2 top-0 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/70 active:bg-white/20"
          >
            ▲
          </button>

          <button
            type="button"
            onTouchStart={() => {
              keysRef.current.a = true;
              keysRef.current.ArrowLeft = true;
            }}
            onTouchEnd={() => {
              keysRef.current.a = false;
              keysRef.current.ArrowLeft = false;
            }}
            className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/70 active:bg-white/20"
          >
            ◀
          </button>

          <button
            type="button"
            onTouchStart={() => {
              keysRef.current.d = true;
              keysRef.current.ArrowRight = true;
            }}
            onTouchEnd={() => {
              keysRef.current.d = false;
              keysRef.current.ArrowRight = false;
            }}
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/70 active:bg-white/20"
          >
            ▶
          </button>

          <button
            type="button"
            onTouchStart={() => {
              keysRef.current.s = true;
              keysRef.current.ArrowDown = true;
            }}
            onTouchEnd={() => {
              keysRef.current.s = false;
              keysRef.current.ArrowDown = false;
            }}
            className="absolute bottom-0 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white/70 active:bg-white/20"
          >
            ▼
          </button>
        </div>
      )}

      {/* MOBILE SHOOT */}

      {(mode === "shooter" ||
        mode === "tactical") && (
        <button
          type="button"
          onTouchStart={() => {
            mouseRef.current.x =
              canvasRef.current
                ?.clientWidth / 2;

            mouseRef.current.y =
              canvasRef.current
                ?.clientHeight / 2;

            mouseRef.current.down =
              true;

            shoot();
          }}
          onTouchEnd={() => {
            mouseRef.current.down =
              false;
          }}
          className="absolute bottom-9 right-40 z-30 flex h-16 w-16 items-center justify-center rounded-full border border-fuchsia-400/30 bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_0_30px_rgba(217,70,239,0.25)] lg:hidden"
        >
          <Crosshair size={24} />
        </button>
      )}
    </div>
  );
}

export default GamePlayer;