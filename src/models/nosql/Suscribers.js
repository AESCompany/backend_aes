const { Schema, model } = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const SubscriberSchema = new Schema(
  {
    email: { type: String, require: true},
    deleted: {type: Boolean, default: false}
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// SubscriberSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = model("suscription", SubscriberSchema);
