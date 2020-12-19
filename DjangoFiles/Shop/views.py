import django
from django.http.response import HttpResponse
from django.shortcuts import render
from django.views import View
from django.http import HttpResponse
from .models import Users, Product 
# Create your views here.

class IndexView(View):
    """
    Class for index.html page
    """
    def get(self, request):
        iphones = Product.objects.values()
        context = {'iphones': iphones}
        return render(request, 'Shop/index.html', context = context)
    
    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")
        elif request.POST.get('action') == "change_product":
            pass

class ContactsView(View):
    """
    Class for contacts.html page
    """
    def get(self, request):
        return render(request, 'Shop/contacts.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")

class DostavkaView(View):
    """
    Class for dostavka.html page
    """
    def get(self, request):
        return render(request, 'Shop/dostavka.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")

class OplataView(View):
    """
    Class for oplata.html page
    """
    def get(self, request):
        return render(request, 'Shop/oplata.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")

class GarantyView(View):
    """
    Class for garanty.html page
    """
    def get(self, request):
        return render(request, 'Shop/garanty.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")

class LkUserView(View):
    """
    Class for lk_user.html page
    """
    def get(self, request):
        return render(request, 'Shop/lk_user.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")

class LkAdminView(View):
    """
    Class for lk_admin.html page
    """
    def get(self, request):
        return render(request, 'Shop/lk_admin.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")

class LkView(View):
    """
    Class for lk_courier.html page
    """
    def get(self, request):
        return render(request, 'Shop/lk.html')

    def post(self, request):
        if request.POST.get('action') == "add_user":
            post_text = request.POST.get('the_post')
            if post_text != None:
                u = Users(wallet_address=post_text, role = 1)
                users = Users.objects.all()
                isHere = False
                if users.count() != 0:
                    for user in users:
                        if u.wallet_address == user.wallet_address:
                            isHere = True
                    if not isHere:
                        u.save()
                else:
                    u.save()
            else:
                print("undefined address")
            return HttpResponse("nice")
