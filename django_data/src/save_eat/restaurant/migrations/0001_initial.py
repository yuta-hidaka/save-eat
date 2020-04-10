# Generated by Django 3.0.5 on 2020-04-09 14:21

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BankAccount',
            fields=[
                ('bank_account_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('bank_name', models.CharField(max_length=255, verbose_name='銀行名')),
                ('branch', models.CharField(max_length=255, verbose_name='支店名')),
                ('account_name', models.CharField(max_length=255, verbose_name='口座人名義')),
                ('account_num', models.CharField(max_length=255, verbose_name='口座番号')),
                ('account_type', models.CharField(max_length=255, verbose_name='口座種別')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'restaurant_bank_account',
            },
        ),
        migrations.CreateModel(
            name='Municipalities',
            fields=[
                ('municipalities_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='市区町村')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'restaurant_municipalities',
            },
        ),
        migrations.CreateModel(
            name='Prefecture',
            fields=[
                ('prefecture_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='都道府県')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'restaurant_prefecture',
            },
        ),
        migrations.CreateModel(
            name='streetName',
            fields=[
                ('municipalities_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='町名')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'restaurant_street_name',
            },
        ),
        migrations.CreateModel(
            name='zipCode',
            fields=[
                ('zip_code_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('zip_code', models.CharField(max_length=255, verbose_name='郵便番号')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'restaurant_zip_code',
            },
        ),
        migrations.CreateModel(
            name='Restaurante',
            fields=[
                ('restaurante_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255, verbose_name='レストラン名')),
                ('street_name', models.CharField(max_length=255, verbose_name='町名')),
                ('street_num', models.CharField(max_length=255, verbose_name='番地')),
                ('bldg', models.CharField(max_length=255, verbose_name='建物名')),
                ('web_url', models.URLField(verbose_name='ウェブサイトURL')),
                ('phone', models.CharField(max_length=255, verbose_name='電話番号')),
                ('email', models.EmailField(max_length=255, verbose_name='メールアドレス')),
                ('commnet', models.CharField(max_length=255, verbose_name='一言コメント')),
                ('benefits', models.CharField(max_length=255, verbose_name='寄付の特典')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('municipalities', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurant.Municipalities', verbose_name='市区町村')),
                ('prefecture', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurant.Prefecture', verbose_name='都道府県')),
                ('zip_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='restaurant.zipCode', verbose_name='郵便番号')),
            ],
            options={
                'db_table': 'restaurant_restaurante',
            },
        ),
    ]
