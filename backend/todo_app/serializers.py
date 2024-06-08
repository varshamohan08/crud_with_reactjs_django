from .models import Todo
from rest_framework import serializers
from datetime import datetime


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ['name', 'notes', 'dat_created']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['dat_created'] = instance.dat_created.strftime("%d-%m-%Y")
        representation['id'] = instance.id
        return representation
