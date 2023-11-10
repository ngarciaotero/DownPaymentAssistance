# DownPaymentAssistance
Get Down Payment Assistance is a web application designed to streamline the journey to home ownership by connecting users to grants, programs, and resources that cover down payments. 


## getting started

### Prerequisites

Before you begin, ensure you have the following requirements:

- Python 3.x
- pip (Python package installer)

Clone the project:

```
git clone https://github.com/ngarciaotero/DownPaymentAssistance.git
```

Navigate to the root directory:

```
cd DownPaymentAssistance
```

 Activate virtual environment:

On macOS and Linux:

```
python3 -m venv venv
source venv/bin/activate
```

On Windows:

```
.\venv\Scripts\activate

```

 Install the requirements:

```
pip install -r requirements.txt
```

To make changes to the database, you will need to navigate to downpayment:

```
cd DownPayment
```

Then run these commands after making any changes to the database:

```
python manage.py makemigrations
python manage.py migrate
```

To add more assistance programs, add the data inside the `populate_db.py` file, run the commands above to make the changes then run:

```
python manage.py populate_programs
```


To start the applicationm run this command:

```
python manage.py runserver
```

View application and form on port `http://127.0.0.1:8000/check_eligibility/`



