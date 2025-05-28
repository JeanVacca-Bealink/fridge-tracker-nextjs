"use client";

import { logout } from "@/actions/login.actions";
import Image from "next/image";
import Link from "next/link";

export default function PageHeader() {
  return (
    <>
      <div className="absolute h-[250px] bg-[#f9a050] w-full z-[-1]"></div>
      <div className="flex items-center px-10 py-5 bg-[#f9a050]">
        <Image
          src={"/logo.png"}
          height={50}
          width={50}
          alt="Fridge Tracker Logo"
        ></Image>
        <nav className="ml-auto">
          <ul className="flex flex-row gap-5">
            <li>
              <Link
                href="/app/dashboard"
                className="text-white bg-amber-600 text-sm px-3 py-1 hover:shadow-mg hover:bg-amber-700 rounded-md transition-all duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/app/account"
                className="text-white bg-amber-600 text-sm px-3 py-1 hover:shadow-mg hover:bg-amber-700 rounded-md transition-all duration-300"
              >
                Account
              </Link>
            </li>
            <li>
              <form>
                <button
                  formAction={logout}
                  className="text-white bg-amber-600 text-sm px-3 py-1 hover:shadow-mg hover:bg-amber-700 rounded-md transition-all duration-300"
                >
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
