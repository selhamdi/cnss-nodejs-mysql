import { createRequire } from 'module'
require('dotenv').config()
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");
const db = require('./models');
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const adminRoutes = require("./routes/admin");
const employeeRoutes = require("./routes/employee");

// Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Customer API",
//       description: "Customer API Information",
//       contact: {
//         name: "Amazing Developer"
//       },
//       servers: ["http://localhost:3000"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["app.js"]
// };
// const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api/admins', adminRoutes);
app.use('/api/employees', employeeRoutes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


db.sequelize.sync().then((res)=>{


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
})



