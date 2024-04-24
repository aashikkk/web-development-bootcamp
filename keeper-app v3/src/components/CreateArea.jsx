/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom } from "@mui/material";

function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
    });
    const [isExpand, setIsExpand] = useState(false);

    function expandNote() {
        setIsExpand(true);
    }

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
            <form className="create-note">
                {isExpand && (
                    <input
                        name="title"
                        placeholder="Title"
                        onChange={handleNoteChange}
                        value={note.title}
                    />
                )}
                <textarea
                    onClick={expandNote}
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpand ? 3 : 1}
                    onChange={handleNoteChange}
                    value={note.content}
                />

                <Zoom in={isExpand}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
