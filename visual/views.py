from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import MarketInsight
from .serializers import MarketInsightHistogramSerializer, MarketInsightSerializer, MarketInsightFilterSerializer, SectorYearDistributionSerializer
from django.db.models import Count

# Create your views here.
def home(request):
    return render(request, 'home.html')

#API endpoint to retrieve MarketInsight data for Intensity vs. Likelihood distribution.
class MarketInsightListAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # Filter by end year if provided in query params
        end_year = self.request.query_params.get('end_year', None)
        if end_year is not None:
            queryset = queryset.filter(end_year=end_year)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class MarketInsightFilterAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightFilterSerializer

class SectorYearDistributionAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.values('sector', 'start_year', 'end_year').annotate(count=Count('id'))
    serializer_class = SectorYearDistributionSerializer

class MarketInsightHistogramAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightHistogramSerializer