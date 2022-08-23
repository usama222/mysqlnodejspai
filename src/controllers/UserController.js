const con = require("../config/db");
const uservalidate = require('../helpers/uservalidate');
const CreateError = require('http-errors');
const bcrypt = require('bcryptjs');

module.exports = {
    show: async (req, res, next) => {
        con.query("SELECT * FROM users", (err, result) => {
            if (err) return next(CreateError(500));
            if (result == '') return next(CreateError(404));
            res.status(200).send(result);
        });
    },
    store: async (req, res, next) => {
        try {
            const user = await uservalidate.validateAsync(req.body);
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(user.password, salt);
            const sql = "INSERT INTO `users` ( `username`, `password`,`role_id`) VALUES (?,?,?)";
            con.query(sql, [user.username, hashpassword, user.role_id], (err, result) => {
                if (err) return next(CreateError(500));
                res.status(200).send({
                    user_id: result.insertId,
                    username: user.username,
                    role_id: user.role_id,
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
            const sql = "SELECT * FROM users where user_id=?";
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
            const user = await uservalidate.validateAsync(req.body, { "context": { "method": "PUT" } });
            const sql = "UPDATE users SET username=?,role_id=?,is_active=? WHERE user_id=?";
            con.query(sql, [user.username, user.role_id, user.is_active, user.user_id], (err, result) => {
                if (err || result == '') return next(CreateError(500));
                res.status(200).send({
                    role_id: user.user_id,
                    username: user.username,
                    role_id: user.role_id,
                    is_active: user.is_active
                });
            });
        } catch (error) {
            if (error.isJoi === true) return next(CreateError(400, error.message));
            next(error);
        }
    },
    delete: async (req, res, next) => {
        if (req.params.id && !isNaN(req.params.id)) {
            const sql = "DELETE FROM users WHERE user_id=?";
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