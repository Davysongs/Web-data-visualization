from django.db import models

# Create your models here.
class MarketInsight(models.Model):
  title = models.CharField(max_length=255)
  sector = models.CharField(max_length=255)
  topic = models.CharField(max_length=255)
  insight = models.TextField()
  url = models.URLField(blank=True)  # Allow empty URL
  region = models.CharField(max_length=255)
  country = models.CharField(max_length=255)
  impact = models.CharField(max_length=255, blank=True)  # Allow empty impact
  pestle = models.CharField(max_length=255, blank=True)  # Allow empty pestle
  source = models.CharField(max_length=255)
  likelihood = models.IntegerField()
  relevance = models.IntegerField()
  intensity = models.IntegerField()

  # Dates with human-readable format
  published = models.DateTimeField(blank=True)  # Allow empty published date
  added = models.DateTimeField(blank=True)  # Allow empty added date

  def __str__(self):
    return self.title