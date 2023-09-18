const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../decorators");

const { authenticate, upload } = require("../../middlewares");

const schemas = require("../../schemas/users");

const router = express.Router();

const signupValidateMiddleware = validateBody(schemas.userSignupSchema);
const signinValidateMiddleware = validateBody(schemas.userSigninSchema);

router.post("/signup", signupValidateMiddleware, ctrl.signup);

router.post("/signin", signinValidateMiddleware, ctrl.signin);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/signout", authenticate, ctrl.signout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
