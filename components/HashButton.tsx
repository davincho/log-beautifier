
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"

export default function HashButton ({children, route}: {children: string; route: string}) {

    const router = useRouter()

    return (
        <Button
        size="lg"
        className="w-full p-8 text-lg"
        onClick={() => {
          router.push(`${route}${location.hash}`);
        }}
        
        
      >
        {children}
      </Button>
    )

}