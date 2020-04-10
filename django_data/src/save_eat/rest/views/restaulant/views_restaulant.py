from rest_framework import generics, renderers, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurant.models import *
from ...serializer.serializer_restaulant import *


# -----------------------------------------------------------------------
class PrefectureList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filter_backends = (filters.SearchFilter,)
    queryset = Prefecture.objects.all()
    serializer_class = PrefectureSerializer


# class PrefectureDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Prefecture.objects.all()
#     serializer_class = PrefectureSerializer


# -----------------------------------------------------------------------
class MunicipalitiesList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filter_backends = (filters.SearchFilter,)
    queryset = Municipalities.objects.all()
    serializer_class = MunicipalitiesSerializer


# class MunicipalitiesDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Municipalities.objects.all()
#     serializer_class = MunicipalitiesSerializer


# -----------------------------------------------------------------------
class StreetNameList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filter_backends = (filters.SearchFilter,)
    queryset = StreetName.objects.all()
    serializer_class = StreetNameSerializer


# class StreetNameDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = StreetName.objects.all()
#     serializer_class = StreetNameSerializer


# -----------------------------------------------------------------------
class ZipCodeList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filter_backends = (filters.SearchFilter,)
    queryset = ZipCode.objects.all()
    serializer_class = ZipCodeSerializer


# class ZipCodeDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = ZipCode.objects.all()
#     serializer_class = ZipCodeSerializer


# -----------------------------------------------------------------------
class BankAccountList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filter_backends = (filters.SearchFilter,)
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer


# class BankAccountDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = BankAccount.objects.all()
#     serializer_class = BankAccountSerializer


# -----------------------------------------------------------------------
class RestaurantList(generics.ListCreateAPIView):
    search_fields = [
        'name', 'owner', 'zip_code__prefecture__name', 'zip_code__municipalities__name',
        'comment', 'benefits', 'email'
    ]
    filter_fields = ['name', 'owner']
    filter_backends = (filters.SearchFilter,)
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


# class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Restaurant.objects.all()
#     serializer_class = RestaurantSerializer
