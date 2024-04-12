# serializers.py
from rest_framework import serializers
from .models import MarketInsight

class MarketInsightFilterSerializer(serializers.Serializer):
    topics = serializers.ListField(child=serializers.CharField(), allow_empty=True, required=False)
    sector = serializers.CharField(allow_blank=True, required=False)
    region = serializers.CharField(allow_blank=True, required=False)
    pestle = serializers.CharField(allow_blank=True, required=False)
    source = serializers.CharField(allow_blank=True, required=False)
    swot = serializers.CharField(allow_blank=True, required=False)
    country = serializers.CharField(allow_blank=True, required=False)

    def validate(self, data):
        # Optional validation for filter criteria (e.g., checking if any filter is provided)
        if all(value == '' for value in data.values()):
            raise serializers.ValidationError('Please provide at least one filter criteria.')
        return data

    def get_queryset(self):
        """
        Override the default get_queryset method to handle potential None initial data.
        """
        queryset = MarketInsight.objects.all()
        if self.initial is not None:  # Check if initial data exists
            filters = {key: value for key, value in self.initial.items() if value}  # Get non-empty filter values
            for field, value in filters.items():
                if field == 'topics':
                    queryset = queryset.filter(topic__icontains=value)  # Case-insensitive search for topics
                else:
                    queryset = queryset.filter(
                        **{field + '__icontains': value}  # Case-insensitive search for other fields
                    )
        return queryset

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

class MarketSerialiser(serializers.ModelSerializer):
    class Meta:
        model = MarketInsight
        fields = '__all__'