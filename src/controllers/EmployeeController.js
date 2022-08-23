const con = require('../config/db');


con.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
});
module.exports = {

    Index: async (req, res, next) => {
        try {
            con.query("SELECT * FROM employees", (err, result) => {
                if (err) throw err;
                // console.log(`Results: ${JSON.stringify(result)}`)
                res.status(200).send(result);
            });

        } catch (error) {
            // if (error.name == 'ValidationError') return next(CreateError(400, error.message))
            next(error)
        }
    },
    InsertEmployee: async (req, res, next) => {
        try {
            const sql = "INSERT INTO `employees` ( `empname`, `age`) VALUES (?,?)";
            let values = [req.body.empname, req.body.age];
            con.query(sql, values, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0)
                    res.status(200).send("Insert Row Success");
                else
                    res.status(200).send("not work");
            });
        } catch (error) {
            // if (error.name == 'ValidationError') return next(CreateError(400, error.message))
            next(error)
        }
    }


}