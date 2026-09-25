import dotenv from "dotenv";
dotenv.config();
import app from "./app";

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";

app.listen(Number(PORT), HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
