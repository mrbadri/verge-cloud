import { ApiProvider } from "@repo/apis/providers/api-provider";
import { Toaster } from "@repo/ui/components/sonner";
import "@repo/ui/globals.css";
import { cn } from "@repo/ui/lib/utils";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Verge Cloud",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  return (
    <ApiProvider>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <body className={cn(inter.className, "h-full")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="ligth"
            // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </html>
    </ApiProvider>
  );
}
