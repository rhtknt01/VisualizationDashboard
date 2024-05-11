from django.http import HttpResponse, JsonResponse,HttpResponseNotFound
from django.views.decorators.http import require_GET
from django.db.models import Q
from .models import VisualData,APICallCount,SiteUsage
from .serializers import VisualDataSerializer,APICallCountSerializer,SiteUsageSerializer
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def visualDataApi(request):
    if request.method == 'POST':
        # Check if request content-type is JSON
        if request.content_type != 'application/json':
            return HttpResponse("Unsupported Media Type", status=415)
        
        # Parse JSON data
        try:
            pythondata = JSONParser().parse(request)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data", status=400)

        # Filter arguments
        end_year = pythondata.get('end_year')
        topics = pythondata.get('topics')
        sector = pythondata.get('sector')
        region = pythondata.get('region')
        pestle = pythondata.get('pestle')
        source = pythondata.get('source')
        country = pythondata.get('country')

        # Constructing the query
        query = Q()
        if end_year:
            query &= Q(end_year__iexact=end_year)
        if topics:
            query &= Q(topic__iexact=topics)
        if sector:
            query &= Q(sector__iexact=sector)
        if region:
            query &= Q(region__iexact=region)
        if pestle:
            query &= Q(pestle__iexact=pestle)
        if source:
            query &= Q(source__iexact=source)
        if country:
            query &= Q(country__iexact=country)

        # Fetch filtered data from the database
        if query:
            model_data = VisualData.objects.filter(query)
        else:
            model_data = VisualData.objects.all()

        # Fetch Data from serializers
        serializer_data = VisualDataSerializer(model_data, many=True)

        # Render JSON data
        json_data = JSONRenderer().render(serializer_data.data)

        # Return JSON response
        return HttpResponse(json_data, content_type="application/json")
    return HttpResponse("{'request':'GET'}", content_type="application/json")



def api_call_count(request):
    # If method is GET, return site usage data to client
    if request.method == 'GET':
        model_data = APICallCount.objects.get(id=1)
        serializer_data = APICallCountSerializer(model_data)
        json_data = JSONRenderer().render(serializer_data.data)
    return HttpResponse(json_data, content_type="application/json")


@csrf_exempt
def site_usage_meter(request):
    if request.method == 'POST':
        # Check if request content-type is JSON
        if request.content_type != 'application/json':
            return HttpResponse("Unsupported Media Type", status=415)
        
        # Parse JSON data
        try:
            pythondata = JSONParser().parse(request)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data", status=400)
        
        # Deserialize JSON data
        serializer = SiteUsageSerializer(data=pythondata)
        if serializer.is_valid():
            serializer.save()
            response = {'message': 'success'}
            json_data = JSONRenderer().render(response)
            return HttpResponse(json_data, content_type='application/json')
        else:
            json_data = JSONRenderer().render(serializer.errors)
            return HttpResponse(json_data, content_type='application/json')

    # If method is GET, return site usage data to client
    model_data = SiteUsage.objects.latest('timestamp')
    serializer_data = SiteUsageSerializer(model_data)
    json_data = JSONRenderer().render(serializer_data.data)
    return HttpResponse(json_data, content_type="application/json")
