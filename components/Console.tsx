"use client";

import * as React from "react";

import type { Terminal as ITerminal } from "xterm";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebglAddon } from "xterm-addon-webgl";

import "xterm/css/xterm.css";

import Toolbar from "./Toolbar";

const Console = ({ output }: { output?: string }) => {
  const nodeRef = React.useRef<HTMLDivElement>();
  const terminalRef = React.useRef<ITerminal>();
  const searchAddonRef = React.useRef<SearchAddon>();

  const setupConsole = React.useCallback(
    (node: HTMLDivElement) => {
      if (!node) {
        if (nodeRef.current) {
          // We need to cleanup
          terminalRef.current?.clear();

          terminalRef.current = undefined;
        }

        return;
      }

      nodeRef.current = node;

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

      if (output) {
        const prepOutput = output
          .replaceAll("\n", "\n\r")
          .replaceAll("\\n", "\n\r")
          .replaceAll("\\u001b", "\u001B");

        terminalRef.current?.write(prepOutput);
      }
    },
    [output],
  );

  return (
    <div className="h-full relative">
      <div className="h-full overflow-auto" ref={setupConsole} />
      <div className="absolute right-0 top-0 z-10 rounded-md bg-white/10 backdrop-blur-md p-2 m-3">
        <Toolbar
          onSearch={(searchTerm) => {
            searchAddonRef.current?.findNext(searchTerm);
          }}
          onScrollToBottom={() => {
            terminalRef.current?.scrollToBottom();
            searchAddonRef.current?.clearDecorations();
          }}
          onScrollToBug={() => {
            searchAddonRef.current?.findNext(
              "failed|exit code [1-9][0-9]*|error",
              {
                regex: true,
                decorations: {
                  activeMatchBackground: "#FFFF54",
                  matchOverviewRuler: "#FFFF54",
                  activeMatchColorOverviewRuler: "#FFFF54",
                },
              },
            );
          }}
          onScrollToTop={() => {
            searchAddonRef.current?.clearDecorations();
            terminalRef.current?.scrollToTop();
          }}
        />
      </div>
    </div>
  );
};

export default Console;
