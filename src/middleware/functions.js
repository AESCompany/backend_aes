const CategoryModel = require('../models/nosql/CategoryModel')

const functionMiddlewareNewArray = async ({category}, callback) => {
   try {
    const newCategory = []; 
     for(let i=0; i<category.length; i++){    
      let ress = await CategoryModel.findOne({name: category[i]})
      if(ress){
        if(!newCategory.includes(ress.name)){ // Verificar si la categoría ya está en la matriz newCategory
          newCategory.push(ress.name);
        }
       } else {
        let saveCategory = new CategoryModel({name: category[i]})
        await saveCategory.save()

         if(!newCategory.includes(category[i])){ // Verificar si la categoría ya está en la matriz newCategory
          newCategory.push(category[i]);
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