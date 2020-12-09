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

class OplataView(View):
    """
    Class for oplata.html page
    """
    def get(self, request):
        return render(request, 'Shop/oplata.html')

class GarantyView(View):
    """
    Class for garanty.html page
    """
    def get(self, request):
        return render(request, 'Shop/garanty.html')

class LkUserView(View):
    """
    Class for lk_user.html page
    """
    def get(self, request):
        return render(request, 'Shop/lk_user.html')

class LkAdminView(View):
    """
    Class for lk_admin.html page
    """
    def get(self, request):
        return render(request, 'Shop/lk_admin.html')

class LkCourierView(View):
    """
    Class for lk_courier.html page
    """
    def get(self, request):
        return render(request, 'Shop/lk_courier.html')

class LoginView(View):
    """
    Class for login.html page
    """
    def get(self, request):
        return render(request, 'Shop/login.html')
        
class RegistrView(View):
    """
    Class for registration.html page
    """
    def get(self, request):
        return render(request, 'Shop/registration.html')
