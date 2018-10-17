import React from "react";

const ShowPersons = props => {
  return props.persons.length > 0 ? (
    <table>
      <tbody>
        {props.persons.map(person => (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td> {person.number}</td>
          <td>
            {" "}
            <button onClick={() => props.deleteEntry(person)}>Poista</button>
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div> Nimiä ei löydä tällä rajauksella!</div>
  );
};

export default ShowPersons;
