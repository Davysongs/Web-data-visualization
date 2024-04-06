# Generated by Django 5.0.4 on 2024-04-06 03:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MarketInsight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('end_year', models.CharField(blank=True, max_length=300)),
                ('intensity', models.IntegerField()),
                ('sector', models.CharField(max_length=300)),
                ('topic', models.CharField(max_length=300)),
                ('insight', models.TextField()),
                ('url', models.URLField(blank=True, max_length=2083)),
                ('region', models.CharField(blank=True, max_length=300)),
                ('start_year', models.CharField(blank=True, max_length=300)),
                ('impact', models.CharField(blank=True, max_length=300)),
                ('added', models.CharField(max_length=300)),
                ('published', models.CharField(max_length=300)),
                ('country', models.CharField(max_length=300)),
                ('relevance', models.IntegerField()),
                ('pestle', models.CharField(blank=True, max_length=300)),
                ('source', models.CharField(max_length=300)),
                ('title', models.TextField()),
                ('likelihood', models.IntegerField()),
            ],
        ),
    ]
