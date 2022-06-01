const express = require("express");

const app = express();

const { API_VERSION } = require("./config");

//Load Routings
const incidentClassificationRoutes = require("./routers/incidentClassification.routers");
const criticalityRoutes = require("./routers/criticality.routers");
const causesRoutes = require("./routers/causes.routers");
const userRoutes = require("./routers/user.routers");
const authRoutes = require("./routers/auth.routers");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configure Header HTTP
app.use((req, res, next) => {
  //CONFIGURACION DE HEADERS PARA YA NO USAR LA EXTENCION MOESIF CORS, Y NO DE EL ERROR DE CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, incidentClassificationRoutes);
app.use(`/api/${API_VERSION}`, criticalityRoutes);
app.use(`/api/${API_VERSION}`, causesRoutes);

module.exports = app;
