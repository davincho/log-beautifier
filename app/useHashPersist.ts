"use client";

import * as React from "react";

import lzString from "lz-string";
import { useRouter } from "next/navigation";
import { throttle } from "throttle-debounce";

const persistToHash = throttle(
  500,
  (code: string, router: ReturnType<typeof useRouter>) => {
    if (typeof window === "undefined") {
      return;
    }

    if (code) {
      router.replace(`/#${lzString.compressToEncodedURIComponent(code)}`);
    } else {
      router.replace(`/`);
    }
  },
);

const useHashPersist = () => {
  const [code, setCode] = React.useState(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash;

    return hash.length > 1
      ? lzString.decompressFromEncodedURIComponent(hash.slice(1))
      : "";
  });

  const router = useRouter();

  return [
    code,
    (newCode: string) => {
      setCode(newCode);

      persistToHash(newCode, router);
    },
  ] as const;
};

export default useHashPersist;
