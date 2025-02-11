import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  manufacturer: text("manufacturer").notNull(),
  range: integer("range").notNull(),
  batteryCapacity: integer("battery_capacity").notNull(),
  price: integer("price").notNull(),
  maintenanceCost: integer("maintenance_cost").notNull(),
  fuelSavings: integer("fuel_savings").notNull(),
  imageUrl: text("image_url").notNull()
});

export const chargingStations = pgTable("charging_stations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  address: text("address").notNull()
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const insertVehicleSchema = createInsertSchema(vehicles);
export const insertChargingStationSchema = createInsertSchema(chargingStations);
export const insertPostSchema = createInsertSchema(posts);
export const insertCommentSchema = createInsertSchema(comments);

export type Vehicle = typeof vehicles.$inferSelect;
export type ChargingStation = typeof chargingStations.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Comment = typeof comments.$inferSelect;

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type InsertChargingStation = z.infer<typeof insertChargingStationSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type InsertComment = z.infer<typeof insertCommentSchema>;
