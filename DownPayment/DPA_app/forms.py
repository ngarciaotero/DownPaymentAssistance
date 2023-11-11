from django import forms


class UserInformationForm(forms.Form):
    first_name = forms.CharField(max_length=250)
    last_name = forms.CharField(max_length=250)
    rent_amount = forms.DecimalField(max_digits=10, decimal_places=2)
    county = forms.CharField(max_length=250)
    credit_score = forms.IntegerField()
    liquid_assets = forms.DecimalField(max_digits=10, decimal_places=2)
    household_income = forms.DecimalField(max_digits=10, decimal_places=2)
    household_size = forms.IntegerField()
    is_first_time_buyer = forms.BooleanField(required=False)
    is_three_year_buyer = forms.BooleanField(required=False)
    is_female_head_of_household = forms.BooleanField(required=False, label='Check if you a female head of household')
    is_PEN = forms.BooleanField(required=False, label='Check if you are a public employee, first responder, nurse or educator')