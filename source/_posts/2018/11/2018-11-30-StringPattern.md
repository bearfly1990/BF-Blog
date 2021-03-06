---
layout: post
title: String Pattern
subtitle: A algorithms problem about string match
date: 2018-11-30
author: BF
header-img: img/bf/beach_05.jpg
catalog: true
tags:
  - java
  - algorithms
---

# 背景

今天遇到的一个算法问题，感觉又回到了当年做 ACM 的时候，不过好久没动脑，不好使了，哈哈哈。
<!-- more -->
# 问题描述

需求简单来说是给你两个字符串，一个是需要被匹配的，另一个是用来匹配的模式，我用接口定义了一下：

```java
/**
* @Description: Algorithms samples interface.
* @author bearfly1990
* @date Nov 30, 2018 9:24:26 PM
*/
package org.bearfly.fun.javalearn.algorithms;

public interface IAlgorithms {
    /**
     * <p>This is the definition to check input string could match pattern or not<p>
     * <p>example:</p>
     * <p>matched: input = "java hello world", pattern = "ABC"</p>
     * <p>matched: input = "java hello java hello", pattern = "ABAB"</p>
     * <p>unmatch: input = "java hello java", pattern = "ABC"</p>
     * <p>unmatch: input = "java hello", pattern = "ABC"</p>
     * <p>...</p>
     * @param input
     * @param pattern
     * @return boolean inputStr could match patter or not
     */
    public boolean matchPattern(String input, String pattern);
}
```

# 具体实现

## 定义辅助方法

预计输入参数大概是`("hello world java", "ABC")`，针对这个，我们需要把他们都先转换到数组或者 List 中，所以我写一个方法去把"ABC"拆成["A","B", "C"]。

```java
/**
* @Description: StringUtils
* @author bearfly1990
* @date Nov 30, 2018 10:16:58 PM
*/
package org.bearfly.fun.javalearn.utils;

public class StringUtils {
    public static String[] arrayCharToStr(char[] charArray) {
        String[] newStrArray = new String[charArray.length];
        for(int i = 0; i < charArray.length; i++) {
            newStrArray[i] = String.valueOf(charArray[i]);
        }
        return newStrArray;
    }
}
```

## 主要逻辑代码

我已经在注释中写的比较详细了，就不再分析，直接看代码：

```java
/**
* @Description: Algorithms Implements
* @author bearfly1990
* @date Nov 30, 2018 9:42:29 PM
*/
package org.bearfly.fun.javalearn.algorithms.impl;

import java.util.HashMap;
import java.util.Map;

import org.bearfly.fun.javalearn.algorithms.IAlgorithms;
import org.bearfly.fun.javalearn.utils.StringUtils;

public class AlgorithmsImpl implements IAlgorithms {

    @Override
    public boolean matchPattern(String input, String pattern) {
        // ["hello", "world", "java"]
        String[] wordArray = input.split(" ");
        // ["A","B","C"]
        String[] patternArray = StringUtils.arrayCharToStr(pattern.toCharArray());

        // if pattern and string num is not matched, no compare any more.
        // e.g. hello world java ！= AB
        if (wordArray.length != patternArray.length) {
            return false;
        }

        Map<String, String> matchedMap = new HashMap<>();

        for (int i = 0; i < patternArray.length; i++) {
            String patternEntry = patternArray[i];
            String wordEntry = wordArray[i];

            if (matchedMap.containsKey(patternEntry)) {
                if (!matchedMap.get(patternEntry).equals(wordEntry)) {
                    // it means the patternEntry have maped a word but current word is not expected.
                    return false;
                }
            } else if (matchedMap.containsValue(wordEntry)) {
                // it means the current patternEntry match a word belong to other patternEntry.
                // so that's not ok.
                return false;
            } else {
                // the first time to map it.
                matchedMap.put(patternEntry, wordEntry);
            }
        }
        return true;
    }

}

```

其实除了上面的方法，还有另一个办法，但本质上还是一样的，测试也通过了：

```java
public boolean matchPattern2(String input, String pattern) {
    // ["hello", "world", "java"]
    String[] wordArray = input.split(" ");
    // ["A","B","C"]
    String[] patternArray = StringUtils.arrayCharToStr(pattern.toCharArray());

    // if pattern and string num is not matched, no compare any more.
    // e.g. hello world java ！= AB
    if (wordArray.length != patternArray.length) {
        return false;
    }

    for (int i = 0; i < patternArray.length; i++) {
        String patternEntry = patternArray[i];
        String wordEntry = wordArray[i];
        if (wordEntry.startsWith("**")) {
            if (!wordEntry.equals(patternEntry)) {
                return false;
            }
        } else if (patternEntry.startsWith("**")) {
            return false;
        }
        
        for (int j = i; j < patternArray.length; j++) {
            if (wordArray[j].equals(wordEntry)) {
                wordArray[j] = "**" + patternEntry;
            }
            if (patternArray[j].equals(patternEntry)) {
                patternArray[j] = "**" + patternEntry;
            }
        }
    }
    return true;
}
```

## 测试代码

写了简单的单元测试，主要的 case 应该都包含了。

```java
/**
* @Description: Algorithms Test Class
* @author bearfly1990
* @date Nov 30, 2018 9:42:29 PM
*/
package org.bearfly.fun.javalearn.algorithms;

import static org.junit.Assert.assertEquals;

import org.bearfly.fun.javalearn.algorithms.impl.AlgorithmsImpl;
import org.junit.Test;

public class AlgorithmsTest {
    @Test
    public void testStringMatch() {
        IAlgorithms as = new AlgorithmsImpl();

        String input = "java hello world";
        String pattern = "ABC";
        assertEquals(true, as.matchPattern(input, pattern));

        input = "hello hello hello";
        pattern = "AAA";
        assertEquals(true, as.matchPattern(input, pattern));

        input = "hello java hello java good";
        pattern = "ABABC";
        assertEquals(true, as.matchPattern(input, pattern));

        input = "hello java hello java good";
        pattern = "ABABD";
        assertEquals(true, as.matchPattern(input, pattern));

        input = "hello java hello java good";
        pattern = "ABABA";
        assertEquals(false, as.matchPattern(input, pattern));

        input = "java hello hello";
        pattern = "ABC";
        assertEquals(false, as.matchPattern(input, pattern));

        input = "java hello hello";
        pattern = "AB";
        assertEquals(false, as.matchPattern(input, pattern));
    }
}

```

# 最后

思路理顺了之后实现还是很简单的，但是没有一个实际操作编码的过程，只在脑子里构思还是不容易的，主要还是一时没有反应过来，或者想的太复杂的时候，哈哈哈。

有空可以再去撸几道 ZJU 的 Online Judge 了（捂脸）

代码我上传到了 github：[https://github.com/bearfly1990/PowerScript/tree/master/Java/workspace/javalearn](https://github.com/bearfly1990/PowerScript/tree/master/Java/workspace/javalearn)

---
