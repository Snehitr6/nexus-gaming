export const stats = [
  {
    title: "Current Level",
    value: "42",
    change: "+3",
    positive: true,
    icon: "level",
    subtitle: "levels this season",
  },
  {
    title: "Total XP",
    value: "18,450",
    change: "+12.8%",
    positive: true,
    icon: "xp",
    subtitle: "this month",
  },
  {
    title: "Games Played",
    value: "27",
    change: "+4",
    positive: true,
    icon: "games",
    subtitle: "in your library",
  },
  {
    title: "Achievements",
    value: "84",
    change: "+9",
    positive: true,
    icon: "achievements",
    subtitle: "unlocked",
  },
];

export const games = [
  {
    id: 1,
    title: "Cyber Horizon",
    genre: "Action RPG",
    platform: "PC",
    progress: 74,
    rating: 4.9,
    players: "12.4K",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore a neon-powered future where every decision shapes the city.",
    status: "Playing",
  },
  {
    id: 2,
    title: "Neon Racers",
    genre: "Racing",
    platform: "PC / Console",
    progress: 48,
    rating: 4.7,
    players: "8.7K",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85",
    description:
      "Race through futuristic cities and dominate the neon streets.",
    status: "Playing",
  },
  {
    id: 3,
    title: "Shadow Realm",
    genre: "Adventure",
    platform: "PC",
    progress: 92,
    rating: 4.8,
    players: "6.3K",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    description:
      "Enter a mysterious world filled with ancient secrets and powerful enemies.",
    status: "Almost Complete",
  },
  {
    id: 4,
    title: "Aether Wars",
    genre: "Strategy",
    platform: "PC",
    progress: 31,
    rating: 4.6,
    players: "5.9K",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=1200&q=85",
    description:
      "Build your empire, command your forces, and conquer the unknown.",
    status: "Playing",
  },
  {
    id: 5,
    title: "Velocity X",
    genre: "Racing",
    platform: "Console",
    progress: 18,
    rating: 4.5,
    players: "4.2K",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
    description:
      "Push your driving skills beyond the limit in extreme futuristic races.",
    status: "New",
  },
  {
    id: 6,
    title: "Dark Protocol",
    genre: "Shooter",
    platform: "PC / Console",
    progress: 56,
    rating: 4.8,
    players: "18.2K",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=85",
    description:
      "Join an elite squad and uncover the secret behind a global cyber war.",
    status: "Playing",
  },
];

export const chartData = [
  { day: "Mon", hours: 2.4 },
  { day: "Tue", hours: 3.8 },
  { day: "Wed", hours: 1.9 },
  { day: "Thu", hours: 4.6 },
  { day: "Fri", hours: 3.2 },
  { day: "Sat", hours: 6.4 },
  { day: "Sun", hours: 5.1 },
];

export const activities = [
  {
    id: 1,
    type: "achievement",
    title: "Achievement unlocked",
    description: "Cyber Horizon — Neon Master",
    time: "12 minutes ago",
    initials: "CH",
  },
  {
    id: 2,
    type: "game",
    title: "Game completed",
    description: "Shadow Realm — Chapter 8",
    time: "1 hour ago",
    initials: "SR",
  },
  {
    id: 3,
    type: "friend",
    title: "Friend joined",
    description: "Ryan joined your gaming session",
    time: "2 hours ago",
    initials: "RY",
  },
  {
    id: 4,
    type: "level",
    title: "Level increased",
    description: "You reached Level 42",
    time: "Yesterday",
    initials: "42",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Neon Master",
    description: "Complete 50 missions",
    progress: 100,
    unlocked: true,
    icon: "⚡",
  },
  {
    id: 2,
    title: "Speed Demon",
    description: "Win 10 racing events",
    progress: 80,
    unlocked: false,
    icon: "🏎️",
  },
  {
    id: 3,
    title: "Explorer",
    description: "Discover 100 locations",
    progress: 62,
    unlocked: false,
    icon: "🌎",
  },
  {
    id: 4,
    title: "Elite Player",
    description: "Reach Level 50",
    progress: 84,
    unlocked: false,
    icon: "👑",
  },
];

export const notifications = [
  {
    id: 1,
    title: "Achievement unlocked",
    message: "You unlocked Neon Master.",
    time: "12 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Friend request",
    message: "Ryan wants to join your gaming circle.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Weekly challenge",
    message: "A new weekly challenge is available.",
    time: "3 hours ago",
    unread: false,
  },
];

export const friends = [
  {
    id: 1,
    name: "Ryan Cooper",
    initials: "RC",
    status: "Playing Cyber Horizon",
    online: true,
  },
  {
    id: 2,
    name: "Emma Wilson",
    initials: "EW",
    status: "Online",
    online: true,
  },
  {
    id: 3,
    name: "Noah Davis",
    initials: "ND",
    status: "Playing Neon Racers",
    online: true,
  },
  {
    id: 4,
    name: "Sophia Lee",
    initials: "SL",
    status: "Offline",
    online: false,
  },
];

export const transactions = [
  {
    id: "GAME-8241",
    customer: "Cyber Horizon",
    initials: "CH",
    amount: 74,
    status: "Playing",
    date: "Today",
  },
  {
    id: "GAME-8240",
    customer: "Neon Racers",
    initials: "NR",
    amount: 48,
    status: "Playing",
    date: "Today",
  },
  {
    id: "GAME-8239",
    customer: "Shadow Realm",
    initials: "SR",
    amount: 92,
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: "GAME-8238",
    customer: "Aether Wars",
    initials: "AW",
    amount: 31,
    status: "Playing",
    date: "Yesterday",
  },
];

const dashboardData = {
  stats,
  games,
  chartData,
  activities,
  achievements,
  notifications,
  friends,
  transactions,
};

export default dashboardData;