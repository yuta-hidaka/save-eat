from django.contrib import admin
from .models import Prefecture, Municipalities, StreetName, ZipCode, BankAccount, Restaurant
admin.site.register(Prefecture)
admin.site.register(Municipalities)
admin.site.register(StreetName)
admin.site.register(ZipCode)
admin.site.register(BankAccount)
admin.site.register(Restaurant)