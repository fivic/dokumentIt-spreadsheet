import { useState, useEffect } from 'react'
import './assets/Spreadsheet.css'
import axios from 'axios';
import Header from './components/Header'
import SpreadSheet from 'react-spreadsheet-component/lib/spreadsheet.js'
import Dispatcher  from 'react-spreadsheet-component/lib/dispatcher.js'

// TODO - doradi bazu - dodaj tablicu s kolonama

const SpreadComp = () => {    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [initialData, setInitialData] = useState([])

    useEffect(async () => {
        const getData = async () =>{
            const dataFromServer = await fetchData()
            setData(dataFromServer)
        }

        // const getTasks = async () =>{
        //     const dataFromServer = await fetchTasks()
        //     setTasks(dataFromServer)
        // }

        await getData()
        // await getTasks()
        setLoading(false)
    }, [])

    useEffect(()=>{
        
        const transformedData = {rows:rows.map((row) => {
            const a = columns.map((col) =>{
                return getHours(row.id, col)
            })
            a.unshift(row.name)
            return a
        })}
        const prepColumns = columns
        prepColumns.unshift('')
        transformedData.rows.unshift(prepColumns)
        console.log("transformedData", transformedData)
        setInitialData(transformedData)
        console.log("initialData", initialData)
    }, [data])

    const getHours = (taskId, date) =>{
        const item = data.find((el) => el.taskId === taskId && el.date === date)
        return item ? item.hours : ''
    }
    
    // Fetch data
    const fetchData = async () => {
        const spreadsheetData = await axios.get('http://localhost:3001/data')
        console.log(spreadsheetData.data)
        
        
        const spreadsheetColumns = await axios.get('http://localhost:3001/columns')
        const columns = spreadsheetColumns.data.map( (item) => item.name)
        setColumns(columns)
        
        const tasks = await axios.get('http://localhost:3001/tasks')
        const rows = tasks.data
        setRows(rows)
        setColumns(columns)
        return spreadsheetData.data
    }

    const config = {
        // Initial number of row
        rows: 1,
        // Initial number of columns
        columns: 1,
        // True if the first column in each row is a header (th)
        hasHeadColumn: true,
        // True if the data for the first column is just a string.
        // Set to false if you want to pass custom DOM elements.
        isHeadColumnString: true,
        // True if the first row is a header (th)
        hasHeadRow: true,
        // True if the data for the cells in the first row contains strings.
        // Set to false if you want to pass custom DOM elements.
        isHeadRowString: true,
        // True if the user can add rows (by navigating down from the last row)
        canAddRow: false,
        // True if the user can add columns (by navigating right from the last column)
        canAddColumn: false,
        // Override the display value for an empty cell
        emptyValueSymbol: '',
        // Fills the first column with index numbers (1...n) and the first row with index letters (A...ZZZ)
        hasLetterNumberHeads: false
    }
    
    var dataa = {
      rows: [
            ['', 'datum', 'datum1', 'datum2', 'datum3', 'datum4', 'datum5', 'datum6'],
            ['task1', 1, 2, 3, 4, 5, 6, 7],
            ['task2', 1, '4', 3, 4, 5, 6, 7],
            ['task3', 1, 2, 3, 4, 5, 6, 7],
            ['task4', 1, 2, 3, 4, 5, 6, 7]
        ]
    };
    console.log("dataa",dataa)
    Dispatcher.subscribe('dataChanged', function (data) {
      console.log("dataChanged test", data)
    }, "1")

    Dispatcher.subscribe('cellValueChanged', function (cell, newValue, oldValue) {
      console.log(`cellValueChanged cell: ${cell}, newValue: ${newValue}, oldValue: ${oldValue}`)
    }, "1")

    Dispatcher.subscribe('cellSelected', function ([row, column]) {
      console.log('cellSelected data', row, column)
    }, "1")

    return (
        <div>
            <SpreadSheet initialData={initialData} config={config} spreadsheetId="1" />
        </div>
    )
}

export default SpreadComp
