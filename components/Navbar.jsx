import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center rounded bg-slate-800 px-8 py-3">
      <Link
        className="text-white font-bold hover:text-xl hover:text-slate-400"
        href={"/"}
      >
        MKRS
      </Link>
      <Link
        className="bg-white p-2 rounded-md hover:bg-slate-200"
        href={"/addTopic"}
      >
        Add Topic
      </Link>
    </nav>
  );
}
