from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    disp_name = models.CharField(
        max_length=50, blank=True, default='', verbose_name=u'表示名',)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 't_user'
        verbose_name = 'ユーザーの一覧'

    def __str__(self):
        return self.email
