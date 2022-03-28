from . import views
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('' , views.base,name='base'),
    path('search/', views.search,name='search'),
    path('add/',views.add,name="add"),
]