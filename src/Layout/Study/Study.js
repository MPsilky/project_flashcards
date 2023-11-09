import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { readDeck } from '../../utils/api/index.js'
import CardList from './CardList'


function Study() {
    const [deck, setDeck] = useState({})
    const {deckId} = useParams()
    
    useEffect(() => { 
        const findDeck = async () => { 
            const currDeck = await readDeck(deckId)
            setDeck(()=> currDeck)    
        }
        findDeck()
    }, [deckId])
    

    if (Object.keys(deck).length) {
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

                        <li className="breadcrumb-item active" aria-current="page">
                            Study
                        </li>
                    </ol>
                </nav>
                
                {/* title */}
                <div>
                    <h1>{deck.name}: Study</h1>
                </div>

                {/* card list */}
                <CardList cards={deck.cards}/>
            </div>
        )

    } else {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">
                   Loading...
                </span>
            </div>
        ) 
    }
}

export default Study