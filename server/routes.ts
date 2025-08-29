import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertCommentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // In a real application, you would send an email here
      console.log("Contact form submitted:", contact);
      
      res.json({ success: true, message: "Contact form submitted successfully" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  // Get comments for a post
  app.get("/api/comments/:postId", async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await storage.getCommentsByPostId(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ success: false, message: "Failed to fetch comments" });
    }
  });

  // Add comment to a post
  app.post("/api/comments", async (req, res) => {
    try {
      const commentData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(commentData);
      res.json({ success: true, comment });
    } catch (error) {
      console.error("Error adding comment:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid comment data", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
