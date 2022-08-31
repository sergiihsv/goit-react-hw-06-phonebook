import { configureStore, createSlice } from '@reduxjs/toolkit';


const initialState = {
  phoneBook: JSON.parse(window.localStorage.getItem('contacts')) ?? [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  
}

const phoneBookSlice = createSlice(
  {
    name: 'contacts',
    initialState,
    reducers: {
      saveContact(state, action) {
        state.phoneBook.push(action.payload);
      },
      deleteContact(state, action) {
        const index = state.phoneBook.findIndex(
          contact => contact.id === action.payload
        );
        state.phoneBook.splice(index, 1);
      },
      
      filterContacts(state, action) {
        state.filter = action.payload;
      }
    }
  }
);

export const store = configureStore({
  reducer: { contacts: phoneBookSlice.reducer }
});

export const { saveContact, deleteContact, filterContacts } =
  phoneBookSlice.actions;
