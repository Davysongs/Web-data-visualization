from django.urls import  path
from. import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('api/market-insights/', views.MarketInsightListAPIView.as_view(), name='market_insight_list'),
]
