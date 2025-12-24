---
status: complete
created: '2025-12-24'
tags: []
priority: medium
created_at: '2025-12-24T08:02:03.306Z'
updated_at: '2025-12-24T08:06:46.550Z'
transitions:
  - status: in-progress
    at: '2025-12-24T08:03:20.931Z'
  - status: complete
    at: '2025-12-24T08:06:46.550Z'
completed_at: '2025-12-24T08:06:46.550Z'
completed: '2025-12-24'
---

# init-browser-extension

> **Status**: ✅ Complete · **Priority**: Medium · **Created**: 2025-12-24

## Overview

初始化浏览器插件工程，统一技术栈与工程化规范，降低后续功能开发成本与沟通成本。
本次目标是完成可运行的“空壳扩展”工程，包含构建、开发热更新、基础 UI 与代码规范。
包管理器固定为 pnpm。

## Design

技术栈与工程化选择：

- 扩展：Manifest V3（MV3）+ TypeScript，避免 Chrome API/消息通信的低级错误
- 构建：Vite
- 扩展构建集成：@crxjs/vite-plugin，确保 manifest 相关资源纳入构建并改善开发期更新体验
- UI：React + TypeScript + Tailwind CSS（升级至最新版本，Vite 侧使用官方插件）
- 规范：Biome（格式化与 lint）
- 包管理器：pnpm

基础结构约定（可按实际需要微调）：

- manifest 由 @crxjs/vite-plugin 生成或读取（根据实现选择其推荐方式）
- background（service worker）、content script、popup UI 独立入口
- 统一的消息通信工具层（TypeScript 类型约束）

## Plan

实施步骤（状态以实现为准）：

- [ ] 初始化项目结构与基础配置（Vite + @crxjs/vite-plugin + TS）
- [ ] 配置 MV3 manifest 与基础扩展入口（background/content/popup）
- [ ] 搭建 React + Tailwind（升级到最新版本，使用 @tailwindcss/vite）基础 UI（popup 页面）
- [ ] 引入 Biome 并配置格式化与 lint 规则
- [ ] 补齐开发脚本与 README（启动、构建、打包说明）

## Test

- [ ] `pnpm dev` 可启动扩展开发构建，无报错
- [ ] Chrome 可加载 unpacked 扩展，popup 正常渲染
- [ ] background/service worker 正常注册
- [ ] content script 可注入并运行
- [ ] `pnpm lint` / `pnpm format` 可通过

## Notes

无
