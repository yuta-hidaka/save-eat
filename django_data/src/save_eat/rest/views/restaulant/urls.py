from django.contrib import admin
from django.urls import path, include
from .views_restaulant import *

urlpatterns = [
    # ---------------------------------------------------------
    path(
        '',
        RestaurantList.as_view(),
        name='restaulant-list'
    ),
    # path(
    #     '<uuid:pk>/',
    #     RestaurantDetail.as_view(),
    #     name='restaulant-list'
    # ),
    # ---------------------------------------------------------
    path(
        'prefecture/',
        PrefectureList.as_view(),
        name='prefecture-list'
    ),
    # path(
    #     'prefecture/<uuid:pk>/',
    #     PrefectureDetail.as_view(),
    #     name='prefecture-detail'
    # ),
    # ---------------------------------------------------------
    path(
        'municipalities/',
        MunicipalitiesList.as_view(),
        name='municipalities-list'
    ),
    # path(
    #     'Municipalities/<uuid:pk>/',
    #     MunicipalitiesDetail.as_view(),
    #     name='municipalities-detail'
    # ),
    # ---------------------------------------------------------
    path(
        'street-name/',
        StreetNameList.as_view(),
        name='street-name-list'
    ),
    # path(
    #     'street-name/<uuid:pk>/',
    #     StreetNameDetail.as_view(),
    #     name='street-name-detail'
    # ),
    # ---------------------------------------------------------
    path(
        'zip-code/',
        ZipCodeList.as_view(),
        name='zip-code-list'
    ),
    # path(
    #     'zip-code/<uuid:pk>/',
    #     ZipCodeDetail.as_view(),
    #     name='zip-code-detail'
    # ),
    # ---------------------------------------------------------
    path(
        'bank-account/',
        BankAccountList.as_view(),
        name='bank-account-list'
    ),
    # path(
    #     'bank-account/<uuid:pk>/',
    #     BankAccountList.as_view(),
    #     name='bank-account-detail'
    # ),
]
