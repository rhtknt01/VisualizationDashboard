from django.db import transaction
from django.utils.deprecation import MiddlewareMixin
from .models import APICallCount

class APICallCountMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith('/api/visualization'):
            endpoint = request.path
            try:
                # Use select_for_update to lock the row for update
                with transaction.atomic():
                    # Try to get the existing APICallCount object for the endpoint
                    api_call_count = APICallCount.objects.select_for_update().get(endpoint=endpoint)
            except APICallCount.DoesNotExist:
                # If the object does not exist, create it
                api_call_count = APICallCount.objects.create(endpoint=endpoint)

            # Increment the API call count
            api_call_count.count += 1
            api_call_count.save()
