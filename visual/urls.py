from django.urls import  path
from. import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('api/market-insights/', views.MarketInsightListAPIView.as_view(), name='market_insight_list'),
    path('api/sector-year-distribution/', views.SectorYearDistributionAPIView.as_view(), name='sector_year_distribution'),
    path('api/market-insights/filter/', views.MarketInsightFilterAPIView.as_view(), name='market_insight_filter'),
    path('api/market-insights/histogram/', views.MarketInsightHistogramAPIView.as_view(), name='market_insight_histogram'),


]
