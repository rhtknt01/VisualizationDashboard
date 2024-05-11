from django.db import models

# Create your models here.

class VisualData(models.Model):
    end_year = models.CharField(max_length=100, blank=True, null=True)
    intensity = models.IntegerField(null=0)
    sector = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    insight = models.CharField(max_length=255)
    url = models.URLField()
    region = models.CharField(max_length=255)
    start_year = models.CharField(max_length=100, blank=True, null=True)
    impact = models.CharField(max_length=255, blank=True, null=True)
    added = models.DateTimeField()
    published = models.DateTimeField(null=True)
    country = models.CharField(max_length=255)
    relevance = models.IntegerField()
    pestle = models.CharField(max_length=255)
    source = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    likelihood = models.IntegerField()

    def __str__(self):
        return self.title

class APICallCount(models.Model):
    endpoint = models.CharField(max_length=255)
    count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.count}"

class SiteUsage(models.Model):
    usage = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Site Usage at {self.timestamp}"
