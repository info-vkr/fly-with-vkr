"use client";
import Link from "next/link";

const NAVY = "#001F3F";
const GOLD = "#D4AF37";

export default function FooterSolid() {
  return (
    <footer className="bg-[#001F3F] text-white py-4 text-center text-sm">
      <span className="font-bold text-[#D4AF37]">
        <Link href="/">VKR International</Link>
      </span>{" "}
      &nbsp;|&nbsp; &copy; {new Date().getFullYear()} All rights reserved.
    </footer>
  );
}
