const Causes = require("../models/causes.models");

function addCause(req, res) {
  const body = req.body;
  const causes = new Causes(body);

  causes.save((err, causesStored) => {
    if (err) {
      console.log(err);
      res.status(500).send({ code: 500, message: "Error del servidor", err });
    } else {
      if (!causesStored) {
        res.status(500).send({
          code: 400,
          message: "No se ha podido crear la Causa",
          causesStored,
        });
      } else {
        res.status(500).send({
          code: 200,
          message: "Causa creado correctamente",
          causesStored,
        });
      }
    }
  });
}

function getCauses(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
  };

  Causes.paginate({}, options, (err, causesStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor", err });
    } else {
      if (!causesStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ninguna Causa.",
          causesStored,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Causas obtenidas correctamente.",
          causesStored,
        });
      }
    }
  });
}

function updateCause(req, res) {
  const causesData = req.body;
  const { id } = req.params;

  Causes.findByIdAndUpdate(id, causesData, (err, causesUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor.", err });
    } else {
      if (!causesUpdate) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ninguna Causa.",
          causesUpdate,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Causa actualizada correctamente.",
          causesUpdate,
        });
      }
    }
  });
}

function deleteCause(req, res) {
  const { id } = req.params;

  Causes.findByIdAndRemove(id, (err, causesDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor.", err });
    } else {
      if (!causesDeleted) {
        res.status(404).send({
          code: 404,
          message: "Causa no encontrada.",
          causesDeleted,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Causa eliminada correctamente.",
          causesDeleted,
        });
      }
    }
  });
}

function getCause(req, res) {
  const { id } = req.params;

  Causes.findOne({ _id: id }, (err, causesStored) => {
    console.log(err);
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor.", err });
    } else {
      if (!causesStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado la Causa.",
          causesStored,
        });
      } else {
        res.status(200).send({
          code: 200,
          message: "Causa Encontrada correctamente.",
          causesStored,
        });
      }
    }
  });
}

module.exports = {
  addCause,
  getCauses,
  updateCause,
  deleteCause,
  getCause,
};
