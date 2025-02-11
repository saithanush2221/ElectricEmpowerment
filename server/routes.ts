import { Router } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVehicleSchema, insertPostSchema, insertCommentSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export function registerRoutes(app: Express): Server {
  const api = Router();

  // Vehicles
  api.get("/vehicles", async (_req, res) => {
    try {
      // Get the data from the file for now
      const vehicles = await storage.getAllVehicles();
      res.json(vehicles.map(vehicle => ({
        id: vehicle.id,
        name: vehicle.model,
        manufacturer: vehicle.make,
        range: vehicle.range || null,
        batteryCapacity: vehicle.battery || null,
        price: vehicle.price,
        maintenanceCost: vehicle.maintenance_cost,
        fuelSavings: vehicle.savings_per_km ? Math.round(vehicle.savings_per_km * 15000) : null, // Estimated yearly savings
        imageUrl: vehicle.image
      })));
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Failed to fetch vehicles" });
    }
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

  // Chat endpoint
  api.post("/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "OpenAI API key not configured" });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Changed from gpt-4 to gpt-3.5-turbo
        messages: [
          {
            role: "system",
            content: "You are an expert on electric vehicles and sustainability. Provide helpful, accurate, and concise information about EVs, charging, maintenance, and related topics. Keep responses under 150 words and focus on practical advice."
          },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      res.json({ response: completion.choices[0].message.content });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat request" });
    }
  });

  app.use("/api", api);

  const httpServer = createServer(app);
  return httpServer;
}