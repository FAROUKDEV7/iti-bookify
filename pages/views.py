from django.shortcuts import render
from .models import Books
# Create your views here.


# main page
def index(request):
    context = {
        'books': Books.objects.all(),
    }
    return render(request , 'pages/index.html', context)


# one book page
def book(request ,id):
    book = Books.objects.get(id=id)
    context={
        'book':book
    }
    return render(request,'pages/book.html',context)