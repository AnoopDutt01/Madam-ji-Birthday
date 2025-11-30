import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import FloatingHearts from "./FloatingHearts";

interface Page4MessageProps {
  onNext: () => void;
}

const Page4Message = ({ onNext }: Page4MessageProps) => {
  const [displayText, setDisplayText] = useState("");
  const message = `Dear Roshni Ji,

On this beautiful day, I just want you to know how magical you are.
Your smile has a way of lighting up even the quietest corners,
and your presence turns ordinary moments into memories.

There is something incredibly warm about your presence
as if happiness quietly follows wherever you go.

Yours truly 💖,

Happy Birthday!`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= message.length) {
        setDisplayText(message.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 bg-gradient-to-br from-background via-primary/10 to-secondary/20">
      <FloatingHearts />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 z-20"
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-6 sm:mb-8 text-center"
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: [
              "0 0 10px rgba(251, 182, 193, 0.3)",
              "0 0 20px rgba(251, 182, 193, 0.5)",
              "0 0 10px rgba(251, 182, 193, 0.3)",
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          A Message for You
        </motion.h2>
        
        <div className="text-base sm:text-lg md:text-xl text-foreground/90 whitespace-pre-line leading-relaxed mb-6 sm:mb-8 font-['Poppins'] min-h-[350px] sm:min-h-[400px]">
          {displayText}
          <span className="animate-pulse">|</span>
        </div>

        {displayText.length >= message.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.p
              className="text-xl sm:text-2xl text-primary font-semibold mb-4 sm:mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              You are special 💖
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onNext}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              >
                One More Thing...
                <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Page4Message;
