from rest_framework import generics, renderers, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurant.models import *
from ...serializer.serializer_restaulant import *
from django_filters.rest_framework import DjangoFilterBackend

# -----------------------------------------------------------------------


class PrefectureList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filterset_fields = '__all__'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = Prefecture.objects.all()
    serializer_class = PrefectureSerializer


# class PrefectureDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Prefecture.objects.all()
#     serializer_class = PrefectureSerializer


# -----------------------------------------------------------------------
class MunicipalitiesList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filterset_fields = '__all__'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = Municipalities.objects.all()
    serializer_class = MunicipalitiesSerializer


# class MunicipalitiesDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Municipalities.objects.all()
#     serializer_class = MunicipalitiesSerializer


# -----------------------------------------------------------------------
class StreetNameList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filterset_fields = '__all__'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = StreetName.objects.all()
    serializer_class = StreetNameSerializer


# class StreetNameDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = StreetName.objects.all()
#     serializer_class = StreetNameSerializer


# -----------------------------------------------------------------------
class AddressList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filterset_fields = '__all__'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


# class AddressDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Address.objects.all()
#     serializer_class = AddressSerializer


# -----------------------------------------------------------------------
class BankAccountList(generics.ListCreateAPIView):
    search_fields = '__all__'
    filter_fields = '__all__'
    filterset_fields = '__all__'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer


# class BankAccountDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = BankAccount.objects.all()
#     serializer_class = BankAccountSerializer


# -----------------------------------------------------------------------
class RestaurantList(generics.ListCreateAPIView):
    search_fields = [
        'name', 'owner', 'address__prefecture__name', 'address__municipalities__name',
        'comment', 'benefits', 'email'
    ]
    filterset_fields = [
        'name', 'owner'
    ]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class RestaurantListReadOnly(generics.ListCreateAPIView):
    search_fields = [
        'name', 'owner', 'address__prefecture__name', 'address__municipalities__name',
        'comment', 'benefits', 'email'
    ]
    filterset_fields = [
        'name', 'owner', 'address__prefecture'
    ]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantReadOnlySerializer


# class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Restaurant.objects.all()
#     serializer_class = RestaurantSerializer
