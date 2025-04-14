const express = require("express");
const appRouter = require("./routers/app.routes");
const authRouter = require("./routers/auth.route");
const userRouter = require("./routers/user.route");
const staffRouter = require("./routers/staff.route");
const patientRouter = require("./routers/patient.route");
const doctorRouter = require("./routers/doctor.routes");
const medicalRecordRouter = require("./routers/medicalRecord.route");

//create express app
const app = express();
// ✅ Middleware to parse JSON body
app.use(express.json());

//routers
app.use(appRouter);
app.use(authRouter);
app.use(userRouter);
app.use(staffRouter);
app.use(patientRouter);
app.use(doctorRouter);
app.use(medicalRecordRouter);

//client error handle
app.use((req, res, next) => {
  res.status(404).json({ error: "Resource not found" });
});

//server error handle
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Internal Server Error" });
});

//export app
module.exports = app;
