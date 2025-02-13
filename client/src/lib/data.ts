import type { Vehicle, ChargingStation } from "@shared/schema";

// Update initial vehicles data
export const initialVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Nexon EV",
    manufacturer: "Tata",
    type: "Electric",
    fuelType: "Electric",
    range: 312,
    batteryCapacity: 30,
    price: 1499000,
    maintenanceCost: 5000,
    fuelSavings: 45000,
    imageUrl: "https://images.unsplash.com/photo-1593018931925-c18bb72e6bf0",
    fuelEconomy: null
  },
  {
    id: 2,
    name: "ZS EV",
    manufacturer: "MG",
    type: "Electric",
    fuelType: "Electric",
    range: 419,
    batteryCapacity: 44,
    price: 2199000,
    maintenanceCost: 6000,
    fuelSavings: 50000,
    imageUrl: "https://images.unsplash.com/photo-1624623864107-ef79f850b554",
    fuelEconomy: null
  },
  {
    id: 3,
    name: "Kona Electric",
    manufacturer: "Hyundai",
    type: "Electric",
    fuelType: "Electric",
    range: 452,
    batteryCapacity: 39,
    price: 2379000,
    maintenanceCost: 7000,
    fuelSavings: 52000,
    imageUrl: "https://images.unsplash.com/photo-1652509525608-6b44097ea5a7",
    fuelEconomy: null
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