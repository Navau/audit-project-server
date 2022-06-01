const Criticality = require("../models/criticality.models");

function addCriticality(req, res) {
  const body = req.body;
  const criticality = new Criticality(body);

  criticality.save((err, criticalityStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor", err });
    } else {
      if (!criticalityStored) {
        res.status(500).send({
          code: 400,
          message: "No se ha podido crear la Criticidad",
          criticalityStored,
        });
      } else {
        res.status(500).send({
          code: 200,
          message: "Criticidad creada correctamente",
          criticalityStored,
        });
      }
    }
  });
}

function getCriticalitys(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Criticality.paginate({}, options, (err, criticalityStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor", err });
    } else {
      if (!criticalityStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ninguna Criticidad.",
          criticalityStored,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Criticidades obtenidas correctamente.",
          criticalityStored,
        });
      }
    }
  });
}

function updateCriticality(req, res) {
  const criticalityData = req.body;
  const { id } = req.params;

  Criticality.findByIdAndUpdate(
    id,
    criticalityData,
    (err, criticalityUpdate) => {
      if (err) {
        res
          .status(500)
          .send({ code: 500, message: "Error del servidor.", err });
      } else {
        if (!criticalityUpdate) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ninguna Criticidad.",
            criticalityUpdate,
          });
        } else {
          res.status(200).send({
            code: 200,
            message: "Criticidad actualizada correctamente.",
            criticalityUpdate,
          });
        }
      }
    }
  );
}

function deleteCriticality(req, res) {
  const { id } = req.params;

  Criticality.findByIdAndRemove(id, (err, criticalityDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor.", err });
    } else {
      if (!criticalityDeleted) {
        res.status(404).send({
          code: 404,
          message: "Criticidad no encontrada.",
          criticalityDeleted,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Criticidad eliminada correctamente.",
          criticalityDeleted,
        });
      }
    }
  });
}

function getCriticality(req, res) {
  const { id } = req.params;
  console.log(req.params);

  console.log(id);

  Criticality.findOne({ _id: id }, (err, criticalityStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor.", err });
    } else {
      if (!criticalityStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado la Criticidad.",
          criticalityStored,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Criticidad Encontrado correctamente.",
          criticalityStored,
        });
      }
    }
  });
}

module.exports = {
  addCriticality,
  getCriticalitys,
  updateCriticality,
  deleteCriticality,
  getCriticality,
};
