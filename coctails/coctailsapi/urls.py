from django.urls import path, include
from rest_framework.routers import DefaultRouter
from coctailsapi import views

router = DefaultRouter()
router.register('ingredients', views.IngredientViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
