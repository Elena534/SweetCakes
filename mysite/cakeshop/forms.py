from django import forms
from .models import Dessert  # Импортируйте вашу модель

class DessertForm(forms.ModelForm):
    class Meta:
        model = Dessert
        fields = ['name','description', 'price', 'image']