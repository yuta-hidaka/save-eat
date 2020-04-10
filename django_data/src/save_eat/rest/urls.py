from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('restaurant/', include('rest.views.restaulant.urls')),
]
