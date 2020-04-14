from django.urls import path, include
from rest_framework.routers import DefaultRouter
from coctailsapi import views

router = DefaultRouter()
router.register('ingredients', views.IngredientViewSet)
router.register('drinks', views.DrinkViewSet, 'drink')

app_name = 'coctailsapi'
urlpatterns = [
    path('', views.DocsView.as_view()),
    path('', include(router.urls)),
    path('feeling-lucky/', views.RandomDrinkView.as_view(), name='feeling-lucky'),
]
