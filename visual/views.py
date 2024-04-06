from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MarketInsight
from .serializers import MarketInsightSerializer
from collections import namedtuple

# Create your views here.
def home(request):
    return render(request, 'home.html')

#API endpoint to retrieve MarketInsight data for Intensity vs. Likelihood distribution.
class MarketInsightListAPIView(generics.ListAPIView):
    queryset = MarketInsight.objects.all()
    serializer_class = MarketInsightSerializer
