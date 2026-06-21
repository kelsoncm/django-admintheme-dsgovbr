from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class HomeView(TemplateView):
    template_name = "core/home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Instruções do Sandbox - DSGovBR"
        return context


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = "core/dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Dashboard do Sandbox - DSGovBR"
        context["apps"] = [
            {
                "name": "Cadastro Institucional (Admin)",
                "url": "/admin/cadastro/",
                "desc": "Validação de listagem, inlines, autocomplete, filtros, etc.",
            },
            {
                "name": "Editorial (Admin)",
                "url": "/admin/editorial/",
                "desc": "Validação de Many-to-Many, pre-populated slugs, tabular inlines.",
            },
            {
                "name": "Atendimento & Chamados (Admin)",
                "url": "/admin/atendimento/",
                "desc": "Validação de permissões a nível de modelo e readonly_fields.",
            },
            {
                "name": "Eventos & Inscrições (Admin)",
                "url": "/admin/eventos/",
                "desc": "Validação de date_hierarchy e formfield_overrides.",
            },
            {
                "name": "Autenticação & Contas (Auth)",
                "url": "/admin/",
                "desc": "Validação visual do fluxo de Login/Logout, reset e alteração de senha.",
            },
            {
                "name": "Formulários Públicos (Public Forms)",
                "url": "/forms/",
                "desc": "Validação de inputs puros Django (as_p, as_ul, as_div e manual).",
            },
            {
                "name": "Showcase UI (Componentes)",
                "url": "/showcase/",
                "desc": "Exibição de todos os componentes puros do DS GovBR.",
            },
            {
                "name": "QA Orchestrator (Painel de Teste)",
                "url": "/qa/",
                "desc": "Utilitários para simular perfis de acesso, resetar dados e massas.",
            },
        ]
        return context
