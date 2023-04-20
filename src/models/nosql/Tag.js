const { Schema, model } = require("mongoose");

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Tag", TagSchema);
