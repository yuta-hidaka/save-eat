# Generated by Django 3.0.5 on 2020-04-12 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_auto_20200412_1248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='bldg',
            field=models.CharField(blank=True, default='', max_length=256, null=True, verbose_name='建物名'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='email',
            field=models.EmailField(blank=True, default='', max_length=256, null=True, verbose_name='メールアドレス'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=256, null=True, verbose_name='電話番号'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='phot',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='media', verbose_name='お店の写真'),
        ),
        migrations.AlterField(
            model_name='restaurant',
            name='web_url',
            field=models.URLField(blank=True, default='', null=True, verbose_name='ウェブサイトURL'),
        ),
    ]
