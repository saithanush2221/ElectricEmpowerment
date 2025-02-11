import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Car, MapPin, Users, BookOpen, ArrowRightLeft } from "lucide-react";

const navItems = [
  { name: "Compare", href: "/compare", icon: ArrowRightLeft },
  { name: "Community", href: "/community", icon: Users },
  { name: "Chargers", href: "/chargers", icon: MapPin },
  { name: "Vehicles", href: "/vehicles", icon: Car },
  { name: "Learn", href: "/learn", icon: BookOpen },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/">
              <a className="flex items-center px-2 text-xl font-bold">
                EV Portal
              </a>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <a>
                      <Button
                        variant={location === item.href ? "default" : "ghost"}
                        className={cn(
                          "gap-2",
                          location === item.href
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Button>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
