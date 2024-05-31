const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("DB connection successful");
  });

const app = require("./app");
const PORT = 3000 || process.env.PORT;

console.log(`Environment : ${app.get("env")}`);
//START SERVER

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
