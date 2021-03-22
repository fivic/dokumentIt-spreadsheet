import PropTypes from 'prop-types'

const FormInput = ({ onChange, value, placeholder }) => {
    return (
        <input
          type='text'
          placeholder={ placeholder }
          value={ value }
          onChange={ (e) => onChange(e.target.value) }
        />
    )
}

FormInput.propTypes = {
    onChange: PropTypes.func,
    text: PropTypes.string,
    placeholder: PropTypes.string,
}

export default FormInput
