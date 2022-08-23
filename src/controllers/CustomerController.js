const con = require('../config/db');
const customervalidate = require('../helpers/customervalidate');
const CreateError = require('http-errors');


module.exports = {
    show: async (req, res, next) => {
        con.query("SELECT * FROM customers", (err, result) => {
            if (err) return next(CreateError(500));
            if (result == '') return next(CreateError(404));
            res.status(200).send(result);
        });
    },
    store: async (req, res, next) => {
        try {
            const customer = await customervalidate.validateAsync(req.body);
            const sql = "INSERT INTO customers (customer_name,age,gender,contact_no,email,address) VALUES (?,?,?,?,?,?)";
            con.query(sql, [customer.customer_name, customer.age, customer.gender, customer.contact_no, customer.email, customer.address], (err, result) => {
                if (err) return next(CreateError(500));
                res.status(200).send({
                    role_id: result.insertId,
                    customer_name: customer.customer_name,
                    age: customer.age,
                    gender: customer.gender,
                    contact_no: customer.contact_no,
                    email: customer.email,
                    address: customer.address
                });

            });
        }
        catch (error) {
            if (error.isJoi === true) return next(CreateError(400, error.message));
            next(error);
        }
    },
    edit: async (req, res, next) => {
        if (req.params.id && !isNaN(req.params.id)) {
            const sql = "SELECT * FROM customers where customer_id=?";
            con.query(sql, [req.params.id], (err, result) => {
                if (err || result == '') return next(CreateError(404));
                res.status(200).send(result);
            });
        } else {
            return next(CreateError(404));
        }
    },
    update: async (req, res, next) => {
        try {
            const customer = await rolevalidate.validateAsync(req.body, { "context": { "method": "PUT" } });
            const sql = "UPDATE customers SET customer_name=?,age=?,gender=?,contact_no=?,email=?,address=?,is_active=? WHERE customer_id=?";
            con.query(sql, [customer.customer_name, customer.age, customer.gender, customer.contact_no, customer.email, customer.address, customer.is_active, customer.customer_id], (err, result) => {
                if (err || result == '') return next(CreateError(500));
                res.status(200).send({
                    customer_id: customer.customer_id,
                    customer_name: customer.customer_name,
                    age: customer.age,
                    gender: customer.gender,
                    contact_no: customer.contact_no,
                    email: customer.email,
                    address: customer.address,
                    is_active: customer.is_active
                });
            });
        } catch (error) {
            if (error.isJoi === true) return next(CreateError(400, error.message));
            next(error);
        }
    },
    delete: async (req, res, next) => {
        if (req.params.id && !isNaN(req.params.id)) {
            const sql = "DELETE FROM customers WHERE customer_id=?";
            con.query(sql, [req.params.id], function (err, result) {
                if (err || result == '') return next(CreateError(404));
                res.status(200).send({
                    message: "Record Deleted"
                });
            });
        } else {
            return next(CreateError(404));
        }
    },
}