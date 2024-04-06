from django.urls import  path
from. import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('api/market-insights/', views.MarketInsightListAPIView.as_view(), name='market_insight_list'),
    path('api/relevance-distribution/', views.RelevanceDistributionAPIView.as_view(), name='relevance_distribution'),
     path('api/heatmap-data/', views.HeatmapDataAPIView.as_view(), name='heatmap_data'),

]
