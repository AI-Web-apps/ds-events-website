import { Button } from "@/components/ui/enhanced-button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ClaimKitDialog } from "@/components/ui/claim-kit-dialog";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="font-heading font-black text-xl sm:text-2xl">
            <span className="gradient-text">Drone</span>
            <span className="text-foreground"> Soccers</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
              Pricing
            </a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <ClaimKitDialog>
              <Button variant="hero" size="default">Claim Your Kit</Button>
            </ClaimKitDialog>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden neumorphic p-2 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 neumorphic p-6 rounded-2xl">
            <nav className="flex flex-col gap-4">
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors font-medium">
                Pricing
              </a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                Features
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </a>
              <ClaimKitDialog>
                <Button variant="hero" size="default" className="mt-4">
                  Claim Your Kit
                </Button>
              </ClaimKitDialog>
            </nav>
          </div>}
      </div>
    </header>;
}