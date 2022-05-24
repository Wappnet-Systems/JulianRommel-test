from rest_framework import serializers
from .models import File, Document
from django.contrib.auth import get_user_model


class FileSerializer(serializers.ModelSerializer):
    # client = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all())

    class Meta:
        model = File
        fields = ['id', 'name', 'file', 'client', 'date', 'downloaded']


class DocumentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = ['id', 'name', 'file', 'date']