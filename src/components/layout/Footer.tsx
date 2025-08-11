import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="font-heading font-black text-2xl mb-4">
              <span className="gradient-text">Drone</span>
              <span className="text-foreground"> Soccers</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Professional grade drone soccer equipment rental service, 
              bringing you the ultimate competitive drone soccer experience without the investment.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 neumorphic rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary">DS</span>
              </div>
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <div className="w-12 h-12 neumorphic rounded-lg flex items-center justify-center">
                <span className="font-bold text-primary">TX</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@dronesoccers.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>dronesoccers.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Drone Soccers. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Professional Grade Equipment Rental
          </p>
        </div>
      </div>
    </footer>
  )
}