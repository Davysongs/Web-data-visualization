from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import MarketInsight
from .serializers import *
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter

# Create your views here.
def home(request):
    return render(request, 'home.html')

class  MarketInsightListCreateAPIView(generics.ListCreateAPIView):
   queryset = MarketInsight.objects.all()
   serializer_class = MarketSerialiser
   filter_backends = [SearchFilter,OrderingFilter]
   search_fields = ['title','sector','country', 'source', 'region','insight', 'topic']



'''Filters'''
class FilterMarketInsightsView(APIView):
  """
  API view to filter MarketInsight data based on query parameters.
  """
  def get(self, request):
    # Get filter parameters from query string
    serializer = MarketInsightFilterSerializer(data=request.query_params)

    # Validate filter data (already handled by serializer)
    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Get filtered queryset based on validated serializer data
    filtered_insights = serializer.get_queryset()

    # Check if any results found
    if not filtered_insights.exists():
      return Response({'message': 'No matching insights found for your filters.'}, status=status.HTTP_204_NO_CONTENT)

    # Serialize filtered data
    serialized_data = MarketInsightSerializer(filtered_insights, many=True)

    # Return JSON response with filtered data
    return Response(serialized_data.data)
  
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