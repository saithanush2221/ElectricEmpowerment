import { Router } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVehicleSchema, insertPostSchema, insertCommentSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  const api = Router();

  // Vehicles
  api.get("/vehicles", async (_req, res) => {
    const vehicles = await storage.getAllVehicles();
    res.json(vehicles);
  });

  api.get("/vehicles/:id", async (req, res) => {
    const vehicle = await storage.getVehicle(Number(req.params.id));
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  });

  // Charging Stations
  api.get("/charging-stations", async (_req, res) => {
    const stations = await storage.getAllChargingStations();
    res.json(stations);
  });

  // Forum Posts
  api.get("/posts", async (_req, res) => {
    const posts = await storage.getAllPosts();
    res.json(posts);
  });

  api.post("/posts", async (req, res) => {
    const result = insertPostSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid post data" });
    }
    const post = await storage.createPost(result.data);
    res.status(201).json(post);
  });

  api.get("/posts/:id", async (req, res) => {
    const post = await storage.getPost(Number(req.params.id));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  // Comments
  api.get("/posts/:id/comments", async (req, res) => {
    const comments = await storage.getCommentsByPost(Number(req.params.id));
    res.json(comments);
  });

  api.post("/posts/:id/comments", async (req, res) => {
    const result = insertCommentSchema.safeParse({
      ...req.body,
      postId: Number(req.params.id)
    });
    if (!result.success) {
      return res.status(400).json({ message: "Invalid comment data" });
    }
    const comment = await storage.createComment(result.data);
    res.status(201).json(comment);
  });

  app.use("/api", api);

  const httpServer = createServer(app);
  return httpServer;
}
