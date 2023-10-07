"use client";

import dynamic from "next/dynamic";

import AnimatedView from "../../components/AnimatedView";
import Container from "../../components/Container";
import HashButton from "../../components/HashButton";
import useHashPersist from "../useHashPersist";

const Console = dynamic(() => import("../../components/Console"), {
  ssr: false,
});

export default function Page() {
  const [output] = useHashPersist();

  return (
    <AnimatedView>
      <Container action={<HashButton route="/">Back</HashButton>}>
        <Console output={output} />
      </Container>
    </AnimatedView>
  );
}
