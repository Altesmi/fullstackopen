import React from 'react'

const FilterNumberInput = (props) => { 

    return(
        <form>
            Rajaa näytettäviä: <input value={props.filterString} onChange={props.filterPersons} />
        </form>
    )


}



export default FilterNumberInput