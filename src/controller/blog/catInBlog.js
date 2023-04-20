const { blog } = require("../../models");
const handlerHttpError = require("../../utils/handlerHttpError");
const {functionMiddlewareNewArray} = require('../../middleware/functionMiddleware')

const addCategoryToBlog = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  let result = await blog.findById(id);
  try {
    if (result) {
      //implementar logica para que a su vez se guarde en la db de categorias //completado
      //categories = [ id de array]
      const newArray = await functionMiddlewareNewArray({category: category})
      let arrayErrors = []

      for(let i=0; i<newArray.length; i++){
        if(!result.categories.includes(newArray[i]._id)){
          result.categories.push(newArray[i])
          await result.save();
        }else{
         arrayErrors.push(`(id: ${newArray[i]._id}, name: ${newArray[i].name}), `) 
        }
      }

      if(arrayErrors.length === 0){
        res.status(200).json({ result });
      }else{
        res.status(200).json({message: `Estas categorias, no fueron agregadas porque ya existe en el array de categories blogs: ${arrayErrors}`})
      }
    } else {
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_ESE_ID`, 404);
    }
  } catch (error) {
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400);
  }
};

const deleteCategoryToBlog = async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;

  try {
    const result = await blog.findById(id);
    if (result) {
      result.category = result.category.filter((e) => e !== category);
      await result.save();
      res.status(200).json({ message: `Categoria eliminada con exito` });
    } else {
      handlerHttpError(res, `ERROR_NO_SE_ENCONTRO_EL_ID`, 404);
    }
  } catch (error) {
    handlerHttpError(res, `ERROR_ALGO_SALIO_MAL_EN_LA_PETICION`, 400);
  }
};

module.exports = {
  addCategoryToBlog,
  deleteCategoryToBlog,
};
