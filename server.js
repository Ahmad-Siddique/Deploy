const express = require("express");
// const notes = require("./data/notes");
const mongoose = require("mongoose");

const userRouter = require("./Routes/userRoute");

const adminRouter = require("./Routes/AdminRoute");
const taskRouter = require("./Routes/TaskRoute");
const TaskControllers = require("./Controllers/TaskController");
const path = require("path");
const serverstate = "Production";
const dotenv = require("dotenv")

dotenv.config()

var port = process.env.PORT || 5000;
const app = express();


//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

var cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-task-app-qfj3.onrender.com",
      "https://mern-stack-app-come-to-me.onrender.com",
    ],
  })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongo_connection = mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then((conn) => {
    console.log("Connected to the database", conn.connection.host);
  })
  .catch((err) => {
    console.log("error occured", err);
  });



var cron = require("node-cron");

// cron.schedule(
//   "0 */1 * * *",
//   () => {
//     const now = new Date();
//     const current = now.getHours();
//     console.log(current);
//     console.log("GGWP");
//     try {
//       TaskControllers.TaskRecurringTask(current);
//       console.log("Running a job at 1 min at Asia/Kolkata timezone");
//     } catch (e) {
//       console.log(e);
//     }
//   },
//   {
//     scheduled: true,
//     timezone: "Asia/Kolkata",
//   }
// );

// app.get("/", (req, res) => {

//   res.send('note');
// });

console.log(path.resolve(__dirname, "./build", "index.html"));

app.use(userRouter);

app.use(adminRouter);
app.use(taskRouter);

// ---------- Deployment ------------
// __dirname = path.resolve();

// const gg = path.join(__dirname, "../");
// console.log(gg);
// console.log(path.join(gg, "app/frontend", "build", "index.html"));
// console.log(path.join(gg, "app/frontend/build"));

// if (serverstate === "Chilling") {
//   app.use(express.static(path.join(gg, "template_react", "build")));
//   // app.use(express.static(path.join(gg, "frontend/build")));

//   app.get("/*", (req, res) => {
//     // console.log(
//     //   res.sendFile(path.join(gg, "app/frontend", "build", "index.html"))
//     // );

//     return res.sendFile(path.join(gg, "template_react", "build", "index.html"));
//     //  return res.sendFile(
//     //    path.resolve(gg, "frontend", "build", "index.html")
//     //  );
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// app.use(express.static(path.join(__dirname, "./frontend/build")));

// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });


app.use(express.static("./build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log("Server Listening at port 5000");
});
