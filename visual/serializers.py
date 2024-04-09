# serializers.py
from rest_framework import serializers
from .models import MarketInsight

class MarketInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['id', 'end_year', 'intensity', 'likelihood']  # Include 'end_year' field

class MarketInsightFilterSerializer(serializers.Serializer):
    end_year = serializers.CharField(max_length=300)  # Serializer for end year filter


class SectorYearDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['sector', 'start_year', 'end_year']

class MarketInsightHistogramSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['id', 'relevance', 'topic', 'sector'] 