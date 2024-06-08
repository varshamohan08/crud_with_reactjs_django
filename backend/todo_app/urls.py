from django.urls import path
from .views import *

urlpatterns = [
    path('todo_api', todoApi.as_view(), name='todo_api'),
]