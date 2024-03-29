# Generated by Django 3.1.4 on 2020-12-08 16:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.IntegerField(default=0)),
                ('amount', models.IntegerField(default=0)),
                ('price', models.FloatField(default=0)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wallet_adress', models.CharField(max_length=200)),
                ('login', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=25)),
                ('role', models.IntegerField(default=0)),
            ],
        ),
    ]
