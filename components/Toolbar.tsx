"use client";

import * as React from "react";

import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

import "xterm/css/xterm.css";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const Button = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className="rounded bg-white min-h-[40px] min-w-[40px] p-2 text-md text-indigo-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-indigo-200"
    >
      {children}
    </button>
  );
});

Button.displayName = "ToolbarButton";

const Toolbar = ({
  onScrollToBottom,
  onScrollToTop,
  onScrollToBug,
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
  onScrollToTop: () => void;
  onScrollToBottom: () => void;
  onScrollToBug: () => void;
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const target = event.target as typeof event.target & {
          searchTerm: { value: string };
        };

        const searchTerm = target.searchTerm.value;

        onSearch(searchTerm);
      }}
    >
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" onClick={onScrollToTop}>
              <ArrowUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Scroll to top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" onClick={onScrollToBottom}>
              <ArrowDownIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Scroll to bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" onClick={onScrollToBug}>
              🐛
            </Button>
          </TooltipTrigger>
          <TooltipContent>Scroll to next error</TooltipContent>
        </Tooltip>
        <input
          className="text-white placeholder:text-gray-500 bg-transparent border p-2 rounded"
          color="white"
          name="searchTerm"
          placeholder="Search logs"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};

export default Toolbar;
