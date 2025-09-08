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


    # here error because must be validation for save data or (form)

    # username= request.POST.get('username')
    # password= request.POST.get('password')
    # data = Login(username=username , password=password)
    # data.save()

    # correct way with form
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            data = Login(username=username, password=password)
            data.save()
            # You can redirect to a success page or render a success message here
            return render(request, 'pages/login.html', {'form': LoginForm(), 'success': True})
        else:
            # If the form is not valid, re-render the page with existing information.
            return render(request, 'pages/login.html', {'form': form})
        
    return render(request,'pages/login.html' , {'form':LoginForm()})


