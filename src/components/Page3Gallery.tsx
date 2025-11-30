import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";

interface Page3GalleryProps {
  onNext: () => void;
}

const Page3Gallery = ({ onNext }: Page3GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Images with different sizes - using grid row/col spans for varied layout
  const images = [
    { src: img1, title: "When Silence Felt Loud", span: "col-span-2 md:col-span-4 row-span-1 md:row-span-1" }, // Wide Rectangle
    { src: img2, title: "The Question", span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1" }, // Small
    { src: img3, title: "Feelings were typed before spoken", span: "col-span-1 md:col-span-1 row-span-2 md:row-span-2" }, // Tall
    { src: img4, title: "The Butterfly", span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1" }, // Small
    { src: img5, title: "Still Far away", span: "col-span-2 md:col-span-2 row-span-1 md:row-span-1" }, // Wide
    { src: img6, title: "Will it Rain ?", span: "col-span-1 md:col-span-1 row-span-1 md:row-span-1" }, // Small
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16 sm:py-20 bg-gradient-to-br from-background via-accent/20 to-muted/30">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 z-10"
      >
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary mb-3 sm:mb-4 px-2"
          animate={{
            textShadow: [
              "0 0 10px rgba(251, 182, 193, 0.3)",
              "0 0 20px rgba(251, 182, 193, 0.5)",
              "0 0 10px rgba(251, 182, 193, 0.3)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Our Beautiful Moments 💞
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-foreground/70 px-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Every picture tells a story.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl w-full mb-8 sm:mb-12 auto-rows-[200px] md:auto-rows-[250px]"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ scale: 1.03, zIndex: 10 }}
            className={`relative ${image.span} rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300`}
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.title}
              className={`w-full h-full ${index === 0 ? 'object-contain' : 'object-cover'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
              <p className="text-white font-medium text-sm sm:text-base drop-shadow-lg">{image.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 z-10"
        >
          Next Chapter
          <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </motion.div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </Button>
          <motion.img
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </motion.div>
      )}
    </div>
  );
};

export default Page3Gallery;
