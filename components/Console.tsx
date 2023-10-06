'use client'

import * as React from "react";

import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

import type { Terminal } from "xterm";
import { SearchAddon } from "xterm-addon-search";

import "xterm/css/xterm.css";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
          allowProposedApi: true,
          scrollback: 100_000,
          minimumContrastRatio: 1,
          theme: {
            selectionBackground: "#FFFF54",
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
        
        terminalRef.current = undefined;
      }
    };
  }, [output]);

  return (
    <div className="h-full relative">
      <div
        className="h-full overflow-auto"
        
        ref={nodeRef}
      />
      <div className="absolute right-0 top-0 z-10 rounded-md bg-white/10 backdrop-blur-md p-2 m-3"
        

        
        
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
          <div className="flex flex-row gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
              <Button

                onClick={() => {
                  searchAddonRef.current?.clearDecorations();
                  terminalRef.current?.scrollToTop();
                }}
              >
                <ArrowUpIcon />
              </Button>
              </TooltipTrigger>
              <TooltipContent>
              Scroll to top
              </TooltipContent>
            </Tooltip>
            <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {
                  terminalRef.current?.scrollToBottom();
                  searchAddonRef.current?.clearDecorations();
                }}
              >
                <ArrowDownIcon />
              </Button>
              </TooltipTrigger>
              <TooltipContent>
              Scroll to bottom
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
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
              </TooltipTrigger>
              <TooltipContent>
              Scroll to next error
              </TooltipContent>
            </Tooltip>
            <input
              className="text-white placeholder:text-gray-500 bg-transparent border p-2 rounded"
              color="white"
              name="searchTerm"
              placeholder="Search logs"
            />
            <Button type="submit">
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Console;
