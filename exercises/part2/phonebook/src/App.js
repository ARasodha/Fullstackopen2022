import { useState, useEffect } from 'react';
import axios from 'axios';

const Persons = ({ persons }) => {
  return persons.map(person => {
    return <p key={person.name}> {person.name} {person.number}</p>
  })
};

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.search} onChange={props.onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form>
      <div>name: <input value={props.newName} onChange={props.handleTextInput}/></div>
      <div>number: <input value={props.newNumber} onChange={props.handleNumberInput}/></div>
      <div>
        <button type="submit" onClick={props.handleAddBtn}>add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, []);

  let handleAddBtn = (event) => {
    event.preventDefault();
    if (persons.map(({name}) => name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = persons.concat({name: newName, number: newNumber});
    setPersons(newPerson);
    setNewName('');
    setNewNumber('');
  }

  let filteredPersons = 
    persons.filter(({name}) => name.toLowerCase().startsWith(search.toLowerCase())) || persons;

  let handleTextInput = (event) => {
    setNewName(event.target.value);
  }

  let handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  let handleFilterInput = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleFilterInput}/>

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} handleTextInput={handleTextInput} newNumber={newNumber} 
        handleNumberInput={handleNumberInput} handleAddBtn={handleAddBtn} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App;