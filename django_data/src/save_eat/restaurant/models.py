from django.db import models
import uuid
# Create your models here.


# 都道府県
class Prefecture(models.Model):
    prefecture_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        default='',
        max_length=256,
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
        default='',
        max_length=256,
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
    municipalities_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        default='',
        max_length=256,
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


# 郵便番号
class ZipCode(models.Model):
    zip_code_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    zip_code = models.CharField(
        default='',
        max_length=256,
        verbose_name='郵便番号'
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


# 口座情報
class BankAccount(models.Model):
    bank_account_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    bank_name = models.CharField(
        default='',
        max_length=256,
        verbose_name='銀行名'
    )
    branch = models.CharField(
        default='',
        max_length=256,
        verbose_name='支店名'
    )
    account_name = models.CharField(
        default='',
        max_length=256,
        verbose_name='口座人名義'
    )
    account_num = models.CharField(
        default='',
        max_length=256,
        verbose_name='口座番号'
    )
    account_type = models.CharField(
        default='',
        max_length=256,
        verbose_name='口座種別'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = 'restaurant_bank_account'
        verbose_name_plural = '口座情報'

    def __str__(self):
        return self.account_name


# 店舗情報
class Restaurant(models.Model):
    restaurant_id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        max_length=256,
        verbose_name='レストラン名'
    )
    owner = models.CharField(
        default='',
        max_length=256,
        verbose_name='オーナ名'
    )
    zip_code = models.ForeignKey(
        ZipCode,
        on_delete=models.CASCADE,
        verbose_name='郵便番号'
    )
    prefecture = models.ForeignKey(
        Prefecture,
        on_delete=models.CASCADE,
        verbose_name='都道府県'
    )
    municipalities = models.ForeignKey(
        Municipalities,
        on_delete=models.CASCADE,
        verbose_name='市区町村'
    )
    street_name = models.ForeignKey(
        StreetName,
        on_delete=models.CASCADE,
        verbose_name='町名'
    )
    street_num = models.CharField(
        default='',
        max_length=256,
        verbose_name='番地'
    )
    bldg = models.CharField(
        default='',
        max_length=256,
        verbose_name='建物名'
    )
    web_url = models.URLField(
        default='',
        verbose_name='ウェブサイトURL'
    )
    phone = models.CharField(
        default='',
        max_length=256,
        verbose_name='電話番号'
    )
    email = models.EmailField(
        default='',
        max_length=256,
        verbose_name='メールアドレス'
    )
    commnet = models.TextField(
        default='',
        max_length=500,
        verbose_name='お店からのコメント'
    )
    benefits = models.TextField(
        default='',
        max_length=500,
        verbose_name='寄付の特典'
    )
    phot = models.ImageField(
        upload_to='media',
        default=None,
        verbose_name='お店の写真'
    )
    bank_account = models.ForeignKey(
        BankAccount,
        default=None,
        on_delete=models.CASCADE,
        verbose_name='銀行口座'
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

    def __str__(self):
        return self.name
