import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminLeadRoutes from "./routes/adminLeadRoutes.js";
import adminMemberRoutes from "./routes/adminMemberRoutes.js";
import adminActivityRoutes from "./routes/adminActivityRoutes.js";
import memberLeadRoutes from "./routes/memberLeadRoutes.js";
import memberActivityRoutes from "./routes/memberActivityRoutes.js";
import publicLeadRoutes from "./routes/leadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import memberDashboardRoutes from "./routes/memberDashboardRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin-leads", adminLeadRoutes);
app.use("/api/admin-members", adminMemberRoutes);
app.use("/api/admin-activities",adminActivityRoutes);

app.use("/api/member-leads", memberLeadRoutes);
app.use("/api/member-activities", memberActivityRoutes);
app.use("/api/public-leads", publicLeadRoutes);

app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use(
    "/api/member/dashboard",
    memberDashboardRoutes
);
export default app;