import React from 'react';
import AddPersonForm from './AddPersonForm'

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
            newNumber: '111-111'
        }
    }

    newNameChanged = (event) => {
        this.setState({ newName: event.target.value })
    }

    newNroChanged = (event) => {
        this.setState({ newNro: event.target.value })
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
        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <AddPersonForm addEntry={this.addEntry}
                    newName={this.state.newName}
                    newNameChanged={this.newNameChanged}
                    newNumber={this.state.newNumber}
                    newNumberChanged={this.newNumberChanged} />

                <h2>Numerot</h2>
                <table>
                    {this.state.persons.map(person => <tr key={person.id}>
                        <td>{person.name}</td><td> {person.number}</td>
                    </tr>)}
                </table>
            </div>)
    }
}

export default App
