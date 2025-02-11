import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import type { Vehicle } from "@shared/schema";

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState<string>("all");

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const filteredVehicles = vehicles?.filter((vehicle) => {
    const matchesSearch = 
      (vehicle.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (vehicle.manufacturer?.toLowerCase() || "").includes(search.toLowerCase());

    const matchesFuelType = fuelTypeFilter === "all" || vehicle.fuelType === fuelTypeFilter;

    return matchesSearch && matchesFuelType;
  });

  const fuelTypes = Array.from(new Set(vehicles?.map(v => v.fuelType) || []));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Explore Vehicles</h1>

        <div className="mb-8 flex gap-4 flex-wrap">
          <Input
            placeholder="Search vehicles by name or manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />

          <Select value={fuelTypeFilter} onValueChange={setFuelTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {fuelTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                        src={vehicle.imageUrl}
                        alt={`${vehicle.manufacturer} ${vehicle.name}`}
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
                        <Badge variant="secondary">
                          {vehicle.fuelType.toUpperCase()}
                        </Badge>
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
                        {vehicle.fuelEconomy && (
                          <Badge variant="secondary">
                            Economy: {vehicle.fuelEconomy} km/L
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
                          ₹{vehicle.maintenanceCost.toLocaleString()}/year
                        </p>
                        {vehicle.fuelSavings && (
                          <p>
                            <span className="font-semibold">Fuel Savings:</span>{" "}
                            ₹{vehicle.fuelSavings.toLocaleString()}/year
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