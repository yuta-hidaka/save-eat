from django.db import models
import uuid
from users.models import CustomUser
from datetime import datetime
# Create your models here.


# 都道府県
class Prefecture(models.Model):
    prefecture_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        unique=True,
        max_length=50,
        verbose_name='都道府県'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = 'restaurant_prefecture'
        verbose_name_plural = '都道府県'

    def __str__(self):
        return self.name


# 市区町村
class Municipalities(models.Model):
    municipalities_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        unique=True,
        max_length=100,
        verbose_name='市区町村'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = 'restaurant_municipalities'
        verbose_name_plural = '市区町村'

    def __str__(self):
        return self.name


# 町名
class StreetName(models.Model):
    street_name_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        unique=True,
        max_length=100,
        verbose_name='町名'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = 'restaurant_street_name'
        verbose_name_plural = '町名'

    def __str__(self):
        return self.name


# 住所(町名まで)
class Address(models.Model):
    address_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    zip_code = models.CharField(
        unique=True,
        max_length=100,
        verbose_name='郵便番号'
    )
    prefecture = models.ForeignKey(
        Prefecture,
        default=None,
        on_delete=models.CASCADE,
        verbose_name='都道府県'
    )
    municipalities = models.ForeignKey(
        Municipalities,
        default=None,
        on_delete=models.CASCADE,
        verbose_name='市区町村'
    )
    street_name = models.ForeignKey(
        StreetName,
        default=None,
        on_delete=models.CASCADE,
        verbose_name='町名'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = 'restaurant_zip_code'
        verbose_name_plural = '郵便番号'

    def __str__(self):
        return self.zip_code

# 店舗情報


class Restaurant(models.Model):
    restaurant_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    user = models.ForeignKey(
        CustomUser,
        editable=False,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        verbose_name='登録ユーザー名<必須>)'
    )
    name = models.CharField(
        max_length=100,
        verbose_name='お店の名前<必須>'
    )
    owner = models.CharField(
        default='',
        max_length=100,
        verbose_name='オーナ名<必須>'
    )
    address = models.ForeignKey(
        Address,
        default=None,
        on_delete=models.CASCADE,
        verbose_name='住所(町名まで)<必須>'
    )
    street_num = models.CharField(
        default='',
        max_length=256,
        verbose_name='番地<必須>'
    )
    bldg = models.CharField(
        default='',
        max_length=256,
        null=True,
        blank=True,
        verbose_name='建物名'
    )
    web_url = models.URLField(
        default='',
        null=True,
        blank=True,
        verbose_name='ウェブサイトURL'
    )
    phone = models.CharField(
        default='',
        max_length=256,
        null=True,
        blank=True,
        verbose_name='電話番号<必須>'
    )
    email = models.EmailField(
        default='',
        max_length=256,
        verbose_name='メールアドレス'
    )
    comment = models.TextField(
        default='',
        max_length=500,
        verbose_name='お店からのコメント<必須>'
    )
    benefits = models.TextField(
        default='',
        max_length=500,
        verbose_name='支援の特典'
    )
    phot = models.ImageField(
        upload_to='media',
        default=None,
        null=True,
        blank=True,
        verbose_name='お店の写真'
    )
    bank_name = models.CharField(
        default='',
        max_length=256,
        verbose_name='銀行名<必須>'
    )
    branch = models.CharField(
        default='',
        max_length=256,
        verbose_name='支店名<必須>'
    )
    account_name = models.CharField(
        default='',
        max_length=256,
        verbose_name='口座人名義<必須>'
    )
    account_num = models.CharField(
        default='',
        max_length=256,
        verbose_name='口座番号<必須>'
    )
    account_type = models.CharField(
        default='',
        max_length=256,
        verbose_name='口座種別<必須>'
    )
    limit_to = models.DateField(
        default=datetime.now,
        verbose_name='支援受付期限<必須>'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = 'restaurant_restaurant'
        verbose_name_plural = '店舗情報'
        unique_together = [['name', 'owner']]

    def __str__(self):
        return self.name
