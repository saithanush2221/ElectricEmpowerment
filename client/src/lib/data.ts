import type { Vehicle, ChargingStation } from "@shared/schema";

// Update initial vehicles data
export const initialVehicles: Vehicle[] = [
  // Electric Vehicles Only
  {
    id: 1,
    name: "Nexon EV",
    manufacturer: "Tata",
    range: 312,
    batteryCapacity: 30,
    price: 1499000,
    maintenanceCost: 5000,
    fuelSavings: 45000, // Calculated from fuel_cost_per_km savings
    imageUrl: "https://images.unsplash.com/photo-1593018931925-c18bb72e6bf0"
  },
  {
    id: 2,
    name: "ZS EV",
    manufacturer: "MG",
    range: 419,
    batteryCapacity: 44,
    price: 2199000,
    maintenanceCost: 6000,
    fuelSavings: 50000,
    imageUrl: "https://images.unsplash.com/photo-1624623864107-ef79f850b554"
  },
  {
    id: 3,
    name: "Kona Electric",
    manufacturer: "Hyundai",
    range: 452,
    batteryCapacity: 39,
    price: 2379000,
    maintenanceCost: 7000,
    fuelSavings: 52000,
    imageUrl: "https://images.unsplash.com/photo-1652509525608-6b44097ea5a7"
  },
  {
    id: 4,
    name: "XUV400",
    manufacturer: "Mahindra",
    range: 375,
    batteryCapacity: 39,
    price: 1599000,
    maintenanceCost: 5500,
    fuelSavings: 48000,
    imageUrl: "https://images.unsplash.com/photo-1664298308851-5e934de2e153"
  },
  {
    id: 5,
    name: "Tiago EV",
    manufacturer: "Tata",
    range: 315,
    batteryCapacity: 24,
    price: 869000,
    maintenanceCost: 4500,
    fuelSavings: 40000,
    imageUrl: "https://images.unsplash.com/photo-1687930721611-d1c55113e54b"
  },
  {
    id: 6,
    name: "Atto 3",
    manufacturer: "BYD",
    range: 521,
    batteryCapacity: 60,
    price: 3399000,
    maintenanceCost: 8000,
    fuelSavings: 60000,
    imageUrl: "https://images.unsplash.com/photo-1593018931419-96adfd5b182d"
  },
  {
    id: 7,
    name: "eC3",
    manufacturer: "Citroen",
    range: 320,
    batteryCapacity: 29,
    price: 1150000,
    maintenanceCost: 4800,
    fuelSavings: 45000,
    imageUrl: "https://images.unsplash.com/photo-1663008519764-0616547c493a"
  },
  {
    id: 8,
    name: "i4",
    manufacturer: "BMW",
    range: 590,
    batteryCapacity: 80,
    price: 7390000,
    maintenanceCost: 12000,
    fuelSavings: 65000,
    imageUrl: "https://images.unsplash.com/photo-1671602472505-5830833ecb70"
  },
  {
    id: 9,
    name: "e-tron",
    manufacturer: "Audi",
    range: 484,
    batteryCapacity: 71,
    price: 10170000,
    maintenanceCost: 13000,
    fuelSavings: 70000,
    imageUrl: "https://images.unsplash.com/photo-1592599457638-3ae7ccfbe065"
  },
  {
    id: 10,
    name: "Ioniq 5",
    manufacturer: "Hyundai",
    range: 481,
    batteryCapacity: 58,
    price: 4600000,
    maintenanceCost: 5500,
    fuelSavings: 50000,
    imageUrl: "https://images.unsplash.com/photo-1738794373116-e7d5dee59dcc"
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