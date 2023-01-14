const con = require('../config/db');
const rolevalidate = require('../helpers/rolevalidate');
const CreateError = require('http-errors');


module.exports = {
    show: async (req, res, next) => {
        let pageno = (req.query.page == undefined ? 0 : req.query.page);
        let limit = (req.query.limit == undefined ? 10 : req.query.limit);
        con.query("SELECT * FROM roles LIMIT " + pageno + ", " + limit + "", (err, result) => {
            if (err) return next(CreateError(500));
            if (result == '') return next(CreateError(404));
            res.status(200).send(result);
        });
    },
    store: async (req, res, next) => {
        try {
            const role = await rolevalidate.validateAsync(req.body);
            const sql = "INSERT INTO `roles` ( `role_name`, `is_active`) VALUES (?,?)";
            con.query(sql, [role.role_name, role.is_active], (err, result) => {
                if (err) return next(CreateError(500));
                res.status(200).send({
                    role_id: result.insertId,
                    role_name: role.role_name,
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
            const sql = "SELECT * FROM roles where role_id=?";
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
            const role = await rolevalidate.validateAsync(req.body, { "context": { "method": "PUT" } });
            const sql = "UPDATE roles SET role_name=?,is_active=? WHERE role_id=?";
            con.query(sql, [role.role_name, role.is_active, role.role_id], (err, result) => {
                if (err || result == '') return next(CreateError(500));
                res.status(200).send({
                    role_id: role.role_id,
                    role_name: role.role_name,
                    is_active: role.is_active
                });
            });
        } catch (error) {
            if (error.isJoi === true) return next(CreateError(400, error.message));
            next(error);
        }
    },
    delete: async (req, res, next) => {
        if (req.params.id && !isNaN(req.params.id)) {
            const sql = "DELETE FROM roles WHERE role_id=?";
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