from django.urls import  path
from .views import *

urlpatterns = [
    path('', home, name = "home"),
    path('api/market-insights/', MarketInsightListAPIView.as_view(), name='market_insight_list'),
    path('api/sector-year-distribution/', SectorYearDistributionAPIView.as_view(), name='sector_year_distribution'),
    path('api/market-insights/histogram/', MarketInsightHistogramAPIView.as_view(), name='market_insight_histogram'),
     #filters 
    path('api/filter-market-insights/', FilterMarketInsightsView.as_view(), name='market_insight_filter'),
]
