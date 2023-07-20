carPlateIdentity.py

```python
def hist_image(img):
    # ȷ������ͼ���Ƕ�ά�Ҷ�ͼ��
    assert img.ndim == 2
    # ��ʼ��ֱ��ͼ
    hist = [0 for i in range(256)]
    # ��ȡͼ��ĸߺͿ�
    img_h, img_w = img.shape[0], img.shape[1]

    # ����ֱ��ͼ
    for row in range(img_h):
        for col in range(img_w):
            hist[img[row, col]] += 1
    # ����ÿ������ֵ���ֵĸ���
    p = [hist[n] / (img_w * img_h) for n in range(256)]
    # �����ۻ����ʷֲ�
    p1 = np.cumsum(p)
    # �����ۻ����ʷֲ�����ӳ��ÿ������ֵ
    for row in range(img_h):
        for col in range(img_w):
            v = img[row, col]
            img[row, col] = p1[v] * 255
    # ���ؾ��⻯���ͼ��
    return img
```
����һ�δ�������ע�͵Ĵ��룺

```python
def find_board_area(img):
    # ȷ������ͼ���Ƕ�ά�Ҷ�ͼ��
    assert img.ndim == 2
    # ��ȡͼ��ĸߺͿ�
    img_h, img_w = img.shape[0], img.shape[1]
    # ��ʼ���߽�ֵ
    top, bottom, left, right = 0, img_h, 0, img_w
    flag = False
    # ��ʼ��ˮƽ�ʹ�ֱͶӰ����
    h_proj = [0 for i in range(img_h)]
    v_proj = [0 for i in range(img_w)]

    # ����ˮƽͶӰ
    for row in range(round(img_h * 0.5), round(img_h * 0.8), 3):
        for col in range(img_w):
            if img[row, col] == 255:
                h_proj[row] += 1
        # ����ˮƽͶӰȷ�����±߽�
        if flag == False and h_proj[row] > 12:
            flag = True
            top = row
        if flag == True and row > top + 8 and h_proj[row] < 12:
            bottom = row
            flag = False

    # ���㴹ֱͶӰ
    for col in range(round(img_w * 0.3), img_w, 1):
        for row in range(top, bottom, 1):
            if img[row, col] == 255:
                v_proj[col] += 1
        # ���ݴ�ֱͶӰȷ����߽�
        if flag == False and (v_proj[col] > 10 or v_proj[col] - v_proj[col - 1] > 5):
            left = col
            break
    # ���ر߽�ֵ
    return left, top, 120, bottom - top - 10
```
����һ�δ�������ע�͵Ĵ��룺

```python
def verify_scale(rotate_rect):
    # ������Χ
    error = 0.4
    # ���峤���
    aspect = 4  # 4.7272
    # ������С�����������
    min_area = 10 * (10 * aspect)
    max_area = 150 * (150 * aspect)
    # ������С����Ⱥ���󳤿��
    min_aspect = aspect * (1 - error)
    max_aspect = aspect * (1 + error)
    # ������б�Ƕ���ֵ
    theta = 30

    # ������εĿ���Ϊ0��ֱ�ӷ���False
    if rotate_rect[1][0] == 0 or rotate_rect[1][1] == 0:
        return False

    # ������εĳ����
    r = rotate_rect[1][0] / rotate_rect[1][1]
    r = max(r, 1 / r)
    # ����������
    area = rotate_rect[1][0] * rotate_rect[1][1]
    # �жϾ����Ƿ���������ͳ���ȵ�Ҫ��
    if area > min_area and area < max_area and r > min_aspect and r < max_aspect:
        # �жϾ��ε���б�Ƕ��Ƿ�����ֵ��Χ��
        if ((rotate_rect[1][0] < rotate_rect[1][1] and rotate_rect[2] >= -90 and rotate_rect[2] < -(90 - theta)) or
                (rotate_rect[1][1] < rotate_rect[1][0] and rotate_rect[2] > -theta and rotate_rect[2] <= 0)):
            return True
    return False
```
����һ�δ�������ע�͵Ĵ��룺

```python
def img_Transform(car_rect, image):
    # ��ȡͼ��ĸߺͿ�
    img_h, img_w = image.shape[:2]
    # ��ȡ���εĿ�͸�
    rect_w, rect_h = car_rect[1][0], car_rect[1][1]
    # ��ȡ���ε���б�Ƕ�
    angle = car_rect[2]

    return_flag = False
    # ������ε���б�Ƕ�Ϊ0
    if car_rect[2] == 0:
        return_flag = True
    # ������ε���б�Ƕ�Ϊ-90�ҿ�С�ڸ�
    if car_rect[2] == -90 and rect_w < rect_h:
        # ������͸�
        rect_w, rect_h = rect_h, rect_w
        return_flag = True
    # ������㷵��������ֱ�ӷ��ؾ��������ڵ�ͼ��
    if return_flag:
        car_img = image[int(car_rect[0][1] - rect_h / 2):int(car_rect[0][1] + rect_h / 2),
                  int(car_rect[0][0] - rect_w / 2):int(car_rect[0][0] + rect_w / 2)]
        return car_img

    # ���¾��β���
    car_rect = (car_rect[0], (rect_w, rect_h), angle)
    # ������ε��ĸ���������
    box = cv2.boxPoints(car_rect)

    heigth_point = right_point = [0, 0]
    left_point = low_point = [car_rect[0][0], car_rect[0][1]]
```
��δ��붨����һ����Ϊ`img_Transform`�ĺ�����������һ����ת���κ�һ��ͼ����Ϊ���롣�������Ȼ�ȡͼ��ĸߺͿ�Ȼ���ȡ��ת���εĿ�͸��Լ���б�Ƕȡ������ת���ε���б�Ƕ�Ϊ0����Ϊ-90�ҿ�С�ڸߣ���ֱ�ӷ��ؾ��������ڵ�ͼ�񡣷��򣬸�����ת���εĲ������������ĸ��������ꡣ

��������δ��벢������������޷�ȷ��������Ŀ�ġ�

����һ�δ�������ע�͵Ĵ��룺

```python
    for point in box:
        # �ҵ����ε����ϽǺ����½�
        if left_point[0] > point[0]:
            left_point = point
        if low_point[1] > point[1]:
            low_point = point
        if heigth_point[1] < point[1]:
            heigth_point = point
        if right_point[0] < point[0]:
            right_point = point

    # ������ε���б�Ƕ�Ϊ��
    if left_point[1] <= right_point[1]:
        # �����µ����Ͻ�����
        new_right_point = [right_point[0], heigth_point[1]]
        # �������任����
        pts1 = np.float32([left_point, heigth_point, right_point])
        pts2 = np.float32([left_point, heigth_point, new_right_point])
        M = cv2.getAffineTransform(pts1, pts2)
        # ��ͼ����з���任
        dst = cv2.warpAffine(image, M, (round(img_w * 2), round(img_h * 2)))
        # ��ȡ�任��ľ��������ڵ�ͼ��
        car_img = dst[int(left_point[1]):int(heigth_point[1]), int(left_point[0]):int(new_right_point[0])]

    # ������ε���б�Ƕ�Ϊ��
    elif left_point[1] > right_point[1]:
        # �����µ����Ͻ�����
        new_left_point = [left_point[0], heigth_point[1]]
        # �������任����
        pts1 = np.float32([left_point, heigth_point, right_point])
        pts2 = np.float32([new_left_point, heigth_point, right_point])
        M = cv2.getAffineTransform(pts1, pts2)
        # ��ͼ����з���任
        dst = cv2.warpAffine(image, M, (round(img_w * 2), round(img_h * 2)))
        # ��ȡ�任��ľ��������ڵ�ͼ��
        car_img = dst[int(right_point[1]):int(heigth_point[1]), int(new_left_point[0]):int(right_point[0])]

    return car_img
```
��δ�����`img_Transform`�����ĺ�벿�֡������ȱ�����ת���ε��ĸ��������꣬�ҵ����ε����ϽǺ����½ǡ�Ȼ����ݾ��ε���б�Ƕȣ������µĶ������꣬�����������任������󣬶�ͼ����з���任������ȡ�任��ľ��������ڵ�ͼ��

����������`img_Transform`��������һ����ת���κ�һ��ͼ����Ϊ���룬������ת���������ھ�������任���ͼ��


����һ�δ�������ע�͵Ĵ��룺

```python
def pre_process(orig_img):
    # ��ͼ��ת��Ϊ�Ҷ�ͼ��
    gray_img = cv2.cvtColor(orig_img, cv2.COLOR_BGR2GRAY)

    # ��ͼ����о�ֵģ��
    blur_img = cv2.blur(gray_img, (3, 3))

    # ��ͼ�����Sobel��Ե���
    sobel_img = cv2.Sobel(blur_img, cv2.CV_16S, 1, 0, ksize=3)
    sobel_img = cv2.convertScaleAbs(sobel_img)

    # ��ͼ��ת��ΪHSV��ɫ�ռ�
    hsv_img = cv2.cvtColor(orig_img, cv2.COLOR_BGR2HSV)

    # ��ȡH��S��V����ͨ����ͼ��
    h, s, v = hsv_img[:, :, 0], hsv_img[:, :, 1], hsv_img[:, :, 2]
    # ����Hͨ����ȡֵ��Χ��S��Vͨ������ֵ����ȡ�ض���ɫ����
    blue_img = (((h > 11) & (h < 34)) | ((h > 100) & (h < 124)) | ((h > 35) & (h < 77)) | ((h > 78) & (h < 99))) & (
            s > 70) & (v > 70)
    blue_img = blue_img.astype('float32')
    # ��Sobel��Ե���������ɫ��ȡ������
    mix_img = np.multiply(sobel_img, blue_img)

    # ��ͼ��ת��Ϊuint8����
    mix_img = mix_img.astype(np.uint8)
    # ��ͼ����ж�ֵ������
    ret, binary_img = cv2.threshold(mix_img, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # ����ṹԪ��
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 5))
    # ��ͼ����б�����
    close_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel)

    return close_img
```
��δ��붨����һ����Ϊ`pre_process`�ĺ�����������һ����ɫͼ����Ϊ���롣�������Ƚ���ɫͼ��ת��Ϊ�Ҷ�ͼ��Ȼ��ԻҶ�ͼ����о�ֵģ����Sobel��Ե��⡣���ţ�����ɫͼ��ת��ΪHSV��ɫ�ռ䣬������Hͨ����ȡֵ��Χ��S��Vͨ������ֵ����ȡ�ض���ɫ����Ȼ��Sobel��Ե���������ɫ��ȡ�����ˣ��õ����ͼ����󣬶Ի��ͼ����ж�ֵ������ͱ����㣬���ش����Ķ�ֵͼ��


����һ�δ�������ע�͵Ĵ��룺

```python
def verify_color(rotate_rect, src_image):
    # ��ȡͼ��ĸߺͿ�
    img_h, img_w = src_image.shape[:2]
    # ������ģͼ��
    mask = np.zeros(shape=[img_h + 2, img_w + 2], dtype=np.uint8)
    # ������ͨ��
    connectivity = 4
    # ������ɫ��ֵ��ֵ
    loDiff, upDiff = 30, 30
    # ���������ɫ
    new_value = 255
    # ���ñ�־λ
    flags = connectivity
    flags |= cv2.FLOODFILL_FIXED_RANGE
    flags |= new_value << 8
    flags |= cv2.FLOODFILL_MASK_ONLY

    # �������������������Ч��������
    rand_seed_num = 5000
    valid_seed_num = 200
    # �����������
    adjust_param = 0.1
    # ������ת���ε��ĸ���������
    box_points = cv2.boxPoints(rotate_rect)

```python
flood_img = src_image.copy()  # ����ԭʼͼ��ĸ���
seed_cnt = 0  # ��ʼ����Ч��������
for i in range(rand_seed_num):  # ѭ������������ӵ�
    rand_index = np.random.choice(rand_seed_num, 1, replace=False)  # ���ѡ��һ������
    row, col = points_row[rand_index], points_col[rand_index]  # ��ȡ���ӵ���к�������
    # ������ӵ����ɫ�Ƿ���ָ����Χ��
    if (((h[row, col] > 11) & (h[row, col] < 34)) | ((h[row, col] > 78) & (h[row, col] < 99)) | (
            (h[row, col] > 100) & (h[row, col] < 124)) | (
                (h[row, col] > 35) & (h[row, col] < 77))) & (
            s[row, col] > 70) & (v[row, col] > 70):
        cv2.floodFill(src_image, mask, (col, row), (255, 255, 255), (loDiff,) * 3, (upDiff,) * 3, flags)  # �������ͼ��
        cv2.circle(flood_img, center=(col, row), radius=2, color=(0, 0, 255), thickness=2)  # �� flood_img �ϻ��ƺ�ɫԲȦ
        seed_cnt += 1  # ������Ч��������
        if seed_cnt >= valid_seed_num:  # ����ﵽ��Ч���������������ѭ��
            break
```

����������������
```
��δ��������һ�δ��룬��ȡ��ת���ε�x�����y���꣬Ȼ����ݵ�����������x�����y����ĵ���ֵ�����ţ�����x�����y�����ȡֵ��Χ��

��������δ�����Ȼ������������޷�ȷ��������Ŀ�ġ�

����`verify_color`�����ĺ������֣���������ע�͵Ĵ��룺

```python
    # ���x�����y�����ȡֵ��Χ��С
    if (col_range[1] - col_range[0]) / (box_points_x[3] - box_points_x[0]) < 0.4 \
            or (row_range[1] - row_range[0]) / (box_points_y[3] - box_points_y[0]) < 0.4:
        points_row = []
        points_col = []
        # ������ת���εĶԽ���
        for i in range(2):
            pt1, pt2 = box_points[i], box_points[i + 2]
            # ����x�����y����ĵ���ֵ
            x_adjust, y_adjust = int(adjust_param * (abs(pt1[0] - pt2[0]))), int(adjust_param * (abs(pt1[1] - pt2[1])))
            # ���ݵ���ֵ����x����
            if (pt1[0] <= pt2[0]):
                pt1[0], pt2[0] = pt1[0] + x_adjust, pt2[0] - x_adjust
            else:
                pt1[0], pt2[0] = pt1[0] - x_adjust, pt2[0] + x_adjust
            # ���ݵ���ֵ����y����
            if (pt1[1] <= pt2[1]):
                pt1[1], pt2[1] = pt1[1] + adjust_y, pt2[1] - adjust_y
            else:
                pt1[1], pt2
```
��δ��������һ�δ��룬���x�����y�����ȡֵ��Χ��С���������ת���εĶԽ��ߡ����ţ�����x�����y����ĵ���ֵ�������ݵ���ֵ����x�����y���ꡣ

��������δ�����Ȼ������������޷�ȷ��������Ŀ�ġ�


����`verify_color`�����ĺ������֣���������ע�͵Ĵ��룺

```python
    # �����ӵ�����ת��Ϊnumpy����
    points_row = np.array(points_row)
    points_col = np.array(points_col)
    # ��ͼ��ת��ΪHSV��ɫ�ռ�
    hsv_img = cv2.cvtColor(src_image, cv2.COLOR_BGR2HSV)
    # ��ȡH��S��V����ͨ����ͼ��
    h, s, v = hsv_img[:, :, 0], hsv_img[:, :, 1], hsv_img[:, :, 2]
    # ����ԭʼͼ��
    flood_img = src_image.copy()
    # ��ʼ�����Ӽ�����
    seed_cnt = 0
    # ����������ӵ�
    for i in range(rand_seed_num):
        # ���ѡ��һ�����ӵ�
        rand_index = np.random.choice(rand_seed_num, 1, replace=False)
        row, col = points_row[rand_index], points_col[rand_index]
        # �ж����ӵ��Ƿ�������ɫҪ��
        if (((h[row, col] > 11) & (h[row, col] < 34)) | ((h[row, col] > 78) & (h[row, col] < 99)) | (
                (h[row, col] > 100) & (h[row, col] < 124)) | (
                    (h[row, col] > 35) & (h[row, col] < 77))) & (
                s[row, col] > 70) & (v[row, col] > 70):
            # �����ӵ������ˮ���
            cv2.floodFill(src_image, mask, (col, row), (255, 255, 255), (loDiff,) * 3, (upDiff,) * 3, flags)
            # �����ͼ���ϻ���Բ�α��
            cv2.circle(flood_img, center=(col, row), radius=2, color=(0,
```
��δ��������һ�δ��룬�����ӵ�����ת��Ϊnumpy���顣���ţ���ͼ��ת��ΪHSV��ɫ�ռ䣬����ȡH��S��V����ͨ����ͼ��Ȼ����ԭʼͼ�񣬲���ʼ�����Ӽ���������󣬱���������ӵ㣬�ж����ӵ��Ƿ�������ɫҪ��������㣬������ӵ������ˮ��䣬�������ͼ���ϻ���Բ�α�ǡ�

��������δ�����Ȼ������������޷�ȷ��������Ŀ�ġ�


����`verify_color`�����ĺ������֣���������ע�͵Ĵ��룺

```python
    # ��ʼ����ģ���б�
    mask_points = []
    # ������ģͼ��
    for row in range(1, img_h + 1):
        for col in range(1, img_w + 1):
            # �����ģͼ�������ֵ��Ϊ0
            if mask[row, col] != 0:
                # ������������ӵ���ģ���б���
                mask_points.append((col - 1, row - 1))
    # ������ģ�����С��Ӿ���
    mask_rotateRect = cv2.minAreaRect(np.array(mask_points))
    # �ж���С��Ӿ����Ƿ�����Ҫ��
    if verify_scale(mask_rotateRect):
        return True, mask_rotateRect
    else:
        return False, mask_rotateRect
```
��δ��������һ�δ��룬��ʼ����ģ���б����ţ�������ģͼ�������ģͼ�������ֵ��Ϊ0��������������ӵ���ģ���б��С�Ȼ�������ģ�����С��Ӿ��Σ����ж���С��Ӿ����Ƿ�����Ҫ��������㣬�򷵻�True����С��Ӿ��Σ����򣬷���False����С��Ӿ��Ρ�

����������`verify_color`��������һ����ת���κ�һ��ͼ����Ϊ���롣�������Ȼ�ȡͼ��ĸߺͿ�Ȼ�󴴽�һ����ģͼ�񡣽��ţ�������ͨ�ԡ���ɫ��ֵ��ֵ�������ɫ�ͱ�־λ��Ȼ�������������������Ч���������͵�����������󣬼�����ת���ε��ĸ��������ꡣ

��������������ȡ��ת���ε�x�����y���꣬Ȼ����ݵ�����������x�����y����ĵ���ֵ�����ţ�����x�����y�����ȡֵ��Χ�����x�����y�����ȡֵ��Χ��С���������ת���εĶԽ��ߣ��ڶԽ���������������ӵ㡣������x�����y�����ȡֵ��Χ������������ӵ㡣

Ȼ�󣬽����ӵ�����ת��Ϊnumpy���顣���ţ���ͼ��ת��ΪHSV��ɫ�ռ䣬����ȡH��S��V����ͨ����ͼ��Ȼ����ԭʼͼ�񣬲���ʼ�����Ӽ���������󣬱���������ӵ㣬�ж����ӵ��Ƿ�������ɫҪ��������㣬������ӵ������ˮ��䣬�������ͼ���ϻ���Բ�α�ǡ�

��󣬺�����ʼ����ģ���б����ţ�������ģͼ�������ģͼ�������ֵ��Ϊ0��������������ӵ���ģ���б��С�Ȼ�������ģ�����С��Ӿ��Σ����ж���С��Ӿ����Ƿ�����Ҫ��������㣬�򷵻�True����С��Ӿ��Σ����򣬷���False����С��Ӿ��Ρ�

����������δ�����������һ����Ϊ`verify_scale`�ĺ��������ú���δ�ڴ����и������塣


����һ�δ�������ע�͵Ĵ��룺

```python
def pre_process(orig_img):
    # ��ԭʼͼ��ת��Ϊ�Ҷ�ͼ
    gray_img = cv2.cvtColor(orig_img, cv2.COLOR_BGR2GRAY)
    cv2.imshow('gray_img', gray_img)

    # �ԻҶ�ͼ��Ӧ��ģ���˾�
    blur_img = cv2.blur(gray_img, (3, 3))
    cv2.imshow('blur', blur_img)

    # ��ģ��ͼ��Ӧ��Sobel�˾�
    sobel_img = cv2.Sobel(blur_img, cv2.CV_16S, 1, 0, ksize=3)
    sobel_img = cv2.convertScaleAbs(sobel_img)
    cv2.imshow('sobel', sobel_img)

    # ��ԭʼͼ��ת��ΪHSV��ɫ�ռ�
    hsv_img = cv2.cvtColor(orig_img, cv2.COLOR_BGR2HSV)

    # ��ȡHSV��ɫ�ռ��е�H��S��Vͨ��
    h, s, v = hsv_img[:, :, 0], hsv_img[:, :, 1], hsv_img[:, :, 2]

    # ��ɫɫ������[26��34],��ɫɫ������:[100,124]
    blue_img = (((h > 11) & (h < 34)) | ((h > 100) & (h < 124)) | ((h > 35) & (h < 77)) | ((h > 78) & (h < 99))) & (
            s > 70) & (v > 70)

    # ��blue_imgת��Ϊfloat32����
    blue_img = blue_img.astype('float32')

    # ��sobelͼ���blueͼ����� ��һ���ǽ�Sobel�˾�������ͼ���blue_img��ˡ�����blue_img��һ����ֵͼ������ֵΪ1�����ر�ʾ��������ԭʼͼ�������ڻ�ɫ����ɫ����ֵΪ0�����ر�ʾ�����ز�������������ɫ����ˣ���Sobelͼ���blue_img��˺�ֻ��ԭʼͼ���л�ɫ����ɫ�Ĳ��ֻᱣ�����������ಿ�ֶ����Ϊ0�������Ϳ���ֻ����ԭʼͼ���л�ɫ����ɫ�ı�Ե��Ϣ��
    mix_img = np.multiply(sobel_img, blue_img)

    # ��ʾmixͼ��
    cv2.imshow('mix', mix_img)

    # ��mixͼ��ת��Ϊuint8����
    mix_img = mix_img.astype(np.uint8)

    # ��mixͼ��Ӧ�ö�ֵ��ֵ
    ret, binary_img = cv2.threshold(mix_img, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)

    # ����һ���ṹԪ�� ��һ���Ƕ���һ���ṹԪ�أ����ں�������̬ѧ�����㡣cv2.getStructuringElement�������ڴ���һ��ָ����״�ʹ�С�ĽṹԪ�ء��������һ������cv2.MORPH_RECT��ʾ�ṹԪ�ص���״Ϊ���Σ��ڶ�������(21, 5)��ʾ�ṹԪ�صĴ�СΪ21x5��
�ṹԪ����������̬ѧ����ĺ��ĸ���֮һ������������̬ѧ���������ص������ϵ�������������һ��21x5�ľ��νṹԪ�أ����ں�������̬ѧ�����㡣21x5��ʾ�ṹԪ�صĴ�С����λ�����ء�����ζ�ŽṹԪ�صĿ��Ϊ21�����أ��߶�Ϊ5�����ء�
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (21, 5))

    # �Զ�ֵͼ��ִ����̬ѧ������ ��һ���ǶԶ�ֵͼ��binary_imgִ����̬ѧ�����㡣cv2.morphologyEx��������ִ����̬ѧ���㡣�������һ������binary_img������ͼ�񣬵ڶ�������cv2.MORPH_CLOSE��ʾִ����̬ѧ�����㣬����������kernel��ǰ�涨��ĽṹԪ�ء�

��̬ѧ��������һ����̬ѧ���㣬�����������ͼ���е�С���ͷ�϶���������������ͺ�ʴ�Ĺ��̡�������Զ�ֵͼ��ִ����̬ѧ�������������е�С���ͷ�϶��ʹ��ͼ���е��������������
    close_img = cv2.morphologyEx(binary_img, cv2.MORPH_CLOSE, kernel)

    # ���ؽ��
    return close_img
```

��Ȼ�����Ǵ���ע�͵Ĵ��룬�Խ���ÿ�����ֵ����ã�

```python
def locate_carPlate(orig_img, pred_image):
    carPlate_list = [] # ��ʼ��һ���б����洢�ҵ��ĳ���
    temp1_orig_img = orig_img.copy()  # ���ڵ���
    temp2_orig_img = orig_img.copy()  # ���ڵ���
    # ��Ԥ��ͼ���в�������
    cloneImg, contours, heriachy = cv2.findContours(pred_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    # �����ҵ���ÿ������
    for i, contour in enumerate(contours):
        # ��ԭʼͼ���ϻ������������ڵ���
        cv2.drawContours(temp1_orig_img, contours, i, (0, 255, 255), 2)
        # ��ȡ��Χ��������С�������
        rotate_rect = cv2.minAreaRect(contour)
        # ���ݾ��ε�����ͳ���ȼ�����Ƿ���ϳ��Ƶı�׼
        if verify_scale(rotate_rect):
            # ��֤���Ƶ���ɫ
            ret, rotate_rect2 = verify_color(rotate_rect, temp2_orig_img)
            if ret == False:
                continue
            # ��������λ��
            car_plate = img_Transform(rotate_rect2, temp2_orig_img)
            # ��������ͼ��Ĵ�С���Ա���л���CNN��ʶ��
            car_plate = cv2.resize(car_plate, (car_plate_w, car_plate_h))
            # ���Ƴ�����Χ�Ŀ����ڵ���
            box = cv2.boxPoints(rotate_rect2)
            for k in range(4):
                n1, n2 = k % 4, (k + 1) % 4
                cv2.line(temp1_orig_img, (box[n1][0], box[n1][1]), (box[n2][0], box[n2][1]), (255,��
                ���д������������ԭʼͼ���ϻ���һ�����ο����ڱ�ǳ��Ƶ�λ�á���ʹ�� `cv2.line` ������ͼ���ϻ���ֱ�ߣ����Ӿ��ο���ĸ����㡣`box` ��һ���������ο��ĸ�������������飬`n1` �� `n2` �����ڱ�����Щ�����������`(box[n1][0], box[n1][1])` �� `(box[n2][0], box[n2][1])` �ֱ��ʾ���ο���������ڶ�������ꡣ`(255, 0, 0)` ��ʾ����ֱ�ߵ���ɫΪ��ɫ��`2` ��ʾֱ�ߵĴ�ϸ��


            ```python
def cnn_select_carPlate(plate_list, model_path):
    # ��������б�Ϊ�գ����� False �Ϳ��б�
    if len(plate_list) == 0:
        return False, plate_list
    # ����һ�� TensorFlow ����ͼ
    g1 = tf.Graph()
    # �ڼ���ͼ�д���һ�� TensorFlow �Ự
    sess1 = tf.Session(graph=g1)
    # �ڻỰ����������ִ�����²���
    with sess1.as_default():
        # �ڼ���ͼ����������ִ�����²���
        with sess1.graph.as_default():
            # ��ȡģ��·����Ŀ¼����
            model_dir = os.path.dirname(model_path)
            # ����Ԫͼ
            saver = tf.train.import_meta_graph(model_path)
            # �ָ��Ự
            saver.restore(sess1, tf.train.latest_checkpoint(model_dir))
            # ��ȡĬ�ϼ���ͼ
            graph = tf.get_default_graph()
            # ��ȡ���� x_place:0
            net1_x_place = graph.get_tensor_by_name('x_place:0')
            # ��ȡ���� keep_place:0
            net1_keep_place = graph.get_tensor_by_name('keep_place:0')
            # ��ȡ���� out_put:0
            net1_out = graph.get_tensor_by_name('out_put:0')

            # �������б�ת��Ϊ numpy ����
            input_x = np.array(plate_list)
            # �� out_put:0 ����Ӧ�� softmax ����
            net_outs = tf.nn.softmax(net1_out)
            # ��ȡԤ����
            preds = tf.argmax(net_outs, 1)
            # ��ȡ�������ֵ
            probs = tf.reduce_max(net_outs, reduction_indices=[1])
            # ���лỰ����ȡԤ���б�͸����б�
            pred_list, prob_list = sess1.run([preds, probs], feed_dict={net1_x_place: input_x, net1_keep_place: 1.0})
            # ��ʼ����������ͽ������ֵ
            result_index, result_prob = -1, 0.
            # ����Ԥ���б�ѡ���������ĳ���
            for i, pred in enumerate(pred_list):
                if pred == 1 and prob_list[i] > result_prob:
                    result_index, result_prob = i, prob_list[i]
            # ���δѡ���ƣ����� False ���б��еĵ�һ������
            if result_index == -1:
                return False, plate_list[0]
            else:
                return True, plate_list[result_index]
```

��⳵��ģ�� plateNeuralNet.py

�õģ���������ע�͵Ĵ��룺

```python
def train(self, data_dir, model_save_path):
    # ����ѵ����������������Ŀ¼��ģ�ͱ���·����Ϊ����
    print('ready load train dataset')
    # ��ӡ׼������ѵ�����ݼ�����Ϣ
    X, y = self.init_data(data_dir)
    # ʹ��init_data����������Ŀ¼�м������ݣ��������Ϊ������X���ͱ�ǩ��y��
    print('success load ' + str(len(y)) + ' datas')
    # ��ӡ�ɹ��������ݵ�����
    train_x, test_x, train_y, test_y = train_test_split(X, y, test_size=0.2, random_state=0)
    # ʹ��train_test_split���������ݷ�Ϊѵ�����Ͳ��Լ������Լ���СΪ20%

    out_put = self.cnn_construct()
    # ʹ��cnn_construct�����������������
    predicts = tf.nn.softmax(out_put)
    # ���������Ӧ��softmax�������õ�Ԥ�����
    predicts = tf.argmax(predicts, axis=1)
    # ʹ��argmax�����ҵ��������������ΪԤ�����
    actual_y = tf.argmax(self.y_place, axis=1)
    # ʹ��argmax�����ҵ�ʵ�ʱ�ǩ�е����
    accuracy = tf.reduce_mean(tf.cast(tf.equal(predicts, actual_y), dtype=tf.float32))
    # ����Ԥ������ʵ�������ȵı�������׼ȷ��
    cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=out_put, labels=self.y_place))
    # ���㽻������ʧ
    opt = tf.train.AdamOptimizer(self.learn_rate)
    # ����Adam�Ż���
    train_step = opt.minimize(cost)
    # ����ѵ�����裬Ŀ������С����ʧ

    with tf.Session() as sess:
        # ����TensorFlow�Ự
        init = tf.global_variables_initializer()
        # ��ʼ��ȫ�ֱ���
        sess.run(init)
        # �ڻỰ�����г�ʼ������
        step = 0
        # ��ʼ������Ϊ0
        saver = tf.train.Saver()
        # ����Saver�������ڱ���ģ��
        while True:
            # ��ʼѵ��ѭ��
            train_index = np.random.choice(len(train_x), self.batch_size, replace=False)
            # ���ѡ��һ��ѵ�����ݵ�����
            train_randx = train_x[train_index]
            # ��ȡ��Ӧ��ѵ����������
            train_randy = train_y[train_index]
            # ��ȡ��Ӧ��ѵ�����ݱ�ǩ
            _, loss = sess.run([train_step, cost], feed_dict={self.x_place: train_randx,
                                                              self.y_place: train_randy, self.keep_place: 0.75})
            # �ڻỰ������ѵ������ͼ�����ʧ������ѵ�����ݺͱ������ʣ�����dropout��
            step += 1
            # ������1
            print(step, loss)
            # ��ӡ��ǰ��������ʧ

            if step % 10 == 0:
                # ÿ10�����һ��׼ȷ��
                test_index = np.random.choice(len(test_x), self.batch_size, replace=False)
                # ���ѡ��һ���������ݵ�����
                test_randx = test_x[test_index]
                # ��ȡ��Ӧ�Ĳ�����������
                test_randy = test_y[test_index]
                # ��ȡ��Ӧ�Ĳ������ݱ�ǩ
                acc = sess.run(accuracy, feed_dict={self.x_place: test_randx,
                                                    self.y_place: test_randy, self.keep_place: 1.0})
                # �ڻỰ�����м���׼ȷ�ʣ�����������ݺͱ������ʣ�����dropout��
                print('accuracy:' + str(acc))
                # ��ӡ׼ȷ��

                �õģ�����ʣ�µĴ��������ע�ͣ�

```python
                if acc > 0.99 and step > 500:
��һ���������Ǽ��ģ���ڲ��Լ��ϵ�׼ȷ���Ƿ񳬹���0.99��ѵ�������Ƿ񳬹���500�����������������������ô�ͻᱣ��ģ�Ͳ�����ѵ��ѭ����
��һ����Ϊ��ȷ��ģ���ڲ��Լ��ϴﵽ���㹻�ߵ�׼ȷ�ʣ��Ҿ������㹻���ѵ�����裬�Żᱣ��ģ�Ͳ�����ѵ����
����δ����У�һ��ָ����һ��ѵ����������ÿ��ѵ�������У������ѡ��һ��ѵ�����ݣ�Ȼ��ִ��һ���ݶ��½�������ģ�Ͳ�����
��ˣ�500��ָ����ִ����500��ѵ�����������������һ�������������Ը���ʵ��������е�����������ȷ��ģ�;������㹻���ѵ���������Żᱣ��ģ�Ͳ�����ѵ����
                    # ���׼ȷ�ʳ���0.99�Ҳ�������500
                    saver.save(sess, model_save_path)
                    # ����ģ��
                    break
                    # ����ѵ��ѭ��
```

�������δ����ȫ�����ݡ�ϣ����������������



�õģ���������ע�͵Ĵ��룺

```python
def cnn_construct(self):
    # ����cnn_construct���������ڹ������������
    x_input = tf.reshape(self.x_place, shape=[-1, self.img_h, self.img_w, 3])
    # ����������self.x_place����Ϊ��״Ϊ[-1, self.img_h, self.img_w, 3]������

    cw1 = tf.Variable(tf.random_normal(shape=[3, 3, 3, 32], stddev=0.01), dtype=tf.float32)
    # �����һ�������ľ���ˣ���״Ϊ[3, 3, 3, 32]
    cb1 = tf.Variable(tf.random_normal(shape=[32]), dtype=tf.float32)
    # �����һ��������ƫ�ã���״Ϊ[32]
    conv1 = tf.nn.relu(tf.nn.bias_add(tf.nn.conv2d(x_input, filter=cw1, strides=[1, 1, 1, 1], padding='SAME'), cb1))
    # ���������ݽ��о��������Ȼ�����ƫ�ã���Ӧ��ReLU�����
    conv1 = tf.nn.max_pool(conv1, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')
    # �Ծ������������ػ�����
    conv1 = tf.nn.dropout(conv1, self.keep_place)
    # �Գػ����Ӧ��dropout����

    cw2 = tf.Variable(tf.random_normal(shape=[3, 3, 32, 64], stddev=0.01), dtype=tf.float32)
    # ����ڶ��������ľ���ˣ���״Ϊ[3, 3, 32, 64]
    cb2 = tf.Variable(tf.random_normal(shape=[64]), dtype=tf.float32)
    # ����ڶ���������ƫ�ã���״Ϊ[64]
    conv2 = tf.nn.relu(tf.nn.bias_add(tf.nn.conv2d(conv1, filter=cw2, strides=[1, 1, 1, 1], padding='SAME'), cb2))
    # �Ե�һ��������������о��������Ȼ�����ƫ�ã���Ӧ��ReLU�����
    �õģ�����ʣ�µĴ��������ע�ͣ�

```python
    conv2 = tf.nn.max_pool(conv2, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')
    # �Ծ������������ػ�����
    conv2 = tf.nn.dropout(conv2, self.keep_place)
    # �Գػ����Ӧ��dropout����

    cw3 = tf.Variable(tf.random_normal(shape=[3, 3, 64, 128], stddev=0.01), dtype=tf.float32)
    # ��������������ľ���ˣ���״Ϊ[3, 3, 64, 128]
    cb3 = tf.Variable(tf.random_normal(shape=[128]), dtype=tf.float32)
    # ���������������ƫ�ã���״Ϊ[128]
    conv3 = tf.nn.relu(tf.nn.bias_add(tf.nn.conv2d(conv2, filter=cw3, strides=[1, 1, 1, 1], padding='SAME'), cb3))
    # �Եڶ���������������о��������Ȼ�����ƫ�ã���Ӧ��ReLU�����
    conv3 = tf.nn.max_pool(conv3, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding='SAME')
    # �Ծ������������ػ�����
    conv3 = tf.nn.dropout(conv3, self.keep_place)
    # �Գػ����Ӧ��dropout����

    conv_out = tf.reshape(conv3, shape=[-1, 17 * 5 * 128])
    # �����һ���������������Ϊһά����

    fw1 = tf.Variable(tf.random_normal(shape=[17 * 5 * 128, 1024], stddev=0.01), dtype=tf.float32)
    # �����һ��ȫ���Ӳ��Ȩ�أ���״Ϊ[17 * 5 * 128��1024]
    fb1 = tf.Variable(tf.random_normal(shape=[1024]), dtype=tf.float32)
    # �����һ��ȫ���Ӳ��ƫ�ã���״Ϊ[1024]
    fully1 = tf.nn.relu(tf.add(tf.matmul(conv_out, fw1), fb1))
    # �����ܺ���������о���˷�������Ȼ�����ƫ�ã���Ӧ��ReLU�����
    fully1 = tf.nn.dropout(fully1, self.keep_place)
    # ��ȫ���Ӳ����Ӧ��dropout����

    fw2 = tf.Variable(tf.random_normal(shape=[1024, 1024], stddev=0.01), dtype=tf.float32)
    # ����ڶ���ȫ���Ӳ��Ȩ�أ���״Ϊ[1024, 1024]
    fb2 = tf.Variable(tf.random_normal(shape=[1024]), dtype=tf.float32)
    # ����ڶ���ȫ���Ӳ��ƫ�ã���״Ϊ[1024]
    fully2 = tf.nn.relu(tf.add(tf.matmul(fully1, fw2), fb2))
    # �Ե�һ��ȫ���Ӳ��������о���˷�������Ȼ�����ƫ�ã���Ӧ��ReLU�����
    fully2 = tf.nn.dropout(fully2, self.keep_place)
    # ��ȫ���Ӳ����Ӧ��dropout����

    fw3 = tf.Variable(tf.random_normal(shape=[1024, self.y_size], stddev=0.01), dtype=tf.float32)
    # ���������ȫ���Ӳ��Ȩ�أ���״Ϊ[1024, self.y_size]
    fb3 = tf.Variable(tf.random_normal(shape=[self.y_size]), dtype=tf.float32)
    # ���������ȫ���Ӳ��ƫ�ã���״Ϊ[self.y_size]
    fully3 = tf.add(tf.matmul(fully2, fw3), fb3, name='out_put')
    # �Եڶ���ȫ���Ӳ��������о���˷�������Ȼ�����ƫ��

    return fully3
    # �������һ��ȫ���Ӳ�����
```





def verify_color(rotate_rect, src_image):
    # ��ȡͼ��ĸ߶ȺͿ��
    img_h, img_w = src_image.shape[:2]
    # ������ͼ���С��ͬ�Ŀհ���Ĥ
    mask = np.zeros(shape=[img_h + 2, img_w + 2], dtype=np.uint8)
    # ��ˮ������ͨ�ԣ���������Ϊ4����ʾ���ӵ����������4����
    connectivity = 4
    # ���ӵ���������������������ɫֵ�Ĳ�ֵ��Χ
    loDiff, upDiff = 30, 30
    # ����������ֵ
    new_value = 255
    # ��ˮ����㷨�ı�־
    flags = connectivity
    flags |= cv2.FLOODFILL_FIXED_RANGE  # ���ǵ�ǰ��������������֮��Ĳ�
    flags |= new_value << 8
    flags |= cv2.FLOODFILL_MASK_ONLY  # ֻ�����Ĥͼ�񣬲��ı�ԭʼͼ��

    # ���ɶ��������ӵ������
    rand_seed_num = 5000
    # ��������ӵ���ѡȡ����Ч���ӵ�����
    valid_seed_num = 200
    # ���ӵ��������
    adjust_param = 0.1

    # ��ȡ��ת���ε��ĸ���������
    box_points = cv2.boxPoints(rotate_rect)
    box_points_x = [n[0] for n in box_points]
    box_points_x.sort(reverse=False)
    adjust_x = int((box_points_x[2] - box_points_x[1]) * adjust_param)
    col_range = [box_points_x[1] + adjust_x, box_points_x[2] - adjust_x]
    box_points_y = [n[1] for n in box_points]
    box_points_y.sort(reverse=False)
    adjust_y = int((box_points_y[2] - box_points_y[1]) * adjust_param)
    row_range = [box_points_y[1] + adjust_y, box_points_y[2] - adjust_y]

    # ������ӵ���ˮƽ��ֱ������ƶ��ķ�Χ��С���������ת����Խ���������������ӵ�
    if (col_range[1] - col_range[0]) / (box_points_x[3] - box_points_x[0]) < 0.4 \
            or (row_range[1] - row_range[0]) / (box_points_y[3] - box_points_y[0]) < 0.4:
        points_row = []
        points_col = []
        for i in range(2):
            pt1, pt2 = box_points[i], box_points[i + 2]
            x_adjust, y_adjust = int(adjust_param * (abs(pt1[0] - pt2[0]))), int(adjust_param * (abs(pt1[1] - pt2[1])))
            if (pt1[0] <= pt2[0]):
                pt1[0], pt2[0] = pt1[0] + x_adjust, pt2[
                        # ���ɵ���������ӵ�����
        if (pt1[0] <= pt2[0]):
            pt1[0], pt2[0] = pt1[0] + x_adjust, pt2[0] - x_adjust
        else:
            pt1[0], pt2[0] = pt1[0] - x_adjust, pt2[0] + x_adjust
        if (pt1[1] <= pt2[1]):
            pt1[1], pt2[1] = pt1[1] + adjust_y, pt2[1] - adjust_y
        else:
            pt1[1], pt2[1] = pt1[1] - y_adjust, pt2[1] + y_adjust
        temp_list_x = [int(x) for x in np.linspace(pt1[0], pt2[0], int(rand_seed_num / 2))]
        temp_list_y = [int(y) for y in np.linspace(pt1[1], pt2[1], int(rand_seed_num / 2))]
        points_col.extend(temp_list_x)
        points_row.extend(temp_list_y)
    else:
        # ��ָ����Χ������������ӵ�����
        points_row = np.random.randint(row_range[0], row_range[1], size=rand_seed_num)
        points_col = np.linspace(col_range[0], col_range[1], num=rand_seed_num).astype(np.int)

    points_row = np.array(points_row)
    points_col = np.array(points_col)

    # ��ԭʼͼ��ת��ΪHSV��ɫ�ռ�
    hsv_img = cv2.cvtColor(src_image, cv2.COLOR_BGR2HSV)
    h, s, v = hsv_img[:, :, 0], hsv_img[:, :, 1], hsv_img[:, :, 2]

    # ���ÿ��������ӵ������ˮ��䣬Ŀ�������������������
    flood_img = src_image.copy()
    seed_cnt = 0
    for i in range(rand_seed_num):
        # ���ѡ��һ�����ӵ�
        rand_index = np.random.choice(rand_seed_num, 1, replace=False)
        row, col = points_row[rand_index], points_col[rand_index]
        # �������ӵ�����ǳ��Ʊ���ɫ
        if (((h[row, col] > 11) & (h[row, col] < 34)) | ((h[row, col] > 78) & (h[row, col] < 99)) | (
                (h[row, col] > 100) & (h[row, col] < 124)) | ((h[row, col] > 35) & (h[row, col] < 77))) & (
                s[row, col] > 70) & (v[row, col] > 70):
            # ʹ����ˮ����㷨���ͼ��
            cv2.floodFill(src_image, mask, (col, row), (255, 255, 255), (loDiff,) * 3, (upDiff,) * 3, flags)
            # �������������ӵ㴦���ƺ�ɫԲȦ
            cv2.circle(flood_img, center=(col, row), radius=2, color=(0, 0, 255), thickness=2)
            seed_cnt += 1
            if seed_cnt >= valid_seed_num:
                break

    # ��ȡ��Ĥͼ���б�������������꣬����������С��Ӿ���
    mask_points = []
    for row in range(1, img_h + 1):
        for col in range(1, img_w + 1):
            if mask[row, col] != 0:
                mask_points.append((col - 1, row - 1))
    mask_rotateRect = cv2.minAreaRect(np.array(mask_points))

    # ��֤��С��Ӿ��εĳߴ�����Ƿ���ϳ��Ʊ�׼
    if verify_scale(mask_rotateRect):
        return True, mask_rotateRect
    else:
        return False, mask_rotateRect
```

�����Ǹ������������ע�ͣ�������ÿ�������Ͳ��������ú͹��ܡ�