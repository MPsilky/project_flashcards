import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { updateCard, readDeck, readCard } from '../../utils/api/index.js'
import CardForm from "./CardForm.js"

function EditCard({updateDecks}) {
    const [deck, setDeck] = useState([])
    const [card, editCard] = useState({front: "", back: "", deckId: ""})
    const {deckId, cardId} = useParams()
    const history = useHistory()


    //use this 'useEffect()' to change the initialized 'card' to 'editCard' state. 
    // readCard() from utils/api/index.js retrieves card given the id.
    useEffect(() => {
        // const abortController = window.AbortController;
        const abortController = new AbortController()
        const cardInfo = async () => {
            const response = await readCard(cardId, abortController.signal)
            editCard(() => response)
            //console.log(response.front)
        }
        cardInfo()
        return () => abortController.abort()
    }, [cardId])


    useEffect(() => {
        // const abortController = window.AbortController;
        const abortController = new AbortController()

        const deckInfo = async () => {
            const response = await readDeck(deckId, abortController.signal)
            setDeck(() => response)
        }

        deckInfo()
        return () => abortController.abort()
    }, [deckId])


    const changeForm = ({ target }) => {
        editCard({...card, [target.name]: target.value})
    }
    

    const submitForm = async (event) => {
        event.preventDefault()
        await updateCard(card)
        history.push(`/decks/${deck.id}`)
        updateDecks(1)
    }
    

    return (
        <div className="col-9 mx-auto">

            {/* navigation bar */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        
                        {/* link to home page */}
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 20 20">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                            </svg>
                            Home
                        </Link>
                    </li>

                    {/* deck name */}
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>

                    {/* edit card */}
                    <li className="breadcrumb-item">
                        Edit Card {cardId}
                    </li>
                </ol>

            </nav>

            <div className="row pl-3 pb-2">
                <h1>Edit Card</h1>
            </div>
            <CardForm 
                submitForm={submitForm} 
                changeForm={changeForm} 
                card={card} 
                deckId={deckId}
            />
        </div>
    )
}

export default EditCard
                