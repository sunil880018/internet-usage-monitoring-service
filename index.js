import express from "express";
import { dbConnection } from "./database/db.js";
import bodyParser from "body-parser";
import { apiRequestLimiter } from "./middleware/apiRateLimiter.js";
import { CONFIG } from "./config/config.js";
import { search_user_and_get_internet_usage } from "./controllers/search_user.js";
import { search_top_user_and_get_internet_usage } from "./controllers/search_top_user_internet_usage.js";

dbConnection();
const app = express();
const PORT = CONFIG.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiRequestLimiter);

app.get("/user/search", search_user_and_get_internet_usage);
app.get("/analytics", search_top_user_and_get_internet_usage);

app.listen(PORT, () => {
  console.log(`server run at ${PORT}`);
});
