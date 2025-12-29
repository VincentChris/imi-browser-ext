---
status: complete
created: '2025-12-29'
tags: []
priority: medium
created_at: '2025-12-29T06:28:19.505Z'
updated_at: '2025-12-29T06:53:43.493Z'
transitions:
  - status: in-progress
    at: '2025-12-29T06:29:50.338Z'
  - status: complete
    at: '2025-12-29T06:33:34.408Z'
  - status: in-progress
    at: '2025-12-29T06:52:01.079Z'
  - status: complete
    at: '2025-12-29T06:53:43.493Z'
completed_at: '2025-12-29T06:33:34.408Z'
completed: '2025-12-29'
---

# 006-ui-refresh

> **Status**: ✅ Complete · **Priority**: Medium · **Created**: 2025-12-29

## Overview

对 popup 的整体 UI 做一次风格化重构：统一视觉语言、提升信息层级、增加氛围细节（背景、卡片、按钮、输入、状态提示），并保持现有功能与交互不变。

## Design

- 采用“夜色编辑部 + 轻霓虹”的风格：深色基底、分层玻璃感卡片、柔和霓虹强调色。
- 强化层级：侧边栏作为控制轨道，主区卡片化分组，标题/说明/输入/操作分层。
- 抽象 UI tokens：通过全局 CSS 变量定义背景、边框、强调色。
- 组件统一：Button/Input/Toast/Dropdown 统一形态与交互反馈。
- 可读性增强：整体底色提亮一档，灰字对比提高，placeholder 与弱提示更清晰。

## Plan

- [ ] 调整全局样式与字体体系（styles.css）。
- [ ] 重构侧边栏与主内容容器布局（App.tsx / Sidebar.tsx）。
- [ ] 统一表单与操作组件样式（Button.tsx / Input.tsx / Toast.tsx）。
- [ ] 优化两个功能面板的排版与视觉层级（CookieSyncPanel.tsx / CountrySwitcherPanel.tsx）。
- [ ] 提升可读性：底色与灰阶对比度调整（styles.css + panels）。

## Test

- [ ] Popup 启动后渲染正常，布局不溢出（最小 480×420）。
- [ ] Cookie Sync / 切换国家 两个 tab 可正常切换。
- [ ] 输入、按钮、下拉与 Toast 交互保持可用。
- [ ] 深色模式下文字与弱提示可读性达标。

## Notes

- 不改变现有业务逻辑，仅做视觉与布局升级。
