from django.contrib import admin
from .models import Prefecture, Municipalities, streetName, zipCode, BankAccount, Restaurante
admin.site.register(Prefecture)
admin.site.register( Municipalities)
admin.site.register(streetName)
admin.site.register(zipCode)
admin.site.register(BankAccount)
admin.site.register(Restaurante)