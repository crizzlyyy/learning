# Students App

A Django Rested API with a frontend, which is protected by a login. In the frontend dashboard, the list can be expanded and individual posts can be edited or deleted. My first steps with a framework and in frontend. 

---

## How to Set Up the Project

To set up the **Students App** locally, follow these steps:

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
    cd students-app
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

6. Access the application **Students App** at:

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

3. The login system will prompt users to authenticate before accessing student management features (for testing: username: mucki pw: mucki)

4. Once logged in, users can create, edit, and delete student records through the web interface.

---

## App Structure

The project structure follows Django best practices:

students-app/
├── manage.py
├── students_app/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── templates/
│   │   └── students_app/
│   │       ├── base.html
│   │       ├── student_list.html
│   │       ├── student_detail.html
│   │       ├── student_form.html
│   ├── static/
│   │   └── students_app/
│   │       ├── css/
│   │       ├── js/
│   │       └── images/
│   └── migrations/
│       ├── __init__.py
│       └── [Migration files]
├── requirements.txt
├── db.sqlite3
└── README.md


