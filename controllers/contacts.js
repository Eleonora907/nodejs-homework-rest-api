const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  if (!result) {
    throw HttpError(
      400,
      `Missing required ${result.details[0].context.key} field`
    );
  }
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteContactById: ctrlWrapper(deleteContactById),
};
