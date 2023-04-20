const { model, Schema } = require("mongoose");

const OrganizationSchema = new Schema(
  {
    organizations: { type: String },
    work: { type: String },
    email: { type: String, required: true },
    fullname: { type: String },
    phone: { type: String },
    post: { type: String },
    assistants: { type: Number },
    city: { type: String },
    social: { type: Object },
    area: { type: Schema.Types.ObjectId, ref: "Area" },
    view: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Organization", OrganizationSchema);
