const pool = require('../db/db')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addExpense(req,res) {
    const {id,body}=req;
    const today= new Date().toISOString().slice(0,10);
    try {
        await pool.query("INSERT INTO expenses(user_id,title,amount,expense_date) VALUES(?,?,?,?)",[id,body.title,body.amount,today])
        return res.sendStatus(200)
    } catch (error) {
        console.log(error);
        
    }
    
}
/**@param {import('express').Request} req */
async function loadExpense(req,res) {
    try {
        const [rows]=await pool.query("SELECT title,amount,expense_date from expenses where user_id=?",[req.id])
        return res.json(rows);
    } catch (error) {
        console.log(error);
        
    }
    
}
/**@param {import('express').Request} req */
async function filterExpense(req,res) {
    const{start,end}=req.body;
    try {
        const [rows] =await pool.query(
            "SELECT title,amount,expense_date from expenses where user_id=? and expense_date>=? and expense_date<=?",
            [req.id,start,end]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        
    }

}
module.exports={addExpense,loadExpense,filterExpense}