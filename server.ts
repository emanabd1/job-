import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// MongoDB Connection
const FALLBACK_URI = "mongodb+srv://emanemanabd1:82emuTi98@cluster0.fgwf6dt.mongodb.net/?appName=Cluster0";
let MONGODB_URI = process.env.MONGODB_URI || FALLBACK_URI;

// Clean the URI (remove whitespace or quotes that might have been added by mistake)
MONGODB_URI = MONGODB_URI.trim().replace(/^["']|["']$/g, "");

// Ensure it starts with the correct scheme
if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
  console.warn("⚠️ Invalid MONGODB_URI scheme. Falling back to default.");
  MONGODB_URI = FALLBACK_URI;
}

async function connectDB() {
  try {
    // Log connection attempt (obfuscating password)
    const logUri = MONGODB_URI.replace(/:([^@]+)@/, ":****@");
    console.log(`📡 Attempting to connect to MongoDB: ${logUri}`);
    
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

// Define Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  type: String,
  salary: Number,
  description: String,
  company: String,
  logo: String,
  isBookMarked: Boolean,
  location: String,
  experienceLevel: String,
  currency: String,
  postedAt: String,
  category: String,
  requirements: [String],
  benefits: [String]
}, { strict: false });

const JobModel = mongoose.model("Job", jobSchema);

async function startServer() {
  await connectDB();

  app.use(express.json());

  // API Routes
  app.get("/api/jobs", async (req, res) => {
    try {
      // Set a timeout for the DB query
      const jobs = await JobModel.find().maxTimeMS(5000);
      
      if (jobs.length === 0) {
        // Seed database if empty - moved from frontend for reliability
        const { MOCK_JOBS } = await import('./src/constants');
        await JobModel.insertMany(MOCK_JOBS.map(({ id, ...rest }) => rest));
        const seededJobs = await JobModel.find();
        return res.json(seededJobs.map(job => ({
          ...job.toObject(),
          id: job._id.toString()
        })));
      }

      const mappedJobs = jobs.map(job => ({
        ...job.toObject(),
        id: job._id.toString()
      }));
      res.json(mappedJobs);
    } catch (error) {
      console.error("Backend fetch error:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const { id, ...jobData } = req.body;
      const newJob = new JobModel(jobData);
      await newJob.save();
      res.status(201).json({ ...newJob.toObject(), id: newJob._id.toString() });
    } catch (error) {
      res.status(500).json({ error: "Failed to create job" });
    }
  });

  app.post("/api/jobs/reset", async (req, res) => {
    try {
      await JobModel.deleteMany({});
      res.json({ message: "Database cleared" });
    } catch (error) {
      res.status(500).json({ error: "Failed to reset database" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
