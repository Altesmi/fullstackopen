import React from 'react';

const AddPersonForm = (props) => {
    return (<form onSubmit={props.addEntry}>
        <div>
            nimi: <input value={props.newName} onChange={props.newNameChanged} />
        </div>
        <div>
            numero: <input value={props.newNumber} onChange={props.newNumberChanged} />
        </div>
        <div>
            <button type="submit" >lisää</button>
        </div>
    </form>
    )

}

export default AddPersonForm

