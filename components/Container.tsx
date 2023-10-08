import * as React from "react";

import { repository } from "../package.json";

const Container = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: React.ReactNode;
}) => {
  return (
    <div className="grid grid-rows-[1fr_minmax(10%,_50px)_40px] gap-1 h-screen w-screen p-1">
      <div>{children}</div>
      <div>{action}</div>

      <div className="text-center m-1">
        Developed with ❤️ in Vienna, AT -{" "}
        <a
          className="text-indigo-600 font-medium"
          href={repository}
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Container;
