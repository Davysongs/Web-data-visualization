from django.urls import  path
from. import views

urlpatterns = [
    path('', views.home, name = "home"),
    path('api/data/', views.MarketInsightListAPIView.as_view(), name='market_insight_list'),
]
