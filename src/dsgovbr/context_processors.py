from django.conf import settings
from django.utils.translation import gettext as _
from django.http import HttpRequest


def layout_settings(request: HttpRequest) -> dict:
    from django.contrib import admin
    user = getattr(request, "user", None)
    is_staff = user and user.is_authenticated and user.is_staff
    available_apps = admin.site.get_app_list(request) if is_staff else []

    fast_access_links = getattr(
        settings,
        "APP_FAST_ACCESS_LINKS", 
        [{'url': '/', 'label': 'Home'}]
    )
    if not isinstance(fast_access_links, list):
        fast_access_links = []

    feature_links = getattr(
        settings,
        "APP_FEATURE_LINKS", 
        [{'icon': 'fas fa-adjust', 'label': 'Funcionalidade 1'}]
    )
    if not isinstance(feature_links, list):
        feature_links = []

    return {
        "project_company": getattr(settings, "PROJECT_COMPANY", "PROJECT_COMPANY"),
        "project_title": getattr(settings, "PROJECT_TITLE", "PROJECT_TITLE"),
        "project_subtitle": getattr(settings, "PROJECT_SUBTITLE", "PROJECT_SUBTITLE"),
        "project_version": getattr(settings, "PROJECT_VERSION", "PROJECT_VERSION"),
        "project_last_startup": getattr(settings, "PROJECT_LAST_STARTUP", "PROJECT_LAST_STARTUP"),
        "project_copyright": getattr(settings, "PROJECT_COPYRIGHT", "@2025 PROJECT_COPYRIGHT"),
        "project_license": getattr(settings, "PROJECT_LICENSE", "Licença MIT"),
        "project_license_url": getattr(settings, "PROJECT_LICENSE_URL", "https://opensource.org/license/mit"),
        "hostname": getattr(settings, "HOSTNAME", "HOSTNAME"),

        "dsgovbr": {
            "user_avatar": "https://cdn-icons-png.freepik.com/512/6596/6596121.png",
            "header": {
                **{
                    "type": "compact",
                    "logo_type": "compact",
                    "show_logo": True,
                    "show_signature": False,
                    "show_title": True,
                    "show_subtitle": False,
                    "show_menu": True,
                    "show_login": True,
                    "show_search": False,
                    "show_fast_access_links": bool(fast_access_links),
                    "fast_access_links": fast_access_links,
                    "show_feature_links": bool(feature_links),
                    "feature_links": feature_links,
                    "available_apps": available_apps,
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