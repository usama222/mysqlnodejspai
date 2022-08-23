const con = require('../config/db');
const suppliervalidate = require('../helpers/suppliervalidate');
const CreateError = require('http-errors');


module.exports = {

    show: async (req, res, next) => {
        con.query("SELECT*FROM suppliers", (err, result) => {
            if (err) return next(CreateError(500));
            if (result == '') return next(CreateError(404));
            res.status(200).send(result);
        });

    },
    store: async (req, res, next) => {
        try {
            const supplier = await suppliervalidate.validateAsync(req.body);
            const sql = "INSERT INTO suppliers (supplier_name,age,gender,contact_no,email,warehouse_address) VALUES (?,?,?,?,?,?)";
            con.query(sql, [supplier.supplier_name, supplier.age, supplier.gender, supplier.contact_no, supplier.email, supplier.warehouse_address], (err, result) => {
                if (err) return next(CreateError(500));
                res.status(200).send({
                    supplier_id: result.insertId,
                    supplier_name: supplier.supplier_name,
                    age: supplier.age,
                    gender: supplier.gender,
                    contact_no: supplier.contact_no,
                    email: supplier.email,
                    warehouse_address: supplier.warehouse_address
                });
            });

        } catch (error) {
            if (error.isJoi === true) return next(CreateError(400, error.message));
            next(error);
        }
    },
    edit: async (req, res, next) => {
        if (req.params.id && !isNaN(req.params.id)) {
            const sql = "SELECT * FROM suppliers where supplier_id=?";
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
            const supplier = await suppliervalidate.validateAsync(req.body, { "context": { "method": "PUT" } });
            const sql = "UPDATE suppliers SET supplier_name=?,age=?,gender=?,contact_no=?,email=?,warehouse_address=?,is_active=? WHERE supplier_id=?";
            con.query(sql, [supplier.supplier_name, supplier.age, supplier.gender, supplier.contact_no, supplier.email, supplier.warehouse_address, supplier.is_active, supplier.supplier_id], (err, result) => {
                if (err || result == '') return next(CreateError(500));
                res.status(200).send({
                    supplier_id: supplier.supplier_id,
                    supplier_name: supplier.supplier_name,
                    age: supplier.age,
                    gender: supplier.gender,
                    contact_no: supplier.contact_no,
                    email: supplier.email,
                    warehouse_address: supplier.warehouse_address,
                    is_active: supplier.is_active
                });
            });
        } catch (error) {
            if (error.isJoi === true) return next(CreateError(400, error.message));
            next(error);
        }
    },
    delete: async (req, res, next) => {
        if (req.params.id && !isNaN(req.params.id)) {
            const sql = "DELETE FROM suppliers WHERE supplier_id=?";
            con.query(sql, [req.params.id], function (err, result) {
                if (err || result == '') return next(CreateError(404));
                res.status(200).send({
                    message: "Record Deleted"
                });
            });
        } else {
            return next(CreateError(404));
        }
    }

}
