import { Box } from "@chakra-ui/react";
import * as React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box margin="2" height="calc(100vh - 24px)" width="calc(100vw - 24px)">
      {children}
    </Box>
  );
};

export default Container;
