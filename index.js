import { configDotenv } from "dotenv";
import { connectDB } from "./src/db/connect.js";
import app from "./src/app.js";


configDotenv();

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection failed !!! :", err);
  });

