# Generated by Django 3.0.5 on 2020-04-11 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='streetname',
            old_name='municipalities_id',
            new_name='street_name_id',
        ),
    ]
