
import { Router } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVehicleSchema, insertPostSchema, insertCommentSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  const api = Router();

  // Vehicles
  api.get("/vehicles", async (_req, res) => {
    try {
      const vehicles = await storage.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
  });

  api.get("/vehicles/:id", async (req, res) => {
    try {
      const vehicle = await storage.getVehicle(Number(req.params.id));
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
      res.json(vehicle);
    } catch (error) {
      console.error("Error fetching vehicle:", error);
      res.status(500).json({ error: "Failed to fetch vehicle" });
    }
  });

  // Charging Stations
  api.get("/charging-stations", async (_req, res) => {
    try {
      const stations = await storage.getAllChargingStations();
      res.json(stations);
    } catch (error) {
      console.error("Error fetching charging stations:", error);
      res.status(500).json({ error: "Failed to fetch charging stations" });
    }
  });

  // Forum Posts
  api.get("/posts", async (_req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  api.post("/posts", async (req, res) => {
    try {
      const result = insertPostSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: "Invalid post data" });
      }
      const post = await storage.createPost(result.data);
      res.status(201).json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  api.get("/posts/:id", async (req, res) => {
    try {
      const post = await storage.getPost(Number(req.params.id));
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Comments
  api.get("/posts/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsByPost(Number(req.params.id));
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  api.post("/posts/:id/comments", async (req, res) => {
    try {
      const result = insertCommentSchema.safeParse({
        ...req.body,
        postId: Number(req.params.id)
      });
      if (!result.success) {
        return res.status(400).json({ message: "Invalid comment data" });
      }
      const comment = await storage.createComment(result.data);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Chat endpoint (disabled)
  api.post("/chat", async (req, res) => {
    res.status(503).json({ 
      error: "Chat functionality is currently disabled" 
    });
  });

  app.use("/api", api);

  const httpServer = createServer(app);
  return httpServer;
}
