from django.urls import path, include
from rest_framework.routers import DefaultRouter
from coctailsapi import views

router = DefaultRouter()
router.register('ingredients', views.IngredientViewSet)
router.register('drinks', views.DrinkViewSet)

urlpatterns = [
    path('feeling-lucky/', views.RandomDrinkView.as_view(), name='feeling-lucky'),
    path('', include(router.urls)),
]
