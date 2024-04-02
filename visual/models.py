from django.db import models
from db_connection import db

# Create your models here.
collection = db['insights']
"""FOR NO SQL"""
document_structure = {
    "end_year": str,  # Optional string field
    "intensity": int,  # Required integer field
    "sector": str,  # Required string field
    "topic": str,  # Required string field
    "insight": str,  # Required string field
    "url": str,  # Optional string field
    "region": str,  # Optional string field
    "start_year": str,  # Optional string field
    "impact": str,  # Optional string field
    "added": str,  # Required string field (assuming date/time format is consistent)
    "published": str,  # Required string field (assuming date/time format is consistent)
    "country": str,  # Required string field
    "relevance": int,  # Required integer field
    "pestle": str,  # Optional string field
    "source": str,  # Required string field
    "title": str,  # Required string field
    "likelihood": int,  # Required integer field
}

"""FOR SQL"""
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