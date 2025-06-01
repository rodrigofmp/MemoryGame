import { useEffect, useState } from "react";
import Card from "./Card";

export default function Board() {

  const [cards, setCards] = useState([]);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= 9; i++) {
      numbers.push(i, i);
    }
    const shuffled = shuffle(numbers);
    const initializedCards = shuffled.map((number, idx) => ({
      id: idx + 1,
      number,
      flipped: false,
      match: false
    }));
    setCards(initializedCards);
  }, []);

  const getImagePath = (index) => {
    switch (index) {
        case 1: return 'assets/card-apple.png';
        case 2: return 'assets/card-ball.png';
        case 3: return 'assets/card-car.png';
        case 4: return 'assets/card-fish.png';
        case 5: return 'assets/card-flower.png';
        case 6: return 'assets/card-leaf.png';
        case 7: return 'assets/card-mushroom.png';
        case 8: return 'assets/card-rocket.png';
        case 9: return 'assets/card-star.png';
        default: return 'assets/card-default.png';
    }  
  }

  const handleClick = (card, event) => {
    if (card.flipped) return;

    // Flip the clicked card
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );


    // Check if there are already two flipped cards
    const flippedCards = cards.filter(c => c.flipped && !c.match);
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      
      // If they match, mark them as matched
      if (firstCard.number === secondCard.number) {        
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, match: true }
              : c
          )
        );
        return;
      }

      // If they don't match, flip them back
      if (firstCard.number !== secondCard.number) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.flipped && !c.match ? { ...c, flipped: false } : c
          )
        );
      }
    }
  }

  const getRows = (cards, rowSize) => {
    const rows = [];
    for (let i = 0; i < cards.length; i += rowSize) {
      rows.push(cards.slice(i, i + rowSize));
    }
    return rows;
  };

  return (
    <>
      {getRows(cards, 6).map((row, rowIdx) => (
        <div className="board-row" key={rowIdx}>
          {row.map((card) => (
            <Card
            key={card.id}
            imagePath={getImagePath(card.flipped ? card.number : 0)}
            onCardClick={(event) => handleClick(card, event)}
            />
          ))}
        </div>
      ))}
    </>
  );
}
