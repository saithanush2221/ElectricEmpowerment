import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";
import type { ChargingStation } from "@shared/schema";
import { MapPin } from "lucide-react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York City
const DEFAULT_ZOOM = 11;

export default function Chargers() {
  const [search, setSearch] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  });

  const { data: stations, isLoading } = useQuery<ChargingStation[]>({
    queryKey: ["/api/charging-stations"],
  });

  const filteredStations = stations?.filter((station) =>
    station.name.toLowerCase().includes(search.toLowerCase()) ||
    station.address.toLowerCase().includes(search.toLowerCase())
  );

  const mapMarkers = useMemo(() => {
    if (!filteredStations) return [];
    return filteredStations.map((station) => ({
      position: {
        lat: parseFloat(station.latitude),
        lng: parseFloat(station.longitude),
      },
      title: station.name,
    }));
  }, [filteredStations]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <h1 className="text-4xl font-bold mb-8">Charging Stations</h1>

            <div className="mb-8">
              <Input
                placeholder="Search by name or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
                <Skeleton className="h-[100px]" />
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
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

          <div className="w-full md:w-1/2 lg:w-3/5 h-[700px]">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                {!isLoaded ? (
                  <div className="w-full h-full bg-muted animate-pulse" />
                ) : (
                  <GoogleMap
                    mapContainerClassName="w-full h-full rounded-lg"
                    center={DEFAULT_CENTER}
                    zoom={DEFAULT_ZOOM}
                    options={{
                      streetViewControl: false,
                      mapTypeControl: false,
                      fullscreenControl: false,
                    }}
                  >
                    {mapMarkers.map((marker, index) => (
                      <MarkerF
                        key={index}
                        position={marker.position}
                        title={marker.title}
                      />
                    ))}
                  </GoogleMap>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}