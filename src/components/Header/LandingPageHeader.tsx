import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface LandingPageHeaderProps {
  isLoggedIn: boolean;
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({ isLoggedIn }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">GeoPrep</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Courses
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Exams
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <Button variant="outline">Dashboard</Button>
            ) : (
              <>
                <Button variant="ghost">Sign In</Button>
                <Button>Sign Up</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Courses
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Exams
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                About
              </a>
              <a href="#" className="block px-3 py-2 text-foreground hover:text-primary">
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                {isLoggedIn ? (
                  <Button variant="outline" className="w-full">Dashboard</Button>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full">Sign In</Button>
                    <Button className="w-full">Sign Up</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingPageHeader;