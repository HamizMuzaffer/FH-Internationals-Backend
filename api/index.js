c;
const connectDB = require("./Config/db.js");
const app = require("./app.js");

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
