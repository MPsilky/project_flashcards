import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard, readDeck } from "../../utils/api/index.js";
import { deleteDeck } from "../../utils/api/index.js";

// create a function that retrieves an updated deck's id,
// fetches it's card data, and sets the deck's useState to
// contain it's content
function Deck({ updateDecks }) {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { id, name, description, cards } = deck;

  useEffect(() => {
    // const abortController = window.AbortController;
    const abortController = new AbortController()
    const deckInfo = async () => {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(() => response);
    };
    deckInfo();
    return () => abortController.abort();
  }, [deckId]);

  // create a handler for the delete button
  const deleteHandler = async () => {
    // if the button is clicked and confirmed by the user, delete the deck using it's id
    if (
      window.confirm(
        "Are you sure you want to delete this deck? You will not be able to recover it."
      )
    ) {
      await deleteDeck(id);
      // use updateDecks() to subtract it from the card deck
      updateDecks(-1);
      // redirect to the home page
      history.push("/");
      // if the delete is not confirmed, leave the deck as is and remain on the same page
    } else {
      history.go(0);
    }
  };

  // if there is no deck or no cards, return the following webpage
  // that displays "loading..."
  if (!deck || !cards) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      // if a deck or cards are present, return a webpage with the following content
    );
  } else {
    return (
      <div className="col-9 mx-auto">
        {/* a navigation bar with the following links */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            {/* a link to the home page */}
            <li className="breadcrumb-item">
              <Link to={"/"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 20 20">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
              </svg>
                Home
              </Link>
            </li>

            {/* a string containing the deck's name */}
            <li className="breadcrumb-item">{name}</li>
          </ol>
        </nav>

        {/* a container holding the card deck, including their name,
                description, a button to study it, a button to edit it, a 
                button to add cards to the deck, and a button to delete it */}

        <div className="card border-0 mb-4">
          <div className="card-body">
            {/* deck name */}
            <div className="row px-3">
              <h5 className="card-title">{name}</h5>
            </div>

            {/* deck description */}
            <p className="card-text">{description}</p>

            <div className="row px-3">
              {/* edit button */}
              <Link to={`/decks/${id}/edit`} className="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 20 20">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
                Edit
              </Link>

              {/* study button */}
              <Link to={`/decks/${id}/study`} className="btn btn-primary ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-bookmark" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 8V1h1v6.117L8.743 6.07a.5.5 0 0 1 .514 0L11 7.117V1h1v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z"/>
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
              </svg>
                Study
              </Link>

              {/* add cards button */}
              <Link
                to={`/decks/${id}/cards/new`}
                className="btn btn-primary ml-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 1 20 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
                Add Cards
              </Link>

              {/* delete button */}
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
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>

        {/* a container containing all cards, including their front, back
                an edit button, and a delete button */}

        <div className="row pl-3 pb-2">
          <h1>Cards</h1>
        </div>

        {cards.map((card, index) => (
          <div className="row" key={index}>
            <div className="col">
              <div className="card">
                <div className="row card-body">
                  {/* front */}
                  <p className="col-6 card-text">{card.front}</p>

                  {/* back */}
                  <p className="col-6 card-text">{card.back}</p>
                </div>

                <div className="d-flex justify-content-end p-2">
                  {/* edit button */}
                  <Link
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 20 20">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this card? You will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        updateDecks(-1);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name="deleteCard"
                    value={card.id}
                    className="btn btn-danger ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    {/* Delete */}
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;

// The Deck screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId).
// There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
// The screen includes the deck name (e.g., "React Router") and deck description (e.g., "React Router is a collection of navigational components that compose declaratively in your application").
// The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination, as follows:

// | Button Clicked | Destination |
// | -------------- | ---------------------------------------------------------------------------------------------- |
// | "Edit" | Edit Deck Screen |
// | "Study" | Study screen |
// | "Add Cards" | Add Card screen |
// | "Delete" | Shows a warning message before deleting the deck]( See the "Delete Card Prompt" section below) |

// Each card in the deck:

// is listed on the page under the "Cards" heading.
// shows a question and the answer to the question.
// has an “Edit” button that takes the user to the Edit Card screen when clicked.
// has a “Delete” button that allows that card to be deleted.
