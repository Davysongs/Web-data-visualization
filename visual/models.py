from django.db import models

class MarketInsight(models.Model):
  end_year = models.CharField(max_length=300, blank=True)
  intensity = models.IntegerField(null=True, blank=True)
  sector = models.CharField(max_length=300)
  topic = models.CharField(max_length=300)
  insight = models.TextField()
  url = models.URLField(max_length=2083, blank=True)  
  region = models.CharField(max_length=300, blank=True)
  start_year = models.CharField(max_length=300, blank=True)
  impact = models.CharField(max_length=300, blank=True)
  added = models.CharField(max_length=300)
  published = models.CharField(max_length=300)
  country = models.CharField(max_length=300)
  relevance = models.IntegerField()
  pestle = models.CharField(max_length=300, blank=True)
  source = models.CharField(max_length=300)
  title = models.TextField()
  likelihood = models.IntegerField(null=True, blank=True)

  def __str__(self):
    return self.title