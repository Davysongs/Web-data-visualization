from django.urls import  path
from .views import *

urlpatterns = [
    path('', home, name = "home"),
    path('api/market-insights/', MarketInsightListAPIView.as_view(), name='market_insight_list'),
    path('api/sector-year-distribution/', SectorYearDistributionAPIView.as_view(), name='sector_year_distribution'),
    path('api/market-insights/histogram/', MarketInsightHistogramAPIView.as_view(), name='market_insight_histogram'),
     #filters 
    path('api/market-insights/topics/', MarketInsightTopicsFilterAPIView.as_view(), name='market_insight_topics_filter'),
    path('api/market-insights/sector/', MarketInsightSectorFilterAPIView.as_view(), name='market_insight_sector_filter'),
    path('api/market-insights/region/', MarketInsightRegionFilterAPIView.as_view(), name='market_insight_region_filter'),
    path('api/market-insights/pest/', MarketInsightPESTFilterAPIView.as_view(), name='market_insight_pest_filter'),
    path('api/market-insights/source/', MarketInsightSourceFilterAPIView.as_view(), name='market_insight_source_filter'),
    path('api/market-insights/swot/', MarketInsightSWOTFilterAPIView.as_view(), name='market_insight_swot_filter'),
    path('api/market-insights/country/', MarketInsightCountryFilterAPIView.as_view(), name='market_insight_country_filter'),
    path('api/market-insights/city/', MarketInsightCityFilterAPIView.as_view(), name='market_insight_city_filter'),
    path('api/market-insights/filter/', MarketInsightFilterAPIView.as_view(), name='market_insight_filter'),
]
