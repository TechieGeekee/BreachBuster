import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Shield, Zap, Eye, Lock, Users, Code, Target, Cpu } from "lucide-react";
import { Link } from "wouter";

const navigationItems = [
  { name: "Home", active: false, path: "/" },
  { name: "About", active: true, path: "/about" },
  { name: "Contact", active: false, path: "/contact" },
  { name: "Support", active: false, path: "/support" },
];

const features = [
  {
    icon: Shield,
    title: "Advanced Threat Detection",
    description: "Our AI-powered algorithms scan millions of data points to identify potential breaches before they happen.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Zap,
    title: "Real-time Monitoring",
    description: "Lightning-fast scanning and real-time alerts ensure you're always one step ahead of cybercriminals.",
    color: "from-purple-500 to-pink-400"
  },
  {
    icon: Eye,
    title: "Deep Web Surveillance",
    description: "We monitor the dark web and underground forums where your data might be traded illegally.",
    color: "from-green-500 to-teal-400"
  },
  {
    icon: Lock,
    title: "Military-Grade Security",
    description: "Built with enterprise-level security protocols trusted by government agencies worldwide.",
    color: "from-red-500 to-orange-400"
  }
];

const stats = [
  { number: "10M+", label: "Breaches Detected", delay: 0 },
  { number: "500K+", label: "Users Protected", delay: 0.2 },
  { number: "99.9%", label: "Uptime Guarantee", delay: 0.4 },
  { number: "24/7", label: "Cyber Vigilance", delay: 0.6 }
];

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Chief Security Officer",
    icon: Shield,
    expertise: "Cybersecurity Expert with 15+ years experience"
  },
  {
    name: "Sarah Rodriguez",
    role: "AI Research Lead",
    icon: Cpu,
    expertise: "Machine Learning & Threat Intelligence Specialist"
  },
  {
    name: "Marcus Johnson",
    role: "Penetration Testing Director",
    icon: Target,
    expertise: "Ethical Hacker & Vulnerability Assessment Expert"
  },
  {
    name: "Dr. Emily Wong",
    role: "Data Protection Architect",
    icon: Code,
    expertise: "Privacy Law & Data Security Compliance Leader"
  }
];

const CountUp = ({ end, duration = 2, delay = 0 }: { end: string; duration?: number; delay?: number }) => {
  const [count, setCount] = useState("0");
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        // Extract number and suffix
        const numMatch = end.match(/(\d+(?:\.\d+)?)/);
        if (!numMatch) {
          setCount(end);
          return;
        }
        
        const targetNum = parseFloat(numMatch[1]);
        const suffix = end.replace(numMatch[1], "");
        
        const increment = targetNum / (duration * 60);
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            setCount(end);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current).toString() + suffix);
          }
        }, 1000 / 60);
        
        return () => clearInterval(counter);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, end, duration, delay]);

  return <span ref={ref}>{count}</span>;
};

export const About = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
  }, [controls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          className="absolute inset-0 hero-gradient"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Matrix Rain Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-400/20 font-mono text-sm"
              style={{
                left: `${(i * 2) % 100}%`,
                top: `-10%`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </motion.div>
          ))}
        </div>

        {/* Cyber Grid */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.header 
          className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/">
                <motion.div 
                  className="text-white font-mono text-4xl sm:text-5xl lg:text-6xl transform rotate-180 cursor-pointer"
                  animate={{ rotate: [180, 170, 180] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  B
                </motion.div>
              </Link>
              <div className="flex flex-col text-white font-bold">
                <span className="text-lg sm:text-xl lg:text-2xl font-['Russo_One'] leading-tight">reach</span>
                <span className="text-lg sm:text-xl lg:text-2xl font-['Russo_One'] leading-tight">uster</span>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              className="hidden md:block"
              variants={fadeInUp}
            >
              <div className="glass-nav rounded-full px-6 py-3">
                <NavigationMenu>
                  <NavigationMenuList className="flex items-center space-x-8">
                    {navigationItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link href={item.path}>
                            <NavigationMenuLink
                              className={`font-['Ubuntu'] font-bold text-base lg:text-lg transition-all duration-300 cursor-pointer ${
                                item.active 
                                  ? "text-white" 
                                  : "text-white/70 hover:text-white"
                              }`}
                            >
                              {item.name}
                            </NavigationMenuLink>
                          </Link>
                        </motion.div>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </motion.nav>

            {/* Theme Toggle */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full p-0 transition-all duration-300"
                size="icon"
              >
                <img
                  className="w-6 h-6 object-cover"
                  alt="Brightness"
                  src="/figmaAssets/brightness-1.png"
                />
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h1 
              className="font-['Passion_One'] text-white text-6xl sm:text-7xl lg:text-8xl xl:text-9xl mb-8"
              variants={fadeInUp}
              animate={{
                textShadow: [
                  "0 0 20px rgba(0,255,255,0.5)",
                  "0 0 40px rgba(139,69,193,0.8)",
                  "0 0 20px rgba(0,255,255,0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              CYBER GUARDIANS
            </motion.h1>
            
            <motion.p 
              className="text-white/80 text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              We are the digital sentinels standing between your data and the chaos of cyberspace. 
              Our mission: <span className="text-cyan-400 font-bold">Expose vulnerabilities before they expose you.</span>
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="py-16 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  custom={stat.delay}
                >
                  <motion.div
                    className="bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,255,255,0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="text-4xl lg:text-5xl font-['Passion_One'] text-cyan-400 mb-2"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(0,255,255,0.5)",
                          "0 0 20px rgba(0,255,255,0.8)",
                          "0 0 10px rgba(0,255,255,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <CountUp end={stat.number} delay={stat.delay} />
                    </motion.div>
                    <p className="text-white/80 text-sm lg:text-base font-medium">{stat.label}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="font-['Passion_One'] text-white text-4xl sm:text-5xl lg:text-6xl text-center mb-16"
              variants={fadeInUp}
            >
              ARSENAL OF PROTECTION
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl h-full overflow-hidden group">
                    <CardContent className="p-8">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <feature.icon className="text-white" size={32} />
                      </motion.div>
                      
                      <h3 className="text-2xl font-['Passion_One'] text-white mb-4 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="font-['Passion_One'] text-white text-4xl sm:text-5xl lg:text-6xl text-center mb-16"
              variants={fadeInUp}
            >
              ELITE CYBER TEAM
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div
                    className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30 mb-4"
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(139,69,193,0.3)"
                    }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mx-auto mb-4"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <member.icon className="text-white" size={40} />
                    </motion.div>
                    
                    <h3 className="text-xl font-['Passion_One'] text-white mb-2">{member.name}</h3>
                    <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                    <p className="text-white/60 text-sm">{member.expertise}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="py-20 px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              className="font-['Passion_One'] text-white text-4xl sm:text-5xl lg:text-6xl mb-8"
              variants={fadeInUp}
            >
              JOIN THE RESISTANCE
            </motion.h2>
            
            <motion.p 
              className="text-white/80 text-xl mb-12 leading-relaxed"
              variants={fadeInUp}
            >
              Don't let cybercriminals win. Join thousands of users who trust us to protect their digital lives.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Link href="/">
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,255,255,0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    data-testid="button-start-protection"
                    className="font-['Passion_One'] text-white text-2xl lg:text-3xl
                               bg-gradient-to-r from-cyan-500 to-purple-600 
                               hover:from-cyan-600 hover:to-purple-700
                               px-12 py-6 rounded-full border-2 border-cyan-400/50
                               transition-all duration-300"
                    size="lg"
                  >
                    <Shield className="mr-3" size={32} />
                    Start Your Protection
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};