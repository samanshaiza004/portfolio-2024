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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-center  py-12 px-4"
    >
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 transition-all"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-lg text-gray-600 bg-background/80 backdrop-blur-mdrk:text-gray-400">
            {subtitle}
          </p>
        </motion.div>

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
                <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
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
                  className="text-blue-600 dark:text-blue-400 hover:underline text-center break-all"
                >
                  {method.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Looking forward to connecting with you!
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
