from rest_framework import generics, renderers, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from restaurant.models import *
from ...serializer.serializer_restaulant import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from ...permissions import IsOwnerOrReadOnly

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
class RestaurantList(generics.ListCreateAPIView):
    search_fields = [
        'name', 'owner', 'address__prefecture__name', 'address__municipalities__name',
        'comment', 'benefits', 'email', 'limit_to'
    ]
    # filterset_fields = [
    filter_fields = [
        'name', 'owner', 'address__prefecture', 'user', 'limit_to'
    ]
    ordering_fields = [
        'name', 'owner', 'address__prefecture', 'user', 'created_at', 'limit_to'
    ]
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    ordering = ['-created_at']
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class RestaurantListReadOnly(generics.ListCreateAPIView):
    search_fields = [
        'name', 'owner', 'address__prefecture__name', 'address__municipalities__name',
        'comment', 'benefits', 'email', 'limit_to'
    ]
    # filterset_fields = [
    filter_fields = [

        'name', 'owner', 'address__prefecture', 'user', 'restaurant_id', 'limit_to'
    ]
    ordering_fields = [
        'name', 'owner', 'address__prefecture', 'user', 'created_at', 'limit_to'
    ]
    filter_backends = [
        DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter
    ]
    filter_fields = {
        'limit_to': ['gte', 'lt', 'contains'],
    }
    ordering = ['-created_at']
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantReadOnlySerializer


class RestaurantDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly
    ]
