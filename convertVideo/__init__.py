import time
from pytube import YouTube,Search

def SearchKey(key):
    response = Search(key)
    listSearch = []
    for i in response.results:
        video = {
            "info": {
                "id": i.video_id,
                "title": i.title,
                "author": i.author,
                "thumbnail": i.thumbnail_url,
                "description": i.description,
                "length": time.strftime("%H:%M:%S", time.gmtime(i.length)),
                "publish_date": i.publish_date,
                "views": i.views
            },
            "sources": []
        }
        for v in i.streams.filter(progressive=True):
            video["sources"].append({
                "url": v.url,
                "resolution": v.resolution
            })
        listSearch.append(video)
    return listSearch

def Convert(url):
    yt = YouTube(url)
    video = {
        "info": {
            "title": yt.title,
            "author": yt.author,
            "thumbnail": yt.thumbnail_url,
            "description": yt.description,
            "length": time.strftime("%H:%M:%S", time.gmtime(yt.length)),
            "publish_date": yt.publish_date,
            "views": yt.views
        },
        "sources": []
    }
    for v in yt.streams.filter(progressive=True):
        video["sources"].append({
            "url": v.url,
            "resolution": v.resolution
        })

    return video
