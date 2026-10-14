// 3 Main Flagship Projects on Display (Simple English, No 3D link)
export const flagshipProjects = [
  {
    id: "trackeasy",
    title: "TrackEasy",
    category: "Android App",
    badge: "Live on Google Play",
    status: "Live on Google Play",
    isProductionApp: true,
    description:
      "A personal expense and budget tracking app published on the Google Play Store. Built with Kotlin and Jetpack Compose, it saves data locally for offline use and syncs with Firebase in real time.",
    image: "/projects/trackeasy.svg",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Room DB"],
    demoUrl: "https://play.google.com/store/apps/details?id=com.kishan.trackeasy",
    githubUrl: "",
    featured: true,
    highlights: [
      "Published and available on the official Google Play Store",
      "Modern and easy-to-use UI built with Jetpack Compose",
      "Works completely offline and syncs with Firebase when online",
      "Clean MVVM code architecture with Kotlin Coroutines",
      "Fast, lightweight, and zero crashes in production"
    ]
  },
  {
    id: "maunam",
    title: "Maunam: The Silent God",
    category: "3D Mobile Horror Game",
    badge: "In Development",
    status: "In Development",
    description:
      "A 3D mobile horror game developed in Unity and C#. It uses your phone's microphone to detect real-life noise—if you make a sound in real life, the in-game monster hears you and hunts you down.",
    image: "/projects/maunam.svg",
    tags: ["Unity 3D", "C#", "Game AI", "Mic Acoustics"],
    demoUrl: "",
    githubUrl: "",
    featured: true,
    highlights: [
      "First-person 3D mobile horror experience built in Unity",
      "Real-time microphone noise detection makes player silence critical",
      "Smart monster AI with patrol, alert, and hunting behaviors",
      "3D spatial sound and dark atmospheric lighting",
      "Optimized for smooth performance on mobile phones"
    ]
  },
  {
    id: "attendmate-android",
    title: "AttendMate Android",
    category: "Android App",
    badge: "Completed",
    status: "Completed",
    description:
      "An Android app that helps college students track their daily class attendance, view percentage stats, and receive warning alerts when attendance drops below minimum requirements.",
    image: "/projects/attendmate-android.svg",
    tags: ["Kotlin", "Android Studio", "Firebase", "Clean UI"],
    demoUrl: "",
    githubUrl: "https://github.com/kishanpokal/AttendMate2",
    featured: true,
    highlights: [
      "Daily attendance tracking for all subjects and lectures",
      "Automatic attendance percentage calculation and safe-bunk tracker",
      "Low attendance alerts to help students maintain minimum criteria",
      "Real-time cloud database backup with Firebase",
      "Clean, modern Android interface that is easy to navigate"
    ]
  }
];

// Project Archive: Earlier Builds & Web Projects
export const archivedProjects = [
  {
    year: "2024",
    title: "Habit Tracker (HabitFlow)",
    category: "Web App",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    summary: "Simple web app to build positive daily habits, track streaks, and view progress over time.",
    githubUrl: "https://github.com/kishanpokal/habit-tracker-web",
    demoUrl: "https://habitflowweb.vercel.app/"
  },
  {
    year: "2024",
    title: "ThreatLens AI",
    category: "AI Web Platform",
    stack: ["Python", "FastAPI", "PyTorch", "React"],
    summary: "AI tool that scans web links and emails to detect phishing scams and cyber security threats.",
    githubUrl: "https://github.com/kishanpokal/ThreatLens",
    demoUrl: ""
  },
  {
    year: "2024",
    title: "Multiplayer Cricket Game",
    category: "Web Game",
    stack: ["React", "TypeScript", "Firebase"],
    summary: "Online multiplayer cricket game playable in the browser with match lobbies and live scores.",
    githubUrl: "https://github.com/kishanpokal/Cricket-Game",
    demoUrl: "https://cricketbuzz-web.vercel.app/"
  },
  {
    year: "2024",
    title: "AttendMate Web",
    category: "Web App",
    stack: ["JavaScript", "HTML5", "CSS3"],
    summary: "Web dashboard for students and teachers to view and manage class attendance records.",
    githubUrl: "https://github.com/kishanpokal/attendmate-web",
    demoUrl: "https://attendmateweb.vercel.app/"
  },
  {
    year: "2023",
    title: "Online Book Store",
    category: "Web App",
    stack: ["PHP", "MySQL", "JavaScript"],
    summary: "E-commerce book shopping website with cart, checkout, book catalog, and user accounts.",
    githubUrl: "https://github.com/kishanpokal/Online_Book_Selling_System",
    demoUrl: ""
  },
  {
    year: "2023",
    title: "Tourism Booking System",
    category: "Java App",
    stack: ["Java", "JSP", "MySQL"],
    summary: "Travel website for booking hotel rooms, tour packages, and transport.",
    githubUrl: "https://github.com/kishanpokal/TourismManagementSystem-JSP",
    demoUrl: ""
  }
];

export const projects = [...flagshipProjects];
