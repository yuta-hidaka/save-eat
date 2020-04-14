from django.db import models
import uuid
from restaurant.models import *
from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin


class PrefectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prefecture
        fields = '__all__'


class MunicipalitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Municipalities
        fields = '__all__'


class StreetNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreetName
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    street_name = StreetNameSerializer()
    municipalities = MunicipalitiesSerializer()
    prefecture = PrefectureSerializer()

    class Meta:
        model = Address
        fields = '__all__'


class RestaurantSerializer(QueryFieldsMixin, serializers.ModelSerializer):

    class Meta:
        model = Restaurant
        fields = '__all__'


class RestaurantReadOnlySerializer(QueryFieldsMixin, serializers.ModelSerializer):
    address = AddressSerializer()

    class Meta:
        model = Restaurant
        fields = '__all__'
