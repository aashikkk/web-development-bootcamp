/* eslint-disable react/prop-types */
import React, { useState } from "react";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });

    function handleNoteChange(event) {
        const { value, name } = event.target;

        setNote((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    function submitNote(event) {
        props.onAdd(note);
        setNote({
            title: "",
            content: "",
        });
        event.preventDefault();
    }

    return (
        <div>
            <form>
                <input
                    name="title"
                    placeholder="Title"
                    onChange={handleNoteChange}
                    value={note.title}
                />
                <textarea
                    name="content"
                    placeholder="Take a note..."
                    rows="3"
                    onChange={handleNoteChange}
                    value={note.content}
                />
                <button onClick={submitNote}>Add</button>
            </form>
        </div>
    );
}

export default CreateArea;
