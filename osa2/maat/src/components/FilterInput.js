import React from 'react'

const FilterInput = (props) => { 

    return(
        <form>
            Find countries: <input value={props.filterString} onChange={props.filterCountries} />
        </form>
    )


}



export default FilterInput