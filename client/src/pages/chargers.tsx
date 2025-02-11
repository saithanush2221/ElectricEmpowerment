import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { ChargingStation } from "@shared/schema";
import { MapPin } from "lucide-react";

export default function Chargers() {
  const [search, setSearch] = useState("");

  const { data: stations, isLoading } = useQuery<ChargingStation[]>({
    queryKey: ["/api/charging-stations"],
  });

  const filteredStations = stations?.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase()) ||
    station.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h1 className="text-4xl font-bold mb-8">Charging Stations</h1>
            
            <div className="mb-8">
              <Input
                placeholder="Search by name or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-md"
              />
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredStations?.map((station) => (
                  <motion.div
                    key={station.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          {station.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{station.address}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Featured Charging Location</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src="https://images.unsplash.com/photo-1663008519764-0616547c493a"
                  alt="Charging Station"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Fast Charging Hub</h3>
                <p className="text-muted-foreground mb-4">
                  Experience rapid charging with our state-of-the-art facilities.
                  Multiple charging points available 24/7.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1732193998117-97b3b2994323"
                    alt="Charging Detail 1"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1707341597123-c53bbb7e7f93"
                    alt="Charging Detail 2"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
