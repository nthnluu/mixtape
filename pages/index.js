import dynamic from "next/dynamic";

export default function Home() {
  return <div className="flex items-center h-full justify-center">
    <div className="text-center max-w-md space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Mixtape</h1>
      <button className="text-lg font-semibold border-4 border-white px-4 py-2">
        <i className="fab fa-spotify mr-2"/>Continue with Spotify
      </button>
    </div>


  </div>
}
