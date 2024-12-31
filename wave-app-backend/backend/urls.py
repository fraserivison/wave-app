from django.contrib import admin
from django.urls import path, include
from . import views
from django.views.generic import TemplateView
from dj_rest_auth.registration.views import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('test/', views.test_page),
    path('dj-rest-auth/registration/', RegisterView.as_view(), name='rest_register'),
    path('', TemplateView.as_view(template_name="index.html")),
]
