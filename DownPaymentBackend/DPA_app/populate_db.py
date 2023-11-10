
from DPA_app.models import Program

# -----------------------GEORGIA DREAM--------------

def add_georgia_dream_homebuyers_program():
    program_name = "Georgia Dream Homebuyers Program"
    down_payment_options = {
        "STANDARD": '10000.00', 
        "PEN": '12500.00',       
        "CHOICE": '12500.00',  
    }

    income_limits_by_area = {
    "Atlanta-Sandy Springs-Roswell, GA HUD Metro FMR Area": {
        "1-2": '86500.00',
        "3+": '99500.00',
    },
    "Jackson County, GA": {
        "1-2": '76000.00',
        "3+": '87500.00',
    },
    "Monroe County, GA HUD Metro FMR Area": {
        "1-2": '74500.00',
        "3+": '86000.00',
    },
    "Gainesville, GA MSA": {
        "1-2": '76000.00',
        "3+": '87500.00',
    },
    "Warner Robins, GA HUD Metro FMR Area": {
        "1-2": '75000.00',
        "3+": '86000.00',
    },
    "Savannah GA MSA": {
        "1-2": '74500.00',
        "3+": '86000.00',
    },
    "Georgia FY 2022 All Remaining Counties": {
        "1-2": '74500.00',
        "3+": '86000.00',
    }
}

    liquid_asset_limit = '20000.00'  
    # cedit score min was not specified
    credit_score_minimum = 0

    # list of counties based on the provided areas
    counties = [
        "Barrow County", "Bartow County", "Carroll County", "Cherokee County", 
        "Clayton County", "Cobb County", "Coweta County", "Dawson County",
        "DeKalb County", "Douglas County", "Fayette County", "Forsyth County", 
        "Fulton County", "Gwinnett County", "Heard County", "Henry County", 
        "Jasper County", "Newton County", "Paulding County", "Pickens County", 
        "Pike County", "Rockdale County", "Spalding County", "Walton County",
        "Jackson County", "Monroe County", "Hall County", "Houston County",
        "Bryan County", "Chatham County", "Effingham County",
    ]

# Check for existing program
    existing_program = Program.objects.filter(name=program_name).first()
    if existing_program:
        print(f"The program '{program_name}' already exists in the database.")
        return

    # Create and save new program instance
    georgia_dream_program = Program(
        name=program_name,
        amount=down_payment_options,
        counties=', '.join(counties),
        income_limits=income_limits_by_area,
        liquid_asset_limit=liquid_asset_limit,
        credit_score_minimum=credit_score_minimum
    )

    georgia_dream_program.save()
    print(f"The program '{program_name}' has been added to the database.")

# Call the function
add_georgia_dream_homebuyers_program()