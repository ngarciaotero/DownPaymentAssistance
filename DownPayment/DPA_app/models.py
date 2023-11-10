from django.db import models
from decimal import Decimal
from django.core.validators import MaxValueValidator


# user model:
class User(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    rent_amount = models.DecimalField(max_digits=10, decimal_places=2)
    county = models.CharField(max_length=250)
    credit_score = models.IntegerField(validators=[MaxValueValidator(850)])
    liquid_assets = models.DecimalField(max_digits=10, decimal_places=2)
    household_income = models.DecimalField(max_digits=10, decimal_places=2)
    household_size = models.IntegerField()
    is_first_time_buyer = models.BooleanField(default=False)
    is_three_year_buyer = models.BooleanField(default=False)
    is_female_head_of_household = models.BooleanField(default=False)
    is_PEN = models.BooleanField(default=False)


# program class to move data to sqlite and fetch with django orm
class Program(models.Model):
    name = models.CharField(max_length=250)
    amount = models.JSONField(default=dict)
    counties = models.TextField(help_text='List of counties where program is available')
    income_limits = models.JSONField(default=dict)
    liquid_asset_limit = models.DecimalField(max_digits=10, decimal_places=2)
    credit_score_minimum = models.IntegerField()

    # get amount based on PEN status
    def get_amount_for_household(self, user):
        # get base amount depending on household size
        base_amount = self.amount.get(str(user.household_size), Decimal('0.00'))

        # if the user is PEN check if there's a specific PEN amount and return it
        if user.is_PEN:
            pen_amount = self.amount.get('PEN').get(str(user.household_size), Decimal('0.00'))
            return pen_amount if pen_amount else base_amount

        # return the base amount if the user is not PEN or there's no specific PEN amount
        return base_amount

    def is_eligible(self, user):
        #check if user county is in program county list:
        if user.county not in [county.strip() for county in self.counties.split(',')]:
            return False
        
        #check if user meets income requirements:
        income_limit = self.income_limits.get(str(user.household_size))
        if user.household_income > Decimal(income_limit):
            return False
        
        # check if user meets assets requirements:
        if user.liquid_assets > self.liquid_asset_limit:
            return False
        
        # check user's credit score:
        if user.credit_score < self.credit_score_minimum:
            return False
        
        # check if user's first house or hasnt bought in 3 years:
        if not user.is_first_time_buyer or user.is_three_year_buyer:
            return False
        
        # return ture if they pass all critereas:
        return True


    def __str__(self):
        return self.name
    

