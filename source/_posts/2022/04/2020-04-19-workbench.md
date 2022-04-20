---
layout: post
title: Workbench with pytest + allure2
subtitle: Setup workbench with pytest and allure2
date: 2022-04-20
author: BF
thumbnail: /img/bf/python.jpg
catalog: true
toc: true
categories: Diary
header-img: /img/bf/python.jpg
tags:
    - python
    - pytest
    - allure2
    - selenium 
---

## Overview

把之前整过的pytest + Allure2的东西弄一弄。

项目上传在这里：
<https://github.com/bearfly1990/bf-workbench>

<!--more-->

## 基本工具

开发工具用的Pycharm，Python3.8+

主要用的库的版本requirements.txt:

```bash
allure-pytest==2.9.45
allure-python-commons==2.9.45
async-generator==1.10
atomicwrites==1.4.0
attrs==21.4.0
certifi==2021.10.8
cffi==1.15.0
charset-normalizer==2.0.12
colorama==0.4.4
cryptography==36.0.2
h11==0.13.0
helium==3.0.8
idna==3.3
iniconfig==1.1.1
outcome==1.1.0
packaging==21.3
pluggy==1.0.0
py==1.11.0
pycparser==2.21
pyOpenSSL==22.0.0
pyparsing==3.0.8
PySocks==1.7.1
pytest==7.1.1
pytest-dependency==0.5.1
pytest-failed-screenshot==1.0.2
pytest-html==3.1.1
pytest-json-report==1.5.0
pytest-metadata==2.0.1
pytest-order==1.0.1
requests==2.27.1
selenium==3.141.0
six==1.16.0
sniffio==1.2.0
sortedcontainers==2.4.0
tomli==2.0.1
trio==0.20.0
trio-websocket==0.9.2
urllib3==1.26.9
wsproto==1.1.0
```

项目结构如下：
![project-structure](/img/post/2022/04/2022-04-20-workbench/project-structure.png)

## 运行项目

项目的主要运行脚本放在`main.py`中，一些解释加在Comment中了，直接运行`python main.py`就行。

```python
import os.path
import shutil

if __name__ == '__main__':
    dir_path = os.path.dirname(os.path.realpath(__file__))
    os.chdir(dir_path)
    # os.system("pytest -m cx") # 运行所有添加了 @pytest.mark.cx的case
    os.system("pytest")
    # 把一些Allure2配置文件放置在report folder
    shutil.copy2("report/environment.properties", "report/report_allure")
    shutil.copy2("report/categories.json", "report/report_allure")
    shutil.copy2("report/executor.json", "report/report_allure")
    shutil.copy2("report/launch.json", "report/report_allure")

    # 下面是为了在Allure2报表中能看到历史记录，需要手动的生成下
    if os.path.exists("report/report_allure/history"):
        shutil.rmtree("report/report_allure/history")

    if os.path.exists(r"httpserver/AllureReport/history"):
        shutil.copytree(r"httpserver/AllureReport/history", "report/report_allure/history")

    # 生成allure report
    print('generate allure report')
    os.system(r"D:\ProgramDev\allure-2.17.3\bin\allure generate ./report/report_allure -o "
              r"httpserver/AllureReport --clean")

```

## 配置文件与初始化

pytest相关的配置主要放在`pytest.ini`中，定义了一些参数。

```ini
[pytest]
addopts = -s  --html=report/report.html --self-contained-html --json-report --json-report-file=report/report.json --capture=tee-sys --screenshot=on --screenshot_path=on --alluredir=./report/report_allure --clean-alluredir
python_classes = *Test
python_functions = test*

log_cli = 1
log_cli_level = INFO
log_cli_format = %(asctime)s [%(levelname)8s] %(message)s (%(filename)s:%(lineno)s)
log_cli_date_format=%Y-%m-%d %H:%M:%S
markers =
    incremental: Run test
    cx: Special Case
[test_case]
test_case_path = src/test_cases/
```

像这里markers是为了自定义一些tag，这样pytest运行的时候就不是warning了，当然也可以直接把Warning关掉。

```ini
markers =
    incremental: Run test
    cx: Special Case
```

下面的`conftest.py`主要就是用来初始化一些全局对象，方便后续使用。

```python
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from src.ui.element.baidu.page import BaiduPageMain
from src.util.api import BFWBAPIClient
from setting import *


@pytest.fixture(scope='session', autouse=True)
def driver(request):
    chrome_driver_path = 'resources/driver/chromedriver.exe'
    chrome_options = Options()
    driver = webdriver.Chrome(executable_path=chrome_driver_path, options=chrome_options)
    driver.maximize_window()
    yield driver
    driver.quit()


@pytest.fixture(scope='session', autouse=True)
def baidu_main_page(request, driver):
    baidu_main_page = BaiduPageMain(driver)
    driver.get(BaiduPageMain.URL)
    yield baidu_main_page


@pytest.fixture(scope='session', autouse=True)
def api_client(request, driver):
    api_client = BFWBAPIClient(API_SITE_URL, headers=HEADERS_DEFAULT, proxies=PROXY_DICT_DEFAULT)
    yield api_client
```

## 测试类与方法

这里给了很简单的Demo，使用`@pytest`可以来控制测试的运行，使用`@allure`标签可以来控制Allure Report的一些输出

```python
import allure
import pytest

from setting import TEST_MODE, DEV
from src.test.base import TestBase
from src.ui.element.baidu.page import BaiduPageMain


@allure.feature("Test Basic Github Login")
@pytest.mark.incremental
@pytest.mark.skipif(TEST_MODE == DEV, reason="Skip On Test Case Development Mode")
@allure.story('Login')
class LoginTest(TestBase):

    @allure.story('Skip')
    @pytest.mark.skip()
    def test_skip_case(self, api_client):
        api_client.post('/test', json={"test": "test"})

    @allure.story('UserName')
    @allure.step("input username")
    def test_input_username(self, baidu_main_page: BaiduPageMain):
        baidu_main_page.login_page.search.input("test")

    @allure.step("input password")
    # @pytest.mark.skip()
    def test_input_password(self, baidu_main_page: BaiduPageMain):
        pass

    @allure.story('Submit')
    @allure.step("input submit")
    @pytest.mark.cx
    def test_submit(self, baidu_main_page: BaiduPageMain):
        pass
```

像上面的case最后生成的报表如下：

![project-structure](/img/post/2022/04/2022-04-20-workbench/report-overview.png)

像上面的`ENVIRONMENT`就在`report/environment.properties`配置的

更详细的信息可以在别的页面看到。

## pytest-failed-screenshot

像UI自动化可能需要在失败的时候截屏，所以这个插件可以使用，并在参数中加上`--screenshot=on --screenshot_path=on`

## 其它报表

pytest还有别的插件可以生成html/json等报表，像json的话后期就可以自己去解析，生成数据。

```bash
--html=report/report.html --self-contained-html --json-report --json-report-file=report/report.json
```

## 运行报表

Allure2有命令可以运行他的Server，但为了自定义的一些东西，在目录下加了一个HttpServer,运行其中的`start_server.bat`就可以了。

其实就是用python起一个简单的内置http服务。

```bash
python -m http.server 9999
```

## 最后

有时候在想，写这些东西只是为了证明自己还能思考，自娱自乐罢了。

---

起因已经不重要了，我现在只想工作生活都能回归正轨。

本最怕给别人添麻烦，想问心无愧，却不知道为什么变成现在这样。

只能说走好接下来的路吧。。

## 参考

- <https://docs.pytest.org/en/stable/>
- <https://docs.qameta.io/allure/>
