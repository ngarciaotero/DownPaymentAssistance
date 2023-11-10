from django.shortcuts import render
from .forms import UserInformationForm
from .models import User, Program

def check_eligibility(request):
    if request.method == 'POST':
        form = UserInformationForm(request.POST)
        if form.is_valid():
            temp_user = User(**form.cleaned_data)
            eligible_programs = [program for program in Program.objects.all() if program.is_eligible(temp_user)]
            return render(request, 'eligibility_results.html', {'programs': eligible_programs})
    else:
        form = UserInformationForm()
    
    return render(request, 'check_eligibility.html', {'form': form})
