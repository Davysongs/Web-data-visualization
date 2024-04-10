from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import MarketInsight
from .serializers import *
from django.db.models import Count

# Create your views here.
def home(request):
    return render(request, 'home.html')

'''filters'''
class MarketInsightFilterAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightFilterSerializer

class MarketInsightTopicsFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightTopicsFilterSerializer

    def get_queryset(self):
        topic = self.request.query_params.get('topic', '')
        queryset = MarketInsight.objects.filter(topic__icontains=topic)
        return queryset

class MarketInsightSectorFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightSectorFilterSerializer

    def get_queryset(self):
        sector = self.request.query_params.get('sector', '')
        queryset = MarketInsight.objects.filter(sector__icontains=sector)
        return queryset

class MarketInsightRegionFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightRegionFilterSerializer

    def get_queryset(self):
        region = self.request.query_params.get('region', '')
        queryset = MarketInsight.objects.filter(region__icontains=region)
        return queryset

class MarketInsightPESTFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightPESTFilterSerializer

    def get_queryset(self):
        pestle = self.request.query_params.get('pestle', '')
        queryset = MarketInsight.objects.filter(pestle__icontains=pestle)
        return queryset

class MarketInsightSourceFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightSourceFilterSerializer

    def get_queryset(self):
        source = self.request.query_params.get('source', '')
        queryset = MarketInsight.objects.filter(source__icontains=source)
        return queryset

class MarketInsightSWOTFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightSWOTFilterSerializer

    def get_queryset(self):
        swot = self.request.query_params.get('swot', '')
        queryset = MarketInsight.objects.filter(swot__icontains=swot)
        return queryset

class MarketInsightCountryFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightCountryFilterSerializer

    def get_queryset(self):
        country = self.request.query_params.get('country', '')
        queryset = MarketInsight.objects.filter(country__icontains=country)
        return queryset

class MarketInsightCityFilterAPIView(generics.ListAPIView):
    serializer_class = MarketInsightCityFilterSerializer

    def get_queryset(self):
        city = self.request.query_params.get('city', '')
        queryset = MarketInsight.objects.filter(city__icontains=city)
        return queryset
'''Charts and  Graphs API Views'''
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

class SectorYearDistributionAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.values('sector', 'start_year', 'end_year').annotate(count=Count('id'))
    serializer_class = SectorYearDistributionSerializer

class MarketInsightHistogramAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightHistogramSerializer