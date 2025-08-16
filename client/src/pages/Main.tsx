import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Shield, Copy, RefreshCw, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";

const navigationItems = [
  { name: "Home", active: true, path: "/" },
  { name: "About", active: false, path: "/about" },
  { name: "Contact", active: false, path: "/contact" },
  { name: "Support", active: false, path: "/support" },
];

const typingPhrases = [
  "Expose the leaks before they expose you",
  "Secure your digital fortress today",
  "Hunt down vulnerabilities relentlessly",
  "Stay ahead of cyber threats",
  "Protect what matters most"
];

const TypingEffect = (): JSX.Element => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    
    if (isTyping && !isPaused) {
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, 80);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause then start deleting
        const timeout = setTimeout(() => {
          setIsPaused(true);
          setTimeout(() => {
            setIsTyping(false);
            setIsPaused(false);
          }, 2500);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else if (!isTyping && !isPaused) {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        setIsTyping(true);
      }
    }
  }, [currentText, isTyping, isPaused, currentPhraseIndex]);

  return (
    <motion.p 
      className="font-['Passion_One'] font-normal text-white 
                 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
                 leading-tight max-w-4xl mx-auto min-h-[80px] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        animate={{
          textShadow: [
            "0 0 10px rgba(0,255,255,0.5)",
            "0 0 20px rgba(0,255,255,0.8)",
            "0 0 10px rgba(0,255,255,0.5)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {currentText}
      </motion.span>
      <motion.span
        className="inline-block w-1 bg-cyan-400 ml-2"
        animate={{ 
          opacity: [0, 1, 0],
          backgroundColor: ["#00FFFF", "#8B45C1", "#00FFFF"]
        }}
        transition={{ 
          opacity: { duration: 1, repeat: Infinity },
          backgroundColor: { duration: 2, repeat: Infinity }
        }}
        style={{ height: "1em" }}
      />
    </motion.p>
  );
};

const PasswordGenerator = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = () => {
    setIsGenerating(true);
    
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (charset === "") {
      setPassword("Please select at least one character type");
      setIsGenerating(false);
      return;
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setTimeout(() => {
      setPassword(newPassword);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <motion.section 
      className="w-full py-20 px-4 sm:px-6 lg:px-8 relative"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2 
            className="font-['Passion_One'] text-white text-4xl sm:text-5xl lg:text-6xl mb-4"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(52,41,211,0.5)",
                "0 0 40px rgba(139,69,193,0.8)",
                "0 0 20px rgba(52,41,211,0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Shield className="inline-block mr-4 mb-2" size={48} />
            FORTRESS PASSWORD GENERATOR
          </motion.h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Create impenetrable passwords that would take hackers centuries to crack
          </p>
        </motion.div>

        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="text-purple-400" size={24} />
              Security Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Length */}
            <div className="space-y-3">
              <Label className="text-white text-lg flex items-center gap-2">
                Password Length: <span className="text-purple-400 font-bold">{passwordLength[0]}</span>
              </Label>
              <Slider
                value={passwordLength}
                onValueChange={setPasswordLength}
                max={50}
                min={8}
                step={1}
                className="w-full"
              />
            </div>

            {/* Character Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-blue-500/20"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Switch 
                  checked={includeUppercase} 
                  onCheckedChange={setIncludeUppercase}
                />
                <Label className="text-white cursor-pointer">Uppercase (A-Z)</Label>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-blue-500/20"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Switch 
                  checked={includeLowercase} 
                  onCheckedChange={setIncludeLowercase}
                />
                <Label className="text-white cursor-pointer">Lowercase (a-z)</Label>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-blue-500/20"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Switch 
                  checked={includeNumbers} 
                  onCheckedChange={setIncludeNumbers}
                />
                <Label className="text-white cursor-pointer">Numbers (0-9)</Label>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-blue-500/20"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <Switch 
                  checked={includeSymbols} 
                  onCheckedChange={setIncludeSymbols}
                />
                <Label className="text-white cursor-pointer">Symbols (!@#$)</Label>
              </motion.div>
            </div>

            {/* Generate Button */}
            <motion.div className="pt-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  onClick={generatePassword}
                  disabled={isGenerating}
                  className="w-full py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-2 border-purple-400/30"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={24} />
                    </motion.div>
                  ) : (
                    "GENERATE FORTRESS PASSWORD"
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* Generated Password */}
            {password && (
              <motion.div 
                className="space-y-3 p-4 rounded-lg bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-400/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Label className="text-white text-lg font-bold">Your Fortress Password:</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={password}
                    readOnly
                    type={showPassword ? "text" : "password"}
                    className="bg-black/50 text-white border-purple-400/50 font-mono text-lg"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="border-purple-400/50 hover:bg-purple-500/20"
                  >
                    {showPassword ? <EyeOff className="text-white" /> : <Eye className="text-white" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    className="border-purple-400/50 hover:bg-purple-500/20"
                  >
                    <Copy className="text-white" />
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Cyber Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

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
        
        {/* Enhanced Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-500/30 to-purple-600/30 rounded-full blur-2xl"
          animate={{
            x: [0, 80, 0],
            y: [0, -50, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-600/25 to-cyan-400/25 rounded-full blur-2xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 60, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-xl"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
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

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 text-center min-h-[calc(100vh-200px)]">
          <motion.div
            className="max-w-6xl mx-auto space-y-6 sm:space-y-8 flex flex-col justify-center h-full"
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(52, 41, 211, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(52, 41, 211, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
                animate={{
                  backgroundPosition: ['0px 0px', '50px 50px'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Glitch Effect Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  style={{
                    top: `${(i + 1) * 12}%`,
                    opacity: 0.3
                  }}
                  animate={{
                    x: ['-100%', '100%'],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Main Heading */}
            <motion.h1 
              className="font-['Passion_One'] font-normal text-white text-shadow-glow
                         text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 
                         leading-none tracking-wide relative z-10"
              variants={fadeInUp}
              style={{ WebkitTextStroke: "1px #000000" }}
            >
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 20px rgba(52,41,211,0.8)",
                    "0 0 40px rgba(139,69,193,0.9)",
                    "0 0 60px rgba(52,41,211,0.8)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                BREACH
              </motion.span>
              {" "}
              <motion.span
                animate={{
                  textShadow: [
                    "0 0 40px rgba(139,69,193,0.9)",
                    "0 0 20px rgba(52,41,211,0.8)", 
                    "0 0 60px rgba(139,69,193,0.9)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                BUSTER
              </motion.span>
            </motion.h1>

            {/* Typing Effect Subtitle */}
            <motion.div variants={fadeInUp} className="relative z-10">
              <TypingEffect />
            </motion.div>

            {/* Enhanced CTA Button */}
            <motion.div
              variants={scaleIn}
              className="pt-4 sm:pt-6 relative z-10"
            >
              {/* Pulsing Ring Effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: [
                    "0 20px 40px rgba(52, 41, 211, 0.4)",
                    "0 0 80px rgba(139, 69, 193, 0.6)",
                    "0 20px 40px rgba(52, 41, 211, 0.4)"
                  ]
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                {/* Button Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-70"
                  animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <Button 
                  data-testid="button-check-breach"
                  className="font-['Passion_One'] font-normal text-white relative
                             text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
                             bg-gradient-to-r from-blue-600 to-purple-600 
                             hover:from-blue-700 hover:to-purple-700
                             px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6
                             rounded-full border-2 border-cyan-400/50
                             transition-all duration-300
                             shadow-lg hover:shadow-xl
                             backdrop-blur-sm"
                  size="lg"
                >
                  <motion.span
                    animate={{ 
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.8)",
                        "0 0 40px rgba(0,255,255,0.9)",
                        "0 0 20px rgba(255,255,255,0.8)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Shield size={32} className="inline-block" />
                    </motion.div>
                    Check For Breach Now
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Cyber Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Binary Rain Effect */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`binary-${i}`}
                className="absolute text-cyan-400/30 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  opacity: [0, 1, 0.7, 0]
                }}
                transition={{
                  duration: Math.random() * 8 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </motion.div>
            ))}
            
            {/* Floating Code Fragments */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`code-${i}`}
                className="absolute text-purple-400/20 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, Math.random() * 10 - 5]
                }}
                transition={{
                  duration: Math.random() * 6 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              >
                {'</>'}_{Math.floor(Math.random() * 999)}
              </motion.div>
            ))}
            
            {/* Cyber Orbs */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`orb-${i}`}
                className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.3, 0.8, 0.3],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </main>

        {/* Password Generator Section */}
        <PasswordGenerator />

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
                <Link key={index} href={item.path}>
                  <motion.button
                    className={`font-['Ubuntu'] font-bold text-sm transition-all duration-300 ${
                      item.active ? "text-white" : "text-white/70"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.name}
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
