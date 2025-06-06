import Header from "@/components/shared/header";
import Footer from "@/components/footer";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#f4f4f2] via-[#eae8e1] to-[#dcd9d3] text-neutral-900 dark:bg-gradient-to-b dark:from-[#0f0f0f] dark:via-[#1a1a1a] dark:to-black dark:text-white">
        <Header/>
        <main className="flex-1 wrapper">{children}</main>
        <Footer/>
      </div>
    );
  }