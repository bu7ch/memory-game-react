import React, { useState, useEffect } from 'react';
// import './MemoryGame.css';
import { DELAY_DURATION, NUMBER_OF_CARDS } from '../constants';


const MemoryGame = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || matchedPairs.includes(cardId)) {
      return;
    }
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, cardId]);
  };

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId);
  };

  const isCardMatched = (cardId) => {
    return matchedPairs.includes(cardId);
  };

  const resetFlippedCards = () => {
    setTimeout(() => {
      setFlippedCards([]);
    }, DELAY_DURATION);
  };

  const checkForMatch = () => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      if (card1 !== card2) {
        resetFlippedCards();
      } else {
        if (!matchedPairs.includes(card1)) {
          setMatchedPairs((prevMatchedPairs) => [...prevMatchedPairs, card1]);
        }
      }
    }
  };

  useEffect(() => {
    checkForMatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards]);

  return (
    <div className="memory-game" data-testid="game-board">
      <div className="cards-container">
        {[...Array(NUMBER_OF_CARDS).keys()].map((index) => (
          <div
            key={index}
            className={`card ${isCardFlipped(index) ? 'flipped' : ''} ${isCardMatched(index) ? 'matched' : ''}`}
            onClick={() => handleCardClick(index)}
            data-testid={`card-${index}`}
          >
            <div className="card-back" /> {/* Dos de carte */}
            <div className="card-front">{index}</div> {/* Face de la carte */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;