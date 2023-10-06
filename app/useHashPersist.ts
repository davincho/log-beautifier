import * as React from 'react'

import lzString from "lz-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useHashPersist = () => {

    


  const pathname = usePathname();
  const searchParams = useSearchParams();

  const subscribe = React.useCallback(() => {
    return () => {};
  }, [pathname, searchParams]);

  const hash = React.useSyncExternalStore(
    subscribe,
    () => {
      return location.hash;
    },
    () => ""
  );

  const output =
    hash.length > 1
      ? lzString.decompressFromEncodedURIComponent(hash.substring(1))
      : "";

      return output;

}


export default useHashPersist