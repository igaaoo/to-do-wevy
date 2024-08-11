'use client';
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function SiteHeader() {
  const { token, logout } = useAuthContext();


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const hasPermission = (role: string) => {
    return role === 'admin' || role === 'supervisor';
  };

  const renderLinks = (item: any, index: number) => {
    if (item.security === 'public') {
      return (
        <Link
          key={index}
          href={item.href}
          onClick={toggleMenu}
          className={cn(
            `md:hover:bg-accentHeader flex items-center whitespace-nowrap rounded border-b px-2 py-4 text-sm font-medium text-muted-foreground hover:bg-accent  md:border-0  lg:border-0 ${token == '' && 'hidden'}`,
          )}
        >
          {item.title}
        </Link>
      );
    }
    return null;
  };


  return (
    <header className="bg-header sticky top-0 z-40  w-full shadow" id="noprint">
      <nav className="container flex h-16 items-center space-x-4 text-muted-foreground sm:justify-between sm:space-x-0 ">


        <div className="mr-8 flex items-center gap-2">
          <Link href={token != '' ? '/' : '/login'} className="flex items-center gap-2 align-middle">
            <Icons.logo />
            <h1 className="hidden whitespace-nowrap font-bold lg:block ">{siteConfig.name}</h1>
          </Link>
        </div>


        <div className="flex w-full flex-col md:flex-row">
          {/* Hamburger icon */}
          <div className="self-end  md:hidden">
            <button onClick={toggleMenu}>
              <Menu />
            </button>
          </div>

          {/* Navigation menu */}

          <div
            className={`${menuOpen ? 'absolute md:static' : 'hidden'
              }  right-0 top-12 flex-col gap-2 rounded  bg-background p-4 md:top-0 md:flex  md:w-full md:flex-row md:gap-0 md:bg-transparent lg:relative lg:top-0  lg:w-full lg:bg-transparent lg:p-0`}
          >

            {siteConfig.mainNav?.map(
              (item: any, index) =>
                item.href !== "/" &&
                (item.href && item.links == null ?
                  renderLinks(item, index)
                  :
                  null
                )

            )}

            <div className="flex w-fit items-center justify-end gap-2 md:w-full lg:w-full">
              <ThemeToggle />
              {token !== '' ? (
                <Link
                  className={cn("border-white", buttonVariants({ variant: 'outline' }))}
                  onClick={() => {
                    logout();
                  }}
                  href="/login"
                >
                  Sair
                </Link>
              ) : null}
            </div>
          </div>
        </div>


      </nav>
    </header>
  );
}
