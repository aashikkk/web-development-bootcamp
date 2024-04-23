import "./App.css";
import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes((prevNote) => {
            return [...prevNote, newNote];
        });
    }

    function deleteNote(id) {
        setNotes((prevNote) => {
            return prevNote.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })}

            <Footer />
        </div>
    );
}

export default App;
