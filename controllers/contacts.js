const fs = require("fs/promises");
const path = require("path")

const Contact = require("../models/Contact");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const avatarsPath = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;

  const {path: oldPath, filename} = req.file;
    const newPath = path.join(avatarsPath, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);

  const result = await Contact.create({ ...req.body, avatar, owner });
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
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
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
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteContactById: ctrlWrapper(deleteContactById),
};
