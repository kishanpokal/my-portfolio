import React, { useState } from "react";
import { Mail, Linkedin, Github, FileText, ArrowUpRight, Copy, Check, Send } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const ContactV2 = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sentSuccess, setSentSuccess] = useState(false);

  const email = "kishanpokal1111@gmail.com";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    sound.click();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sound.click();
    if (!formData.name || !formData.email || !formData.message) return;

    // Create formatted mailto URI
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Kishan,\n\n${formData.message}\n\nBest regards,\n${formData.name} (${formData.email})`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");

    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactChannels = [
    {
      label: "Direct Email",
      value: email,
      href: `mailto:${email}`,
      isEmail: true,
      icon: Mail,
    },
    {
      label: "LinkedIn Profile",
      value: "linkedin.com/in/kishanpokal956",
      href: "https://www.linkedin.com/in/kishanpokal956/",
      icon: Linkedin,
    },
    {
      label: "GitHub Repositories",
      value: "github.com/KishanPokal",
      href: "https://github.com/KishanPokal",
      icon: Github,
    },
    {
      label: "Curriculum Vitae",
      value: "Download Kishan_resume.pdf",
      href: "/Kishan_resume.pdf",
      icon: FileText,
    },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
      {/* Background Subtle Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid-subtle mask-radial-fade opacity-50" />

      {/* Header */}
      <div>
        <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-medium">Inquiries &amp; Collaborations</p>
        <h2 className="headline mt-2 sm:mt-4 max-w-4xl text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight text-[#111111] dark:text-foreground">
          Have an opportunity? Write to me<span className="text-[#ff5a1f]">.</span>
        </h2>
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5a5a54] dark:text-muted-foreground">
          <span>Actively considering full-time Android &amp; Software Engineering roles.</span>
          <span className="text-foreground/40">•</span>
          <span className="label-mono text-xs text-[#ff5a1f] font-semibold">Replies within 2-4 hours</span>
        </div>
      </div>

      <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Direct Links & 1-Click Copy with White Paper Cards */}
        <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
          <p className="label-mono text-xs text-[#71716b] dark:text-muted-foreground font-bold mb-2 sm:mb-3">Direct Channels</p>
          {contactChannels.map((channel) => (
            <div
              key={channel.label}
              className="group relative flex items-center justify-between gap-3 sm:gap-4 rounded-sm border border-[#11111114] dark:border-border bg-white dark:bg-background/80 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-200 hover:border-black dark:hover:border-foreground"
            >
              <a
                href={channel.href}
                target={channel.isEmail ? "_self" : "_blank"}
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="flex-1"
              >
                <span className="label-mono block text-[11px] sm:text-xs text-[#71716b] dark:text-muted-foreground font-semibold">{channel.label}</span>
                <span className="mt-1 block break-all text-sm sm:text-base font-bold text-[#111111] dark:text-foreground group-hover:text-[#ff5a1f] transition-colors">
                  {channel.value}
                </span>
              </a>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {channel.isEmail && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="rounded-sm border border-[#11111118] dark:border-border bg-white/80 dark:bg-transparent p-2 text-[#5a5a54] dark:text-muted-foreground transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}

                <a
                  href={channel.href}
                  target={channel.isEmail ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="text-[#5a5a54] dark:text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#ff5a1f] p-1"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Clean White Message Form */}
        <div className="lg:col-span-6 rounded-sm border border-[#11111114] dark:border-border bg-white dark:bg-background/80 p-5 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-none">
          <p className="label-mono text-xs text-[#71716b] dark:text-muted-foreground font-bold mb-3 sm:mb-4">Quick Note / Inquiry</p>

          <form onSubmit={handleSendMessage} className="space-y-3.5 sm:space-y-4">
            <div>
              <label htmlFor="name" className="label-mono block text-[11px] font-semibold text-[#5a5a54] dark:text-muted-foreground mb-1.5">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Miller"
                className="w-full rounded-sm border border-[#1111111c] dark:border-border bg-[#f8f7f5] dark:bg-secondary/30 px-3.5 py-2.5 text-base sm:text-sm text-[#111111] dark:text-foreground placeholder:text-[#8a8a85] focus:border-[#ff5a1f] focus:bg-white dark:focus:bg-secondary/50 focus:outline-none transition-colors shadow-2xs"
              />
            </div>

            <div>
              <label htmlFor="email" className="label-mono block text-[11px] font-semibold text-[#5a5a54] dark:text-muted-foreground mb-1.5">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@company.com"
                className="w-full rounded-sm border border-[#1111111c] dark:border-border bg-[#f8f7f5] dark:bg-secondary/30 px-3.5 py-2.5 text-base sm:text-sm text-[#111111] dark:text-foreground placeholder:text-[#8a8a85] focus:border-[#ff5a1f] focus:bg-white dark:focus:bg-secondary/50 focus:outline-none transition-colors shadow-2xs"
              />
            </div>

            <div>
              <label htmlFor="message" className="label-mono block text-[11px] font-semibold text-[#5a5a54] dark:text-muted-foreground mb-1.5">
                Message or Role Details
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="We would love to discuss an Android / Engineering opportunity with you..."
                className="w-full rounded-sm border border-[#1111111c] dark:border-border bg-[#f8f7f5] dark:bg-secondary/30 px-3.5 py-2.5 text-base sm:text-sm text-[#111111] dark:text-foreground placeholder:text-[#8a8a85] focus:border-[#ff5a1f] focus:bg-white dark:focus:bg-secondary/50 focus:outline-none transition-colors resize-none shadow-2xs"
              />
            </div>

            <button
              type="submit"
              className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#111111] dark:bg-foreground py-3 font-bold text-[#f2f0ec] dark:text-background transition-colors hover:bg-[#ff5a1f] hover:text-black shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{sentSuccess ? "Opening Email Client..." : "Send Message"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
