from django.urls import path
from . import views 

app_name = "pages" 

urlpatterns = [
    path("",views.index,name="index"),
    path("book/<int:id>/",views.book,name="book"),
    path("login/",views.login,name="login"),
]
