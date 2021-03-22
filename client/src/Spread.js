import { useState, useEffect } from 'react'
import axios from 'axios';
import Header from './components/Header.js'


const Spread = () => {
    const [dates, setDates] = useState([])
    const [data, setData] = useState([])
    const [tasks, setTasks] = useState([])

    // onComponentMount
    useEffect(async () => {
        const getData = async () =>{
            const dataFromServer = await fetchData()
            setData(dataFromServer)
        }

        const getTasks = async () =>{
            const dataFromServer = await fetchTasks()
            setTasks(dataFromServer)
        }

        await getData()
        await getTasks()
        // getUniqueDates()
    }, [])

    // onDataChange
    useEffect(() =>{
        const uniqueDates = [...new Set(data.map((el) => el.date))]

        setDates(uniqueDates)
    }, [data])

    const getUniqueDates = () => {
        const uniqueDates = [...new Set(data.map((el) => el.date))]
        setDates(uniqueDates)
    }

    // Fetch data
    const fetchData = async () => {
        const res = await axios.get('http://localhost:3001/data')

        return res.data
    }

    // Fetch tasks
    const fetchTasks = async() => {
        const res = await axios.get('http://localhost:3001/tasks')
        
        return res.data
    }

    // Post new value
    const handleChange = async (taskId, date, hours)=>{
        if(isNaN(hours)){
            alert('Value must be a number.')
            return
        }

        await axios.post(`http://localhost:3001/data/${taskId}/${date}/${hours}`)
        
        const index = data.findIndex((el)=> el.taskId == taskId && el.date === date)
        if(index !== -1){
            let newArr = [...data]
            newArr[index].hours = hours
            setData(newArr)
        }
        else {
            const newData = {
                date: date,
                taskId: Number(taskId),
                hours: Number(hours)
            }
            setData([...data, newData])
        }
    }

    const getHoursByTaskByDate = (taskId, date) =>{
        const item = data.filter((el) => el.taskId === taskId && el.date === date)[0]
        return item ? item.hours : ''
    }

    const row = tasks.map((task, index)=>
        <tr key={ task.id }>
            <td className="task">{ task.name }</td>
            { dates.map((date) => 
                { const value = getHoursByTaskByDate(task.id, date)
                    return <td key={ date } className="tdInput">
                    <input type="text" value= { value } onChange={ e =>handleChange(task.id, date,e.target.value) }>
                    </input>
                </td>}) }
        </tr>
    )
    
    const handleAddTask = async (taskName) => {
        const insertId = await axios.post(`http://localhost:3001/task/${taskName}`)
        
        setTasks([...tasks, {id: insertId.data, name: taskName}])
    }

    return (
        <div style={{padding: '20px 0'}}>
            <Header onAdd={handleAddTask}></Header>
            <table className="container">
                <thead>
                    <tr>
                        <th></th>
                        { dates.map((el) => <th key={el} className="table-header"><span>{ el }</span></th>)}
                    </tr>
                </thead>
                <tbody>
                    {dates && row}
                </tbody>
            </table>
        </div>
    )
}

export default Spread
