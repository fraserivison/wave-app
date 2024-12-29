from django.contrib import admin
from django.urls import path, include
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('test/', views.test_page),
    path('', TemplateView.as_view(template_name="index.html")),
]
