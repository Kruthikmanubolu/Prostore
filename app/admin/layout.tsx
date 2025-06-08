import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "@/components/shared/header/menu";
import MainNav from "./main-nav";
import { Input } from "@/components/ui/input";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#f4f4f2] via-[#eae8e1] to-[#dcd9d3] text-neutral-900 dark:bg-gradient-to-b dark:from-[#0f0f0f] dark:via-[#1a1a1a] dark:to-black dark:text-white">
        <div className="container border-b mx-auto">
          <div className="flex items-center h-16 p-4 wrapper">
            <Link href="/" className="w-22 ">
              <Image
                src="/images/logo.png"
                height={48}
                width={48}
                alt="app-name"
              ></Image>
            </Link>
            <MainNav className="mx-6" />
            <div className="ml-auto items-center flex space-x-4">
              <div>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="md:w-[100px] lg:w-[300px]"
                ></Input>
              </div>
              <Menu />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto wrapper">
          {children}
        </div>
      </div>
    </>
  );
}
