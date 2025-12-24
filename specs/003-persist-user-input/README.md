---
status: complete
created: '2025-12-24'
tags: []
priority: medium
created_at: '2025-12-24T09:04:05.716Z'
updated_at: '2025-12-24T09:06:58.234Z'
transitions:
  - status: in-progress
    at: '2025-12-24T09:06:27.161Z'
  - status: complete
    at: '2025-12-24T09:06:58.234Z'
completed_at: '2025-12-24T09:06:58.234Z'
completed: '2025-12-24'
---

# persist-user-input

> **Status**: ✅ Complete · **Priority**: Medium · **Created**: 2025-12-24

## Overview

为 popup 的“同步域名”和“cookie key”输入提供持久化能力。用户下次打开扩展时，自动展示上一次输入的值，减少重复输入成本。

## Design

存储方案
- 使用 `chrome.storage.local` 保存用户输入（字段：`targetDomain`、`cookieKey`）。
- Popup 加载时读取存储并回填输入框。
- 用户输入变化时写入存储（可考虑防抖；本期可在点击同步或失焦时写入）。

回填逻辑
- 若存储中有值则回填；无值保持空。
- 数据仅用于本地扩展使用，不同步到云端。

边界与异常
- 读取/写入失败时不阻塞功能，使用默认空值。
- 可选：提供“清空”按钮（本期不做）。

## Plan

<!-- Break down implementation into steps -->

<!-- 💡 TIP: If your plan has >6 phases or this spec approaches 
     400 lines, consider using sub-spec files:
     - IMPLEMENTATION.md for detailed implementation
     - See spec 012-sub-spec-files for guidance on splitting -->

- [ ] 在 popup 初始化时读取 `chrome.storage.local` 并回填输入
- [ ] 在输入变更/同步触发时写入 `chrome.storage.local`
- [ ] 处理读写失败的兜底逻辑
- [ ] 自测多次打开/关闭 popup 的回填表现

## Test

<!-- How will we verify this works? -->

- [ ] 输入域名与 cookie key 后关闭 popup，再打开仍能看到上次输入
- [ ] 清空输入并再次打开时显示为空
- [ ] 存储读取失败时仍可正常使用同步功能

## Notes

<!-- Optional: Research findings, alternatives considered, open questions -->
