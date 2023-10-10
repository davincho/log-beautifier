"use client";

import lzString from "lz-string";

export const encode = (code: string) => {
  return lzString.compressToEncodedURIComponent(JSON.stringify(code));
};
export const decode = (hash: string) => {
  return lzString
    .decompressFromEncodedURIComponent(hash)
    .slice(1, -1)
    .replaceAll("\\\\", "\\");
};

export const cleanupCode = (code: string) => {
  return code
    .replaceAll("\n", "\n\r")
    .replaceAll("\\n", "\n\r")
    .replaceAll("\\u001b[31m", (match) => `🐛 ${match}`)
    .replaceAll("\\u001b", "\u001B")
    .replaceAll(/exit code [1-9]\d*/g, (match) => `🐛 ${match}`);
};
