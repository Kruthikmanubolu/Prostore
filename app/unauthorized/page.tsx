import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Unauthorized Access'
}

const Unauthorized = () => {

    return (
        <div className="container mx-auto flex min-h-screen flex-col bg-gradient-to-b from-[#f4f4f2] via-[#eae8e1] to-[#dcd9d3] text-neutral-900 dark:bg-gradient-to-b dark:from-[#0f0f0f] dark:via-[#1a1a1a] dark:to-black dark:text-white items-center justify-center space-y-4 h-[calc(100vh-200px)]">
            <h1 className="h1-bold text-4xl">Unauthorized Access</h1>
            <p className="text-muted-foreground">You do not have permission to access this page</p>
            <Button asChild>
                <Link href='/'>Return Home</Link>
            </Button>
        </div>
    )
}

export default Unauthorized