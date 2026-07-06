import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";
  return (
    <header className="fixed w-full top-0 bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex">
          <span className="flex items-center">
            <span className="mr-0.5 text-4xl font-black italic bg-linear-to-br from-cyan-400 via-blue-600 to-indigo-900 bg-clip-text text-transparent">
              C
            </span>

            <span className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-slate-900 via-blue-700 to-cyan-500 bg-clip-text text-transparent">
              arvio
            </span>
          </span>
          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        <div className="flex items-center space-x-4 ">
          {isAdminPage ? (
            <Link href="/">
              <Button>
                <ArrowLeft size={18} />
                <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <Show when="signed-in">
              <Link href="/saved-cars">
                <Button>
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>
              {isAdmin ? (
                <Link href="/saved-cars">
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button variant="outline">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </Show>
          )}

          <Show when="signed-out">
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </Show>
        </div>
      </nav>
    </header>
  );
};
export default Header;
