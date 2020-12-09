import django
from django.http.response import HttpResponse
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
# Create your views here.

class IndexView(View):
    """
    Class for index.html page
    """
    def get(self, request):
        return render(request, 'Shop/index.html')

class ContactsView(View):
    """
    Class for contacts.html page
    """
    def get(self, request):
        return render(request, 'Shop/contacts.html')

class DostavkaView(View):
    """
    Class for dostavka.html page
    """
    def get(self, request):
        return render(request, 'Shop/dostavka.html')

  