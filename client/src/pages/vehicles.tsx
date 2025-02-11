import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import type { Vehicle } from "@shared/schema";

export default function Vehicles() {
  const [search, setSearch] = useState("");

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const filteredVehicles = vehicles?.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(search.toLowerCase()) ||
    vehicle.manufacturer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Explore Electric Vehicles</h1>

        <div className="mb-8">
          <Input
            placeholder="Search vehicles by name or manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles?.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative aspect-video mb-4">
                      <img
                        src={vehicle.imageUrl || "https://images.unsplash.com/photo-1593018931925-c18bb72e6bf0"}
                        alt={vehicle.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <CardTitle>
                      {vehicle.manufacturer} {vehicle.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {vehicle.range && (
                          <Badge variant="secondary">
                            Range: {vehicle.range} km
                          </Badge>
                        )}
                        {vehicle.batteryCapacity && (
                          <Badge variant="secondary">
                            Battery: {vehicle.batteryCapacity} kWh
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <p>
                          <span className="font-semibold">Price:</span>{" "}
                          ₹{vehicle.price.toLocaleString()}
                        </p>
                        <p>
                          <span className="font-semibold">Maintenance:</span>{" "}
                          ₹{vehicle.maintenanceCost}/year
                        </p>
                        {vehicle.fuelSavings && (
                          <p>
                            <span className="font-semibold">Fuel Savings:</span>{" "}
                            ₹{vehicle.fuelSavings}/year
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}