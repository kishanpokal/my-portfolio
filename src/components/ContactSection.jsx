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
  Box,
  ExternalLink,
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
      title: "Email address copied! 📋",
      description: "kishanpokal1111@gmail.com copied to clipboard.",
    });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Valid email is required", variant: "destructive" });
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Message must be at least 10 characters",
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
          title: "Message dispatched! 🎉",
          description: "Thank you! I will reply to you promptly within 24 hours.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast({
        title: "Message submission issue",
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
      color: "hover:text-primary",
    },
    {
      name: "GitHub",
      url: "https://github.com/KishanPokal",
      icon: Github,
      color: "hover:text-foreground",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/kishan._.pokal/",
      icon: Instagram,
      color: "hover:text-primary",
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            Let's build something exceptional.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Whether you have an Android app to build, an AI model to train, or a position on your team, I'd love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Info & Social Hub (5 cols - 30% Cards) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 rounded-3xl bg-card border border-border hover:border-border-hover transition-all shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>
              </div>

              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email Address</p>
              <a
                href="mailto:kishanpokal1111@gmail.com"
                className="text-base sm:text-lg font-bold text-foreground hover:text-primary transition-colors mt-1 block break-all"
              >
                kishanpokal1111@gmail.com
              </a>
            </div>

            {/* Location & Timezone Card */}
            <div className="p-6 rounded-3xl bg-card border border-border hover:border-border-hover transition-all shadow-sm">
              <div className="p-3 w-fit rounded-2xl bg-primary/10 text-primary mb-4">
                <MapPin className="w-5 h-5" />
              </div>

              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Location & Timezone</p>
              <h4 className="text-base sm:text-lg font-bold text-foreground mt-1">
                Ahmedabad, Gujarat, India
              </h4>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>IST (UTC+5:30) • Open for Remote, Hybrid & Relocation</span>
              </p>
            </div>

            {/* 3D Portfolio Box — 10% Accent Button */}
            <div className="p-6 rounded-3xl bg-card border border-border hover:border-border-hover transition-all shadow-sm">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                Interactive 3D Portfolio
              </p>
              <a
                href="https://kishanpokal-3d.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="inline-flex items-center justify-between w-full p-3.5 rounded-2xl bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary text-sm font-bold transition-all shadow-sm group"
              >
                <span className="flex items-center gap-2.5">
                  <Box className="w-4 h-4 text-primary animate-pulse" />
                  <span>Launch 3D Virtual Experience</span>
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-3xl bg-card border border-border hover:border-border-hover transition-all shadow-sm">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Professional Networks
              </p>
              <div className="flex gap-3">
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
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-secondary border border-border/80 text-muted-foreground ${social.color} hover:bg-secondary/80 transition-all font-medium text-xs`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  Send a Direct Message
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
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
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
                    placeholder="e.g. john@company.com"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-foreground mb-1.5">
                    Project Details / Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, or opportunities..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-secondary/60 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 shadow-lg shadow-primary/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
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