from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, AbstractBaseUser
from django.core.exceptions import ValidationError
from .managers import UserManager

# Create your models here.
def validate_client(value):
    if value.isdecimal():
        return value
    else:
        raise ValidationError(
            'Mandantennummer ist keine Zahl',
            params={'client': value}
        )


class User(AbstractBaseUser):
    client = models.CharField(
        max_length=30,
        unique=True,
        validators=[validate_client],
        verbose_name='Mandantennummer',
        primary_key=True,
    )
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'client'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']
    objects = UserManager()

    def __str__(self):
        return self.client
    
    def get_full_name(self):
        return self.client

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_superuser(self):
        return self.superuser

    @property
    def is_staff(self):
        return self.staff

    

        
