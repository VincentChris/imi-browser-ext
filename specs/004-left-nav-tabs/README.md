---
status: complete
created: '2025-12-26'
tags: []
priority: medium
created_at: '2025-12-26T07:21:23.498Z'
depends_on:
  - 002-cookie-sync
updated_at: '2025-12-26T07:48:19.774Z'
transitions:
  - status: in-progress
    at: '2025-12-26T07:41:55.927Z'
  - status: complete
    at: '2025-12-26T07:48:19.774Z'
completed_at: '2025-12-26T07:48:19.774Z'
completed: '2025-12-26'
---

# left-nav-tabs

> **Status**: ✅ Complete · **Priority**: Medium · **Created**: 2025-12-26

## Overview

扩展不再只有 Cookie Sync 功能，需要在页面左侧增加可切换的 tab/menu，让用户在不同功能间切换。当前以 Cookie Sync 为默认功能，其它功能后续可扩展。

## Design

- 左侧导航新增“功能菜单”容器，支持多个入口项，点击切换右侧内容区域。
- 菜单项状态：active / default / disabled。
- 当前仅配置 1 个默认项（Cookie Sync），并预留后续扩展入口。
- 当某功能需要限定使用场景时（如仅允许 localhost），由该功能自身定义禁用逻辑与提示文案。
- 交互细节：
  - 点击切换时保持当前面板内状态不共享（互不影响）。
  - active 状态在刷新后保持（本地存储或 URL hash，具体实现由代码阶段决定）。

## Plan

- [ ] 设计左侧菜单结构与默认布局（含 active/disabled 状态样式）
- [ ] 接入 Cookie Sync 作为首个功能 tab
- [ ] 支持切换状态持久化（方案待实现时确认）
- [ ] 为后续功能预留扩展配置结构

## Test

- [ ] 左侧菜单可展示并切换不同功能（当前至少 Cookie Sync）
- [ ] active 状态切换正确且不会影响其他功能内容
- [ ] disabled 菜单不可点击，且 hover 提示正常显示（由具体功能提供）
- [ ] 刷新后 active 状态保持（如果采用持久化）

## Notes

- Cookie Sync 需求详见 spec 002-cookie-sync。
- Popup 结构已拆分为 Sidebar 与 Toast 等组件，便于扩展更多功能面板。
- 通用 UI 组件已抽为 Button/Input（统一样式与复用）。
