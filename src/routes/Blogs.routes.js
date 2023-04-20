const { Router } = require("express");
const SearchOrAllBlogs = require("../controller/blog/blog.index");
const blogController = require("../controller/blog/blog.controller");
const catWithinBlog = require("../controller/blog/catInBlog");
const { validateNewBlog, validateUpdate } = require("../validators/Blog");
const { validateItem } = require("../validators/general");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");
const blogRoute = Router();

/**
 * !TODO: rutas generales
 */
blogRoute.get("/", SearchOrAllBlogs);
blogRoute.get("/:id", validateItem, blogController.getDetailBlog);

/**
 * !TODO: rutas protegidas
 */
blogRoute.post(
  "/",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validateNewBlog,
  blogController.setCreateBlog
);

blogRoute.put(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin", "editor"]),
  validateItem,
  validateUpdate,
  blogController.updateBlogById
);

blogRoute.delete(
  "/:id",
  isAuth,
  checkrol(["superadmin", "admin"]),
  validateItem,
  blogController.deleteBlogLogic
);

blogRoute.post("/:id/addCategory", catWithinBlog.addCategoryToBlog);
blogRoute.delete("/:id/deleteCategory", catWithinBlog.deleteCategoryToBlog);

module.exports = blogRoute;
