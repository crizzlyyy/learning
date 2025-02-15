# Tic-Tac-Toe Game

A simple console-based implementation of the classic **Tic-Tac-Toe** game written in Python.

## Features

- **Player vs Player**: Two players can enjoy the game by taking turns.
- **Dynamic Board**: The game dynamically updates and displays the board after each turn.
- **Winning Checks**: The game checks for winning conditions (rows, columns, diagonals) or if the board is full (a draw).
- **Replay Option**: Offers an option to restart the game after it finishes.
- **Robust Input Validation**: Ensures users input valid data (numeric input, within bounds, and non-occupied cells).

---

## How to Run?

To play the game, make sure you have [Python 3.13.1](https://www.python.org/downloads/) installed on your system.

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/tic-tac-toe.git
    ```

2. Navigate to the project folder:

    ```bash
    cd tic-tac-toe
    ```

3. Run the game:

    ```bash
    python aufgaben_tictactoe.py
    ```

---

## How to Play?

1. The game begins by displaying a 3x3 empty grid.
2. Players take turns entering the **row** and **column** numbers (1-3) where they want to make their move.
3. Player `X` always starts first.
4. The game checks for a winner at the end of each turn. A winning condition is met if a player has:
   - Three of their symbols in a **row**.
   - Three of their symbols in a **column**.
   - Three of their symbols in a **diagonal**.
5. If the board is completely filled and no one has three aligned symbols, it's declared a draw.
6. At the end of the game, players can choose to either replay or end the game.

---
