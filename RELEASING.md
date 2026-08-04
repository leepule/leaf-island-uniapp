# 发布规范

本仓库使用 [Semantic Versioning](https://semver.org/lang/zh-CN/)（SemVer），版本格式为 `MAJOR.MINOR.PATCH`，Git 标签统一添加 `v` 前缀，例如 `v1.0.0`。

根目录演示工程与 `src/uni_modules/animal-island` 组件包始终使用同一个版本号。请勿手动只修改其中一个 `package.json`。

## 版本号规则

| 类型 | 使用场景 | 示例 |
| --- | --- | --- |
| `PATCH` | 向后兼容的问题修复、小范围样式修正 | `1.0.0` → `1.0.1` |
| `MINOR` | 向后兼容的新组件、新能力 | `1.0.1` → `1.1.0` |
| `MAJOR` | `1.0.0` 后存在破坏性 API 变更 | `1.2.0` → `2.0.0` |
| 预发布 | 需要公开验证但尚未稳定 | `1.0.0-beta.1` |

当前版本为 `1.0.0`，表示组件 API 已按稳定版本对外发布。后续新增能力使用 `MINOR`，兼容性修复使用 `PATCH`；只有破坏性 API 变更才递增 `MAJOR`。

## 发布步骤

1. 根据改动选择并更新版本：

   ```bash
   yarn release:patch
   # 或 yarn release:minor
   # 或 yarn release:major
   # 或 yarn release:set 1.0.0-beta.1
   ```

2. 检查两个包的版本是否一致：

   ```bash
   yarn release:check
   ```

3. 提交版本变更，然后创建同名标签：

   ```bash
   git add package.json src/uni_modules/animal-island/package.json
   git commit -m "chore(release): v1.0.0"
   git tag v1.0.0
   git push origin main
   git push origin v1.0.0
   ```

标签推送后，GitHub Actions 会检查标签与包版本是否一致，打包 `src/uni_modules/animal-island`，并自动创建 GitHub Release 和生成发布说明。

## 发布产物

每个 GitHub Release 包含：

- GitHub 自动生成的源码压缩包；
- `animal-island-vX.Y.Z.zip`，解压后可直接获得 `animal-island` uni_modules 目录；
- 根据提交和 Pull Request 自动生成的 Release Notes。
