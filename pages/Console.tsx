import * as React from "react";

import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Box, Input, Button, Stack, Tooltip } from "@chakra-ui/react";
import { Terminal } from "xterm";
import { SearchAddon } from "xterm-addon-search";

import "xterm/css/xterm.css";

const Console = ({ output }: { output: string }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const terminalRef = React.useRef<Terminal>();
  const searchAddonRef = React.useRef<SearchAddon>();

  React.useEffect(() => {
    const initTerminal = async () => {
      // We need to import dynamically as even deactivating ssr
      // make NextJS fail when trying to build the app :sadpepe:
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");
      const { WebglAddon } = await import("xterm-addon-webgl");
      const { SearchAddon } = await import("xterm-addon-search");

      // Add logic with `term`
      if (!terminalRef.current) {
        const terminal = new Terminal({
          scrollback: 100_000,
          minimumContrastRatio: 1,
          theme: {
            selection: "#FFFF54",
            selectionForeground: "#000",
          },
        });

        const fitAddon = new FitAddon();
        const searchAddon = new SearchAddon();

        terminal.loadAddon(fitAddon);
        terminal.loadAddon(searchAddon);

        if (nodeRef.current) {
          terminal.open(nodeRef.current);
          terminal.loadAddon(new WebglAddon());
        }

        fitAddon.fit();
        terminalRef.current = terminal;
        searchAddonRef.current = searchAddon;
      }

      if (output) {
        const prepOutput = output.replaceAll("\n", "\n\r");
        terminalRef.current?.write(prepOutput);
      }
    };
    initTerminal();

    return () => {
      if (terminalRef.current) {
        terminalRef.current.clear();
        terminalRef.current.dispose();
        terminalRef.current = undefined;
      }
    };
  }, [output]);

  return (
    <Box height="100%" position="relative">
      <Box
        as="div"
        height="100%"
        overflowX="auto"
        overflowY="auto"
        ref={nodeRef}
      />
      <Box
        position="absolute"
        right="0"
        top="0"
        zIndex="4"
        borderRadius="md"
        margin="3"
        backgroundColor="rgba(240,240,240,0.4)"
        padding="2"
        backdropFilter="blur(8px)"
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const target = event.target as typeof event.target & {
              searchTerm: { value: string };
            };

            const searchTerm = target.searchTerm.value;

            searchAddonRef.current?.findNext(searchTerm);
          }}
        >
          <Stack direction="row">
            <Tooltip label="Scroll to top">
              <Button
                onClick={() => {
                  searchAddonRef.current?.clearDecorations();
                  terminalRef.current?.scrollToTop();
                }}
              >
                <ArrowUpIcon />
              </Button>
            </Tooltip>
            <Tooltip label="Scroll to bottom">
              <Button
                onClick={() => {
                  terminalRef.current?.scrollToBottom();
                  searchAddonRef.current?.clearDecorations();
                }}
              >
                <ArrowDownIcon />
              </Button>
            </Tooltip>
            <Tooltip label="Scroll to next error">
              <Button
                onClick={() => {
                  searchAddonRef.current?.findNext(
                    "failed|exit code [1-9][0-9]*",
                    {
                      regex: true,
                    }
                  );
                }}
              >
                🐛
              </Button>
            </Tooltip>
            <Input
              _placeholder={{ color: "rgb(203,203,203)" }}
              color="white"
              name="searchTerm"
              placeholder="Search logs"
            />
            <Button padding="5" colorScheme="blue" type="submit">
              Search
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Console;
