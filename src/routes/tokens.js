import express from "express";

import Token from "../models/TokenModel.js";

import getById from "../controllers/factory/read/getById/getById.js";
import getTokenByUserId from "../controllers/auth/getTokenByUserId.js";
import getAll from "../controllers/factory/read/getAll/getAll.js";
import clientRevokeRefreshToken from "../controllers/JWT/clientRevokeRefreshToken.js";
import refreshJWT from "../controllers/JWT/refreshJWT.js";
import updateAll from "../controllers/factory/update/updateAll.js";
import deleteById from "../controllers/factory/delete/deleteById.js";
import deleteAll from "../controllers/factory/delete/deleteAll.js";

import validateMongoId from "../utils/validation/schemas/shared/validateMongoID.js";
import validateRevokeToken from "../utils/validation/schemas/tokens/validateRevokeToken.js";

const tokenRouter = express.Router();

// Route = /api/v1/tokens

// Read
tokenRouter.get("/:id", validateMongoId, getById(Token));
tokenRouter.get("/:userId", validateMongoId, getTokenByUserId);

tokenRouter.get("/", getAll(Token));

// Update
tokenRouter.patch("/:id", validateRevokeToken, clientRevokeRefreshToken); // revokeById
tokenRouter.put("/", updateAll(Token)); // revokeAll

tokenRouter.post("/refreshToken", refreshJWT);
// tokenRouter.post("/revoketoken", revokeRefresh);

// Delete
tokenRouter.delete("/:id", validateMongoId, deleteById(Token));
tokenRouter.delete("/", deleteAll(Token));

export default tokenRouter;
