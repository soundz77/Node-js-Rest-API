import mongoose from "mongoose";

// Create a base schema with select: false by default
const baseSchema = new mongoose.Schema(
  {},
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

baseSchema.eachPath((path) => {
  baseSchema.path(path).select(false);
});

export default baseSchema;
