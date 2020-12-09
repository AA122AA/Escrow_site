from django.urls import path
from . import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('contacts', views.ContactsView.as_view(), name='contacts'),
    path('dostavka', views.DostavkaView.as_view(), name='dostavka')

]