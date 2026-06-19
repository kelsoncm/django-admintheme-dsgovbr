from django.contrib import admin
from dsgovbr.admin import DSGovBrModelAdmin
from .models import SolicitacaoServico

@admin.register(SolicitacaoServico)
class SolicitacaoServicoAdmin(DSGovBrModelAdmin):
    list_display = ('nome', 'email', 'telefone', 'tipo', 'concorda_termos', 'data_criacao')
    list_filter = ('tipo', 'concorda_termos', 'data_criacao')
    search_fields = ('nome', 'email', 'telefone', 'descricao')
