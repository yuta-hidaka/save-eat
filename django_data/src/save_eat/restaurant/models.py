from django.db import models
import uuid
# Create your models here.


# 都道府県


class Prefecture(models.Model):
    prefecture_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# 市区町村
class Municipalities(models.Model):
    municipalities_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# 町名
class Municipalities(models.Model):
    municipalities_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# 口座情報


class BankAccount(models.Model):
    bank_account_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    bank_name = models.CharField(max_length=255)
    account_name = models.CharField(max_length=255)
    account_num = models.CharField(max_length=255)
    account_type = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# street_name
# street_name_id
# name

# bank_account_id
# bank_account
# bank_name
# account_name
# account_num
# account_type


# restaurante_info
# restaurante_info_id
# name
# zip_code
# prefecture
# municipalities
# street_name
# street_num
# bldg
# phone
# commnet
# benefits
