from django.contrib import admin
from .models import Prefecture, Municipalities, StreetName, Address, BankAccount, Restaurant
admin.site.register(Prefecture)
admin.site.register(Municipalities)
admin.site.register(StreetName)
admin.site.register(Address)
admin.site.register(BankAccount)
admin.site.register(Restaurant)


class RestaurantAdmin(admin.ModelAdmin):
    list_display = '__all__'
    actions = None

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'user', None) is None:
            obj.author = request.user
        obj.save()
