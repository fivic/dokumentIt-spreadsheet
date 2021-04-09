const { query } = require('express');
const mysql = require('mysql')

let con;

async function init() {

    con = mysql.createConnection({
        host: '127.0.0.1',
        port: '3307',//3306
        user: 'root',
        password: 'password123',//root
        database: 'dokument_react'
      })
      con.connect((err) => {
        if(err)
          throw err;
        console.log('MySql connected')
      })

    return new Promise((acc, rej) => {
        con.query(
            'CREATE DATABASE IF NOT EXISTS dokument_react',
            err => {
                if (err) return rej(err);

                acc();
            },
        );
    });
}

async function getTasks() {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM tasks', (err, rows) => {
            if (err) return rej(err);
            console.log(rows)
            acc(
                rows.map(item => item),
            );
        });
    });
}

async function storeTask(item) {
    return new Promise((acc, rej) => {
        con.query(
            'INSERT INTO tasks (name) VALUES (?)',
            [item],
            (err, rows) => {
                if (err) return rej(err);
                acc(rows.insertId);
            },
        );
    });
}

async function getTimesheetData() {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM timesheet', (err, rows) => {
            if (err) return rej(err);
            
            console.log("rows", rows)
            acc(
                rows.map(item => item),
            );
        });
    });
}

async function getSpreadsheetColumns() {
    return new Promise((acc, rej) => {
        con.query('SELECT * FROM spreadsheet_header', (err, rows) => {
            if(err) return rej(err);
            console.log(rows)
            acc(rows.map(item => item));
        })
    })
}

async function updateTimesheetData(item) {
    return new Promise((acc, rej) => {
        con.query('UPDATE timesheet SET taskId = ?, date = ?, hours = ? WHERE taskId = ? AND date = ?', [item.taskId, item.date, item.hours, item.taskId, item.date], (err, rows) => {
            if (err) return rej(err);
            
            if (rows.affectedRows !== 0)
                acc(
                    rows.message,
                );
        });
        
        con.query('insert into timesheet(taskId, date, hours) values (?, ?, ?)', [item.taskId, item.date, item.hours], (err, rows) => {
            if (err) return rej(err);

            acc(rows.insertId);
        });
    });
}

module.exports = {
    init,
    getTasks,
    storeTask,
    getTimesheetData,
    updateTimesheetData,
    getSpreadsheetColumns
}