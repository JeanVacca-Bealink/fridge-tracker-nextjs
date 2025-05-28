import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#f9a050] min-h-dvh flex flex-row justify-center gap-10 items-center w-full">
      <Image
        src={"/fridge.png"}
        alt="Fridge Tracker"
        width={300}
        height={200}
      />
      <div>
        <h1 className="text-4xl text-center font-bold mt-5">Fridge Tracker</h1>
        <p className="text-center text-lg mt-2">
          Keep track of your fridge items and never let food go to waste!
        </p>
        <Link href="/login" className="mt-5 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-all duration-300">
            Get Started
        </Link>
      </div>
    </div>
  );
}
