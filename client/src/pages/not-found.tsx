import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Home, ArrowLeft, Zap, Skull, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const [displayText, setDisplayText] = useState("");
  const [matrixChars, setMatrixChars] = useState<Array<{ id: number; char: string; x: number; y: number; speed: number }>>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const matrixCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]|\\:;\"'<>,.?/~`";
  const errorMessages = [
    "SYSTEM BREACH DETECTED",
    "ACCESS DENIED",
    "SECURITY PROTOCOL ACTIVATED",
    "FIREWALL ENGAGED",
    "UNAUTHORIZED ACCESS ATTEMPT"
  ];

  // Typing animation effect
  useEffect(() => {
    const text = "ERROR 404: CLASSIFIED ZONE";
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ff";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrixCharacters.charAt(Math.floor(Math.random() * matrixCharacters.length));
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(draw, 33);

    return () => clearInterval(matrixInterval);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Floating particles effect
  useEffect(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      char: matrixCharacters.charAt(Math.floor(Math.random() * matrixCharacters.length)),
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: Math.random() * 0.5 + 0.1
    }));
    
    setMatrixChars(particles);

    const moveParticles = setInterval(() => {
      setMatrixChars(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 100 ? -5 : particle.y + particle.speed,
        char: Math.random() > 0.98 ? matrixCharacters.charAt(Math.floor(Math.random() * matrixCharacters.length)) : particle.char
      })));
    }, 50);

    return () => clearInterval(moveParticles);
  }, []);

  return (
    <>
      <SEOHead
        title="404 Error - Page Not Found | BreachBuster"
        description="The page you're looking for doesn't exist. Return to BreachBuster's cybersecurity tools for password checking, breach detection, and security analysis."
        keywords="BreachBuster 404, page not found, cybersecurity tools, password security, breach detection"
        canonicalUrl="/404"
        noindex={true}
      />
      <div className="min-h-screen w-full relative overflow-hidden bg-black">
      {/* Matrix Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: 1 }}
      />

      {/* Floating Matrix Characters */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {matrixChars.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute text-cyan-400 font-mono text-xs opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {particle.char}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Animated Skull Icon */}
          <motion.div
            animate={{
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex justify-center"
          >
            <Skull className="w-24 h-24 text-red-500" data-testid="icon-skull" />
          </motion.div>

          {/* Glitch 404 Title */}
          <motion.div
            className={`text-8xl md:text-9xl font-mono font-bold text-red-500 relative ${
              glitchActive ? 'animate-pulse' : ''
            }`}
            style={{
              textShadow: glitchActive 
                ? `
                  2px 0 #ff0000,
                  -2px 0 #00ff00,
                  0 2px #0000ff,
                  0 -2px #ff00ff
                `
                : '0 0 20px #ff0000, 0 0 40px #ff0000'
            }}
          >
            <motion.span
              animate={glitchActive ? {
                x: [0, -2, 2, -1, 1, 0],
                skewX: [0, 1, -1, 0.5, -0.5, 0],
              } : {}}
              transition={{ duration: 0.2 }}
              data-testid="text-404"
            >
              404
            </motion.span>
          </motion.div>

          {/* Typing Animation Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <h1 className="text-2xl md:text-4xl font-mono text-cyan-400" data-testid="text-error-message">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-cyan-400"
              >
                |
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-lg text-gray-400 font-mono max-w-2xl mx-auto"
              data-testid="text-description"
            >
              The page you're looking for has been quarantined by our security protocols.
              <br />
              <span className="text-yellow-400">
                {errorMessages[Math.floor(Math.random() * errorMessages.length)]}
              </span>
            </motion.p>
          </motion.div>

          {/* Animated Warning */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5 }}
            className="flex items-center justify-center gap-3 text-yellow-400 bg-yellow-900/20 border border-yellow-400/30 rounded-lg p-4 max-w-md mx-auto"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <AlertTriangle className="w-6 h-6" data-testid="icon-warning" />
            </motion.div>
            <span className="font-mono text-sm" data-testid="text-warning">
              SECURITY BREACH DETECTED
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              onClick={() => setLocation("/")}
              className="group relative bg-cyan-600 hover:bg-cyan-500 text-white border-2 border-cyan-400 px-8 py-3 font-mono text-lg transition-all duration-300 overflow-hidden"
              data-testid="button-home"
            >
              <motion.div
                className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex items-center gap-2 relative z-10">
                <Home className="w-5 h-5" />
                RETURN TO BASE
              </div>
            </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="group relative bg-transparent border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-black px-8 py-3 font-mono text-lg transition-all duration-300"
              data-testid="button-back"
            >
              <motion.div
                whileHover={{ x: -5 }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                RETREAT
              </motion.div>
            </Button>
          </motion.div>

          {/* Terminal-style Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
            className="mt-12 p-4 bg-black/50 border border-green-400/30 rounded font-mono text-sm text-green-400 max-w-lg mx-auto"
            data-testid="terminal-footer"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>SYSTEM STATUS: ACTIVE</span>
            </div>
            <div className="text-xs opacity-70">
              {'>'} Timestamp: {new Date().toISOString()}
              <br />
              {'>'} User Agent: CLASSIFIED
              <br />
              {'>'} Security Level: MAXIMUM
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scan Lines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #00ff00 2px,
            #00ff00 4px
          )`,
          zIndex: 5
        }}
      />
    </div>
    </>
  );
}
