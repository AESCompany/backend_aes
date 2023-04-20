const { Schema, model, default: mongoose } = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const mongooseDelete = require("mongoose-delete");

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, slug: "title" },
    description: { type: String, required: true },
    image: { type: String, required: true },
    short_description: { type: String, require: true },
    count_view: { type: Number, default: 0 },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    files: { type: String, default: null },
    status: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


BlogSchema.statics.updateSlug = async function (id) {
  const blog = await this.findById(id);
  if (!blog) {
    return;
  }

  // Actualizar el slug basado en el título
  blog.slug = blog.title
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

  // Guardar los cambios en la base de datos
  await blog.save();
  return blog;
};

BlogSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = model("Blog", BlogSchema);
