const { model, Schema } = require("mongoose");

const areaSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Area", areaSchema);
