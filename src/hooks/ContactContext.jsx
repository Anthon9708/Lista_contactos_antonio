import { createContext, useReducer } from "react";

const initialState = {
  contacts: [],
};

const actionTypes = {
  SET_CONTACTS: "SET_CONTACTS",
  ADD_CONTACT: "ADD_CONTACT",
  UPDATE_CONTACT: "UPDATE_CONTACT",
  DELETE_CONTACT: "DELETE_CONTACT",
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CONTACTS:
      return { ...state, contacts: action.payload };
    case actionTypes.ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] };
    case actionTypes.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case actionTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};
