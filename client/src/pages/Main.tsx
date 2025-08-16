import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navigationItems = [
  { name: "Home", active: true },
  { name: "About", active: false },
  { name: "Contact", active: false },
  { name: "Support", active: false },
];

export const Main = (): JSX.Element => {
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
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
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
            rotate: [0, 2, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
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
              <motion.div 
                className="text-white font-mono text-4xl sm:text-5xl lg:text-6xl transform rotate-180"
                animate={{ rotate: [180, 170, 180] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                B
              </motion.div>
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
                          <NavigationMenuLink
                            className={`font-['Ubuntu'] font-bold text-base lg:text-lg transition-all duration-300 cursor-pointer ${
                              item.active 
                                ? "text-white" 
                                : "text-white/70 hover:text-white"
                            }`}
                          >
                            {item.name}
                          </NavigationMenuLink>
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

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 text-center">
          <motion.div
            className="max-w-6xl mx-auto space-y-8 sm:space-y-12"
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            {/* Main Heading */}
            <motion.h1 
              className="font-['Passion_One'] font-normal text-white text-shadow-glow
                         text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[150px] 
                         leading-none tracking-wide"
              variants={fadeInUp}
              style={{ WebkitTextStroke: "1px #000000" }}
            >
              BREACH BUSTER
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="font-['Passion_One'] font-normal text-white 
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                         leading-tight max-w-4xl mx-auto"
              variants={fadeInUp}
            >
              Expose the leaks before they
              <br />
              expose you..
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={scaleIn}
              className="pt-8 sm:pt-12"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(52, 41, 211, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button 
                  className="font-['Passion_One'] font-normal text-white 
                             text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                             bg-gradient-to-r from-blue-600 to-purple-600 
                             hover:from-blue-700 hover:to-purple-700
                             px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8
                             rounded-full border-2 border-white/20
                             transition-all duration-300
                             shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <motion.span
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 30px rgba(52,41,211,0.8)",
                        "0 0 20px rgba(255,255,255,0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Check For Breach Now
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Animated particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </main>

        {/* Mobile Navigation */}
        <motion.div 
          className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="glass-nav rounded-full px-6 py-3">
            <div className="flex items-center space-x-6">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={index}
                  className={`font-['Ubuntu'] font-bold text-sm transition-all duration-300 ${
                    item.active ? "text-white" : "text-white/70"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
