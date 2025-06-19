const User = require("../models/user");
const validator = require("validator");
const jwt = require("../services/jwt");

const PASSWORD = "aVivAmientO_2025*4628FnjHGf";
let TOTALLAUNCH = 300

const register = async (req, res) => {
  //validar campos vacios e incorrectos
  if (
    req.body.name &&
    req.body.country &&
    req.body.preFix &&
    req.body.phone &&
    req.body.email &&
    req.body.type
  ) {
    const nameValidator =
      !validator.isEmpty(req.body.name.trim()) &&
      validator.isLength(req.body.name.trim(), { min: 2, max: 35 });
    const countryValidator =
      !validator.isEmpty(req.body.country.trim()) &&
      validator.isLength(req.body.country.trim(), { min: 2, max: 35 });
    const preFixValidator =
      !validator.isEmpty(req.body.preFix.trim()) &&
      validator.isLength(req.body.preFix.trim(), { min: 2, max: 255 });
    const phoneValidator =
      !validator.isEmpty(req.body.phone.trim()) &&
      validator.isLength(req.body.phone.trim(), { min: 2, max: 255 });
    const emailValidator =
      !validator.isEmpty(req.body.email.trim()) &&
      validator.isEmail(req.body.email.trim());
    const typeValidator =
      !validator.isEmpty(req.body.type.trim()) &&
      validator.isLength(req.body.phone.trim(), { min: 2, max: 255 });
    if (
      !nameValidator ||
      !countryValidator ||
      !emailValidator ||
      !preFixValidator ||
      !phoneValidator ||
      !typeValidator
    ) {
      return res.status(200).json({
        status: "error",
        message: "No ha pasado las validaciones de campos",
      });
    }
  } else {
    return res.status(200).json({
      status: "error",
      message: "No ha pasado las validaciones de campos",
    });
  }

  const userValidator = await User.find({ email: req.body.email });
  const users = await User.find({ status: "finished" });
  let count = 0
  count = users.length >= TOTALLAUNCH ? 1 : users.length * 5

  if (userValidator.length >= 1) {
    if (userValidator[0].status === "pending") {
      const user = userValidator[0];
      return res.status(200).json({
        status: "success",
        user,
        count
      });
    } else {
      return res.status(200).json({
        status: "error",
        message: "Ya existe un email igual",
      });
    }
  }

  //guardar en la base de datos
  const entidad = new User(req.body);
  entidad.status = "pending";
  const user = await entidad.save();
  return res.status(200).json({
    status: "success",
    user,
    count
  });
};

const saveResume = async (req, res) => {
  const { email, resume, discount } = req.body;
  const userUpdated = await User.findOneAndUpdate(
    { email },
    { $set: { resume, discount, status: "finished" } },
    { new: true }
  );
  return res.status(200).json({
    status: "success",
    userUpdated,
  });
};

const login = async (req, res) => {
  const { email, userPassword } = req.body;
  const user = await User.find({ email });
  if (user.length > 0) {
    if (userPassword === PASSWORD) {
      const token = jwt.generateToken(user[0]);
      res.status(200).json({
        status: "success",
        token,
      });
    } else {
      res.status(401).json({ status: "error", message: "Usuario o Contraseña incorrecta" });
    }
  } else {
    res.status(400).json({
      status: "error", 
      message: "Usuario o Contraseña incorrecta",
    });
  }
};

const list = async(req, res) => {
    const users = await User.find({ status: "finished" });
    res.status(200).json({
        status: 'ok',
        users
    })
}

module.exports = {
  register,
  saveResume,
  login,
  list
};
