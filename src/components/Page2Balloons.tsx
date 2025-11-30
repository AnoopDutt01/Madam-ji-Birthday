import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import FloatingBalloons from "./FloatingBalloons";

interface Page2BalloonsProps {
  onNext: () => void;
}

const Page2Balloons = ({ onNext }: Page2BalloonsProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 bg-gradient-to-br from-background via-secondary/20 to-accent/20">
      <FloatingBalloons />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-20 max-w-2xl"
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-6 sm:mb-8 px-2"
          animate={{ 
            y: [0, -10, 0],
            textShadow: [
              "0 0 10px rgba(251, 182, 193, 0.3)",
              "0 0 20px rgba(251, 182, 193, 0.5)",
              "0 0 10px rgba(251, 182, 193, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Rise Higher
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl sm:text-2xl md:text-3xl text-foreground/80 mb-8 sm:mb-12 leading-relaxed px-4"
        >
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Let your happiness rise higher than these balloons…
          </motion.span>
          <br />
          <motion.span 
            className="text-primary"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            May all your dreams float to reality
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
          >
            Continue
            <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page2Balloons;
