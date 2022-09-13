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
        scrollback: 100000,
      });

      const fitAddon = new FitAddon();

      terminal.loadAddon(fitAddon);

      terminal.open(nodeRef.current);

      fitAddon.fit();
      terminalRef.current = terminal;
    }

    if (output) {
      const prepOutput = output.replaceAll("\n", "\n\r");
      terminalRef.current?.write(prepOutput);
    }

    return () => {
      if (terminalRef.current) {
        terminalRef.current.clear();
        terminalRef.current.dispose();
        terminalRef.current = null;
      }
    };
  }, [output]);

  return <Box height="100%" overflowX="auto" overflowY="auto" ref={nodeRef} />;
};

export default Console;
