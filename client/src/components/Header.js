import Button from './Button'
import FormInput from './FormInput'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Header = ({ onAdd }) => {
    const [taskName, setTaskName] = useState('')

    const onSubmit = () => {
        if(!taskName){
            alert('Please enter a task name!')
            return
        }
        
        onAdd(taskName)
        setTaskName('')
    }
    return (
        <div className="header">
            <span>Add a new task:</span>
            <div>
                <FormInput placeholder="Task name" onChange={(e) => setTaskName(e)} value={ taskName }></FormInput>
                <Button
                    onClick={ onSubmit }
                    text='Add'
                ></Button>
            </div>
        </div>
    )
}

Header.propTypes = {
    onAdd: PropTypes.func,
}


export default Header
