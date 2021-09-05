from django.urls import path

from dl.views import index,downloadUrl,videoSearch,searchApi,videoDetail

urlpatterns = [
    path('', index),
    path('search/', videoSearch),
    path('video/<slug>', videoDetail),
    path('searchapi/', searchApi),
    path('downloadurl', downloadUrl),
]