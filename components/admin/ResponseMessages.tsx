import Link from "next/link";

interface Props {
  messages: string[];
  state: number;
}

export const ResponseMessages = ({ messages, state }: Props) => {
  if (state > 0) {
    return (
      <div>
        <p className={`text-${state === 1 ? "green-700" : "red-700"} mb-5`}>{messages[state]}</p>
        <Link href="/admin">
          <a className="rounded-lg bg-gray-200 hover:bg-gray-300 py-2 px-3">Go back</a>
        </Link>
      </div>
    );
  }

  return null;
};
