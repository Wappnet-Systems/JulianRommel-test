from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, client, email, password):

        if not client:
            raise ValueError('Ein Account benötigt eine Mandantennummer')

        if not email:
            raise ValueError('Ein Account benötigt eine Email')

        user = self.model(
            client = client,
            email = self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, client, email, password):
        
        user = self.create_user(
            client = client,
            email = self.normalize_email(email),
            password = password,
        )

        user.superuser = True
        user.staff = True
        user.save(using=self.db)
        return user