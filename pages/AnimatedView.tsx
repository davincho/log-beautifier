import * as React from "react";

import { Box } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedView = ({
  view,
  children,
}: {
  view: "input" | "output";
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      <Box position="relative">
        <motion.div
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </Box>
    </AnimatePresence>
  );
};

export default AnimatedView;
