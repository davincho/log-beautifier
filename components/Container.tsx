import * as React from "react";

import { Box, Grid, GridItem, Link } from "@chakra-ui/react";

import { repository } from "../package.json";

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
    <div className="grid grid-rows-[1fr_minmax(10%,_50px)_40px] gap-1 h-screen w-screen p-1">
      <div>{children}</div>
      <div>{action}</div>

      <div className="text-center m-1">
        Developed with ❤️ in Vienna, AT -{" "}
        <Link
          color="teal.500"
          href={repository}
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </Link>
      </div>
    </div>
  );
};

export default Container;
