import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="btn-group">
        <button
          id="create"
          className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          onClick={() => router.push("/create")}
        >
          I want to create my will
        </button>
        <button
          id="modify"
          className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
          onClick={() => router.push("/modify")}
        >
          I want to modify my will
        </button>
        <style jsx>{`
          div {
            width: 100%;
            margin-top: 20%;
          }
          button {
            width: 40%;
            margin-left: 5%;
          }
        `}</style>
      </div>
    </>
  );
}
