import { ContactForm } from './contact_form/form.jsx';
import { Filter } from './filter/filter.jsx';
import { ContactList } from './contacts/contact_list/list.jsx';
import { useState, useEffect } from 'react';

export const App = () => {

  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    return parsedContacts ?? []
  }
  )

  const [filter, setFilter] = useState('')

  useEffect(() => {
    const contactsString = JSON.stringify(contacts)
    localStorage.setItem('contacts', contactsString)
  }, [contacts])
  
  

  const fillContacts = (contact) => {
    if (contacts.find(item => item.name.toLowerCase() === contact.name.toLowerCase())) {
      alert(`${contact.name} is already in contacts`)
      return
    }
    setContacts(prevState => {
      return [...prevState, contact]
    })
  }

  const onChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  const filteredContacts = () => (contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()
    ))
  )

  const deleteContact = (contactId) => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== contactId)
    })
  }
  return <div
    style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: 20,
      color: '#010101',
      backgroundColor: '#f0f0f0'
    }}
  >
    <h1>Phonebook</h1>
    <ContactForm fillContacts={fillContacts} />
    <h2>Contacts</h2>
    <Filter filter={filter} onChangeFilter={onChangeFilter} />
    <ContactList contacts={filteredContacts()} deleteContact={deleteContact} />
  </div>
};
