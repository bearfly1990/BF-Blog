---
layout: post
title: Software Test Categories
subtitle: The Classification of Test
date: 2018-11-13
author: BF
header-img: img/bf/lily_01.jpg
catalog: true
tags:
  - test
---

# 软件测试的分类

在刚入测试坑的时候，测试的基本概念还停留在早期学习的相关知识。对于黑盒/白盒，单元测试，集成测试，冒烟测试等多多少少有点了解，但其实分的不是很清楚。

入坑之后，补充过基础知识，参加过一些培训，再加上真正深入测试工作，才有了更多的体会，恍然大悟的感觉。

今天主要总结下软件测试的分类。
<!-- more -->
## 按软件测试的阶段

### 单元测试(Unit Testing)

单元测试是对软件组成单元进行测试。其目的是检验软件基本组成单位的正确性。测试的对象是软件设计的最小单位：模块。所以也可能被称为**模块测试**

- 测试阶段：编码后
- 测试对象：最小模块
- 测试人员：白盒测试工程师或开发工程师
- 测试依据：代码和注释+详细设计文档
- 测试方法：白盒测试
- 测试内容：模块接口测试、局部数据结构测试、路径测试、错误处理测试、边界测试

### 集成测试(Integration Testing)

集成测试也称联合测试、组装测试，将程序模块采用适当的集成策略组装起来，对系统的接口及集成后的功能进行正确性检测的测试工作。主要目的是检查软件单位之间的接口是否正确。

- 测试阶段：一般单元测试之后进行
- 测试对象：模块间的接口
- 测试人员：白盒测试工程师或开发工程师
- 测试依据：单元测试的模块+概要设计文档
- 测试方法：黑盒测试与白盒测试相结合
- 测试内容：模块之间数据传输、模块之间功能冲突、模块组装功能正确性、全局数据结构、单模块缺陷对系统的影响

### 系统测试(System Testing)

将软件系统看成是一个系统的测试。包括对功能、性能以及软件所运行的软硬件环境进行测试。一般测试的时间也是最多花在系统测试阶段，耗费最多的人时，并且自动化的 Case 都要覆盖。

- 测试阶段：集成测试通过之后
- 测试对象：整个系统（软、硬件）
- 测试人员：黑盒测试工程师
- 测试依据：需求规格说明文档
- 测试方法：黑盒测试
- 测试内容：功能、界面、可靠性、易用性、性能、兼容性、安全性等

### 验收测试(Acceptance Testing)

验收测试是部署软件之前的最后一个测试操作。它是技术测试的最后一个阶段，也称为交付测试。验收测试的目的是确保软件准备就绪，按照项目合同、任务书、双方约定的验收依据文档，向软件购买都展示该软件系统满足原始需求。

- 测试阶段：系统测试通过之后
- 测试对象：整个系统（包括软硬件）。
- 测试人员：主要是最终用户或者需求方。
- 测试依据：用户需求、验收标准
- 测试方法：黑盒测试
- 测试内容：同系统测试(功能...各类文档等)

## 按是否查看代码划分

### 黑盒测试(Black-box Testing)

黑盒测试也称功能测试，测试中把被测的软件当成一个黑盒子，不关心盒子的内部结构是什么，只关心软件的输入数据与输出数据。

### 白盒测试(White-box Testing)

白盒测试又称结构测试、透明盒测试、逻辑驱动测试或基于代码的测试。白盒指的打开盒子，去研究里面的源代码和程序结果。

### 灰盒测试(Gray-Box Testing)

灰盒测试，是介于白盒测试与黑盒测试之间的一种测试，灰盒测试多用于集成测试阶段，不仅关注输出、输入的正确性，同时也关注程序内部的情况。

## 按是否执行程序划分

### 静态测试(Static testing)

静态测试是指不运行被测程序本身，仅通过分析或检查源程序的语法、结构、过程、接口等来检查程序的正确性。对需求规格说明书、软件设计说明书、源程序做结构分析、流程图分析、符号执行来找错。

#### 检查项：

- 代码风格和规则审核；
- 程序设计和结构的审核；
- 业务逻辑的审核；
- 走查、审查与技术复审手册。

#### 静态质量：

度量所依据的标准是 ISO9126。在该标准中，软件的质量用以下几个方面来衡量，即:

- 功能性(Functionality)
- 可靠性(Reliability)
- 可用性(Usability)
- 有效性(Efficiency)
- 可维护性（Maintainability）
- 可移植性(Portability)。

### 动态测试(Dynamic testing)

动态测试方法是指通过运行被测程序，检查运行结果与预期结果的差异，并分析运行效率、正确性和健壮性等性能。这种方法由三部分组成：构造测试用例、执行程序、分析程序的输出结果。

## 按是否手工执行测试

### 手工测试(Manual testing)

手工测试就是由人去一个一个的输入用例，然后观察结果，和机器测试相对应，属于比较原始但是必须的一个步骤。

**优点：** 自动化无法替代探索性测试、发散思维类无既定结果的测试。

**缺点：** 执行效率慢，量大易错。

### 自动化测试(Automation Testing)

就是在预设条件下运行系统或应用程序，评估运行结果，预先条件应包括正常条件和异常条件。简单说自动化测试是把以人为驱动的测试行为转化为机器执行的一种过程。

自动化测试又可分为：

- 功能测试自动化
- 性能测试自动化
- 安全测试自动化。

通常所说的自动化是指**功能测试自动化**。
AI 技术的兴起发展，类似可预见工作都有可能会被伪 AI 代替。

## 按软件质量特性分类

### 安全测试(Security Testing)

安全测试是在 IT 软件产品的生命周期中，特别是产品开发基本完成到发布阶段，对产品进行检验以验证产品符合安全需求定义和产品质量标准的过程。

现在对安全知识的普及，大家意识都提上来了。比如现在越来越多的不支持 HTTP 协议，转用 HTTPS 等。

### 性能测试(Performance Testing)

性能测试是通过自动化的测试工具模拟多种正常、峰值以及异常负载条件来对系统的各项性能指标进行测试。

**可靠性测试**和**压力测试**都属于性能测试，两者可以结合进行。

通过负载测试，确定在各种工作负载下系统的性能，目标是测试当负载逐渐增加时，系统各项性能指标的变化情况。压力测试是通过确定一个系统的瓶颈或者不能接受的性能点，来获得系统能提供的最大服务级别的测试。

### 可靠性测试(Reliability Testing)

软件可靠性 (software reliability )是软件产品在规定的条件下和规定的时间区间完成规定功能的能力。

规定的条件是指直接与软件运行相关的使用该软件的计算机系统的状态和软件的输入条件，或统称为软件运行时的外部输入条件;
规定的时间区间是指软件的实际运行时间区间;规定功能是指为提供给定的服务，软件产品所必须具备的功能。

软件可靠性不但与软件存在的缺陷和(或)差错有关，而且与系统输入和系统使用有关。软件可靠性的概率度量称软件可靠度。

### 安装测试(Installing Testing)

安装测试即对于需要安装的软件的测试，保证软件的安装包能正常安装部署，需要考虑到系统版本，环境依赖等因素。

### 兼容性测试(Compatibility Testing)

软件兼容性测试是指检查软件之间能否正确地进行交互和共享信息。
随着用户对来自各种类型软件之间共享数据能力和充分利用空间同时执行多个程序能力的要求，测试软件之间能否协作变得越来越重要。
软件兼容性测试工作的目标是保证软件按照用户期望的方式进行交互。

## 其它测试分类

### 冒烟测试(Smoke Testing)

冒烟测试目的是确认软件基本功能正常，冒烟测试的执行者是版本编译人员。

现在基本执行对象为测试人员，在正规测试一个新版本之前，投入较少的人力和时间验证基本功能，通过则测试准入。

我忘记有一个很形象的比喻，据说最早在硬件测试中，对测试样品通电之后，如果直接冒烟了，那么说明这个样品直接不合格，不需要后续的测试了，打回重做。

### 随机测试(Ad-hoc Testing)

随机测试主要是根据测试者的经验对软件进行功能和性能抽查。

根据测试说明书执行用例测试的重要补充手段，是保证测试覆盖完整性的有效方式和过程。

随机测试主要是对被测软件的一些重要功能进行复测，也包括测试那些当前的测试用例(TestCase)没有覆盖到的部分。

### 探索性测试(Exploratory testing)

探索性测试可以说是一种测试思维技术。它没有很多实际的测试方法、技术和工具，但是却是所有测试人员都应该掌握的一种测试思维方式。探索性强调测试人员的主观能动性，抛弃繁杂的测试计划和测试用例设计过程，强调在碰到问题时及时改变测试策略。

探索性测试自动化暂时无法代替。好的测试人员也无法被代替。

### 回归测试(Regression Testing)

回归测试是指修改了旧代码后，重新进行测试以确认修改没有引入新的错误或导致其他代码产生错误。自动回归测试将大幅降低系统测试、维护升级等阶段的成本。

在整个软件测试过程中占有很大的工作量比重，软件开发的各个阶段都会进行多次回归测试。通过选择正确的回归测试策略来改进回归测试的效率和有效性是很有意义的。

### α 测试(Alpha Testing)

α 测试是由一个用户在开发环境下进行的测试，也可以是公司内部的用户在模拟实际操作环境下进行的测试。α 测试的目的是评价软件产品的 FLURPS(即功能、局域化、可使用性、可靠性、性能和支持)。

大型通用软件，在正式发布前，通常需要执行 Alpha 和 Beta 测试。α 测试不能由程序员或测试员完成。

### β 测试(Beta Testing)

Beta 测试是一种验收测试。Beta 测试由软件的最终用户们在一个或多个客户场所进行。

**α 测试与 Beta 测试的区别**：Findyou

测试的场所不同：Alpha 测试是指把用户请到开发方的场所来测试,beta 测试是指在一个或多个用户的场所进行的测试。

Alpha 测试的环境是受开发方控制的,用户的数量相对比较少,时间比较集中。beta 测试的环境是不受开发方控制的,用户数量相对比较多,时间不集中。

alpha 测试先于 beta 测试执行。通用的软件产品需要较大规模的 beta 测试,测试周期比较长。

## 测试分类的思维导图

下面就用一张图来稍微总结一下，不一定完全准确，就当参考一下吧。

![TestCategoriesMind](/img/post/2018/11/2018-11-13-TestCategories.jpg)

## 最后

软件测试的分类可以从许多角度切入，主要的分类了解了就差不多了，具体的可以针对性的学习。

参考：

[软件测试概念及分类整理汇总](https://www.cnblogs.com/findyou/p/6480411.html)

[软件测试的定义与分类](https://blog.csdn.net/chaosmax/article/details/71617807)

[软件测试分类及测试中三个主要概念](https://blog.csdn.net/qq_35867537/article/details/77477775)
