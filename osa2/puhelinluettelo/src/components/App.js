import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas',
                    id: 1
                }
            ],
            newName: 'N.N'
        }
    }

    newNameChanged = (event) => {
        this.setState({ newName: event.target.value })
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
                id: this.state.persons.length + 1
            }
            const persons = this.state.persons.concat(newEntryObject)

            this.setState(
                {
                    persons,
                    newName: 'N.N'
                }
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addEntry}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.newNameChanged} />
                    </div>
                    <div>
                        <button type="submit" >lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                {this.state.persons.map(person => <div key={person.id}>
                    {person.name}
                </div>)}
            </div>
        )
    }
}

export default App
