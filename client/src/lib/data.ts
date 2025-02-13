import type { Vehicle, ChargingStation } from "@shared/schema";

// Complete vehicle data
export const initialVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Nexon EV",
    manufacturer: "Tata",
    type: "4-wheeler",
    fuelType: "electric",
    range: 312,
    batteryCapacity: 30.2,
    price: 1499000,
    maintenanceCost: 5000,
    fuelSavings: 45000,
    imageUrl: "/assets/tata_nexon_ev.jpg"
  },
  {
    id: 2,
    name: "Swift",
    manufacturer: "Maruti Suzuki",
    type: "4-wheeler",
    fuelType: "petrol",
    fuelEconomy: 22,
    price: 700000,
    maintenanceCost: 4000,
    imageUrl: "/assets/maruti_swift.jpg"
  },
  {
    id: 3,
    name: "ZS EV",
    manufacturer: "MG",
    type: "4-wheeler",
    fuelType: "electric",
    range: 419,
    batteryCapacity: 44.5,
    price: 2199000,
    maintenanceCost: 6000,
    fuelSavings: 50000,
    imageUrl: "/assets/mg_zs_ev.jpg"
  },
  {
    id: 4,
    name: "Kona Electric",
    manufacturer: "Hyundai",
    type: "4-wheeler",
    fuelType: "electric",
    range: 452,
    batteryCapacity: 39.2,
    price: 2379000,
    maintenanceCost: 7000,
    fuelSavings: 52000,
    imageUrl: "/assets/hyundai_kona_electric.jpg"
  },
  {
    id: 5,
    name: "XUV400",
    manufacturer: "Mahindra",
    type: "4-wheeler",
    fuelType: "electric",
    range: 375,
    batteryCapacity: 39.4,
    price: 1599000,
    maintenanceCost: 5500,
    fuelSavings: 48000,
    imageUrl: "/assets/mahindra_xuv400.jpg"
  },
  {
    id: 6,
    name: "Tiago EV",
    manufacturer: "Tata",
    type: "4-wheeler",
    fuelType: "electric",
    range: 315,
    batteryCapacity: 24,
    price: 869000,
    maintenanceCost: 4500,
    fuelSavings: 40000,
    imageUrl: "/assets/tata_tiago_ev.jpg"
  },
  {
    id: 7,
    name: "Fortuner",
    manufacturer: "Toyota",
    type: "4-wheeler",
    fuelType: "diesel",
    fuelEconomy: 12,
    price: 3500000,
    maintenanceCost: 8000,
    imageUrl: "/assets/toyota_fortuner.jpg"
  },
  {
    id: 8,
    name: "Atto 3",
    manufacturer: "BYD",
    type: "4-wheeler",
    fuelType: "electric",
    range: 521,
    batteryCapacity: 60.48,
    price: 3399000,
    maintenanceCost: 8000,
    fuelSavings: 60000,
    imageUrl: "/assets/byd_atto3.jpg"
  },
  {
    id: 9,
    name: "eC3",
    manufacturer: "Citroen",
    type: "4-wheeler",
    fuelType: "electric",
    range: 320,
    batteryCapacity: 29.2,
    price: 1150000,
    maintenanceCost: 4800,
    fuelSavings: 45000,
    imageUrl: "/assets/citroen_ec3.jpg"
  },
  {
    id: 208,
    name: "iX",
    manufacturer: "BMW",
    type: "4-wheeler",
    fuelType: "electric",
    range: 425,
    batteryCapacity: 76.6,
    price: 12000000,
    maintenanceCost: 11000,
    fuelSavings: 65000,
    imageUrl: "/assets/bmw_ix.jpg"
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