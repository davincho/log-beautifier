import * as React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import AnsiToHtml from "ansi-to-html";

const converter = new AnsiToHtml();

import { ChakraProvider, Textarea, Container, Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [output, setOutput] = React.useState("");

  return (
    <ChakraProvider>
      <Head>
        <title>Log Beautifier</title>
        <meta name="description" content="Log Beautifier - by davincho" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Textarea
          onChange={(event) => {
            setOutput(event.target.value);
          }}
        />
      </Container>
      <Box>
        <div
          dangerouslySetInnerHTML={{
            __html: converter.toHtml(output),
          }}
        />
      </Box>
    </ChakraProvider>
  );
};

export default Home;
