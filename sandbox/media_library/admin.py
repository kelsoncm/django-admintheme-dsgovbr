from django.contrib import admin
from dsgovbr.admin import DSGovBrModelAdmin
from .models import Midia

@admin.register(Midia)
class MidiaAdmin(DSGovBrModelAdmin):
    list_display = ('titulo', 'arquivo', 'imagem', 'data_upload')
    search_fields = ('titulo', 'descricao')
