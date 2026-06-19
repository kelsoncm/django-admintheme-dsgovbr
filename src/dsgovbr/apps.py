from django.apps import AppConfig
from django.contrib.admin.apps import AdminConfig


class DSGovBRConfig(AppConfig):
    name: str = "dsgovbr"
    verbose_name: str = "DSGovBR"
    icon: str = "fa fa-edit"


class DSGovBrAdminConfig(AdminConfig):
    """
    Herdar de AdminConfig garante que o Django execute o autodiscover()
    e encontre todos os arquivos admin.py do projeto automaticamente.
    """

    default_site = "dsgovbr.admin.DSGovBrAdminSite"
