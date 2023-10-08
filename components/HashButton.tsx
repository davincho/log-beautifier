import { useRouter } from "next/navigation";

export default function HashButton({
  children,
  route,
  disabled,
}: {
  children: string;
  route: string;
  disabled?: boolean;
}) {
  const router = useRouter();

  return (
    <button
      disabled={disabled}
      className="px-6 py-4 w-full text-md font-semibold rounded bg-indigo-50 text-indigo-600 shadow-sm hover:bg-indigo-100 disabled:bg-gray-200 disabled:text-gray-600 disabled:cursor-wait"
      onClick={() => {
        router.push(`${route}${location.hash}`);
      }}
    >
      {children}
    </button>
  );
}
