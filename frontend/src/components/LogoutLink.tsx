"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function LogoutLink() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <Link href="/api/auth/logout" className="text-sm text-white/80 hover:text-white underline">
      Logout
    </Link>
  );
}
