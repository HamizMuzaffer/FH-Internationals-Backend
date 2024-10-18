const connectDB = require("./Config/db.js");
const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config();

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
