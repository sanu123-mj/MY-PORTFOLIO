import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Code2, 
  Briefcase, 
  Phone, 
  Menu, 
  X 
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navItems = [
    { path: "/", label: "Home", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { path: "/skills", label: "Skills", icon: <Code2 className="h-4 w-4 mr-2" /> },
    { path: "/projects", label: "Projects", icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { path: "/contact", label: "Contact", icon: <Phone className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-md p-1.5">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <span className="hidden font-bold text-xl md:inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              IT Portfolio
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button
                variant={location === item.path ? "default" : "ghost"}
                className={`flex items-center ${
                  location === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="container md:hidden py-4 border-t">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} onClick={() => setMenuOpen(false)}>
                <Button
                  variant={location === item.path ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    location === item.path ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}