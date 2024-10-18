const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");
const app = require("./app.js");

dotenv.config();

const PORT = 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
