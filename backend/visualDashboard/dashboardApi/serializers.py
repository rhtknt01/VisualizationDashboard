from rest_framework import serializers
from dashboardApi.models import VisualData, APICallCount,SiteUsage

class VisualDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisualData
        fields = '__all__'

class APICallCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = APICallCount
        fields = '__all__'

class SiteUsageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteUsage
        fields = ['usage']