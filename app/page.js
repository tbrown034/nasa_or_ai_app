import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1>NASA or Not</h1>
      <p className="text-xl ">
        Can you spot the difference between the real and AI-generated images?
        Challenge yourself with this cosmic guessing game.
      </p>
      <div className="flex gap-4">
        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500 active:bg-blue-300"
          href="/apod"
        >
          Show APOD
        </Link>
        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500 active:bg-blue-300"
          href="/random"
        >
          Show Random APOD
        </Link>

        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500 active:bg-blue-300"
          href="/nasaVsAi"
        >
          NASA vs AI
        </Link>
        <Link
          className="p-2 border-2 border-white rounded hover:bg-blue-500 active:bg-blue-300"
          href="/play"
        >
          Play
        </Link>
      </div>
    </main>
  );
}
