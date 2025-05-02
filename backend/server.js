import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";

import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const allowedOrigins = [
  process.env.CLIENT_BASE_URL, // client side url
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Restrict allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Restrict allowed headers
  })
);

const __dirname = path.resolve();

app.use(express.json()); // allows us to use JSON data in req.body

app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}/`);
});
