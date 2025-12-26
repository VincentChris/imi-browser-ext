---
status: complete
created: '2025-12-24'
tags: []
priority: medium
created_at: '2025-12-24T08:37:05.528Z'
updated_at: '2025-12-24T08:42:22.994Z'
transitions:
  - status: in-progress
    at: '2025-12-24T08:38:36.804Z'
  - status: complete
    at: '2025-12-24T08:42:22.994Z'
completed_at: '2025-12-24T08:42:22.994Z'
completed: '2025-12-24'
---

# cookie-sync

> **Status**: ✅ Complete · **Priority**: Medium · **Created**: 2025-12-24

## Overview

为扩展提供“同步 Cookie”能力。用户输入“同步域名”和需要同步的 cookie key，点击同步后，扩展从当前 tab 对应站点的 cookie（按三级→二级→一级域名顺序）查找指定 key，并将其同步到用户输入的域名。若均未找到则提示用户。同步过程不能修改当前 tab 已打开页面的 cookie，避免影响当前会话。所有提示统一通过 toast 展示。

## Design

交互与输入
- 允许用户输入“同步域名”和“cookie key”（多个 key 可后续考虑用逗号分隔，此版先支持单 key）。
- 同步按钮触发同步流程，显示结果 toast（成功/失败/未找到）。
- 校验失败时 toast 提示（空域名、空 key、同步域名与当前 tab 域名重复）。
- 使用 toast 替代固定状态栏提示。

域名查找规则
- 以当前 tab URL 的 hostname 为基准，按“三级 → 二级 → 一级”顺序尝试读取 cookie。
- 示例：hostname = a.b.example.com
  - 先查找 a.b.example.com
  - 再查找 b.example.com
  - 最后查找 example.com
- 对于不足三级的域名，按可用层级顺序下探。
- 仅从当前 tab 站点读 cookie，不做跨站读取。

同步策略
- 若在某级域名找到指定 key，则将该 key 的 cookie 同步到用户输入的“同步域名”。
- 同步时仅写入目标域名的 cookie，不修改当前 tab 原域名 cookie。
- 若全部层级未找到该 key，toast 提示“未找到对应的 cookie”。

安全与边界
- 目标域名必须合法且与浏览器 cookie 允许规则兼容；不合法时 toast 提示。
- 若同步域名与当前 tab 域名相同，提示“同步域名和被同步域名重复”，并取消同步。
- 不对当前 tab cookie 做删除/覆盖，避免影响当前登录态。

## Plan

<!-- Break down implementation into steps -->

<!-- 💡 TIP: If your plan has >6 phases or this spec approaches 
     400 lines, consider using sub-spec files:
     - IMPLEMENTATION.md for detailed implementation
     - See spec 012-sub-spec-files for guidance on splitting -->

- [ ] 设计输入表单与按钮的 UI 文案与校验提示
- [ ] 实现域名分级查找逻辑（三级→二级→一级）
- [ ] 实现同步写入逻辑（只写目标域名，不改当前域名）
- [ ] 接入 toast 提示（成功/未找到/非法域名/异常）
- [ ] 自测与补充边界用例

## Test

<!-- How will we verify this works? -->

- [ ] 在三级域名存在 cookie key 时，正确同步到目标域名
- [ ] 三级不存在、二级存在时，正确同步到目标域名
- [ ] 三级/二级不存在、一级存在时，正确同步到目标域名
- [ ] 三层都不存在时，toast 提示“未找到对应的 cookie”
- [ ] 同步域名与当前 tab 域名相同，toast 提示“同步域名和被同步域名重复”，且不执行同步
- [ ] 同步后当前 tab 的 cookie 未被修改或覆盖

## Notes

<!-- Optional: Research findings, alternatives considered, open questions -->

- 多 key 支持与批量同步可作为后续增强
- 追加需求：更新插件图标（已按提供的 base64 资源更新）
