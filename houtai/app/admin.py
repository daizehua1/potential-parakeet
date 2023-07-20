from django.contrib.auth import authenticate, login

from app import models
from django.contrib import admin


def make_copy(request, queryset):
    print(queryset)


@admin.register(models.Parking)
class TableManagerAdmin(admin.ModelAdmin):
    # 表格显示的字段
    list_display = ['number', 'level', 'plate', 'car_type']

    # 修改的时候允许修改的字段
    fields = ['number', 'level', 'plate', 'car_type']

    # 添加搜索框
    search_fields = ['number', 'level', 'plate', 'car_type']

    # 设置哪些字段可以点击进入编辑界面
    list_display_links = ['number', 'level', 'plate', 'car_type']

    # 增加自定义按钮
    actions = ['delete_selected']

    def delete_selected(modeladmin, request, queryset):
        c = 0
        for i in queryset:
            i.delete()
            c += 1
        msg = '成功删除了{}个表管理'.format(c)
        modeladmin.message_user(request, msg)

    delete_selected.short_description = '删除已选项'


# @admin.register(models.Parking)
# class EmployeAdmin(admin.ModelAdmin):
#     # 一行数据显示哪些字段
#     list_display = ('number', 'level', 'plate', 'car_type', 'long_lease_user')
#
#     # 增加自定义按钮
#     actions = ['导入车牌号']


@admin.register(models.order)
class EmployeAdmin(admin.ModelAdmin):
    list_display = (
    'id', 'plate', 'number', 'level', 'start_time', 'end_time', 'total_fee', 'user_phone', 'address', 'paid', 'flag')
    search_fields = ['id', 'plate', 'level', 'user_phone','start_time', 'end_time']
    actions = ['delete_selected']

    def delete_selected(modeladmin, request, queryset):
        c = 0
        for i in queryset:
            i.delete()
            c += 1
        msg = '成功删除了{}个表管理'.format(c)
        modeladmin.message_user(request, msg)

    delete_selected.short_description = '删除已选项'

    def has_add_permission(self, request):
        return False





