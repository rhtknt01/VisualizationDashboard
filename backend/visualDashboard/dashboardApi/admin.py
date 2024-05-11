from django.contrib import admin
from .models import VisualData

@admin.register(VisualData)
class VisualDataAdmin(admin.ModelAdmin):
    list_display = ['title', 'sector', 'topic', 'added', 'published']
    search_fields = ['title', 'sector', 'topic', 'insight', 'country', 'pestle', 'source']
    list_filter = ['sector', 'topic', 'region', 'country', 'pestle', 'source']
