import express from "express";

import Token from "../models/TokenModel.js";

import getById from "../controllers/factory/read/getById/getById.js";
import getAll from "../controllers/factory/read/getAll/getAll.js";
import revokeRefresh from "../controllers/auth/revokeRefresh.js";
import refreshJWT from "../controllers/auth/refreshJWT.js";
import updateAll from "../controllers/factory/update/updateAll.js";
import deleteById from "../controllers/factory/delete/deleteById.js";
import deleteAll from "../controllers/factory/delete/deleteAll.js";

import validateMongoId from "../utils/validation/schemas/shared/validateMongoID.js";
import validateRevokeToken from "../utils/validation/schemas/tokens/validateRevokeToken.js";

const tokenRouter = express.Router();

// Route = /api/v1/tokens

// Read
tokenRouter.get("/:id", validateMongoId, getById(Token));
tokenRouter.get("/", getAll(Token));

// Update
tokenRouter.patch("/:id", validateRevokeToken, revokeRefresh); // revokeById
tokenRouter.put("/", updateAll(Token)); // revokeAll

tokenRouter.post("/refreshToken", refreshJWT);
tokenRouter.post("/revoketoken", revokeRefresh);

// Delete
tokenRouter.delete("/:id", validateMongoId, deleteById(Token));
tokenRouter.delete("/", deleteAll(Token));

export default tokenRouter;
