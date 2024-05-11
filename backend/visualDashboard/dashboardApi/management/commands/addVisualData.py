import json
from django.core.management.base import BaseCommand
from dashboardApi.models import VisualData
from datetime import datetime
from django.utils.timezone import make_aware

class Command(BaseCommand):
    help = 'Imports JSON data into the Data model'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to the JSON file')

    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']
        
        with open(json_file, 'r', encoding='utf-8') as f:
            visual_data = json.load(f)
        
        for item in visual_data:
            # Handle empty strings for datetime fields
            added = datetime.strptime(item['added'], '%B, %d %Y %H:%M:%S') if item['added'] else None
            published = datetime.strptime(item['published'], '%B, %d %Y %H:%M:%S') if item['published'] else None

            # Make datetimes timezone aware
            if added:
                added = make_aware(added)
            if published:
                published = make_aware(published)
            
            # Skip object creation if intensity field is empty
            # if not item['intensity']:
            #     self.stdout.write(self.style.WARNING('Skipping object creation due to empty intensity field.'))
            #     continue
            
            VisualData.objects.create(
                end_year=item.get('end_year', None),
                intensity=item['intensity'] if item['intensity'] else 0,
                sector=item['sector'],
                topic=item['topic'],
                insight=item['insight'],
                url=item['url'],
                region=item['region'],
                start_year=item.get('start_year', None),
                impact=item.get('impact', None),
                added=added,
                published=published,
                country=item['country'],
                relevance=item['relevance'] if item['relevance'] else 0,
                pestle=item['pestle'],
                source=item['source'],
                title=item['title'],
                likelihood=item['likelihood'] if item['likelihood'] else 0
            )
        
        self.stdout.write(self.style.SUCCESS('Data imported successfully.'))
