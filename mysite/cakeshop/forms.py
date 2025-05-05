from django import forms
from .models import Desert  # Импортируйте вашу модель

class DesertForm(forms.ModelForm):
    class Meta:
        model = Desert
        fields = ['name','description', 'price', 'image']