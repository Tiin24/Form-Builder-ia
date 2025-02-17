"use client";
import { SignedIn } from "@clerk/nextjs";
import React, { ReactNode } from "react";
import SideNavBar from "./_components/SideNavBar";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SignedIn>
      <div>
        <div className="md:w-64 fixed">
          <SideNavBar />
        </div>
        <div className="md:ml-64 h-s">{children}</div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
