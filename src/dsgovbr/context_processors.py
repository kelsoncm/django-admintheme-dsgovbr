from django.conf import settings
from django.http import HttpRequest
from django.contrib import admin
from django.urls import reverse


def _get_element_as_list(dictionary: dict, name: str) -> list:
    setting = dictionary.get(name, [])
    return setting if isinstance(setting, list) else []


def layout_settings(request: HttpRequest) -> dict:
    header_settings = getattr(settings, "DSGOVBR_HEADER", {})

    project_company = getattr(settings, "PROJECT_COMPANY", "Minha empresa")
    project_title = getattr(settings, "PROJECT_TITLE", "Nome do projeto")
    project_subtitle = getattr(settings, "PROJECT_SUBTITLE", "Slogan do projeto")
    site_admin_atual = admin.site

    return {
        "project_company": project_company,
        "project_title": project_title,
        "project_subtitle": project_subtitle,
        "project_version": getattr(settings, "PROJECT_VERSION", "v1.0.0"),
        "project_last_startup": getattr(settings, "PROJECT_LAST_STARTUP", "PROJECT_LAST_STARTUP"),
        "project_copyright": getattr(settings, "PROJECT_COPYRIGHT", "@2025 PROJECT_COPYRIGHT"),
        "project_license": getattr(settings, "PROJECT_LICENSE", "Licença MIT"),
        "project_license_url": getattr(settings, "PROJECT_LICENSE_URL", "https://opensource.org/license/mit"),
        "hostname": getattr(settings, "HOSTNAME", "HOSTNAME"),
        "admin_app_list": site_admin_atual.get_app_list(request),
        "dsgovbr": {
            "user_avatar": "https://cdn-icons-png.freepik.com/512/6596/6596121.png",
            "header": {
                **{
                    "type": "default",
                    "width_style": "fluid",
                    "logo": {
                        "show": True,
                        "type": "compact",
                        "default_url": "https://www.gov.br/ds/assets/img/govbr-logo.png",
                        "compact_url": "https://www.gov.br/ds/assets/img/govbr-logo.png",
                        "link": "https://www.gov.br/pt-br",
                    },
                    "assinatura": {
                        "show": False,
                        "label": project_company,
                    },
                    "titulo": {
                        "label": project_title,
                    },
                    "subtitulo": {
                        "show": str(project_subtitle or "") != "",
                        "label": project_subtitle,
                    },
                    "links": {
                        "show": False,
                        "items": [],
                    },
                    "funcionalidades": {
                        "show": False,
                        "items": [],
                    },
                    "login": {
                        "show": True,
                        "type": "default",
                        "default_avatar_url": "",
                        "saudacao": None,
                        "name_to_show": "first",
                        "dropdown": {
                            "show": True,
                            "show_large_avatar": True,
                            "show_full_name": True,
                            "show_role": True,
                            "items": [
                                {
                                    "label": "Sair",
                                    "url": reverse('logout'),
                                    "target": "_blank",
                                    "icon": "fas fa-sign-out-alt",
                                },
                            ],
                        }
                    },
                    "menu": {
                        "show": True,
                        "localizacao": "fixo", # fixo|flutuante
                        "padding": {
                        },
                        "header": {
                        },
                        "footer": {
                        },
                        "items": "",
                    },
                    "search": {
                        "show": True,
                    },
                    "responsive_dropdown": {
                        "show": True
                    },
                },
                **getattr(settings, "DSGOVBR_HEADER", {})
            },
            "footer": {
                **{
                    "show": True,
                },
                **getattr(settings, "DSGOVBR_FOOTER", {})
            },
            "login": {
                **{
                    "show": True,
                    "alternative_methods": [],
                },
                **getattr(settings, "DSGOVBR_LOGIN", {})
            },
        },
    }