const IncidentClassification = require("../models/incidentClassification.models");

function addIncident(req, res) {
  const body = req.body;
  const incidentClassification = new IncidentClassification(body);

  console.log(body);

  incidentClassification.save((err, incidentClassificationStored) => {
    if (err) {
      console.log("ERR: ", err);
      res.status(500).send({ code: 500, message: "Error del servidor", err });
    } else {
      if (!incidentClassificationStored) {
        res.status(500).send({
          code: 400,
          message: "No se ha podido crear el Incidente",
          incidentClassificationStored,
        });
      } else {
        res.status(500).send({
          code: 200,
          message: "Incidente creado correctamente",
          incidentClassificationStored,
        });
      }
    }
  });
}

function getIncidents(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  IncidentClassification.paginate(
    {},
    options,
    (err, incidentClassificationStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor", err });
      } else {
        if (!incidentClassificationStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningún Incidente.",
            incidentClassificationStored,
          });
        } else {
          res.status(200).send({
            code: 200,
            message: "Incidentes obtenidos correctamente.",
            incidentClassificationStored,
          });
        }
      }
    }
  );
}

function updateIncident(req, res) {
  const incidentClassificationData = req.body;
  const { id } = req.params;

  IncidentClassification.findByIdAndUpdate(
    id,
    incidentClassificationData,
    (err, incidentClassificationUpdate) => {
      if (err) {
        res
          .status(500)
          .send({ code: 500, message: "Error del servidor.", err });
      } else {
        if (!incidentClassificationUpdate) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningún Incidente.",
            incidentClassificationUpdate,
          });
        } else {
          res.status(200).send({
            code: 200,
            message: "Incidente actualizado correctamente.",
            incidentClassificationUpdate,
          });
        }
      }
    }
  );
}

function deleteIncident(req, res) {
  const { id } = req.params;

  IncidentClassification.findByIdAndRemove(
    id,
    (err, incidentClassificationDeleted) => {
      if (err) {
        res
          .status(500)
          .send({ code: 500, message: "Error del servidor.", err });
      } else {
        if (!incidentClassificationDeleted) {
          res.status(404).send({
            code: 404,
            message: "Incidente no encontrado.",
            incidentClassificationDeleted,
          });
        } else {
          res.status(200).send({
            code: 200,
            message: "Incidente eliminado correctamente.",
            incidentClassificationDeleted,
          });
        }
      }
    }
  );
}

function getIncident(req, res) {
  const { id } = req.params;

  IncidentClassification.findOne(
    { _id: id },
    (err, incidentClassificationStored) => {
      if (err) {
        res
          .status(500)
          .send({ code: 500, message: "Error del servidor.", err });
      } else {
        if (!incidentClassificationStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado el Incidente.",
            incidentClassificationStored,
          });
        } else {
          res.status(200).send({
            code: 200,
            message: "Incidente Encontrado correctamente.",
            incidentClassificationStored,
          });
        }
      }
    }
  );
}

module.exports = {
  addIncident,
  getIncidents,
  updateIncident,
  deleteIncident,
  getIncident,
};
