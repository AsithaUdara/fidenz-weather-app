"use client";

import { ReactNode } from "react";
import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";
import { WeatherProvider } from "@/context/WeatherContext";
import LoginModal from "@/components/LoginModal";

function AuthGate({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();
  if (isLoading) return null;
  return (
    <>
      {!user && <LoginModal />}
      {children}
    </>
  );
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <WeatherProvider>
        <AuthGate>{children}</AuthGate>
      </WeatherProvider>
    </UserProvider>
  );
}
