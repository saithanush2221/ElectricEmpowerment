import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-primary mb-6">
            Discover the Future of Mobility
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore electric vehicles, find charging stations, and join a community
            of EV enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles">
              <a>
                <Button size="lg" className="gap-2">
                  Explore Vehicles
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </a>
            </Link>
            <Link href="/learn">
              <a>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </a>
            </Link>
          </div>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Compare EVs",
              description:
                "Find the perfect electric vehicle by comparing range, cost, and features.",
              image: "https://images.unsplash.com/photo-1593018931419-96adfd5b182d",
              href: "/compare",
            },
            {
              title: "Charging Network",
              description:
                "Locate charging stations nearby and plan your journey with confidence.",
              image: "https://images.unsplash.com/photo-1663008519764-0616547c493a",
              href: "/chargers",
            },
            {
              title: "Join the Community",
              description:
                "Connect with other EV owners, share experiences, and get advice.",
              image: "https://images.unsplash.com/photo-1664382953518-4a664ab8a8c9",
              href: "/community",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href={item.href}>
                <a>
                  <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/80">{item.description}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
