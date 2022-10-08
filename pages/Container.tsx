import * as React from "react";

import { Box, Grid, GridItem, Link } from "@chakra-ui/react";

import { repository } from "./../package.json";

const Container = ({
  children,
  action,
  containerProps,
}: {
  children: React.ReactNode;
  action: React.ReactNode;
  containerProps?: React.ComponentProps<typeof Box>;
}) => {
  return (
    <Grid
      {...containerProps}
      gridTemplateRows="1fr minmax(10%, 50px) 30px"
      gap={1}
    >
      <GridItem>{children}</GridItem>
      <GridItem marginY="4px" minHeight="50px">
        {action}
      </GridItem>

      <GridItem textAlign="center" margin="1">
        Developed with ❤️ in Vienna, AT -{" "}
        <Link
          color="teal.500"
          href={repository}
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </Link>
      </GridItem>
    </Grid>
  );
};

export default Container;
