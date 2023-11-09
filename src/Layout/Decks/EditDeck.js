import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { readDeck, updateDeck } from '../../utils/api/index.js'

function EditDeck({updateDecks}) {
    // deck is originally an object with empty strings for name and description
    const [deck, editDeck] = useState({name: "", description: ""})
    const history = useHistory()
    const {deckId} = useParams()

    useEffect(() => {
        // const abortController = window.AbortController;
        const abortController = new AbortController()
        
        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            editDeck(() => response)
        }

        deckInfo()
        
        return () => abortController.abort()
    }, [deckId])

    const changeForm = ({ target }) => {
        editDeck({...deck, [target.name]: target.value})
    }
    
    const submitForm = async (event) => {
        event.preventDefault()
        const response = await updateDeck(deck)
        history.push(`/decks/${response.id}`)
        updateDecks(1)
    }

    if (!deck) {
        return (
            <div className="spinner-border text-primary" role="status">
               <span className="sr-only">
                   Loading...
                </span>
            </div>

    )} else {
        return (
            <div className="col-9 mx-auto">

                {/* navigation bar */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">

                        <li className="breadcrumb-item">
                            <Link to={"/"}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 20 20">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                                </svg>
                                Home
                            </Link>
                        </li>

                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deckId}`}>
                                {deck.name}
                            </Link>
                        </li>

                        <li className="breadcrumb-item">
                            Edit Deck
                        </li>

                    </ol>
                </nav>

                <div className="row pl-3 pb-2">
                    <h1>Edit Deck</h1>
                </div>

                {/* submit form */}
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name"
                        value={deck.name}
                        onChange={changeForm}
                        id="name" 
                        className="form-control" 
                        placeholder={deck.name} 
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                        name="description" 
                        value={deck.description}
                        onChange={changeForm}
                        className="form-control" 
                        id="description" 
                        placeholder={deck.description}
                        rows={4}
                        />

                    </div>

                    <Link to={`/decks/${deckId}`} name="cancel" className="btn btn-secondary mr-3">
                        Cancel
                    </Link>

                    {/* submit button */}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>

                </form>
                
            </div>
        )
    }
}

export default EditDeck
                