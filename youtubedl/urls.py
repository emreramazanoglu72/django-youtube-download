from django.urls import path,include
import dl

urlpatterns = [
    path('', include('dl.urls')),
]
