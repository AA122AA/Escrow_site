from django.urls import path
from . import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('dostavka', views.DostavkaView.as_view(), name='dostavka'),
    path('oplata', views.OplataView.as_view(), name='oplata'),
    path('garanty', views.GarantyView.as_view(), name='garanty'),
    path('lk_user', views.LkUserView.as_view(), name='lk_user'),
    path('lk_admin', views.LkAdminView.as_view(), name='lk_admin'),
    path('lk', views.LkView.as_view(), name='lk'),
    path('contacts', views.ContactsView.as_view(), name='contacts'),
    path('login', views.LoginView.as_view(), name='login'),
    path('registration', views.RegistrView.as_view(), name='registr'),
]