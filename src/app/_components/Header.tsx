"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import React from "react";

function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex items-center justify-between">
        <Image src={"/logo.svg"} width={100} height={50} alt="logo" />
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Link href={'/dashboard'} className="flex items-center gap-4">
            <Button variant={"outline"}>Dashboard</Button>
            <UserButton />
            </Link>
          </div>
        ) : (
          <div>
            <SignInButton>
              <Button>Get Started</Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
