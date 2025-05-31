export default function Navbar() {
  return (
    <div className="flex justify-between py-4">
      <h1 className="text-xl font-semibold">nate&apos;s job board</h1>
      <button className="bg-sunshade-400 hover:bg-sunshade-500 active:ring-2 focus:bg-sunshade-500 focus:outline-none text-sunshade-950 font-medium rounded-md ring ring-sunshade-600 px-4 py-1.5">
        sign in!
      </button>
    </div>
  );
}
