const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./Config/db.js");
const app = require("./app.js");

const PORT = process.env.PORT || 8000;
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
