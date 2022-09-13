import * as React from "react";

import type { NextPage } from "next";
import Head from "next/head";

import Container from "./Container";
import AnimatedView from "./AnimatedView";
import Console from "./Console";

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

      <AnimatedView view={view}>
        {view === "input" ? (
          <Container
            action={
              <Button
                height="100%"
                size="lg"
                width="100%"
                onClick={() => {
                  setView("output");
                }}
              >
                Convert ✌🏼
              </Button>
            }
          >
            <Textarea
              placeholder="Paste your log here - everything is client side rendered and we don't send any data to our server 🔒"
              style={{
                height: "",
              }}
              height="100%"
              onChange={(event) => {
                setOutput(event.target.value);
              }}
              value={output}
            />
          </Container>
        ) : (
          <Container
            action={
              <Button
                onClick={() => {
                  setView("input");
                }}
                height="100%"
                size="lg"
                marginTop={1}
                width="100%"
              >
                Back
              </Button>
            }
          >
            <Console output={output} />
          </Container>
        )}
      </AnimatedView>
    </ChakraProvider>
  );
};

export default Home;
