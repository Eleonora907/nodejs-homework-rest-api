const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../decorators");

const { authenticate, upload, isValidId } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const addContactValidate = validateBody(schemas.addSchema);
const updateContactFavoriteValidate = validateBody(
  schemas.contactUpdateFavoriteSchema
);

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post("/", upload.single("avatar"), addContactValidate, ctrl.add);

router.patch(
  "/:contactId/favorite",
  isValidId,
  updateContactFavoriteValidate,
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.deleteContactById);

router.put("/:contactId", isValidId, addContactValidate, ctrl.updateById);

module.exports = router;
