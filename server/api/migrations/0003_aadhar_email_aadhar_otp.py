# Generated by Django 4.0 on 2022-03-26 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_aadhar_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='aadhar',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='aadhar',
            name='otp',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
