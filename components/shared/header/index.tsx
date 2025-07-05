import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import Search from "./search";

import CategoryDrawer from "./category-drawer";
const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between" suppressHydrationWarning>
        <div className="flex-start" suppressHydrationWarning>
          <CategoryDrawer /> 
          <Link href="/" className="flex-start ml-4">
            <Image
              src="/images/logo.png"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-3">
                {APP_NAME}
            </span>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
          <Menu/>
      </div>
    </header>
  );
};

export default Header;
