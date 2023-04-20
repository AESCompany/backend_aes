const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Role", RoleSchema);
