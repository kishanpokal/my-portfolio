import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Loader2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return false;
    }
    if (!formData.email.trim()) {
      toast({ title: "Email is required", variant: "destructive" });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({ title: "Invalid email format", variant: "destructive" });
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      toast({ title: "Message must be at least 10 characters", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const accessKey = "f16848e4-0bd8-4ced-b60c-4b640f44cf88";

      if (accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        toast({
          title: "Email Configuration Required",
          description: "Please replace 'YOUR_WEB3FORMS_ACCESS_KEY' in ContactSection.jsx with your actual key from web3forms.com.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ access_key: accessKey, ...formData }),
      });

      if (response.ok) {
        toast({
          title: "Message sent! 🎉",
          description: "I'll get back to you within 24 hours.",
          variant: "success",
          className: "bg-green-600 text-white dark:bg-green-500 border border-green-700 shadow-lg"
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email me directly at kishanpokal1111@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 border border-primary/20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            Let's Connect
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-5 p-5 sm:p-7 rounded-2xl bg-card/60 border border-border/50 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/30"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={cardVariants}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              Contact Details
            </h3>

            <div className="space-y-3">
              {[
                { icon: Mail, label: "Email", value: "kishanpokal1111@gmail.com", href: "mailto:kishanpokal1111@gmail.com" },
                { icon: MapPin, label: "Location", value: "Ahmedabad, Gujarat, India", href: null },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3.5 p-3 hover:bg-accent/30 rounded-xl transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 4 }}
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-5">
              <h4 className="font-medium mb-3 text-xs text-muted-foreground">Find me on</h4>
              <div className="flex gap-2.5">
                {[
                  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/kishanpokal956/" },
                  { icon: Github, label: "GitHub", url: "https://github.com/KishanPokal" },
                  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/kishan._.pokal/" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-accent/50 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="p-5 sm:p-7 rounded-2xl bg-card/60 border border-border/50 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/30"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={cardVariants}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              Send Me a Message
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { id: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                { id: "email", label: "Your Email", type: "email", placeholder: "john@example.com" },
              ].map((field) => (
                <div key={field.id} className="space-y-1">
                  <label htmlFor={field.id} className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-input bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all text-sm placeholder:text-muted-foreground/50"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs sm:text-sm font-medium text-muted-foreground">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-input bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all resize-none text-sm placeholder:text-muted-foreground/50"
                  placeholder="Hey, I'd love to collaborate on..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 text-sm",
                  isSubmitting && "opacity-80 cursor-not-allowed"
                )}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};