from django.db import models


class Parking(models.Model):
    Parking_STATUS_CHOICES1 = (
        (1, "普通汽车"),
        (0, "新能源汽车"),
    )
    Parking_STATUS_CHOICES2 =(
        (1,"正在使用"),
        (0,"可预约")
    )
    number = models.IntegerField(verbose_name='停车位号', default=1)
    level = models.CharField(max_length=255, verbose_name='停车层', default="")
    plate = models.CharField(max_length=255, default='', verbose_name='车牌号', blank=True, null=True)
    car_type = models.IntegerField(default=None, verbose_name='车辆类型', blank=True, null=True,
                                   choices=Parking_STATUS_CHOICES1)
    long_lease_user = models.CharField(max_length=255, default='', verbose_name='长租用户', blank=True, null=True)
    pic = models.ImageField(upload_to="parking_space_number/", default='', verbose_name=u'车牌图片路径', blank=True,
                            null=True)
    flag = models.IntegerField(default=0, verbose_name='是否可用',choices=Parking_STATUS_CHOICES2)

    def __str__(self):
        return "{}".format(self.pic)

    # 返回名字
    class Meta:
        db_table = "app_Parking"
        verbose_name = '停车场管理'
        unique_together = (("number", "level"),)


class order(models.Model):
    ORDER_STATUS_CHOICES1 = (
        (2, "进行中"),
        (1, "待停放"),
        (0, "已停放"),
    )
    ORDER_STATUS_CHOICES2 = (
        (2, "进行中"),
        (1, "未支付"),
        (0, "已支付"),
    )
    plate = models.CharField(max_length=255, verbose_name='车牌', default='')
    number = models.IntegerField(verbose_name='停车位号', default=1)
    level = models.CharField(max_length=255, verbose_name='停车层', default='')
    start_time = models.DateTimeField(auto_now=True, verbose_name='开始时间')
    end_time = models.DateTimeField(auto_now=True, verbose_name='结束时间', null=True)
    # charging_fee = models.IntegerField(verbose_name='充电费用', default='', null=True)
    parking_fee = models.IntegerField(verbose_name='停车费用', default='', null=True)
    total_fee = models.IntegerField(verbose_name='总共的费用', default='', null=True)
    user_phone = models.CharField(max_length=255, verbose_name='用户手机号', default='')
    flag = models.IntegerField(verbose_name='是否已经停车', default='1', choices=ORDER_STATUS_CHOICES1)
    paid = models.IntegerField(verbose_name='是否已经支付', default='1', choices=ORDER_STATUS_CHOICES2)
    address = models.CharField(max_length=255, verbose_name='停车场位置', default='', null=True)

    class Meta:
        verbose_name = '订单管理'
