# serializers.py
from rest_framework import serializers
from .models import MarketInsight

class MarketInsightFilterSerializer(serializers.Serializer):
    topics = serializers.ListField(child=serializers.CharField(), allow_empty=True, required=False)
    sector = serializers.CharField(allow_blank=True, required=False)
    region = serializers.CharField(allow_blank=True, required=False)
    pest = serializers.CharField(allow_blank=True, required=False)
    source = serializers.CharField(allow_blank=True, required=False)
    swot = serializers.CharField(allow_blank=True, required=False)
    country = serializers.CharField(allow_blank=True, required=False)
    city = serializers.CharField(allow_blank=True, required=False)
class MarketInsightSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['id', 'end_year', 'intensity', 'likelihood']  # Include 'end_year' field
class SectorYearDistributionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['sector', 'start_year', 'end_year']

class MarketInsightHistogramSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = ['id', 'relevance', 'topic', 'sector'] 