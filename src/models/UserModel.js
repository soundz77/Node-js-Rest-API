import mongoose from "mongoose";
import baseSchema from "./baseSchema.js";
import loggingMessages from "../utils/logging/loggingMessages.js";
import escapeStr from "../utils/sanitisation/strings/escapeStr.js";
import validateUsername from "../utils/validation/functions/userFunctions/username.js";
import validateAge from "../utils/validation/functions/userFunctions/age.js";
import validateEmail from "../utils/validation/functions/userFunctions/email.js";
import validateRole from "../utils/validation/functions/userFunctions/role.js";
import validatePassword from "../utils/validation/functions/userFunctions/password.js";
import validateAvatar from "../utils/validation/functions/userFunctions/avatar.js";
import equalValues from "../utils/validation/functions/dataTypeFunctions/equalValues.js";
import passportLocalMongoose from "passport-local-mongoose";

const messages = loggingMessages.validation;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, messages.usernameRequired],
      validate: {
        validator: validateUsername,
        message: messages.usernameErr,
      },
      select: true,
    },
     facebookId: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
    validate: {
      validator: validateAge,
      message: messages.ageRules,
    },
      select: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, messages.email],
      validate: {
        validator: validateEmail,
        message: messages.emailRequired,
      },
      select: true,
    },
    emailConfirm: {
      type: String,
      required: [true, messages.emailConfirm],
      lowercase: true,
      validate: {
        validator: equalValues,
        message: messages.emailConfirm,
      },
      select: false,
    },
    avatar: {
      type: String,
      validate: {
        validator: validateAvatar,
        message: messages.avatarInvalid,
      },
       select: true,
    },
    role: {
      type: String,
      default: "user",
      validate: {
        validator: validateRole,
        message: messages.roleInvalid,
      },
      select: true,
    },
    password: {
      type: String,
      required: [true, messages.email],
      validate: {
        validator: validatePassword,
        message: messages.passwordInvalid,
      },
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, messages.passwordConfirm],
      validate: {
        validator: equalValues,
        message: messages.passwordConfirm,
      },
      select: false,
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: "__v", // Ensure version key is used
  }
);

// Apply base schema settings to the user schema
userSchema.add(baseSchema);

// Apply base schema settings to the user schema
const excludeFields = function () {
  this.select("-password -passwordConfirm -role");
};

const queryMiddleware = [
  "find",
  "findOne",
  "findById",
  "findOneAndUpdate",
  "findByIdAndUpdate",
];

queryMiddleware.forEach((method) => {
  userSchema.pre(method, excludeFields);
});

// Pre-save hook for sanitization
userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("username")) this.username = escapeStr(this.username);
    if (this.isModified("email")) this.email = escapeStr(this.email);
    if (this.isModified("emailConfirm"))
      this.emailConfirm = escapeStr(this.emailConfirm);
    if (this.isModified("age")) this.age = escapeStr(this.age);
    if (this.isModified("avatar")) this.avatar = escapeStr(this.avatar);
    if (this.isModified("role")) this.role = escapeStr(this.role);
    next();
  } catch (err) {
    next(err);
  }
});

// Pre-update middleware for version control and field exclusions
const operations = ["updateMany", "findOneAndUpdate", "findByIdAndUpdate"];

userSchema.pre(operations, function () {
  try {
    const update = this.getUpdate();

    // Helper function to remove __v field and clean up the update object
    const removeVersionKey = (obj, key) => {
      if (obj[key] && obj[key].__v != null) {
        delete obj[key].__v;
        if (Object.keys(obj[key]).length === 0) {
          delete obj[key];
        }
      }
    };

    // Remove __v field from the main update object
    delete update.__v;

    // Remove __v field based on the operation type
    if (this.op === "updateMany") {
      removeVersionKey(update, "$set");
    } else if (
      this.op === "findOneAndUpdate" ||
      this.op === "findByIdAndUpdate"
    ) {
      ["$set", "$setOnInsert"].forEach((key) => removeVersionKey(update, key));
    }

    // Increment the __v field to indicate document modification
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
  } catch (error) {
    console.error("Error in update middleware:", error);
  }
});

// Plugin passport-local-mongoose to user schema
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email", // Specify the field to use as username
  errorMessages: {
    MissingPasswordError: "No password was provided",
    AttemptTooSoonError: "Account is currently locked. Try again later",
    TooManyAttemptsError:
      "Account locked due to too many failed login attempts",
    NoSaltValueStoredError: "Authentication not possible. No salt value stored",
    IncorrectPasswordError: "Password is incorrect",
    IncorrectUsernameError: "Username is incorrect",
    MissingUsernameError: "No email was provided",
    UserExistsError: "A user with the given email is already registered",
  },
});

const User = mongoose.model("User", userSchema);

export const schema = User.schema;
export default User;
