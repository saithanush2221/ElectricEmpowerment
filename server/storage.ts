import {
  type Vehicle,
  type InsertVehicle,
  type ChargingStation,
  type InsertChargingStation,
  type Post,
  type InsertPost,
  type Comment,
  type InsertComment
} from "@shared/schema";

import fs from 'fs/promises';
import path from 'path';

export interface IStorage {
  // Vehicles
  getAllVehicles(): Promise<Vehicle[]>;
  getVehicle(id: number): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;

  // Charging Stations
  getAllChargingStations(): Promise<ChargingStation[]>;
  getChargingStation(id: number): Promise<ChargingStation | undefined>;
  createChargingStation(station: InsertChargingStation): Promise<ChargingStation>;

  // Forum Posts
  getAllPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;

  // Comments
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
}

export class MemStorage implements IStorage {
  private vehicles: Map<number, Vehicle>;
  private stations: Map<number, ChargingStation>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private nextIds: {
    vehicle: number;
    station: number;
    post: number;
    comment: number;
  };

  constructor() {
    this.vehicles = new Map();
    this.stations = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.nextIds = {
      vehicle: 1,
      station: 1,
      post: 1,
      comment: 1
    };

    // Initialize with the vehicles from the JSON file
    this.loadVehicles();
  }

  private async loadVehicles() {
    try {
      const filePath = path.join(process.cwd(), 'attached_assets', 'Pasted--id-1-type-4-wheeler-make-Tata-model--1739255624792.txt');
      const data = await fs.readFile(filePath, 'utf-8');
      const vehiclesList = JSON.parse(data);

      vehiclesList.forEach((v: any) => {
        const vehicle: Vehicle = {
          id: v.id,
          name: v.model || '',
          manufacturer: v.make || '',
          type: v.type || '',
          fuelType: v.fuel_type || '',
          range: v.range || null,
          batteryCapacity: v.battery || null,
          price: v.price,
          maintenanceCost: v.maintenance_cost,
          fuelSavings: v.savings_per_km ? Math.round(v.savings_per_km * 15000) : null,
          imageUrl: v.image || '',
          fuelEconomy: v.fuel_economy || null,
        };
        this.vehicles.set(v.id, vehicle);
      });
    } catch (error) {
      console.error('Error loading vehicles:', error);
    }
  }

  // Vehicles
  async getAllVehicles(): Promise<Vehicle[]> {
    return Array.from(this.vehicles.values());
  }

  async getVehicle(id: number): Promise<Vehicle | undefined> {
    return this.vehicles.get(id);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = this.nextIds.vehicle++;
    const vehicle = { ...insertVehicle, id };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  // Charging Stations
  async getAllChargingStations(): Promise<ChargingStation[]> {
    return Array.from(this.stations.values());
  }

  async getChargingStation(id: number): Promise<ChargingStation | undefined> {
    return this.stations.get(id);
  }

  async createChargingStation(insertStation: InsertChargingStation): Promise<ChargingStation> {
    const id = this.nextIds.station++;
    const station = { ...insertStation, id };
    this.stations.set(id, station);
    return station;
  }

  // Forum Posts
  async getAllPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.nextIds.post++;
    const post = { ...insertPost, id, createdAt: new Date() };
    this.posts.set(id, post);
    return post;
  }

  // Comments
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      comment => comment.postId === postId
    );
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.nextIds.comment++;
    const comment = { ...insertComment, id, createdAt: new Date() };
    this.comments.set(id, comment);
    return comment;
  }
}

export const storage = new MemStorage();