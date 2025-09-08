from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=150, label='Username',required=True)
    password = forms.CharField(widget=forms.PasswordInput, label='Password',required=True)