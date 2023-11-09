import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../../utils/api/index.js';

function DeckList ({deck, updateDecks}) {
    // deck includes the following content
    const { id, name, description, cards } = deck;
    const deckLength = cards.length;
    const history = useHistory();

    // delete button handler
    const deleteHandler = async () => {
        // 'Delete' btn is clicked; if 'confirmed', uses 'deleteDeck'
        // from 'utils/api/index.js' to delete.
        // need to use async/await because fetching.
        if ( window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")) {
            await deleteDeck(id)
            updateDecks(-1)
            // 'history.go(0)' refreshes the page;
            // for more info see Thinkful module 29.5
            history.go(0)
        } else {
            history.go(0)
        }
        // console.log("you're tyring to delete this deck")
    }

    // return the following deck content
    // Deck name, card amount, description, view/study/delete buttons
    return (
        <div className="card w-75 mb-4">
            <div className="card-body">
                <div className="row px-3">
                    <h5 className="card-title">{name}</h5>
                    <p className="ml-auto">{deckLength} cards</p>
                </div>
                <p className="card-text">{description}</p>
                <div>
                    
                    <Link to={`/decks/${id}`} className="btn btn-secondary mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 20 20">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        View
                    </Link>

                    <Link to={`/decks/${id}/study`} className="btn btn-primary mi-3 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                        </svg>
                        Sudy
                    </Link>

                    <button
                        onClick={deleteHandler}
                        name="delete"
                        value={id}
                        className="btn btn-danger ml-auto"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        {/* Delete */}
                    </button>

                </div>
            </div>
        </div>

    )
}

export default DeckList