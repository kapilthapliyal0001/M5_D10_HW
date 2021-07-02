// importing the packages;
import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

//importing the routers
import mediaRouter from "./mediaRouter/mediaRouter.js";

//initialiazing
const server = express();
const PORT = process.env.PORT || 3003;

//  GLOBAL middlewares;
const whiteList = ["http://localhost:3003", process.env.FRONT_END_URL]; // cors;
server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS unfortunately! "));
      }
    },
  })
);
server.use(express());
server.use(cors());
server.use(express.json());
console.log("I am here");

//server Routes
server.use("/medias", mediaRouter);

// Listening the port at 3001;
console.table(listEndpoints(server));
server.listen(PORT, () => {
  console.log("✅ The server is running on PORT: ", PORT);
});
server.on("error", (error) => {
  console.log("❌ The server is not running on PORT: ", PORT);
});
