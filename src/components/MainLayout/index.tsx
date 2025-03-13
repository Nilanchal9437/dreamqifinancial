/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";

import Link from "next/link";
import Image from "next/image";

// Icons
import { LogOut } from "lucide-react";

// Components
import SideBar from "@/components/MainLayout/sideBar";
import type { LayoutType } from "@/components/MainLayout/types";
import logout from "@/components/MainLayout/apis/logout";

const drawerWidth = "w-64"; // 256px equivalent

function MainLayout({ children, user }: LayoutType) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full ${drawerWidth} bg-gray-900 text-white`}
      >
        {/* Logo */}
        <div className="flex items-center h-20 border-b border-gray-700 mx-4">
          <Link href="/">
            <Image height={50} width={100} src="/logo.png" alt="logo" />
          </Link>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-[calc(100%-5rem)]">
          <div className="flex-grow overflow-y-auto">
            <SideBar />
          </div>

          {/* Logout Button */}
          <div className="border-t border-gray-700 p-4">
            <button
              onClick={() => {
                logout();
              }}
              className="flex items-center w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-red-600 transition"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-gray-600 rounded-full text-white font-bold">
                {user?.email[0]?.toUpperCase() || "X"}
              </span>
              <span className="ml-3 flex-1 truncate">
                {(user?.email || "").substring(0, 18)}...
              </span>
              <LogOut className="ml-3 h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen bg-gray-800 transition-all duration-300 ml-64 p-6`}
      >
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
