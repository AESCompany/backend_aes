const CategoryModel = require('../models/nosql/Category')

const functionMiddlewareNewArray = async ({category}, callback) => {
   try {
    const newCategory = []; 
     for(let i=0; i<category.length; i++){    
      let ress = await CategoryModel.findById(category[i])
       if(ress){
         if(!newCategory.includes(ress._id)){ // Verificar si la categoría ya está en la matriz newCategory
          newCategory.push(ress);
         }
        }
       }     
      return newCategory
    }catch(error) {
        callback(`ERROR_OCURRIDO_EN_LA_FUNCION: ${error}`)
    } 
 }

module.exports = {
    functionMiddlewareNewArray
}