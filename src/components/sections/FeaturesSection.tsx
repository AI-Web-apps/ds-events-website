import { Shield, Zap, Trophy, Users, Headphones, Gift } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Professional Equipment",
    description: "High-quality drone soccer equipment designed for competitive play with built-in safety features."
  },
  {
    icon: Zap,
    title: "No Purchase Required",
    description: "Experience the thrill without the hefty investment. Rent professional drones for the entire event."
  },
  {
    icon: Trophy,
    title: "Championship Ready",
    description: "Compete with regulation-standard equipment used in professional drone soccer competitions worldwide."
  },
  {
    icon: Users,
    title: "Team Packages",
    description: "Complete 4-drone packages for full team competitions. Perfect for group events and tournaments."
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "On-site technical assistance and training to ensure optimal performance during your event."
  },
  {
    icon: Gift,
    title: "Free Merchandise",
    description: "Exclusive drone soccer merchandise included with complete packages. No additional costs."
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-6 tracking-wide">
            Why <span className="gradient-text font-medium">Rent</span> With Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Professional equipment, expert support, transparent pricing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="neumorphic p-8 rounded-2xl group hover:glow-primary transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partnership Highlight */}
        <div className="mt-16 text-center">
          <div className="neumorphic p-8 rounded-3xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-2xl font-bold font-heading">DRONE SOCCERS</div>
              <div className="w-12 h-0.5 bg-primary"></div>
              <div className="text-2xl font-bold font-heading text-primary">TECHNOXIAN</div>
            </div>
            <p className="text-lg text-muted-foreground">
              Official collaboration bringing you the most authentic drone soccer experience 
              with cutting-edge technology and professional-grade equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}