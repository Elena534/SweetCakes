from rest_framework import serializers
from .models import Desert

class DesertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Desert
        fields = '__all__'