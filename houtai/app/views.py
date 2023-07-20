from django.contrib import messages
from django.shortcuts import render

# Create your views here.

import requests
from django.shortcuts import render
from django.views.generic import View

from django.http import HttpResponse, JsonResponse
import json

# from captcha.models import CaptchaStore
# from captcha.helpers import captcha_image_url

# 数据分析
from app.models import Parking, order
from houtai import settings


def data_analysis(request):
    parking_fee = [0, 20, 30, 40, 50, 60, 100, 200, 300, 400, 500]
    charging_fee = [19, 10, 20, 30, 40, 50, 200, 100, 200, 300, 400]
    total_fee = [19, 30, 50, 70, 90, 110, 300, 300, 500, 700, 900]
    return render(request, "data_analysis.html",
                  {"parking_fee": parking_fee, "charging_fee": charging_fee, "total_fee": total_fee})


class renew_api(View):
    def dispatch(self, request, *args, **kwargs):
        """
        请求到来之后，都要执行dispatch方法，dispatch方法根据请求方式不同触发 get/post/put等方法

        注意：APIView中的dispatch方法有好多好多的功能
        """

        return super().dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        parking_fee = [20, 30, 40, 50, 60, 100, 200, 300, 400, 500]
        charging_fee = [10, 20, 30, 40, 50, 200, 100, 200, 300, 400]
        total_fee = [300, 50, 70, 90, 110, 300, 300, 500, 700, 900]
        ret = {'parking_fee': parking_fee, 'charging_fee': charging_fee, 'total_fee': total_fee}
        return HttpResponse(json.dumps(ret))


def plate_check(request):
    return render(request, "plate_check.html")


# 数据库中添加记录
def out_parking(request):
    parking_level = request.POST['parking_level']
    parking_number = request.POST['parking_number']
    order.objects.filter(number=parking_number,level=parking_level,flag=1,paid=2).update(flag=0,paid=1)
    Parking.objects.filter(number=parking_number,level=parking_level).update(flag=0,plate=None,pic=None)
    return render(request,"plate_check.html")

# /uploal_action/
def uploal_action(request):
    """保存上传文件"""
    # 1.获取上传的文件
    pic = request.FILES['pic']
    parking_level = request.POST['parking_level']
    parking_number = request.POST['parking_number']
    # print(parking_space)
    # 2.创建文件
    parking_space = parking_level + parking_number
    save_path2 = r'%s\parking_space_number\%s\%s' % (settings.MEDIA_ROOT, parking_space, pic.name)

    save_path1 = r'E:\python_object\car_parking\parking-serving\static\parking_space_number\%s\%s' % (
        parking_space, pic.name)
    # print()
    with  open(save_path1, 'wb') as f:
        # 获取上传文件的内容并写到创建文件中
        # pic.chunks():分块的返回文件
        for content in pic.chunks():
            f.write(content)
    with  open(save_path2, 'wb') as f:
        # 获取上传文件的内容并写到创建文件中
        # pic.chunks():分块的返回文件
        for content in pic.chunks():
            f.write(content)
    # 3.将保存操作写到数据库中
    Parking.objects.filter(number=parking_number, level=parking_level).update(
        pic=r'parking_space_number/%s/%s' % (parking_space, pic.name))

    # 4.返回响应
    pic_obj = Parking.objects.get(number=parking_number, level=parking_level)
    url = 'http://127.0.0.1:2000/get_plate'  # api链接
    params = {'parking_space': parking_space, 'save_path': save_path2}
    try:
        wb_data = requests.get(url, params)  # 引入requests库来请求数据
        result = wb_data.json()  # 将请求的数据转换为json格式
    except:
        messages.success(request, '请求失败')
        return render(request, 'plate_check.html', {})
    # if len(result) == 1:
    #     return render(request, "plate_check.html", {'result': result, 'pic_obj': pic_obj})
    plate_number = ''.join(result)
    print(plate_number)
    Parking.objects.filter(level=parking_level, number=parking_number).update(
        plate=plate_number, flag=1)
    order.objects.filter(number=parking_number,level=parking_level,flag=2,paid=2).update(flag=1)
    # plate_place = r'plate_place\plate.jpg'
    return render(request, "plate_check.html",
                  {'pic_obj': pic_obj, 'plate_number': plate_number})


# # 创建验证码
# def captcha():
#     hashkey = CaptchaStore.generate_key()  # 生成验证码答案
#     image_url = captcha_image_url(hashkey)  # 获取验证码地址
#     captcha = {'hashkey': hashkey, 'image_url': image_url}  # 创建包含hashkey和image_url的字典
#     return captcha  # 返回字典
#
#

# 验证验证码
def jarge_captcha(captchaStr, captchaHashkey):
    if captchaStr and captchaHashkey:  # 如果captchaStr和captchaHashkey都不为空
        try:
            # 获取根据hashkey获取数据库中的response值
            get_captcha = CaptchaStore.objects.get(hashkey=captchaHashkey)  # 根据hashkey在数据库中查找对应的CaptchaStore对象
            if get_captcha.response == captchaStr.lower():  # 如果验证码匹配
                return True  # 返回True表示验证成功
        except:
            return False  # 发生异常时返回False表示验证失败
    else:
        return False  # 如果captchaStr或captchaHashkey为空，则返回False表示验证失败


class IndexView(View):  # 定义一个名为IndexView的类，继承自View类
    def get(self, request):  # 定义get方法，用于处理GET请求
        hashkey = CaptchaStore.generate_key()  # 生成验证码答案
        image_url = captcha_image_url(hashkey)  # 获取验证码地址
        captcha = {'hashkey': hashkey, 'image_url': image_url}  # 创建包含hashkey和image_url的字典
        return render(request, "admin/login.html", locals())  # 使用render函数渲染login.html模板，并将captcha字典传递给模板

    def post(self, request):  # 定义post方法，用于处理POST请求
        capt = request.POST.get("captcha", None)  # 获取用户提交的验证码
        key = request.POST.get("hashkey", None)  # 获取验证码答案
        if jarge_captcha(capt, key):  # 调用jarge_captcha函数验证用户输入的验证码是否正确
            return HttpResponse("验证码正确")  # 如果验证成功，则返回一个HttpResponse对象，其中包含文本"验证码正确"
        else:
            return HttpResponse("验证码错误")  # 如果验证失败，则返回一个HttpResponse对象，其中包含文本"验证码错误"
