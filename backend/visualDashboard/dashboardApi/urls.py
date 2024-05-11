from django.urls import path
from dashboardApi import views
urlpatterns = [
    path('visualization/',views.visualDataApi)
]
