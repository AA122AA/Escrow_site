import django
from django.http.response import HttpResponse
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
# Create your views here.

class IndexView(View):
    """
    docstring
    """
    def get(self, request):
        """ 
        docstring
        """
        return render(request, 'Shop/index.html')