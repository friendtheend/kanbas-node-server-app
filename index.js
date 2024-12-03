import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import session from "express-session";
import "dotenv/config";
import EnrollmentRoutes from './Kanbas/Enrollments/route.js';

const app = express();


Hello(app);
// app.use(
//     cors({
//       credentials: true,
//       origin: process.env.NETLIFY_URL || "http://localhost:3000",
//     })
// );

const allowedOrigins = [
    "http://localhost:3000",
    "https://euphonious-creponne-f9e1bf.netlify.app",
];

app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true); // 允许请求
            } else {
                callback(new Error("不允许的跨域请求")); // 拦截请求
            }
        },
    })
);


const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

app.listen(process.env.PORT || 4000)