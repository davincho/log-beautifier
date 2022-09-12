import * as React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

import dynamic from "next/dynamic";

import Container from "./Container";

const DynamicConsole = dynamic(() => import("./Console"), {
  ssr: false,
});

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

import { ChakraProvider, Textarea, Button, Box, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [output, setOutput] = React.useState<string>("");
  const [view, setView] = React.useState<"input" | "output">("input");

  const direction = view === "input" ? -1 : 1;

  return (
    <ChakraProvider>
      <Head>
        <title>Log Beautifier</title>
        <meta name="description" content="Log Beautifier - by davincho" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.1 },
            }}
          >
            {view === "input" ? (
              <Container>
                <Textarea
                  placeholder="Paste your log here - everything is client side rendered and we don't send any data to our server 🔒"
                  style={{
                    height: "",
                  }}
                  height="90%"
                  onChange={(event) => {
                    setOutput(event.target.value);
                  }}
                  value={output}
                />
                <Button
                  height="10%"
                  size="lg"
                  marginTop={1}
                  width="100%"
                  onClick={() => {
                    setView("output");
                  }}
                >
                  Convert ✌🏼
                </Button>
              </Container>
            ) : (
              <Container>
                <DynamicConsole output={output} />
                <Button
                  onClick={() => {
                    setView("input");
                  }}
                  height="10%"
                  size="lg"
                  marginTop={1}
                  width="100%"
                >
                  Back
                </Button>
              </Container>
            )}
          </motion.div>
        </Box>
      </AnimatePresence>
    </ChakraProvider>
  );
};

export default Home;
