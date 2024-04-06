from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import MarketInsight
from .serializers import MarketInsightSerializer, HeatmapDataSerializer, RelevanceDistributionSerializer, SectorYearDistributionSerializer
from django.db.models import Count

# Create your views here.
def home(request):
    return render(request, 'home.html')

#API endpoint to retrieve MarketInsight data for Intensity vs. Likelihood distribution.
class MarketInsightListAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightSerializer


class RelevanceDistributionAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.values('relevance').annotate(count=Count('id'))
    serializer_class = RelevanceDistributionSerializer


class HeatmapDataAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.values('sector', 'pestle').annotate(count=Count('id'))
    serializer_class = HeatmapDataSerializer


class SectorYearDistributionAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.values('sector', 'start_year', 'end_year').annotate(count=Count('id'))
    serializer_class = SectorYearDistributionSerializer
