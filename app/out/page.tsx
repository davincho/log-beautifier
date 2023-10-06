'use client'


import Container from "../../components/Container";
import Console from "../../components/Console";
import useHashPersist from "../useHashPersist";
import HashButton from "../../components/HashButton";

export default function Page() {

    const logOutput = useHashPersist()

    return (
        <Container
            containerProps={{
              height: "100vh",
              width: "100vw",
            }}
            action={
              <HashButton
                route="/"
              >
                Back
              </HashButton>
            }
          >
            <Console output={logOutput} />
          </Container>
    )

}