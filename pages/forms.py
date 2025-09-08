from django import forms
from .models import Login

class LoginForm(forms.ModelForm):
    class Meta:
        model = Login
        fields = '__all__'
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your username' ,'required': True}),
            'password': forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Enter your password' ,'required': True}),
        }
    