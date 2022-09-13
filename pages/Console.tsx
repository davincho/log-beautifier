import { Box } from "@chakra-ui/react";
import * as React from "react";

import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const Console = ({ output }: { output: string }) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const terminalRef = React.useRef<Terminal>();

  React.useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import("xterm");
      const { FitAddon } = await import("xterm-addon-fit");
      const term = new Terminal();
      // Add logic with `term`

      if (!terminalRef.current) {
        const terminal = new Terminal({
          scrollback: 100000,
        });

        const fitAddon = new FitAddon();

        terminal.loadAddon(fitAddon);

        if (nodeRef.current) {
          terminal.open(nodeRef.current);
        }

        fitAddon.fit();
        terminalRef.current = terminal;
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
    <Box
      as="div"
      height="100%"
      overflowX="auto"
      overflowY="auto"
      ref={nodeRef}
    />
  );
};

export default Console;
