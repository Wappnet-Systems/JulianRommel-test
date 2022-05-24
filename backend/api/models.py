from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE
from main.settings import MEDIA_ROOT
from django.conf import settings
import os

User = settings.AUTH_USER_MODEL

# Create your models here.
class File(models.Model):
    name = models.TextField(max_length=30)
    file = models.FileField(upload_to='uploads')
    client = models.ForeignKey(User, verbose_name = "Freigeben an", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now = True, editable = False)
    downloaded = models.BooleanField(default = False) # Auslagen extra Tabelle?

    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        # Delete File from /media/
            os.remove(os.path.join(MEDIA_ROOT, self.file.name))
            super().delete(*args, **kwargs) 


class Document(models.Model):
    name = models.TextField(max_length=30)
    file = models.FileField(upload_to='docs')
    date = models.DateTimeField(auto_now = True, editable = False)
    
    def __str__(self):
        return self.name

    def delete(self, *args, **kwargs):
        # Delete File from /media/
            os.remove(os.path.join(MEDIA_ROOT, self.file.name))
            super().delete(*args, **kwargs) 