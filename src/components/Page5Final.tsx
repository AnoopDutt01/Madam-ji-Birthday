import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";

interface Page5FinalProps {
  phoneNumber: string;
  onRestart: () => void;
}

const Page5Final = ({ phoneNumber, onRestart }: Page5FinalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/9460381886?text=Thank you for the beautiful Gift! 💖`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                backgroundColor: [
                  "hsl(340, 82%, 76%)",
                  "hsl(270, 50%, 85%)",
                  "hsl(30, 100%, 90%)",
                  "hsl(320, 70%, 88%)",
                ][Math.floor(Math.random() * 4)],
              }}
              animate={{
                y: ["0vh", "120vh"],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      )}

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="text-primary h-6 w-6" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-20 max-w-3xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="text-8xl mb-8"
        >
          🎉
        </motion.div>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-primary mb-4 sm:mb-6"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(251, 182, 193, 0.3)",
              "0 0 40px rgba(251, 182, 193, 0.6)",
              "0 0 20px rgba(251, 182, 193, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Happy Birthday! 🎂
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-6 sm:mb-8 px-4"
        >
          Once again, wishing you the most amazing day filled with love and joy!
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg sm:text-xl text-foreground/70 mb-8 sm:mb-12 px-4 text-center"
        >
          Thank you for being such a wonderful person for me.
          <br />
          Here's to many more beautiful moments together! 💫
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            onClick={handleWhatsApp}
            size="lg"
            className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 rounded-full"
          >
            <MessageCircle className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
            Reply to Save it
          </Button>
          
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 text-lg sm:text-xl px-8 sm:px-10 py-6 sm:py-7 rounded-full"
          >
            ↻ Rewatch from Start
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="text-lg text-foreground/60 mt-8 italic"
        >
          With love and best wishes 💝
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Page5Final;
