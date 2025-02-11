import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "@shared/schema";

export default function Compare() {
  const [vehicle1Id, setVehicle1Id] = useState<string>();
  const [vehicle2Id, setVehicle2Id] = useState<string>();

  const { data: vehicles, isLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const vehicle1 = vehicles?.find((v) => v.id.toString() === vehicle1Id);
  const vehicle2 = vehicles?.find((v) => v.id.toString() === vehicle2Id);

  const ComparisonCard = ({ vehicle }: { vehicle: Vehicle | undefined }) => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {vehicle ? `${vehicle.manufacturer} ${vehicle.name}` : "Select a vehicle"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {vehicle ? (
          <div className="space-y-4">
            <img
              src={vehicle.imageUrl}
              alt={`${vehicle.manufacturer} ${vehicle.name}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {vehicle.fuelType && (
                <Badge variant="secondary">
                  {vehicle.fuelType.toUpperCase()}
                </Badge>
              )}
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
              <p><span className="font-semibold">Manufacturer:</span> {vehicle.manufacturer}</p>
              <p><span className="font-semibold">Type:</span> {vehicle.type}</p>
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
        ) : (
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
            Select a vehicle to compare
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8">Compare Vehicles</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[500px]" />
            <Skeleton className="h-[500px]" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Select value={vehicle1Id} onValueChange={setVehicle1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles?.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                      {`${vehicle.manufacturer} ${vehicle.name}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={vehicle2Id} onValueChange={setVehicle2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles?.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
                      {`${vehicle.manufacturer} ${vehicle.name}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ComparisonCard vehicle={vehicle1} />
              <ComparisonCard vehicle={vehicle2} />
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}