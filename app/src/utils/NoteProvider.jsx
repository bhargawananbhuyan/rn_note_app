import { createContext, useReducer } from "react";

export const NoteContext = createContext();

let initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOTES":
      return {
        notes: action.payload,
      };

    case "ADD_NOTE": {
      return {
        notes: [action.payload, ...state.notes],
      };
    }

    case "UPDATE_NOTE": {
      const _data = [];
      state.notes?.forEach((note) => {
        if (note._id === action.payload._id) {
          _data.push(action.payload);
        } else {
          _data.push(note);
        }
      });

      return {
        notes: _data,
      };
    }

    case "DELETE_NOTE": {
      return {
        notes: state.notes?.filter((note) => note._id !== action.payload),
      };
    }

    default:
      return state;
  }
};

export default function NoteProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        getNotes: (payload) => dispatch({ type: "GET_NOTES", payload }),
        addNote: (payload) => dispatch({ type: "ADD_NOTE", payload }),
        updateNote: (payload) => dispatch({ type: "UPDATE_NOTE", payload }),
        deleteNote: (id) => dispatch({ type: "DELETE_NOTE", payload: id }),
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}
