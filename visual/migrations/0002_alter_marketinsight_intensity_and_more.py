# Generated by Django 5.0.4 on 2024-04-06 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('visual', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='marketinsight',
            name='intensity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='marketinsight',
            name='likelihood',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]