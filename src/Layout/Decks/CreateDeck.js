import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api/index.js';

function CreateDeck({ updateDecks }) {
    const [newDeck, setNewDeck] = useState({ name: "", description: "" });
    const [error, setError] = useState(undefined);
    const history = useHistory();

    const changeForm = ({ target }) => {
        setNewDeck({ ...newDeck, [target.name]: target.value });
    };
    
    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await createDeck(newDeck);
            history.push(`/decks/${response.id}`);
            updateDecks(1);
        } catch (error) {
            setError(error);
            console.error(error); // Add this to log the error for debugging
        }
    };

    // Function to render error message if an error has occurred
    const renderError = () => {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    Error: {error.message}
                </div>
            );
        }
    };

    return (
        <div className="col-9 mx-auto">
            {renderError()}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">                  
                    <li className="breadcrumb-item">
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                            </svg> 
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        value={newDeck.name}
                        onChange={changeForm}
                        id="name" 
                        className="form-control" 
                        placeholder="Deck Name" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description" 
                        value={newDeck.description}
                        onChange={changeForm}
                        className="form-control" 
                        id="description" 
                        placeholder="Brief description of the deck."
                        rows={4}
                    />
                </div>

                <Link to="/" className="btn btn-secondary mr-3">Cancel</Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
