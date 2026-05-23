export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">
        CollegeFinder
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/compare">Compare</a>
        <a href="/saved">Saved</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
}