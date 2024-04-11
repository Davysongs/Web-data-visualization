from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import MarketInsight
from .serializers import *
from django.db.models import Count

# Create your views here.
def home(request):
    return render(request, 'home.html')

'''Filters'''
class MarketInsightFilterAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightSerializer

    def get_queryset(self):
        queryset = self.queryset
        serializer = MarketInsightFilterSerializer(data=self.request.query_params)

        if serializer.is_valid():
            # Get validated data
            filters = serializer.validated_data

            # Apply filters
            if 'topics' in filters:
                queryset = queryset.filter(topic__in=filters['topics'])
            if 'sector' in filters:
                queryset = queryset.filter(sector=filters['sector'])
            if 'region' in filters:
                queryset = queryset.filter(region=filters['region'])
            if 'pest' in filters:
                queryset = queryset.filter(pestle=filters['pest'])
            if 'source' in filters:
                queryset = queryset.filter(source=filters['source'])
            if 'swot' in filters:
                queryset = queryset.filter(swot=filters['swot'])
            if 'country' in filters:
                queryset = queryset.filter(country=filters['country'])
            if 'city' in filters:
                queryset = queryset.filter(city=filters['city'])

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

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