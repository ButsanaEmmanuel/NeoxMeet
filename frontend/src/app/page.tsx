export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">NeoxMeet</h1>
      <p className="text-slate-200">LiveKit-first meeting platform with AI transcription, translation, and recap tools.</p>
      <div className="space-x-3 text-sm">
        <a className="rounded bg-indigo-500 px-4 py-2 font-semibold" href="/register">
          Create account
        </a>
        <a className="rounded border border-indigo-400 px-4 py-2 font-semibold" href="/login">
          Login
        </a>
      </div>
    </div>
  );
}
