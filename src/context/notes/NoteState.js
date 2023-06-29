import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json=await response.json();
    // const note = {
    //   _id: "6495f090519dc125ea3c7c3336c",
    //   user: "6495b773ad407e0d7e73fdd2",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2023-06-23T19:40:09.156Z",
    //   __v: 0,
    // };
    setNotes(notes.concat({"title":json.title,"description":json.description}));
  };

  const deleteNote = async(id) => {
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      }

      
    });
    const json = await response.json();
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const nnotes=JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < nnotes.length; i++) {
      const x = nnotes[i];
      if (x._id === id) {
        nnotes[i].title = title;
        nnotes[i].description = description;
        nnotes[i].tag = tag;
        break;
      }
    }
    setNotes(nnotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

