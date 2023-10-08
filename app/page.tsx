"use client";

import AnimatedView from "../components/AnimatedView";
import Container from "../components/Container";
import HashButton from "../components/HashButton";

import useHashPersist from "./useHashPersist";

export default function Page() {
  const [code, setCode] = useHashPersist();

  return (
    <AnimatedView>
      <Container action={<HashButton route="/out">Convert ✌🏼</HashButton>}>
        <textarea
          placeholder="Paste your log here - everything is client side rendered and we don't send any data to our server 🔒"
          className="h-full w-full border rounded-md p-2 font-mono"
          onChange={(event) => {
            const newCode = event.target.value;

            setCode(newCode);
          }}
          value={code}
        />
      </Container>
    </AnimatedView>
  );
}
