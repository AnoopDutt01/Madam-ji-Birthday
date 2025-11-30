import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "@/components/MusicPlayer";
import Page1Welcome from "@/components/Page1Welcome";
import Page2Balloons from "@/components/Page2Balloons";
import Page3Gallery from "@/components/Page3Gallery";
import Page4Message from "@/components/Page4Message";
import Page5Final from "@/components/Page5Final";

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Customize these values
  const crushName = "Roshni Ji";
  const phoneNumber = "+91 9460381886"; // Format: country code + number (no + or spaces)

  const pages = [
    <Page1Welcome key="page1" onNext={() => setCurrentPage(1)} crushName={crushName} />,
    <Page2Balloons key="page2" onNext={() => setCurrentPage(2)} />,
    <Page3Gallery key="page3" onNext={() => setCurrentPage(3)} />,
    <Page4Message key="page4" onNext={() => setCurrentPage(4)} />,
    <Page5Final key="page5" phoneNumber={phoneNumber} onRestart={() => setCurrentPage(0)} />,
  ];

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.8,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5 -z-10" />
      
      <AnimatePresence mode="wait" custom={currentPage}>
        <motion.div
          key={currentPage}
          custom={currentPage}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="min-h-screen pb-24"
        >
          {pages[currentPage]}
        </motion.div>
      </AnimatePresence>

      <MusicPlayer />
    </div>
  );
};

export default Index;
