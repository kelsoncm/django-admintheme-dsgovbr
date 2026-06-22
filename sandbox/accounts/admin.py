from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from dsgovbr.admin.import_export import DSGovBrModelAdmin
from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(DSGovBrModelAdmin, UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Informações Adicionais (GovBR)", {"fields": ("cargo", "orgao")}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ("Informações Adicionais (GovBR)", {"fields": ("cargo", "orgao")}),
    )
