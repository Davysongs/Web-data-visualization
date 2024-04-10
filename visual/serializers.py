# serializers.py
from rest_framework import serializers
from .models import MarketInsight

class MarketInsightTopicsFilterSerializer(serializers.Serializer):
    topic = serializers.CharField(max_length=300)

class MarketInsightSectorFilterSerializer(serializers.Serializer):
    sector = serializers.CharField(max_length=300)

class MarketInsightRegionFilterSerializer(serializers.Serializer):
    region = serializers.CharField(max_length=300)

class MarketInsightPESTFilterSerializer(serializers.Serializer):
    pestle = serializers.CharField(max_length=300)

class MarketInsightSourceFilterSerializer(serializers.Serializer):
    source = serializers.CharField(max_length=300)

class MarketInsightSWOTFilterSerializer(serializers.Serializer):
    swot = serializers.CharField(max_length=300)

class MarketInsightCountryFilterSerializer(serializers.Serializer):
    country = serializers.CharField(max_length=300)

class MarketInsightCityFilterSerializer(serializers.Serializer):
    city = serializers.CharField(max_length=300)

class MarketInsightFilterSerializer(serializers.Serializer):
    end_year = serializers.CharField(max_length=300)  # Serializer for end year filter

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