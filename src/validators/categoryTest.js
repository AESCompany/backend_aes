const { check } = require('express-validator')
const validateResults = require('../utils/handlerValidator')

const validatorNewCategory = [
    check('categoria').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdateCategory = [
    check('id').exists().notEmpty().isMongoId(),
    check('categoria').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorDeleteCategory = [
    check('id').exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {
   validatorNewCategory,
   validatorUpdateCategory,
   validatorDeleteCategory 
}