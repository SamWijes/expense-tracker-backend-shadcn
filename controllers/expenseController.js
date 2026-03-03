const pool = require('../db/db')

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addExpense(req,res) {
    const {id,body}=req;
    const today= new Date().toISOString().slice(0,10);
    const rawExpenseDate = body.expense_date ?? body.date;
    const expenseDate =
        typeof rawExpenseDate === 'string' && rawExpenseDate.trim()
            ? rawExpenseDate.trim()
            : today;
    const receiptPath = req.file ? `uploads/${req.file.filename}` : null;
    try {
        await pool.query(
            "INSERT INTO expenses(user_id,title,amount,expense_date,receipt) VALUES(?,?,?,?,?)",
            [id,body.title,body.amount,expenseDate,receiptPath]
        )
        return res.status(200).json({
            title: body.title,
            amount: body.amount,
            expense_date: expenseDate,
            receipt: receiptPath
        })
    } catch (error) {
        console.log(error);
        
    }
    
}
/**@param {import('express').Request} req */
async function loadExpense(req,res) {
    try {
        const [rows]=await pool.query("SELECT title,amount,expense_date,receipt from expenses where user_id=?",[req.id])
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
            "SELECT title,amount,expense_date,receipt from expenses where user_id=? and expense_date>=? and expense_date<=?",
            [req.id,start,end]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        
    }

}
/**@param {import('express').Request} req */
async function uploadReceipt(req,res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        return res.status(200).json({
            message: 'Receipt uploaded successfully',
            filename: req.file.filename,
            path: req.file.path,
            url: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to upload receipt' });
    }
}

module.exports={addExpense,loadExpense,filterExpense,uploadReceipt}
