import React from "react";
import AddPersonForm from "./AddPersonForm";
import ShowPersons from "./ShowPersons";
import PersonService from "../services/persons";
import FilterNumberInput from "./FilterNumberInput";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "N.N",
      newNumber: "111-111",
      filterString: ""
    };
  }

  newNameChanged = event => {
    this.setState({ newName: event.target.value });
  };

  newNumberChanged = event => {
    this.setState({ newNumber: event.target.value });
  };

  filterPersons = event => {
    this.setState({ filterString: event.target.value });
  };

  addEntry = event => {
    event.preventDefault();
    let sameEntriesInDB = this.state.persons.filter(
      person => person.name.toLowerCase() === this.state.newName.toLowerCase()
    );
    /* check if the entry already exists */
    if (sameEntriesInDB.length === 1) {
      // name exists, update number if the user wants
      let reallyUpdate = window.confirm(
        `${sameEntriesInDB[0].name} on jo luettelossa. Päivitetäänkö numero?`
      );
      if (reallyUpdate) {
        const newPersonObject = {
          ...sameEntriesInDB[0],
          number: this.state.newNumber
        };
        PersonService.update(sameEntriesInDB[0].id, newPersonObject).then(
          newPerson => {
            let newPersonsArray = this.state.persons; // copy the old state
            newPersonsArray[
              sameEntriesInDB[0].id - 1
            ].number = this.state.newNumber; // update the number
            this.setState({
              persons: newPersonsArray,
              newName: "N.N",
              newNumber: "111-111"
            });
          }
        );
      }
    } else if (sameEntriesInDB.length > 1) {
      // More than one same name in the database. Not handled currently
      alert("Enemmän kuin yksi sama nimi taulukossa. Ei pystytä käsittelemään");
    } else {
      // add new person
      const newPersonObject = {
        name: this.state.newName,
        number: this.state.newNumber,
        id: this.state.persons.length + 1
      };

      PersonService.create(newPersonObject).then(newPerson => {
        this.setState({
          persons: this.state.persons.concat(newPerson),
          newName: "N.N",
          newNumber: "111-111"
        });
      });
    }
  };

  deleteEntry = personToBeDeleted => {
    let reallyDelete = window.confirm(
      `Poistetaanko todella ${personToBeDeleted.name}?`
    );
    if (reallyDelete) {
      PersonService.deletePerson(personToBeDeleted.id);
      //Update state
      let personArrayWithoutRemovedPerson = this.state.persons.filter(
        person => person.id !== personToBeDeleted.id
      );
      this.setState({
        persons: personArrayWithoutRemovedPerson,
        newPerson: "N.N",
        newNumber: "111-111"
      });
    }
  };

  componentDidMount() {
    axios.get("http://localhost:3001/persons").then(response => {
      this.setState({ persons: response.data });
    });
  }

  render() {
    /*Take all persons if filterString is empty and filter 
        persons in state if filterString contains something*/
    let persons =
      this.state.filterString.length > 0
        ? this.state.persons.filter(person =>
            person.name
              .toLowerCase()
              .includes(this.state.filterString.toLowerCase())
          )
        : this.state.persons;

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterNumberInput
          filterString={this.state.filterString}
          filterPersons={this.filterPersons}
        />
        <h3>Lisää uusi</h3>
        <AddPersonForm
          addEntry={this.addEntry}
          newName={this.state.newName}
          newNameChanged={this.newNameChanged}
          newNumber={this.state.newNumber}
          newNumberChanged={this.newNumberChanged}
        />

        <h2>Numerot</h2>
        <ShowPersons persons={persons} deleteEntry={this.deleteEntry} />
      </div>
    );
  }
}

export default App;
