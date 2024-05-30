const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
const PORT = 3000 || process.env.PORT;

console.log(`Environment : ${app.get("env")}`);
//START SERVER

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
