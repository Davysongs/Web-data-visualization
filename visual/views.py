from django.shortcuts import render
from .models import MarketInsight
import json
from visual.models import MarketInsight

# Create your views here.
def home(request):
    with open('jsondata.json', 'r') as f:
        data = json.load(f)
        no = 0
        for item in data:
            insight = MarketInsight(
                end_year=item['end_year'],
                intensity=item['intensity'],
                sector=item['sector'],
                topic=item['topic'],
                insight=item['insight'],
                url=item['url'],
                region=item['region'],
                start_year=item['start_year'],
                impact=item['impact'],
                added=item['added'],
                published=item['published'],
                country=item['country'],
                relevance=item['relevance'],
                pestle=item['pestle'],
                source=item['source'],
                title=item['title'],
                likelihood=item['likelihood']
            )
            insight.save()
            no += 1
            print(f"{no} entries saved successfully")
        print("Successfully completed")
    return render(request, 'home.html')
