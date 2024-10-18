const dotenv = require("dotenv");
const connectDB = require("./Config/db.js");
const app = require("./app.js");

dotenv.config();
connectDB();

const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
