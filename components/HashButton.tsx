import { useRouter } from "next/navigation";

export default function HashButton({
  children,
  route,
}: {
  children: string;
  route: string;
}) {
  const router = useRouter();

  return (
    <button
    
      className="px-6 py-4 w-full text-md font-semibold rounded bg-indigo-50  text-indigo-600 shadow-sm hover:bg-indigo-100"
      onClick={() => {
        router.push(`${route}${location.hash}`);
      }}
    >
      {children}
    </button>
  );
}
