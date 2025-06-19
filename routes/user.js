const { Router } = require("express");

const router = Router();

const userController = require("../controllers/user");
const middleware = require("../middlewares/auth");

router.post("/register", userController.register);
router.put("/saveResume", userController.saveResume);
router.post("/login", userController.login );
router.get("/users", middleware.auth, userController.list );

module.exports = router;