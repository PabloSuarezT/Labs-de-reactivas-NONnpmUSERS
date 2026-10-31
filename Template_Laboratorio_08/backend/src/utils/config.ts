import dotenv from "dotenv";
dotenv.config();

/* inicio cambios p3 */
const NODE_ENV = process.env.NODE_ENV || "development";

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

const MONGODB_URI = process.env.MONGODB_URI;

const MONGODB_DBNAME = 
  NODE_ENV === "test"
    ? process.env.MONGODB_DBNAME_TEST
    : process.env.MONGODB_DBNAME;

const JWT_SECRET = process.env.JWT_SECRET || "my_secret";
/* fin cambios p3 */


export default { NODE_ENV, PORT, HOST, MONGODB_URI, MONGODB_DBNAME, JWT_SECRET }; /* Se agrega NODE_ENV */
