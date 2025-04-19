import app from "./app.js";
import connectDB  from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();

  app.listen(process.env.PORT, () => {
    console.log("Server is running on http://localhost:" + process.env.PORT);
    connectDB()
  });
