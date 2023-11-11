
from django.contrib import admin
from django.urls import path
from DPA_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('check_eligibility/', views.check_eligibility, name='check_eligibility'),
    path('', views.home, name='home'),
]
