# DownPaymentAssistance
Get Down Payment Assistance is a web application designed to streamline the journey to home ownership by connecting users to grants, programs, and resources that cover down payments. 


## Backend: getting started

### Prerequisites

Before you begin, ensure you have the following requirements:

- Python 3.x
- pip (Python package installer)

### Activate virtual environment:

On macOS and Linux:

```
python3 -m venv venv
source venv/bin/activate
```

On Windows:

```
.\venv\Scripts\activate

```

### Navigate to project director:

```
cd DownPayment
```

### Install the requirements:

```
pip install -r requirements.txt
```

To make changes to the database, run these commands:


```
python manage.py makemigrations
python manage.py migrate
```

To add more assistance programs, add the hardcoded data inside the `populate_db.py` file, run the commands above to make the changes then run:

```
python manage.py populate_programs
```


To start the applicationm run this command:

```
python manage.py runserver
```

View application on port `http://127.0.0.1:8000/check_eligibility/`



