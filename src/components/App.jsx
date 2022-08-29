import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { Container, TitlePhoneBook, TitleContacts } from './AppStyled';


export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onformSubmit = ({ id, name, number }) => {
    const contact = { id, name, number };
    return setContacts(prevState => [contact, ...prevState]);
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onDelete = id => {
    setContacts(state => state.filter(person => person.id !== id));
  };

  const filterContacts = contacts.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container>
      <TitlePhoneBook>Phonebook</TitlePhoneBook>
      <ContactForm onSubmit={onformSubmit} contacts={contacts} />
      <TitleContacts>Contacts</TitleContacts>
      <ContactFilter onFilter={onFilter} filter={filter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDelete={onDelete}
        filterContacts={filterContacts}
      />
    </Container>
  );
};
