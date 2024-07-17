import express from "express";

import User from "../models/UserModel.js";

import create from "../controllers/factory/create/create.js";
import getById from "../controllers/factory/read/getById/getById.js";
import getAll from "../controllers/factory/read/getAll/getAll.js";
import updateAll from "../controllers/factory/update/updateAll.js";
import updateById from "../controllers/factory/update/updateById.js";
import deleteById from "../controllers/factory/delete/deleteById.js";
import deleteAll from "../controllers/factory/delete/deleteAll.js";

import validateCreateUsers from "../utils/validation/schemas/users/validateCreateUsers.js";
import validateMongoId from "../utils/validation/schemas/shared/validateMongoID.js";
import validateUpdateUserById from "../utils/validation/schemas/users/validateUpdateUserById.js";
import validateUpdateAllUsers from "../utils/validation/schemas/users/validateUpdateAllUsers.js";

const userRouter = express.Router();

// Route = /api/v1/users

// Create
userRouter.post("/", validateCreateUsers, create(User)); // Single or multiple users

// Read
userRouter.get("/:id", validateMongoId, getById(User));
userRouter.get("/", getAll(User));

// Update
userRouter.patch("/:id", validateUpdateUserById, updateById(User));
userRouter.put("/", validateUpdateAllUsers, updateAll(User));

// Delete
userRouter.delete("/:id", validateMongoId, deleteById(User));
userRouter.delete("/", deleteAll(User));

export default userRouter;
