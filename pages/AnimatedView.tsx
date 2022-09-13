import { Box } from "@chakra-ui/react";
import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const AnimatedView = ({
  view,
  children,
}: {
  view: "input" | "output";
  children: React.ReactNode;
}) => {
  const direction = view === "input" ? -1 : 1;

  return (
    <AnimatePresence initial={false} custom={direction}>
      <Box position="relative">
        <motion.div
          style={{
            position: "absolute",
          }}
          custom={direction}
          key={view}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.1 },
          }}
        >
          {children}
        </motion.div>
      </Box>
    </AnimatePresence>
  );
};

export default AnimatedView;
