import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { Link } from "wouter";
import { Layout } from "@/components/shared/Layout";

export default function NotFound() {
  return (
    <Layout title="404 Not Found" description="Page not found">
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="space-y-6 max-w-md">
          <div className="bg-red-100 dark:bg-red-900/20 rounded-full h-24 w-24 flex items-center justify-center mx-auto">
            <AlertCircle className="h-12 w-12 text-red-500 dark:text-red-400" />
          </div>
          
          <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
          
          <div className="space-y-3">
            <p className="text-muted-foreground text-lg">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <p className="text-muted-foreground">
              Let's get you back on track.
            </p>
          </div>
          
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Return Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
