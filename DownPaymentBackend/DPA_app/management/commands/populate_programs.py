from django.core.management.base import BaseCommand
from DPA_app.populate_db import add_georgia_dream_homebuyers_program

class Command(BaseCommand):
    help = 'Populates the database with program data'

    def handle(self, *args, **options):
        add_georgia_dream_homebuyers_program()
        self.stdout.write(self.style.SUCCESS('Successfully populated database with program data'))
