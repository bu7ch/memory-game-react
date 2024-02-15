/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MemoryGame from "../components/MemoryGame";
import { DELAY_DURATION, NUMBER_OF_CARDS } from "../constants";

describe("MemoryGame", () => {
  it("renders the game board", () => {
    render(<MemoryGame />);
    const gameBoard = screen.getByTestId("game-board");
    expect(gameBoard).toBeInTheDocument();
  });

  it("flips the card when clicked", () => {
    render(<MemoryGame />);
    const card = screen.getByTestId("card-1");
    fireEvent.click(card);
    expect(card).toHaveClass("flipped");
  });
  it('renders the game board with the correct number of cards', async () => {
    render(<MemoryGame />);
    const cards = await screen.findAllByTestId(/^card-/); 
    expect(cards.length).toBe(NUMBER_OF_CARDS);
  });

  it('flips the card when clicked', async () => {
    render(<MemoryGame />);
    const card = await screen.findByTestId('card-0'); 
    fireEvent.click(card);
    await waitFor(() => {
      expect(card).toHaveClass('flipped');
    });
  });
  it('flips the cards back after a short delay if two non-identical cards are clicked', async () => {
    render(<MemoryGame />);
  
    const card1 = await screen.findByTestId('card-0');
    const card2 = await screen.findByTestId('card-1');
    
    fireEvent.click(card1);
    fireEvent.click(card2);
  
    await waitFor(() => {
      expect(card1).toHaveClass('flipped');
      expect(card2).toHaveClass('flipped');
    });
  
    await waitFor(() => {
      expect(card1).not.toHaveClass('flipped');
      expect(card2).not.toHaveClass('flipped');
    }, { timeout: DELAY_DURATION });
  });
});
