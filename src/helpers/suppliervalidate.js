const Joi = require('joi');

const customerschema = Joi.when(Joi.ref("$method"), {

    "is": "PUT",
    "then": Joi.object().keys({
        supplier_id: Joi.number().required(),
        supplier_name: Joi.string().max(200).required(),
        age: Joi.number().required(),
        gender: Joi.string().max(6).required(),
        contact_no: Joi.number().required(),
        email: Joi.string().max(100).required(),
        warehouse_address: Joi.string().max(255).required(),
        is_active: Joi.number().min(1)
    }),
    "otherwise": Joi.object().keys({
        supplier_name: Joi.string().max(200).required(),
        age: Joi.number().required(),
        gender: Joi.string().max(6).required(),
        contact_no: Joi.number().required(),
        email: Joi.string().max(100).required(),
        warehouse_address: Joi.string().max(255).required(),


    })
});
module.exports = customerschema;