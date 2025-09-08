from django.db import models

# Create your models here.


# Model for Books
class Books(models.Model):
    status_book=[
        ('available','available'),
        ('rented','rented'),
    ]
    title = models.CharField(max_length=250)
    author= models.CharField(max_length=250 , null=True ,blank=True)
    photo= models.ImageField(upload_to='photos/%Y/%m/%d/' , null=True ,blank=True)
    price= models.DecimalField(max_digits=10 , decimal_places=2 , null=True ,blank=True)
    description= models.TextField(null=True ,blank=True)
    status= models.CharField(max_length=50 , choices=status_book , default='available',null=True ,blank=True)


    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Book'
        verbose_name_plural = 'Books'


# Model for Login
class Login(models.Model):
    username = models.CharField(max_length=150)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = 'Login'
        verbose_name_plural = 'Logins'
