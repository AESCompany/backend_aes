const mongooseDelete = require("mongoose-delete");
const { model, Schema } = require("mongoose");

const SpecialistSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    area: {
      type: Schema.Types.ObjectId,
      ref: "Area",
    },

    country: { type: String },
    filepath: { type: String },
    view: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

SpecialistSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("Specialist", SpecialistSchema);
