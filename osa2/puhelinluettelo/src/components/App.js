import React from 'react';
import AddPersonForm from './AddPersonForm'
import FilterNumberInput from './FilterNumberInput'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [

                { name: 'Arto Hellas', number: '040-123456', id: 1 },
                { name: 'Martti Tienari', number: '040-123456', id: 2 },
                { name: 'Arto Järvinen', number: '040-123456', id: 3 },
                { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
            ],
            newName: 'N.N',
            newNumber: '111-111',
            filterString: ''
        }
    }

    newNameChanged = (event) => {
        this.setState({ newName: event.target.value })
    }

    newNumberChanged = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    filterPersons = (event) => {
        /* set the new string to filterString in state*/

        this.setState({filterString: event.target.value})

    }

    addEntry = (event) => {
        event.preventDefault()
        /* check if the entry already exists */
        if (this.state.persons.filter(
            person =>
                (person.name.toLowerCase() === this.state.newName.toLowerCase()))
            .length > 0) {
            alert('Nimi on jo luettelossa')
        }

        else {
            const newEntryObject = {
                name: this.state.newName,
                number: this.state.newNumber,
                id: this.state.persons.length + 1
            }
            const persons = this.state.persons.concat(newEntryObject)

            this.setState(
                {
                    persons,
                    newName: 'N.N',
                    newNumber: '111-111'
                }
            )
        }
    }

    render() {
        /*Take all persons if filterString is empty and filter 
        persons in state if filterString contains something*/
        let persons = this.state.filterString.length > 0 ? 
        this.state.persons.filter(person => person.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())) : 
        this.state.persons
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <FilterNumberInput filterString={this.state.filterString} filterPersons={this.filterPersons}/> 
                <h3>Lisää uusi</h3>
                <AddPersonForm addEntry={this.addEntry}
                    newName={this.state.newName}
                    newNameChanged={this.newNameChanged}
                    newNumber={this.state.newNumber}
                    newNumberChanged={this.newNumberChanged} />

                <h2>Numerot</h2>
                <table>
                    <tbody>
                    {/* Map with filterString if it deviates from empty string */}
                    {persons.map(person => <tr key={person.id}>
                        <td>{person.name}</td><td> {person.number}</td>
                    </tr>)}
                    </tbody>
                </table>
            </div>)
    }
}

export default App
