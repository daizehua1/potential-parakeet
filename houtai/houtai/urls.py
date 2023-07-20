"""houtai URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from app import views
from django.views.generic.base import RedirectView

from app.views import renew_api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('captcha/', include('captcha.urls')),
    # path('refresh_captcha/', views.refresh_captcha),  # 刷新验证码，ajax
    re_path(r'^favicon.ico$', RedirectView.as_view(url=r'/static/admin/logo/favicon.ico')),
    path('plate_check/', views.plate_check),
    path('uploal_action/', views.uploal_action),  # 保存上传文件
    path('data_analysis/', views.data_analysis),
    path('renew_api/',renew_api.as_view()),
    path('out_parking/', views.out_parking),


]
