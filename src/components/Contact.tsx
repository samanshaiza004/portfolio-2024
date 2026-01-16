import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  Twitter,
  Instagram,
} from "lucide-react";
import Discord from "./icons/Discord";

interface ContactProps {
  email?: string;
  github?: string;
  linkedin?: string;
  phone?: string;
  twitter?: string;
  instagram?: string;
  discord?: string;
  title?: string;
  subtitle?: string;
}

export function Contact({
  email,
  github,
  linkedin,
  phone,
  discord,
  twitter,
  instagram,
  title = "Get in Touch",
  subtitle = "Feel free to reach out through any of these channels",
}: ContactProps) {
  const motionPreferences = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const shouldReduceMotion = motionPreferences.matches;

  const containerVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const contactMethods = [
    { icon: Mail, value: email, href: `mailto:${email}`, label: "Email" },
    { icon: Github, value: github, href: github, label: "GitHub" },
    { icon: Linkedin, value: linkedin, href: linkedin, label: "LinkedIn" },
    { icon: Phone, value: phone, href: `tel:${phone}`, label: "Phone" },
    { icon: Twitter, value: twitter, href: twitter, label: "Twitter" },
    { icon: Instagram, value: instagram, href: instagram, label: "Instagram" },
    { icon: Discord, value: discord, href: discord, label: "Discord" },
  ].filter((method) => method.value);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative w-full"
    >
      <Card className="w-full bg-background/60 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
        <CardContent className="p-6">
          <div className="w-full max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight mb-4"
              >
                {title}
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground"
              >
                {subtitle}
              </motion.p>
            </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="transform transition-all duration-100 hover:scale-[1.02] hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-gray-100 p-4 mb-4">
                  <method.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium mb-2">{method.label}</h3>
                <a
                  href={method.href}
                  target={
                    method.href?.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    method.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-blue-600 hover:underline text-center break-all"
                >
                  {method.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </motion.div>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-muted-foreground">
                Looking forward to connecting with you!
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}

export default Contact;
