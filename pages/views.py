from django.shortcuts import render
from .models import Books , Login
from .forms import LoginForm
# Create your views here.


# main page
def index(request):
    books = Books.objects.all()

    # if you want to filter books with price equal to 500
    # books = Books.objects.all().filter(price = 500)

    # if you want to filter books with title equal to romantic
    # books = Books.objects.all().filter(title = "romantic")

    # if you want to order books by title
    # books = Books.objects.all().order_by('title')


    context = {
        'books': books,
    }
    return render(request , 'pages/index.html', context)


# one book page
def book(request ,id):
    book = Books.objects.get(id=id)
    context={
        'book':book
    }
    return render(request,'pages/book.html',context)

# login page
def login(request):


    # here error because must be validation for save data and (form)

    # LoginForm(request.POST).save()


    # correct way for save data with validation
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request,'pages/index.html')
        else:
            return render(request,'pages/login.html' , {'form':form})

    return render(request,'pages/login.html' , {'form':LoginForm()})


