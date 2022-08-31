import React, { useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { Container, TitlePhoneBook, TitleContacts } from './AppStyled';
import { useSelector, useDispatch } from 'react-redux';
import { saveContact, filterContacts, deleteContact } from '../redux/store';

export const App = () => {
  const dispatch = useDispatch();
  const getContacts = state => state.contacts.phoneBook;
  const getFilter = state => state.contacts.filter;
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onformSubmit = ({ id, name, number }) => {
    const contact = { id, name, number };
    dispatch(saveContact(contact));
  };

  const onFilter = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };

  const onDelete = id => {
    dispatch(deleteContact(id));
  };

  const filterContactsNew = contacts.filter(data =>
    data.name.toLowerCase().includes(filter.toLowerCase())
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
        filterContacts={filterContactsNew}
      />
    </Container>
  );
};