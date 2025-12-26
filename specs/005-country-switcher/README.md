---
status: complete
created: '2025-12-26'
tags: []
priority: medium
created_at: '2025-12-26T07:21:29.201Z'
depends_on:
  - 004-left-nav-tabs
updated_at: '2025-12-26T07:53:09.074Z'
transitions:
  - status: in-progress
    at: '2025-12-26T07:42:20.032Z'
  - status: complete
    at: '2025-12-26T07:48:25.535Z'
  - status: in-progress
    at: '2025-12-26T07:52:50.667Z'
  - status: complete
    at: '2025-12-26T07:53:09.074Z'
completed_at: '2025-12-26T07:48:25.535Z'
completed: '2025-12-26'
---

# country-switcher

> **Status**: ✅ Complete · **Priority**: Medium · **Created**: 2025-12-26

## Overview

新增“切换国家”功能，通过下拉选择国家后，写入两个 cookie：TIMEZONE_COUNTRY 与 TIMEZONE。该功能仅在当前 tab 的 URL 属于 localhost 域名时可用；非 localhost 时左侧对应 tab 禁用并显示 hover 提示“只能在localhost下使用”。

## Design

- 入口位置：左侧功能菜单新增“切换国家”tab（依赖左侧菜单能力）。
- 启用条件：当前激活 tab 的 hostname 为 localhost 时可用，否则禁用。
- 交互：
  - 进入 tab 时根据当前 cookie 回显（若存在）。
  - 下拉为自定义可搜索选择器：点击打开后在下拉内输入搜索，实时过滤选项。
  - 默认值为当前 tab 的 TIMEZONE_COUNTRY（若存在）。
  - 切换下拉选项时，更新两个 cookie 的值：
    - TIMEZONE_COUNTRY = countryName
    - TIMEZONE = timeZone
  - cookie domain 固定为 localhost。
- 数据来源：使用下方给定数组作为 options，仅使用 countryName 与 timeZone 字段。
- 非 localhost 场景：
  - 左侧 tab 禁用不可点击
  - hover 显示提示：只能在localhost下使用

## Plan

- [ ] 在左侧菜单新增“切换国家”tab（依赖左侧菜单）
- [ ] 实现 localhost 判断与 tab 禁用/hover 提示
- [ ] 增加下拉组件与国家 options 数据源
- [ ] 切换选项时写入 TIMEZONE_COUNTRY 与 TIMEZONE cookie（domain=localhost）
- [ ] 读取 cookie 回显当前选中项

## Test

- [ ] 当前 tab 为 localhost 时，“切换国家”tab 可用且可进入
- [ ] 当前 tab 非 localhost 时，“切换国家”tab 禁用且 hover 提示正确
- [ ] 下拉打开后可输入搜索，并实时过滤选项
- [ ] 默认值为当前 tab 的 TIMEZONE_COUNTRY（若存在）
- [ ] 选择国家后两个 cookie 被正确写入（domain=localhost）
- [ ] 刷新后可读取 cookie 并正确回显下拉选中项

## Notes

国家下拉 options（仅使用 countryName 与 timeZone）：

- 国家 cookie 读写已封装为 hook（useCountryCookies），下拉与搜索逻辑保持在独立面板组件内。
- Cookie Sync 的请求/校验逻辑已封装为 hook（useCookieSync），便于复用与测试。
- Popup 通用 UI 组件已抽为 Button/Input，统一样式。

[
  {
    "countryName": "KSA",
    "timeZone": "3"
  },
  {
    "countryName": "OMN",
    "timeZone": "4"
  },
  {
    "countryName": "UAE",
    "timeZone": "5"
  },
  {
    "countryName": "CHN",
    "timeZone": "8"
  },
  {
    "countryName": "KWT",
    "timeZone": "3"
  },
  {
    "countryName": "EGY",
    "timeZone": "5"
  },
  {
    "countryName": "印度",
    "timeZone": "6"
  },
  {
    "countryName": "USA",
    "timeZone": "11"
  },
  {
    "countryName": "西班牙",
    "timeZone": "2"
  },
  {
    "countryName": "MEX",
    "timeZone": "-6"
  },
  {
    "countryName": "QAT",
    "timeZone": "3"
  },
  {
    "countryName": "BHR",
    "timeZone": "-3"
  },
  {
    "countryName": "asd",
    "timeZone": "2"
  },
  {
    "countryName": "葡萄牙",
    "timeZone": "2"
  },
  {
    "countryName": "JOR",
    "timeZone": "2"
  },
  {
    "countryName": "MAR",
    "timeZone": "1"
  },
  {
    "countryName": "Deutschland",
    "timeZone": "1"
  },
  {
    "countryName": "State of Qatar",
    "timeZone": "3"
  },
  {
    "countryName": "JUN",
    "timeZone": "9"
  },
  {
    "countryName": "瑞士",
    "timeZone": "7"
  },
  {
    "countryName": "wei guo",
    "timeZone": "-3"
  },
  {
    "countryName": "法国",
    "timeZone": "1"
  },
  {
    "countryName": "CHL",
    "timeZone": "-4"
  },
  {
    "countryName": "ksatt",
    "timeZone": "1"
  },
  {
    "countryName": "HQ",
    "timeZone": "4"
  },
  {
    "countryName": "afuhan",
    "timeZone": "4"
  },
  {
    "countryName": "RSA",
    "timeZone": "2"
  },
  {
    "countryName": "HTcs",
    "timeZone": "8"
  },
  {
    "countryName": "BRA",
    "timeZone": "-3"
  },
  {
    "countryName": "LBN",
    "timeZone": "3"
  },
  {
    "countryName": "AUS",
    "timeZone": "11"
  },
  {
    "countryName": "TUR",
    "timeZone": "3"
  },
  {
    "countryName": "ITA",
    "timeZone": "2"
  },
  {
    "countryName": "AUS2",
    "timeZone": "10"
  },
  {
    "countryName": "测试新开国家",
    "timeZone": "2"
  },
  {
    "countryName": "OOO",
    "timeZone": "2"
  },
  {
    "countryName": "SHUJU",
    "timeZone": "0"
  },
  {
    "countryName": "MAS",
    "timeZone": "8"
  },
  {
    "countryName": "MYS",
    "timeZone": "8"
  },
  {
    "countryName": "KR",
    "timeZone": "1"
  },
  {
    "countryName": "Malysia",
    "timeZone": "8"
  },
  {
    "countryName": "捷克",
    "timeZone": "7"
  },
  {
    "countryName": "HUN",
    "timeZone": "2"
  },
  {
    "countryName": "埃塞俄比亚",
    "timeZone": "3"
  },
  {
    "countryName": "GBR",
    "timeZone": "0"
  },
  {
    "countryName": "埃及",
    "timeZone": "6"
  },
  {
    "countryName": "GRE",
    "timeZone": "-7"
  },
  {
    "countryName": "GRC",
    "timeZone": "2"
  },
  {
    "countryName": "哥伦比亚",
    "timeZone": "-12"
  },
  {
    "countryName": "Azerbaijan",
    "timeZone": "4"
  },
  {
    "countryName": "AZE",
    "timeZone": "4"
  },
  {
    "countryName": "新西兰",
    "timeZone": "12"
  },
  {
    "countryName": "NZL",
    "timeZone": "13"
  },
  {
    "countryName": "PER",
    "timeZone": "-12"
  },
  {
    "countryName": "Jacky测试国家",
    "timeZone": "8"
  },
  {
    "countryName": "SUN",
    "timeZone": "3"
  },
  {
    "countryName": "ESP",
    "timeZone": "2"
  },
  {
    "countryName": "PAK",
    "timeZone": "5"
  },
  {
    "countryName": "YANG",
    "timeZone": "8"
  },
  {
    "countryName": "SDN",
    "timeZone": "2"
  },
  {
    "countryName": "海国",
    "timeZone": "2"
  },
  {
    "countryName": "LKA",
    "timeZone": "5"
  },
  {
    "countryName": "SVK",
    "timeZone": "1"
  },
  {
    "countryName": "ARM",
    "timeZone": "4"
  },
  {
    "countryName": "DEU",
    "timeZone": "2"
  },
  {
    "countryName": "TGJ",
    "timeZone": "8"
  },
  {
    "countryName": "WTC",
    "timeZone": "8"
  },
  {
    "countryName": "HTT",
    "timeZone": "0"
  },
  {
    "countryName": "GTM",
    "timeZone": "-6"
  },
  {
    "countryName": "POL",
    "timeZone": "2"
  },
  {
    "countryName": "ZER",
    "timeZone": "8"
  },
  {
    "countryName": "AZA",
    "timeZone": "0"
  },
  {
    "countryName": "ZHA",
    "timeZone": "1"
  },
  {
    "countryName": "AAZ",
    "timeZone": "1"
  },
  {
    "countryName": "SRB",
    "timeZone": "1"
  },
  {
    "countryName": "BIH",
    "timeZone": "1"
  },
  {
    "countryName": "MKD",
    "timeZone": "2"
  },
  {
    "countryName": "MNE",
    "timeZone": "1"
  },
  {
    "countryName": "ALB",
    "timeZone": "1"
  },
  {
    "countryName": "VAT",
    "timeZone": "1"
  },
  {
    "countryName": "COL",
    "timeZone": "-5"
  },
  {
    "countryName": "DOM",
    "timeZone": "1"
  },
  {
    "countryName": "SLV",
    "timeZone": "-6"
  },
  {
    "countryName": "DZA",
    "timeZone": "1"
  },
  {
    "countryName": "KEN",
    "timeZone": "1"
  },
  {
    "countryName": "MDV",
    "timeZone": "5"
  },
  {
    "countryName": "ISL",
    "timeZone": "0"
  },
  {
    "countryName": "YES",
    "timeZone": "1"
  },
  {
    "countryName": "CRI",
    "timeZone": "4"
  },
  {
    "countryName": "HND",
    "timeZone": "-6"
  },
  {
    "countryName": "AUT",
    "timeZone": "1"
  }
]
