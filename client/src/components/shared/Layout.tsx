import { Helmet } from "react-helmet";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} | IT Student Portfolio</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 container py-10">
          {children}
        </main>
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} IT Student Portfolio. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}