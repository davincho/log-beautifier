import { Box } from "@chakra-ui/react";
import * as React from "react";

const Container = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: React.ReactNode;
}) => {
  return (
    <Box margin="2" height="calc(100vh - 24px)" width="calc(100vw - 24px)">
      <Box height="90%">{children}</Box>
      <Box marginTop="16px" height="calc(10% - 16px)">
        {action}
      </Box>
    </Box>
  );
};

export default Container;
