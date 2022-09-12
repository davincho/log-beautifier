import { Box } from "@chakra-ui/react";
import * as React from "react";
import { FitAddon } from "xterm-addon-fit";

import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const Console = ({ output }: { output: string }) => {
  const nodeRef = React.useRef<HTMLElement>();
  const terminalRef = React.useRef<Terminal>();

  React.useEffect(() => {
    if (!terminalRef.current) {
      const terminal = new Terminal({
        tabStopWidth: 1,
        rendererType: "canvas",
      });

      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);

      terminal.open(nodeRef.current);
      fitAddon.fit();
      terminalRef.current = terminal;
    }

    if (output) {
      const lines = output.split("\n");
      console.log("HOW MUCH", lines.length);

      for (const line of lines) {
        terminalRef.current.writeln(line);
      }
    }

    return () => {
      if (terminalRef.current) {
        console.log("EXITING");
        terminalRef.current.clear();
        terminalRef.current.dispose();
        terminalRef.current = null;
      }
    };
  }, [output]);

  return <Box overflowX="auto" overflowY="auto" ref={nodeRef} />;
};

export default Console;
