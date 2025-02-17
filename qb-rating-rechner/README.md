# QB Rating Calculator

The **QB Rating Calculator** is a simple script to calculate the quarterback rating based on user input. It uses standardized formulas to evaluate the performance of a quarterback.

---

## Features

- **User-Friendly Input**: The calculator prompts the user to enter key values such as pass attempts, completions, passing yards, touchdowns, and interceptions.
- **Automatic Calculation**: The quarterback rating is calculated directly based on the inputs.
- **Input Validation**: Only valid numerical inputs are accepted to prevent errors.
- **Graphical User Interface (GUI)**: The application includes a Tkinter-based GUI for a more interactive experience.

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

    ```bash
    python qbrating_tkinter.py
    ```

---

## Example Output

If the user enters the following values:

- **Pass attempts**: 30
- **Completed passes**: 20
- **Passing yards**: 250
- **Passing touchdowns**: 2
- **Interceptions**: 1

The program will display the following result:

```bash
The quarterback rating is 96.25
```

---

## How the Calculation Works

The calculation involves multiple steps:

1. **Completion Percentage**: `(completed passes / pass attempts) * 100`
2. **Yards per Attempt**: `(passing yards / pass attempts)`
3. **Touchdowns per Attempt**: `(touchdowns / pass attempts)`
4. **Interceptions per Attempt**: `(interceptions / pass attempts)`

Using these values, the quarterback rating is calculated based on a standardized formula.
