import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Send,
  Loader2,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Clock,
  ArrowUpRight,
  GitBranch,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sound } from "@/lib/SoundEngine";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    sound.click();
    navigator.clipboard.writeText("kishanpokal1111@gmail.com");
    setCopiedEmail(true);
    toast({
      title: "Email copied! 📋",
      description: "kishanpokal1111@gmail.com copied to clipboard.",
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Please write at least 10 characters",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    sound.click();
    setIsSubmitting(true);

    try {
      const accessKey = "f16848e4-0bd8-4ced-b60c-4b640f44cf88";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: accessKey, ...formData }),
      });

      if (response.ok) {
        sound.playBeep(880, 0.08, "sine");
        toast({
          title: "Message sent! 🎉",
          description: "Thank you! I will reply to your email within 24 hours.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast({
        title: "Could not send message",
        description: "Please email me directly at kishanpokal1111@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/kishanpokal956/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      url: "https://github.com/KishanPokal",
      icon: Github,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/kishan._.pokal/",
      icon: Instagram,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-sans">
            Let's <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl">Connect</span> Together.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Have a project in mind, an Android or software engineering role, or just want to say hi? Send me a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 rounded-3xl dark:bg-[#111622]/90 bg-white dark:border-white/10 border-slate-200/90 hover:border-sky-400/50 transition-all shadow-lg dark:shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-medium text-foreground border dark:border-white/10 border-slate-200 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-sky-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>

              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email Address</p>
              <a
                href="mailto:kishanpokal1111@gmail.com"
                className="text-base sm:text-lg font-bold text-foreground hover:text-sky-500 transition-colors mt-1 block break-all font-mono"
              >
                kishanpokal1111@gmail.com
              </a>
            </div>

            {/* GitHub Card */}
            <div className="p-6 rounded-3xl dark:bg-[#111622]/90 bg-white dark:border-white/10 border-slate-200/90 hover:border-sky-400/50 transition-all shadow-lg dark:shadow-xl backdrop-blur-xl group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl dark:bg-white/5 bg-slate-100 text-foreground border dark:border-white/10 border-slate-200 group-hover:text-sky-500 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full font-medium">
                  Source Code
                </span>
              </div>

              <h4 className="text-base font-bold text-foreground">GitHub Repositories</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-4 leading-relaxed">
                Check out all my project repositories, source code, and commit history on GitHub.
              </p>

              <a
                href="https://github.com/KishanPokal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-2xl dark:bg-white/5 bg-slate-50 hover:bg-slate-100 dark:hover:bg-white/10 border dark:border-white/10 border-slate-200 text-foreground text-xs font-semibold transition-all group-hover:border-sky-400"
              >
                <span className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-sky-500" />
                  <span>github.com/KishanPokal</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Location & Timezone */}
            <div className="p-6 rounded-3xl dark:bg-[#111622]/90 bg-white dark:border-white/10 border-slate-200/90 hover:border-sky-400/50 transition-all shadow-lg dark:shadow-xl backdrop-blur-xl">
              <div className="p-3 w-fit rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
                <MapPin className="w-5 h-5" />
              </div>

              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Location &amp; Work Status</p>
              <h4 className="text-base font-bold text-foreground mt-1">
                Ahmedabad, Gujarat, India
              </h4>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-500" />
                <span>IST (UTC+5:30) • Open for Remote &amp; On-Site Roles</span>
              </p>
            </div>

            {/* Professional Networks */}
            <div className="p-6 rounded-3xl dark:bg-[#111622]/90 bg-white dark:border-white/10 border-slate-200/90 shadow-lg dark:shadow-xl backdrop-blur-xl">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Social Profiles
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.click()}
                      aria-label={social.name}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl dark:bg-white/5 bg-slate-50 hover:bg-slate-100 dark:hover:bg-white/10 border dark:border-white/10 border-slate-200 text-muted-foreground hover:text-foreground transition-all font-medium text-xs shadow-xs"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl dark:bg-[#111622]/90 bg-white dark:border-white/10 border-slate-200/90 shadow-lg dark:shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  Send Me a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full px-4 py-3 rounded-2xl dark:bg-[#0A0D14] bg-slate-50 border dark:border-white/10 border-slate-200 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-foreground mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@company.com"
                    required
                    className="w-full px-4 py-3 rounded-2xl dark:bg-[#0A0D14] bg-slate-50 border dark:border-white/10 border-slate-200 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-foreground mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, job opportunity, or question..."
                    required
                    className="w-full px-4 py-3 rounded-2xl dark:bg-[#0A0D14] bg-slate-50 border dark:border-white/10 border-slate-200 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-400 text-white dark:text-[#0A0D14] font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;