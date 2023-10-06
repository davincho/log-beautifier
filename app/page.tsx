"use client";

import * as React from "react";

import lzString from "lz-string";

import Container from "../components/Container";
import { useRouter } from "next/navigation";

import useHashPersist from "./useHashPersist";
import HashButton from "../components/HashButton";
import AnimatedView from "../components/AnimatedView";

export default function Page() {
  const router = useRouter();

  const code = useHashPersist();

  return (
    <AnimatedView>
      <Container
        containerProps={{
          height: "100vh",
          width: "100vw",
          padding: "1",
        }}
        action={<HashButton route="/out">Convert ✌🏼</HashButton>}
      >
        <textarea
          placeholder="Paste your log here - everything is client side rendered and we don't send any data to our server 🔒"
          className="h-full w-full border rounded-md p-3"
          onChange={(event) => {
            const newCode = event.target.value;

            if (!newCode) {
              router.replace(`/`);
            } else {
              location.hash = lzString.compressToEncodedURIComponent(newCode);

              router.replace(
                `/#${lzString.compressToEncodedURIComponent(newCode)}`
              );
            }
          }}
          value={code}
        />
      </Container>
    </AnimatedView>
  );
}
