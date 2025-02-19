# QB Rating Calculator

A simple calculator with a GUI (Tkinter) that calculates the quarterback rating using defined formulas. It was my first Python project. Was used to practice methods and Tkinter. 

---

## How to Run the Project

### Prerequisites

- Python 3.13.1 or higher

### Steps

1. Clone the project:

    ```bash
    git clone https://github.com/your-username/qb-rating-calculator.git
    cd qb-rating-calculator
    ```

2. Run the script:

    ```bash
    python qbrating.py
    ```

3. Enter the required values when prompted:
    - Pass attempts
    - Completed passes
    - Passing yards
    - Passing touchdowns
    - Interceptions

4. The program will calculate and display the quarterback rating.

### GUI Mode

If you prefer using the graphical interface, run:

    
    python qbrating_tkinter.py
    

---

## How the Calculation Works

The calculation involves multiple steps:

1. **Completion Percentage**: `(completed passes / pass attempts) * 100`
2. **Yards per Attempt**: `(passing yards / pass attempts)`
3. **Touchdowns per Attempt**: `(touchdowns / pass attempts)`
4. **Interceptions per Attempt**: `(interceptions / pass attempts)`

Using these values, the quarterback rating is calculated based on a defined formula.
