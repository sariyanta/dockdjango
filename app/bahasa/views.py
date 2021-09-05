from django.http.response import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "bahasa/index.html")

def kamus(request):
    return render(request, "bahasa/kamus.html")