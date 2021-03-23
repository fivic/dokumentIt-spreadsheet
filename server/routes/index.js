var express = require('express');
var router = express.Router();
const db = require('../persistance/database')

const data = [{
                date: '15.02.2021.',
                taskId: 6,
                hours: 8
              },
              {
                date: '16.02.2021.',
                taskId: 1,
                hours: 2
              },
              {
                date: '17.02.2021.',
                taskId: 3,
                hours: 2
              },
              {
                date: '18.02.2021.',
                taskId: 4,
                hours: 2
              },
              {
                date: '19.02.2021.',
                taskId: 2,
                hours: 2
              },
              {
                date: '20.02.2021.',
                taskId: 2,
                hours: 2
              },
              {
                date: '21.02.2021.',
                taskId: 1,
                hours: 2
              },
            ];

const tasks = [{
                  id: 1,
                  name: 'Task1'
                },
                {
                  id: 2,
                  name: 'Task2'
                },
                {
                  id: 3,
                  name: 'Task3'
                },
                {
                  id: 4,
                  name: 'Task4'
                },
                {
                  id: 5,
                  name: 'Task5'
                },
                {
                  id: 6,
                  name: 'Task6'
                },
              ]

/* GET data. */
router.get('/data', async (req, res) => {
  const timesheetData = await db.getTimesheetData()

  res.send(timesheetData);
});

router.get('/tasks', async (req, res) => {
  const tasks = await db.getTasks()
  
  res.send(tasks)
})

router.post('/task/:taskName', async (req, res) => {
  const insertId = await db.storeTask(req.params.taskName)

  res.status(200).json(insertId)
})

router.post('/data/:taskId/:date/:hours', async (req, res, next) => {
  const data = {
    date: req.params.date,
    taskId: Number(req.params.taskId),
    hours: Number(req.params.hours)
  }
  
  const dbResp = await db.updateTimesheetData(data)
  
  res.sendStatus(200);
})


module.exports = router;
