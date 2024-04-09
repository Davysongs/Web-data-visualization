from rest_framework import serializers
from .models import MarketInsight

class MarketInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['id', 'intensity', 'likelihood']

class HeatmapDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['sector', 'pestle']

class SectorYearDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['sector', 'start_year', 'end_year']
