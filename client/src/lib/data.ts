import type { Vehicle, ChargingStation } from "@shared/schema";

// Update initial vehicles data
export const initialVehicles = [
  {
    id: 1,
    name: "Model S",
    manufacturer: "Tesla",
    range: 405,
    batteryCapacity: 100,
    price: 89990,
    maintenanceCost: 1200,
    fuelSavings: 2500,
    imageUrl: "https://images.unsplash.com/photo-1593018931925-c18bb72e6bf0"
  },
  {
    id: 2,
    name: "ID.4",
    manufacturer: "Volkswagen",
    range: 280,
    batteryCapacity: 82,
    price: 41230,
    maintenanceCost: 900,
    fuelSavings: 2000,
    imageUrl: "https://images.unsplash.com/photo-1624623864107-ef79f850b554"
  },
  {
    id: 3,
    name: "Ioniq 5",
    manufacturer: "Hyundai",
    range: 303,
    batteryCapacity: 77,
    price: 45500,
    maintenanceCost: 850,
    fuelSavings: 2200,
    imageUrl: "https://images.unsplash.com/photo-1738794373116-e7d5dee59dcc"
  },
  {
    id: 4,
    name: "EV6",
    manufacturer: "Kia",
    range: 310,
    batteryCapacity: 77,
    price: 48700,
    maintenanceCost: 800,
    fuelSavings: 2300,
    imageUrl: "https://images.unsplash.com/photo-1652509525608-6b44097ea5a7"
  },
  {
    id: 5,
    name: "Mustang Mach-E",
    manufacturer: "Ford",
    range: 314,
    batteryCapacity: 88,
    price: 45995,
    maintenanceCost: 900,
    fuelSavings: 2100,
    imageUrl: "https://images.unsplash.com/photo-1664298308851-5e934de2e153"
  },
  {
    id: 6,
    name: "Ariya",
    manufacturer: "Nissan",
    range: 300,
    batteryCapacity: 87,
    price: 43190,
    maintenanceCost: 850,
    fuelSavings: 2000,
    imageUrl: "https://images.unsplash.com/photo-1687930721611-d1c55113e54b"
  }
];

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
  },
  {
    id: 3,
    name: "Queens Mall Charging Hub",
    latitude: "40.7282",
    longitude: "-73.8731",
    address: "90-15 Queens Blvd, Queens, NY 11373"
  },
  {
    id: 4,
    name: "Battery Park Charger",
    latitude: "40.7033",
    longitude: "-74.0170",
    address: "21 West St, New York, NY 10006"
  },
  {
    id: 5,
    name: "Central Park Station",
    latitude: "40.7829",
    longitude: "-73.9654",
    address: "Central Park West, New York, NY 10024"
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