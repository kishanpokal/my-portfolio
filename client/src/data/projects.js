// Shared project data — used by ProjectsSection and HeroSection (for dynamic count)
export const projects = [
    {
        id: 1,
        title: "TrackEasy",
        category: "Android Application",
        description: "TrackEasy is an Android application designed to help users track daily activities such as expenses and personal data in an organized way. The app focuses on simplicity and usability while allowing users to record information quickly and monitor their records efficiently.",
        image: "/projects/trackeasy.svg",
        tags: ["Kotlin", "Android Studio", "Firebase", "Jetpack Compose"],
        demoUrl: "https://play.google.com/store/apps/details?id=com.kishan.trackeasy",
        githubUrl: "",
        featured: true,
        accentColor: "from-emerald-500 to-teal-600",
        status: "Completed",
        highlights: [
            "Simple and intuitive expense/activity tracking interface",
            "Real-time data storage using Firebase",
            "Modern Android UI built with Jetpack Compose"
        ]
    },
    {
        id: 2,
        title: "Maunam: The Silent God",
        category: "Game Development",
        description: "Maunam: The Silent God is a 3D mobile first-person horror game. Built to deliver a terrifying experience, it features atmospheric environments and unique microphone-based mechanics where real-life noise alerts the entity.",
        image: "/projects/maunam.svg",
        tags: ["Unity", "C#", "3D Mobile Game", "Horror"],
        demoUrl: "#",
        githubUrl: "",
        featured: true,
        accentColor: "from-red-500 to-rose-600",
        status: "In Development",
        highlights: [
            "First-person 3D mobile horror experience",
            "Unique microphone detection gameplay mechanics",
            "Atmospheric audio design and immersive environments"
        ]
    },
    {
        id: 7,
        title: "AttendMate Web",
        category: "Web Application",
        description: "AttendMate Web is a web-based attendance management system designed for tracking and managing student attendance records. It provides an interface for maintaining attendance data and monitoring attendance performance.",
        image: "/projects/attendmate-web.svg",
        tags: ["JavaScript", "Web Development", "Frontend Development"],
        demoUrl: "https://attendmateweb.vercel.app/",
        githubUrl: "https://github.com/kishanpokal/attendmate-web",
        featured: false,
        accentColor: "from-violet-500 to-purple-600",
        status: "Completed",
        highlights: [
            "Attendance management through web interface",
            "Simple dashboard for attendance records",
            "Organized data display for students and administrators"
        ]
    },
    {
        id: 3,
        title: "AttendMate Android",
        category: "Android Application",
        description: "AttendMate is an Android application that helps students track and manage their attendance records. The app provides a simple interface for monitoring attendance status and organizing academic attendance data efficiently.",
        image: "/projects/attendmate-android.svg",
        tags: ["Kotlin", "Android Studio", "Firebase"],
        demoUrl: "#",
        githubUrl: "https://github.com/kishanpokal/AttendMate2",
        featured: true,
        accentColor: "from-blue-500 to-cyan-600",
        status: "Completed",
        highlights: [
            "Student attendance tracking system",
            "Clean Android UI for easy attendance monitoring",
            "Data storage and retrieval using Firebase"
        ]
    },
    {
        id: 5,
        title: "Habit Tracker Web",
        category: "Web Application",
        description: "Habit Tracker Web is a productivity web application that helps users build positive habits by tracking daily activities and monitoring progress over time. The application focuses on simplicity and helping users stay consistent with their routines.",
        image: "/projects/habit-tracker.svg",
        tags: ["JavaScript", "Frontend Development", "Web App"],
        demoUrl: "https://habitflowweb.vercel.app/",
        githubUrl: "https://github.com/kishanpokal/habit-tracker-web",
        featured: false,
        accentColor: "from-amber-500 to-orange-600",
        status: "Completed",
        highlights: [
            "Track daily habits and routines",
            "Progress monitoring and habit tracking system",
            "Simple and responsive web interface"
        ]
    },
    {
        id: 8,
        title: "Multiplayer Cricket Game",
        category: "Web Game",
        description: "A real-time multiplayer browser-based cricket game featuring a matchmaking lobby, live coin toss, and interactive gameplay. It includes user authentication, player profiles, and global leaderboards.",
        image: "/projects/cricket-game.svg",
        tags: ["React 19", "TypeScript", "Firebase", "TailwindCSS v4"],
        demoUrl: "https://cricketbuzz-web.vercel.app/",
        githubUrl: "https://github.com/kishanpokal/Cricket-Game",
        featured: false,
        accentColor: "from-green-500 to-emerald-600",
        status: "Completed",
        highlights: [
            "Firebase Auth and Matchmaking Lobby",
            "Real-time Coin Toss and Live Game Board",
            "Player Profiles and Global Leaderboards"
        ]
    },
    {
        id: 6,
        title: "Online Book Selling System",
        category: "Web Application",
        description: "An e-commerce web application that allows users to browse books, add items to a shopping cart, and purchase books online. The system includes product management and a simple checkout process.",
        image: "/projects/book-store.svg",
        tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        demoUrl: "#",
        githubUrl: "https://github.com/kishanpokal/Online_Book_Selling_System",
        featured: false,
        accentColor: "from-rose-500 to-pink-600",
        status: "Completed",
        highlights: [
            "Book catalog browsing and product listings",
            "Shopping cart and checkout functionality",
            "User authentication system"
        ]
    },
    {
        id: 4,
        title: "Tourism Management System",
        category: "Java Web Application",
        description: "A tourism booking web application that allows users to explore travel packages and book services such as hotel rooms, food, and transportation. The system provides an integrated booking experience for travelers.",
        image: "/projects/tourism-system.svg",
        tags: ["Java", "JSP", "Servlet", "MySQL", "Bootstrap"],
        demoUrl: "#",
        githubUrl: "https://github.com/kishanpokal/TourismManagementSystem-JSP",
        featured: false,
        accentColor: "from-purple-500 to-indigo-600",
        status: "Completed",
        highlights: [
            "Hotel room booking with dynamic image display",
            "Integrated booking system for rooms, food, and transport",
            "Database-driven travel package management"
        ]
    }
];
