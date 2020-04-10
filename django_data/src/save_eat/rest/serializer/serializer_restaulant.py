from django.db import models
import uuid
from restaurant.models import *
from rest_framework import serializers


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


class ZipCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZipCode
        fields = '__all__'


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):
    bank_account = BankAccountSerializer(read_only=True)
    zip_code = ZipCodeSerializer(read_only=True)
    prefecture = PrefectureSerializer(read_only=True)
    municipalities = MunicipalitiesSerializer(read_only=True)
    street_name = StreetNameSerializer(read_only=True)

    class Meta:
        model = Restaurant
        fields = '__all__'
