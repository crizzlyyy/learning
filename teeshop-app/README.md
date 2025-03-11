# Teeshop App

Like the students app only further developed with several own apps and different overviews in the dashboard.

---

## How to Set Up the Project

To set up the **Teeshop App** locally, follow these steps:

### Prerequisites

Ensure the following are installed:
- **Python 3.13.1** (or any compatible version)
- **Django** (latest compatible release)
- **pip** (Python package installer)
- **Database** (SQLite by default)
- **Web browser** (for accessing the frontend)

---

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/students-app.git
    cd teeshop-app
    ```

2. Set up a virtual environment (optional, but recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install the dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Apply database migrations to set up the database schema:

    ```bash
    python manage.py migrate
    ```

5. Start the Django development server:

    ```bash
    python manage.py runserver
    ```

6. Access the application **Teeshop App** at:

    ```
    http://127.0.0.1:8000/
    ```

### Frontend Setup

The frontend is built using HTML, CSS, and JavaScript. It provides a responsive interface for managing student records and includes a login system.

### Steps to Run the Frontend

1. Navigate to the frontend directory in the project:

    ```bash
    cd frontend
    ```

2. Open index.html in your web browser.

3. The login system will prompt users to authenticate before accessing student management features (for testing: username: German pw: German)

---

## App Structure

The project structure follows Django best practices:

Teeshop-App/
│── backend/
│   │── manage.py
│   │── db.sqlite3
│   │── requirements.txt
│   │── teeshop/  
│   │   │── __init__.py
│   │   │── asgi.py
│   │   │── settings.py
│   │   │── urls.py
│   │   │── wsgi.py
│   │── bestellungen/
│   │   │── __init__.py
│   │   │── models.py
│   │   │── views.py
│   │   │── urls.py
│   │   │── admin.py
│   │   │── serializers.py
│   │   │── migrations/
│   │   │   │── __init__.py
│   │   │   │── 0001_initial.py
│   │── bilanzdaten/
│   │   │── (wie Bestellungen)
│   │── kunden/
│   │   │── (wie Bestellungen)
│   │── lagerbestand/
│   │   │── (wie Bestellungen)
│   │── mitarbeiter/
│   │   │── (wie Bestellungen)
│   │── produktkatalog/
│   │   │── (wie Bestellungen)
│
│── frontend/
│   │── index.html
│   │── index.js
│   │── styles.css
│   │── bestellungen/
│   │   │── bestellungen.html
│   │   │── bestellungen.js
│   │   │── bestellungen.css
│   │   │── new/
│   │   │   │── new.html
│   │   │   │── new.js
│   │   │── edit/
│   │   │   │── edit.html
│   │   │   │── edit.js
│   │── bilanzdaten/
│   │   │── bilanzdaten.html
│   │   │── bilanzdaten.js
│   │   │── bilanzdaten.css
│   │   │── new/
│   │   │   │── new.html
│   │   │   │── new.js
│   │   │── edit/
│   │   │   │── edit.html
│   │   │   │── edit.js
│   │── dashboard/
│   │   │── dashboard.html
│   │   │── dashboard.js
│   │   │── dashboard.css
│   │── kunden/
│   │   │── (wie Bestellungen)
│   │── lagerbestand/
│   │   │── (wie Bestellungen)
│   │── mitarbeiter/
│   │   │── (wie Bestellungen)
│   │── produktkatalog/
│   │   │── (wie Bestellungen)

