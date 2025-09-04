import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Shield, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Copy, RefreshCw, Menu, X, Settings, Sun } from "lucide-react";
import { checkPasswordBreach } from "@/utils/passwordUtils";
import { SEOHead } from "@/components/SEOHead";

const navigationItems = [
  { name: "Home", active: true, href: "/" },
  { name: "About", active: false, href: "#about" },
  { name: "Contact", active: false, href: "#contact" },
  { name: "Support", active: false, href: "#support" },
  { name: "Bug Report", active: false, href: "/bug-report" },
];

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
}

export const Main = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  // Password Check State
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState("");
  const [checkResult, setCheckResult] = useState<{
    type: "safe" | "warning" | "danger" | "error";
    message: string;
    count?: number;
  } | null>(null);

  // Password Generator State
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
    generatePassword(); // Generate initial password
  }, [controls]);

  // Password strength calculator
  const calculatePasswordStrength = (pass: string): PasswordStrength => {
    const requirements = {
      length: pass.length >= 12,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numbers: /\d/.test(pass),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(pass),
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    let score = 0;
    let label = "";
    let color = "";

    if (pass.length === 0) {
      score = 0;
      label = "Enter password";
      color = "text-gray-400";
    } else if (pass.length < 8) {
      score = 1;
      label = "Very Weak";
      color = "text-red-500";
    } else if (metRequirements < 3 || pass.length < 10) {
      score = 2;
      label = "Weak";
      color = "text-orange-500";
    } else if (metRequirements < 4 || pass.length < 12) {
      score = 3;
      label = "Fair";
      color = "text-yellow-500";
    } else if (metRequirements === 4 && pass.length >= 12) {
      score = 4;
      label = "Strong";
      color = "text-blue-500";
    } else if (metRequirements === 5 && pass.length >= 16) {
      score = 5;
      label = "Very Strong";
      color = "text-green-500";
    }

    return { score, label, color, requirements };
  };

  const passwordStrength = calculatePasswordStrength(password);

  // Simulate scanning progress with cyber-themed stages
  const simulateScanProgress = () => {
    const stages = [
      "INITIALIZING BREACH DATABASE CONNECTION...",
      "ESTABLISHING SECURE TUNNEL...",
      "AUTHENTICATING WITH HAVEIBEENPWNED API...",
      "GENERATING SHA-1 HASH SIGNATURE...",
      "SCANNING GLOBAL BREACH DATABASES...",
      "ANALYZING 15.2 BILLION COMPROMISED ACCOUNTS...",
      "CROSS-REFERENCING HASH PATTERNS...",
      "FINALIZING SECURITY ASSESSMENT..."
    ];

    let currentStage = 0;
    setScanProgress(0);
    setScanStage(stages[0]);

    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + (Math.random() * 15 + 10);
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    const stageInterval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setScanStage(stages[currentStage]);
      } else {
        clearInterval(stageInterval);
      }
    }, 400);
  };

  // Password breach check function
  const handlePasswordCheck = async () => {
    if (!password.trim()) {
      setCheckResult({
        type: "error",
        message: "Please enter a password to check",
      });
      return;
    }

    setIsChecking(true);
    setCheckResult(null);
    simulateScanProgress();

    try {
      const result = await checkPasswordBreach(password);

      if (result.error) {
        setCheckResult({
          type: "error",
          message: result.error,
        });
      } else if (result.isBreached) {
        setCheckResult({
          type: "danger",
          message: `🚨 BREACH DETECTED! Password found in ${result.breachCount.toLocaleString()} data breaches. CHANGE IMMEDIATELY!`,
          count: result.breachCount,
        });
      } else {
        setCheckResult({
          type: "safe",
          message: "✅ SECURITY VERIFIED: Password not found in breach databases.",
        });
      }
    } catch (error) {
      setCheckResult({
        type: "error",
        message: "⚠️ SCAN ERROR: Unable to connect to breach database.",
      });
    } finally {
      setIsChecking(false);
      setScanProgress(0);
      setScanStage("");
    }
  };

  // Password generator functions
  const generatePassword = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let charset = "";
      if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
      if (includeNumbers) charset += "0123456789";
      if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

      if (charset === "") {
        setIsGenerating(false);
        return;
      }

      let newPassword = "";
      for (let i = 0; i < passwordLength; i++) {
        newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      setGeneratedPassword(newPassword);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Animation variants
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
    <>
      <SEOHead
        title="BreachBuster - Password Security & Breach Detection Tool"
        description="Check if your passwords are compromised in data breaches. Free password security checker and generator with real-time analysis. Protect yourself from cybersecurity threats with BreachBuster."
        keywords="BreachBuster, password checker, breach detection, password security, cybersecurity, password generator, data breach, security scanner, password leak, have i been pwned alternative, password vulnerability"
        canonicalUrl="/"
        ogType="website"
        schemaType="WebApplication"
      />
      <div className="min-h-screen w-full bg-black overflow-hidden relative">
      {/* Enhanced Cyber Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Dynamic gradient base */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #0f172a 0%, #1e293b 50%, #000 100%)",
              "radial-gradient(circle at 80% 20%, #1e293b 0%, #0f172a 50%, #000 100%)",
              "radial-gradient(circle at 40% 80%, #000 0%, #1e293b 50%, #0f172a 100%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Advanced cyber grid */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(0,255,255,0.4) 1px, transparent 1px),
                linear-gradient(0deg, rgba(0,255,255,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px),
                linear-gradient(0deg, rgba(59,130,246,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Cyber particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}

        {/* Floating cyber orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-2xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 80, 0],
            opacity: [0.2, 0.5, 0.3, 0.2],
            scale: [1, 1.3, 0.8, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-36 h-36 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-2xl"
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 70, -40, 0],
            opacity: [0.3, 0.6, 0.2, 0.3],
            scale: [1, 0.7, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Scanning lines effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 min-h-[70px] flex items-center relative z-40"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between w-full gap-2 sm:gap-4">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="text-white font-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl transform rotate-180"
                animate={{ rotate: [180, 170, 180] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                B
              </motion.div>
              <div className="flex flex-col text-white font-bold">
                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-['Russo_One'] leading-tight">reach</span>
                <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-['Russo_One'] leading-tight">uster</span>
              </div>
            </motion.div>

            {/* Settings Toggle */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0"
            >
              <Button
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full p-0 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
                size="icon"
                data-testid="button-settings-toggle"
              >
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Bottom Navigation */}
        <motion.nav
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl px-6 py-3 border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-6">
              {navigationItems.slice(0, 4).map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.href.startsWith('/') ? (
                    <Link href={item.href}>
                      <div className="flex flex-col items-center space-y-1 group">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          item.active 
                            ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50" 
                            : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                        }`}>
                          {index === 0 && <Shield className="w-5 h-5" />}
                          {index === 1 && <AlertTriangle className="w-5 h-5" />}
                          {index === 2 && <CheckCircle className="w-5 h-5" />}
                          {index === 3 && <XCircle className="w-5 h-5" />}
                        </div>
                        <span className={`text-xs font-['Ubuntu'] font-bold transition-all duration-300 ${
                          item.active ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}>
                          {item.name}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center space-y-1 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        item.active 
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50" 
                          : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                      }`}>
                        {index === 0 && <Shield className="w-5 h-5" />}
                        {index === 1 && <AlertTriangle className="w-5 h-5" />}
                        {index === 2 && <CheckCircle className="w-5 h-5" />}
                        {index === 3 && <XCircle className="w-5 h-5" />}
                      </div>
                      <span className={`text-xs font-['Ubuntu'] font-bold transition-all duration-300 ${
                        item.active ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}>
                        {item.name}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pb-20 md:pb-12">
          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            {/* Main Heading */}
            <motion.div className="text-center space-y-4" variants={fadeInUp}>
              <h1 className="font-['Passion_One'] font-normal text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-wide">
                PASSWORD
              </h1>
              <h2 className="font-['Passion_One'] font-normal text-blue-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
                EXPOSURE CHECK
              </h2>
              <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto">
                Check if your password has been compromised in data breaches using the world's largest breach database
              </p>
            </motion.div>

            {/* Cyber-Themed Password Scanner */}
            <motion.div
              className="bg-black/80 backdrop-blur-xl rounded-none border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden"
              variants={scaleIn}
              style={{
                boxShadow: '0 0 50px rgba(0,255,255,0.2), inset 0 0 30px rgba(0,255,255,0.1)'
              }}
            >
              {/* Terminal Header */}
              <div className="bg-black/90 border-b border-cyan-500/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <motion.h3 
                    className="text-cyan-400 font-mono text-lg font-bold tracking-wider"
                    animate={{
                      textShadow: [
                        '0 0 5px rgba(0,255,255,0.5)',
                        '0 0 20px rgba(0,255,255,0.8)',
                        '0 0 5px rgba(0,255,255,0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    [ PASSWORD EXPOSURE SCANNER ]
                  </motion.h3>
                </div>
              </div>

              {/* Scanner Interface */}
              <div className="p-6 space-y-6 relative">
                {/* Animated Background Lines */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-0 right-0 h-px bg-cyan-500"
                      style={{ top: `${(i + 1) * 12}%` }}
                      animate={{
                        opacity: [0.1, 0.5, 0.1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>

                {/* Password Input Terminal */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm">
                    <span className="text-green-400">root@breach-scanner:~$</span>
                    <span className="text-white">input_password</span>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-black/70 border border-cyan-500/50 rounded p-4 relative h-14 flex items-center">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter target password for breach analysis..."
                        className="w-full bg-transparent border-none text-green-400 font-mono text-lg p-0 pr-12 placeholder-cyan-600/50 focus:ring-0 focus:outline-none caret-green-400"
                        data-testid="input-password-check"
                        style={{ caretColor: '#4ade80' }}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8">
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors p-1 rounded flex items-center justify-center"
                          data-testid="button-toggle-password-visibility"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Typing indicator */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2 text-cyan-400 font-mono text-xs flex items-center gap-2"
                      >
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span>PASSWORD LENGTH: {password.length} | STRENGTH: {passwordStrength.label.toUpperCase()}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Enhanced Strength Analyzer */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-black/50 border border-cyan-500/30 rounded p-3 font-mono text-xs"
                    >
                      <div className="text-cyan-400 mb-2">SECURITY ANALYSIS:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`flex items-center gap-2 ${passwordStrength.requirements.length ? 'text-green-400' : 'text-red-400'}`}>
                          <span>●</span> LENGTH_CHECK: {passwordStrength.requirements.length ? 'PASS' : 'FAIL'}
                        </div>
                        <div className={`flex items-center gap-2 ${passwordStrength.requirements.uppercase ? 'text-green-400' : 'text-red-400'}`}>
                          <span>●</span> UPPERCASE: {passwordStrength.requirements.uppercase ? 'PASS' : 'FAIL'}
                        </div>
                        <div className={`flex items-center gap-2 ${passwordStrength.requirements.lowercase ? 'text-green-400' : 'text-red-400'}`}>
                          <span>●</span> LOWERCASE: {passwordStrength.requirements.lowercase ? 'PASS' : 'FAIL'}
                        </div>
                        <div className={`flex items-center gap-2 ${passwordStrength.requirements.numbers ? 'text-green-400' : 'text-red-400'}`}>
                          <span>●</span> NUMERIC: {passwordStrength.requirements.numbers ? 'PASS' : 'FAIL'}
                        </div>
                        <div className={`flex items-center gap-2 ${passwordStrength.requirements.symbols ? 'text-green-400' : 'text-red-400'}`}>
                          <span>●</span> SYMBOLS: {passwordStrength.requirements.symbols ? 'PASS' : 'FAIL'}
                        </div>
                        <div className={`flex items-center gap-2 ${passwordStrength.color.includes('green') ? 'text-green-400' : passwordStrength.color.includes('blue') ? 'text-blue-400' : passwordStrength.color.includes('yellow') ? 'text-yellow-400' : 'text-red-400'}`}>
                          <span>●</span> OVERALL: {passwordStrength.label.toUpperCase()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Cyber Scan Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={handlePasswordCheck}
                    disabled={!password.trim() || isChecking}
                    className={`w-full h-16 border-2 font-mono font-bold text-lg transition-all duration-300 relative overflow-hidden ${
                      isChecking 
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400' 
                        : 'border-cyan-500 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300'
                    }`}
                    data-testid="button-check-password"
                  >
                    {isChecking && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isChecking ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Shield size={24} />
                          </motion.div>
                          <span>SCANNING BREACH DATABASES...</span>
                        </>
                      ) : (
                        <>
                          <Shield size={24} />
                          <span>INITIATE_BREACH_SCAN.EXE</span>
                        </>
                      )}
                    </div>
                  </button>
                </motion.div>

                {/* Scanning Progress Display */}
                {isChecking && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/70 border border-yellow-500/50 p-4 font-mono text-sm space-y-3"
                  >
                    <div className="flex items-center gap-2 text-yellow-400">
                      <motion.div
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="w-2 h-2 bg-yellow-400 rounded-full"
                      />
                      <span className="text-yellow-300">{scanStage}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-cyan-400">
                        <span>SCAN_PROGRESS:</span>
                        <span>{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="w-full bg-black/50 border border-cyan-500/30 rounded-full h-3">
                        <motion.div
                          className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full relative overflow-hidden"
                          style={{ width: `${scanProgress}%` }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-cyan-600">
                      <div>DATABASE_QUERIES: {Math.floor(scanProgress * 12.3)}K</div>
                      <div>HASH_COMPARISONS: {Math.floor(scanProgress * 847)}M</div>
                      <div>BREACH_RECORDS_SCANNED: {Math.floor(scanProgress * 152.7)}M</div>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Results Terminal */}
                {checkResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border-2 p-4 font-mono text-sm relative ${
                      checkResult.type === "safe"
                        ? "border-green-500/50 bg-green-500/10"
                        : checkResult.type === "danger"
                        ? "border-red-500/50 bg-red-500/10"
                        : "border-orange-500/50 bg-orange-500/10"
                    }`}
                    data-testid={`result-${checkResult.type}`}
                  >
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-lg font-bold ${
                        checkResult.type === "safe" ? "text-green-400" : 
                        checkResult.type === "danger" ? "text-red-400" : "text-orange-400"
                      }`}>
                        {checkResult.type === "safe" && <CheckCircle size={24} />}
                        {checkResult.type === "danger" && <XCircle size={24} />}
                        {checkResult.type === "error" && <AlertTriangle size={24} />}
                        <span>
                          {checkResult.type === "safe" && "⚡ SCAN RESULTS"}
                          {checkResult.type === "danger" && "🚨 BREACH ALERT"}
                          {checkResult.type === "error" && "⚠️ SCAN ERROR"}
                        </span>
                      </div>
                      
                      <div className={`text-sm ${
                        checkResult.type === "safe" ? "text-green-300" : 
                        checkResult.type === "danger" ? "text-red-300" : "text-orange-300"
                      }`}>
                        {new Date().toLocaleString()}
                      </div>
                      
                      <div className={`${
                        checkResult.type === "safe" ? "text-green-100" : 
                        checkResult.type === "danger" ? "text-red-100" : "text-orange-100"
                      }`}>
                        {checkResult.message}
                      </div>
                      
                      {checkResult.count && checkResult.count > 0 && (
                        <div className="bg-black/50 border border-red-500/30 p-3 mt-3 rounded">
                          <div className="text-red-300 text-xs">
                            THREAT_LEVEL: CRITICAL<br/>
                            EXPOSURE_COUNT: {checkResult.count.toLocaleString()}<br/>
                            RECOMMENDATION: CHANGE_PASSWORD_IMMEDIATELY
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Animated border effect for results */}
                    <motion.div
                      className={`absolute inset-0 border-2 pointer-events-none ${
                        checkResult.type === "safe" ? "border-green-400" : 
                        checkResult.type === "danger" ? "border-red-400" : "border-orange-400"
                      }`}
                      animate={{
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Password Generator Section */}
            <motion.div
              className="password-generator-section bg-slate-900/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 shadow-2xl"
              variants={scaleIn}
            >
              <div className="space-y-6">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-purple-400" />
                  Generate Secure Password
                </h3>

                {/* Generated Password Display */}
                <div className="space-y-4">
                  <div className="bg-black/50 rounded-lg p-4 border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 font-mono text-lg text-white break-all" data-testid="text-generated-password">
                        {isGenerating ? (
                          <span className="text-gray-400">Generating secure password...</span>
                        ) : (
                          generatedPassword || "Click generate to create a password"
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => copyToClipboard(generatedPassword)}
                          disabled={!generatedPassword || isGenerating}
                          size="sm"
                          variant="outline"
                          className="text-white border-slate-600 hover:bg-slate-700"
                          data-testid="button-copy-generated"
                        >
                          {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                        </Button>
                        <Button
                          onClick={generatePassword}
                          disabled={isGenerating}
                          size="sm"
                          variant="outline"
                          className="text-white border-slate-600 hover:bg-slate-700"
                          data-testid="button-generate-password"
                        >
                          <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Password Length */}
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">
                      Length: {passwordLength}
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={passwordLength}
                      onChange={(e) => setPasswordLength(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      data-testid="slider-password-length"
                    />
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={includeUppercase}
                        onChange={(e) => setIncludeUppercase(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-uppercase"
                      />
                      <span>Uppercase</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={includeLowercase}
                        onChange={(e) => setIncludeLowercase(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-lowercase"
                      />
                      <span>Lowercase</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-numbers"
                      />
                      <span>Numbers</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                        className="rounded"
                        data-testid="checkbox-symbols"
                      />
                      <span>Symbols</span>
                    </label>
                  </div>

                  <Button
                    onClick={() => {
                      setPassword(generatedPassword);
                      setCheckResult(null);
                    }}
                    disabled={!generatedPassword}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    data-testid="button-use-generated-password"
                  >
                    Use This Password for Check
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-20 border-t border-cyan-500/20 bg-black/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-white font-mono text-2xl transform rotate-180">B</div>
                  <div className="flex flex-col text-white font-bold">
                    <span className="text-sm font-['Russo_One']">reach</span>
                    <span className="text-sm font-['Russo_One']">uster</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Advanced cybersecurity tools for password protection and breach detection.
                </p>
              </div>

              {/* Security Tools */}
              <div className="md:col-span-1">
                <h3 className="text-white font-['Russo_One'] text-sm uppercase tracking-wider mb-4">Security Tools</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Password Check</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Password Generator</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Breach Monitor</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Security Audit</a></li>
                </ul>
              </div>

              {/* Community */}
              <div className="md:col-span-1">
                <h3 className="text-white font-['Russo_One'] text-sm uppercase tracking-wider mb-4">Community</h3>
                <ul className="space-y-3">
                  <li><Link href="/suggestions" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Suggestions</Link></li>
                  <li><Link href="/feedback" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Feedback</Link></li>
                  <li><Link href="/bug-report" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Bug Reports</Link></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Security Forum</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Contributors</a></li>
                </ul>
              </div>

              {/* Legal & Support */}
              <div className="md:col-span-1">
                <h3 className="text-white font-['Russo_One'] text-sm uppercase tracking-wider mb-4">Legal & Support</h3>
                <ul className="space-y-3">
                  <li><a href="/copyright-claim" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Copyright Claims</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Terms of Service</a></li>
                  <li><a href="#" className="text-white/60 hover:text-cyan-400 transition-colors text-sm">Contact Support</a></li>
                </ul>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-cyan-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/40 text-sm mb-4 md:mb-0">
                © 2024 Breach Buster. All rights reserved.
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-white/40 text-sm">Powered by cutting-edge security research</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-mono">SYSTEMS ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
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
    </>
  );
};