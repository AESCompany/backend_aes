const { model, Schema } = require("mongoose");

const institutionSchema = new Schema(
  {
    organization: { type: String },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    phone: { type: String },
    post: { type: String },
    city: { type: String },
    view: { type: Boolean, default: false },
    area: { type: Schema.Types.ObjectId, ref: "Area" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Institution", institutionSchema);
