import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div className="btn-group">
        <button id="client" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => router.push('/clientDashboard')}>I want to create or modify my will</button>
        <button id="user" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => router.push('/userDashboard')}>I want to register a death to claim will</button>
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