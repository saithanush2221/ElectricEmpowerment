import type { Vehicle, ChargingStation } from "@shared/schema";
import vehiclesData from "../../assets/vehicles.json";

// Transform the JSON data to match our Vehicle schema
export const initialVehicles: Vehicle[] = vehiclesData.map(v => ({
  id: v.id,
  name: v.model,
  manufacturer: v.make,
  type: v.type,
  fuelType: v.fuel_type,
  range: v.range || undefined,
  batteryCapacity: v.battery || undefined,
  price: v.price,
  maintenanceCost: v.maintenance_cost,
  fuelSavings: v.savings_per_km ? Math.round(v.savings_per_km * 10000) : undefined,
  imageUrl: v.image,
  fuelEconomy: v.fuel_economy
}));

// Initial charging station data
export const initialChargingStations: ChargingStation[] = [
  {
    id: 1,
    name: "Downtown Supercharger",
    latitude: "40.7505",
    longitude: "-73.9934",
    address: "350 5th Ave, New York, NY 10118"
  },
  {
    id: 2,
    name: "Brooklyn Station",
    latitude: "40.6782",
    longitude: "-73.9442",
    address: "123 Atlantic Ave, Brooklyn, NY 11217"
  }
];

// Educational content sections
export const educationalContent = [
  {
    id: 1,
    title: "EV Basics",
    description: "Learn the fundamentals of electric vehicles",
    imageUrl: "https://images.unsplash.com/photo-1667805630247-28c2a8db1cb4"
  },
  {
    id: 2,
    title: "Charging Guide",
    description: "Understanding EV charging types and best practices",
    imageUrl: "https://images.unsplash.com/photo-1669334788758-c97e6263f149"
  },
  {
    id: 3,
    title: "Maintenance Tips",
    description: "Keep your EV running efficiently",
    imageUrl: "https://images.unsplash.com/photo-1671602472505-5830833ecb70"
  }
];