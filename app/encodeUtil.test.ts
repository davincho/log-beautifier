import { test, expect } from "vitest";

import { cleanupCode, decode, encode } from "./encodeUtil";

test("it should handle non-printable characters correctly", () => {
  const from = "[31m1 of 63 failed (2%)";
  const to = "\\u001b[31m1 of 63 failed (2%)\\u001b";

  expect(decode(encode(from))).toEqual(to);
});

test("it should handle escaped values correclty", () => {
  const from = "\u001B[31m1 of 53 failed (2%)\u001B";
  const to = "\\u001b[31m1 of 53 failed (2%)\\u001b";

  expect(decode(encode(from))).toEqual(to);
});

test("it should put zero-width whitespace (\u200B) markers in places we consider to be an error", () => {
  const source = "\u001B[31m1 of 53 failed (2%)\u001B";

  expect(cleanupCode(decode(encode(source)))).toEqual(
    "\u200B\u001B[31m1 of 53 failed (2%)\u001B",
  );

  expect(cleanupCode("exit code 10")).toEqual("\u200Bexit code 10");

  expect(decode(encode("sdf sdf sd fsd wert"))).toEqual("sdf sdf sd fsd wert");
});

test("it should clean code so it is ready for xterm", () => {
  expect(cleanupCode("foo \n bar")).toBe("foo \n\r bar");
  expect(cleanupCode("\\n this is a test")).toBe("\n\r this is a test");
  expect(cleanupCode("\\u001b\\u001b")).toBe("\u001B\u001B");
});
