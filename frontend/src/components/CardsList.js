import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
`;

const CardCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  width: 100%;
  scrollbar-width: none; 
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardItem = styled.div`
  flex: 0 0 300px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  margin: 0 10px;
`;

const CardInfo = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #666;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
`;

const PrevButton = styled(NavigationButton)`
  left: 1px;
`;

const NextButton = styled(NavigationButton)`
  right: 1px;
`;

const CardsList = ({ cards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselRef.current) {
      const carouselElement = carouselRef.current;
      const cardWidth = carouselElement.firstChild.offsetWidth + 20;
      carouselElement.scrollLeft = activeIndex * cardWidth;
    }
  }, [activeIndex]);

  const handleCardChange = (index) => {
    setActiveIndex(index);
  };

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const carouselElement = carouselRef.current;
      const cardWidth = carouselElement.firstChild.offsetWidth + 20;
      const scrollAmount = direction === 'prev' ? -cardWidth : cardWidth;
      carouselElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      if (direction === 'prev') {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
      } else {
        setActiveIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
      }
    }
  };

  const handleMouseWheel = (e) => {
    if (carouselRef.current) {
      const carouselElement = carouselRef.current;
      carouselElement.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="container">
    <CardsContainer>
      <h2>Ваши карты</h2>
      <PrevButton onClick={() => handleScroll('prev')}><FaChevronLeft /></PrevButton>
      <NextButton onClick={() => handleScroll('next')}><FaChevronRight /></NextButton>
      <CardCarousel ref={carouselRef} onWheel={handleMouseWheel}>
        {cards.map((card, index) => (
          <CardItem
            key={index}
            onClick={() => handleCardChange(index)}
            style={{
              opacity: index === activeIndex ? 1 : 0.5
            }}
          >
            <h3>{card.cardNumber}</h3>
            <CardInfo>
              <div>Тип: {card.type}</div>
              <div>Баланс: {card.balance} ₽</div>
            </CardInfo>
          </CardItem>
        ))}
      </CardCarousel>
      <CardInfo>
        <div>Номер карты: {cards[activeIndex].cardNumber}</div>
        <div>Тип: {cards[activeIndex].type}</div>
        <div>Баланс: {cards[activeIndex].balance} ₽</div>
      </CardInfo>
    </CardsContainer>
    </div>
  );
};

export default CardsList;
