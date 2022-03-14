import { useState, useEffect } from 'react';
import personService from './services/persons';
import './index.css';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={type === 'success' ? 'success' : 'error'}>
      {message}
    </div>
  )
}

const Persons = ({ persons, handleDelete }) => {

  return persons.map(person => {
    return (
      <div key={person.name}>
        <p> {person.name} {person.number} <button id={person.id} onClick={handleDelete}>Delete</button></p>
      </div>
    )
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
  const [notif, setNotif] = useState([null, null]);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  },[]);

  let handleAddBtn = (event) => {
    event.preventDefault();
    let names = persons.map(({name}) => name.toLowerCase());

    if (names.includes(newName.toLowerCase())) {
      let person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
      let answer = window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new one?`);
      
      let newPerson = {...person, number: newNumber};
      if (answer) {
        personService
          .updatePerson(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.filter(p => p.id !== person.id).concat(returnedPerson));
          })
          .catch(error => {
            setNotif([`Information of ${newPerson.name} has been removed from server`, 'error']);
            setTimeout(() => setNotif([null, null]), 5000);
          })
      } else return;
    } else {
      const newPerson = {name: newName, number: newNumber};

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNotif([`Added ${returnedPerson.name}`, 'success']);
            setTimeout(() => setNotif([null, null]), 5000);
        });
    }

    setNewName('');
    setNewNumber('');
  }

  const filteredPersons = 
    persons.filter(({name}) => name.toLowerCase().startsWith(search.toLowerCase())) || persons;

  const handleTextInput = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterInput = (event) => {
    setSearch(event.target.value);
  }

  const handleDelete = (event) => {
    event.preventDefault();
    let personId = event.target.getAttribute('id');
    let person = persons.find(person => person.id === Number(personId))
    let answer = window.confirm(`Delete ${person.name}?`);

    if (answer) {
      personService
        .deletePerson(personId)
        .then(() => {
          setPersons(persons.filter(person => person.id !== Number(personId)));
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif[0]} type={notif[1]}/>
      <Filter value={search} onChange={handleFilterInput}/>

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} handleTextInput={handleTextInput} newNumber={newNumber} 
        handleNumberInput={handleNumberInput} handleAddBtn={handleAddBtn} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App;