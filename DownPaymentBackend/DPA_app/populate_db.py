
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



# -----------------------FULTON HOMEOWNERSHIP PROGRAM--------------
def add_fulton_homeownership_program():
    program_name = "Fulton Homeownership Program"
    down_payment_options = {
        "STANDARD": '10000.00',  # No PEN
    }
    
    income_limits_by_area = {
        "1": '54000.00',
        "2": '61700.00',
        "3": '69400.00',
        "4": '77100.00',
        "5": '83300.00',
        "6": '89450.00',
        "7": '95650.00',
        "8": '101800.00',
    }
    
    counties = ["Fulton County"]

    # check for existing program
    existing_program = Program.objects.filter(name=program_name).first()
    if existing_program:
        print(f"The program '{program_name}' already exists in the database.")
        return

    # create and save new program instance
    fulton_hop_program = Program(
        name=program_name,
        amount=down_payment_options,
        counties=', '.join(counties),
        income_limits=income_limits_by_area,
        liquid_asset_limit='0.00',  # no liquid asset limit specified
        credit_score_minimum=0  # no credit score minimum specified
    )

    fulton_hop_program.save()
    print(f"The program '{program_name}' has been added to the database.")


# -----------------------VINE CITY RENAISSANCE INITIATIVE--------------
def add_vine_city_renaissance_initiative():
    program_name = "Vine City Renaissance Initiative"
    down_payment_options = {
        "STANDARD": '10000.00',  # No PEN
    }
    
    income_limits_by_size = {
        "1": '100100.00',
        "2": '114380.00',
        "3": '128660.00',
        "4": '142940.00',
        "5": '154420.00',
    }
    
    counties = ["Vine City"]  

    # check for existing program in db
    existing_program = Program.objects.filter(name=program_name).first()
    if existing_program:
        print(f"The program '{program_name}' already exists in the database.")
        return

    # create and save new program instance
    vcri_program = Program(
        name=program_name,
        amount=down_payment_options,
        counties=', '.join(counties),
        income_limits=income_limits_by_size,
        liquid_asset_limit='25000.00', 
        credit_score_minimum=0  
    )

    vcri_program.save()
    print(f"The program '{program_name}' has been added to the database.")


add_georgia_dream_homebuyers_program()
add_fulton_homeownership_program()
add_vine_city_renaissance_initiative()


