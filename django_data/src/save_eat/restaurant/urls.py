"""save_eat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views
from django.contrib.auth.decorators import login_required, permission_required
app_name = 'restaurant'
urlpatterns = [
    path('', views.IndexView, name='index'),
    path('search/', views.SerchView, name='search'),
    path('privacyPolicy/', views.PrivacyPolicyView, name='privacy-policy'),
    path('userPolicy/', views.UserPolicyView, name='user-policy'),
    path('register/', views.RegisterView, name='register'),
    path('restaurant/<uuid:restaurant_id>/',
         views.RestaurantDetailView, name='detail'),
    path('restaurant/history/',  views.HistoryView, name='history'),
    path('restaurant/edit/<uuid:id>/',
         login_required(views.RestaurantUpdate.as_view()), name='edit'),
]
