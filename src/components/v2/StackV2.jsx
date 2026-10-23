import React from "react";

export const StackV2 = () => {
  const stackCategories = [
    {
      category: "Languages",
      items: "Kotlin / Python / Java / JavaScript / TypeScript / C# / SQL",
    },
    {
      category: "Mobile & Android",
      items: "Jetpack Compose / Android SDK / Room DB / Retrofit / Coroutines & Flow / Material 3 / MVVM",
    },
    {
      category: "Machine Learning & AI",
      items: "PyTorch / TensorFlow / Scikit-Learn / OpenCV / Pandas / NumPy / Feature Engineering",
    },
    {
      category: "Backend & Storage",
      items: "FastAPI / Node.js / Express / Firebase (Firestore, Auth) / PostgreSQL / SQLite / REST APIs",
    },
    {
      category: "Interactive & 3D",
      items: "Unity 3D / C# Scripting / Game AI (State Machines, Behavior Trees) / Real-Time Mic Audio",
    },
    {
      category: "Tools & DevOps",
      items: "Android Studio / Git & GitHub / Docker / Postman / Vercel / Gradle / Linux",
    },
  ];

  return (
    <section id="stack" className="relative overflow-hidden border-y border-[#11111118] dark:border-border bg-[#eae7e0] dark:bg-secondary/40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-40" />

      <div className="relative mx-auto grid max-w-[1280px] gap-8 sm:gap-10 px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 md:grid-cols-12">
        {/* Left Column: Heading */}
        <div className="md:col-span-4">
          <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-medium">Technical Capabilities</p>
          <h2 className="headline-minecraft mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-[#111111] dark:text-foreground">
            Stack<span className="text-[#ff5a1f]">.</span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-xs text-xs sm:text-sm text-[#5a5a54] dark:text-muted-foreground leading-relaxed">
            Technologies and tools I reach for regularly, organized by architectural layer.
          </p>
        </div>

        {/* Right Column: Clean Definition Rows with Crisp Hairline Dividers */}
        <dl className="md:col-span-8 flex flex-col divide-y divide-[#11111118] dark:divide-border">
          {stackCategories.map((group) => (
            <div
              key={group.category}
              className="grid gap-1.5 sm:gap-2 py-3.5 sm:py-5 sm:grid-cols-[180px_1fr] sm:items-baseline transition-colors hover:bg-black/[0.03] dark:hover:bg-secondary/40 px-2 sm:px-3 rounded-sm"
            >
              <dt className="label-mono text-[11px] sm:text-xs font-bold text-[#ff5a1f] sm:text-[#5a5a54] sm:dark:text-muted-foreground">
                {group.category}
              </dt>
              <dd className="text-sm sm:text-base md:text-lg font-semibold text-[#111111] dark:text-foreground tracking-tight leading-snug">
                {group.items}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
