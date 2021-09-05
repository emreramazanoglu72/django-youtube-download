import json

from django.http import JsonResponse
from django.shortcuts import render, redirect, HttpResponse
from convertVideo import Convert, SearchKey


def index(request):
    return render(request, "index.html")


def videoSearch(request):
    return render(request, "videoSearch.html")


def videoDetail(request, slug):
    result = Convert("https://www.youtube.com/watch?v={}".format(slug))
    return render(request, "videoDetail.html", {"detail": result,"id":slug})


def searchApi(request):
    if request.method == "GET":
        return redirect("/search")
    else:
        key = json.loads(request.body).get("key")
        if key:
            listSearch = SearchKey(key)
            return JsonResponse(listSearch, safe=False)
        else:
            return redirect("/search")


def downloadUrl(request):
    if request.method == "POST":
        url = json.loads(request.body).get("url")
        result = Convert(url)
        return JsonResponse(result)
    else:
        return HttpResponse("post")
