const { model, Schema } = require("mongoose");

const CountrySchema = new Schema(
  {
    name: { type: String, unique: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Country", CountrySchema);
