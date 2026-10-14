# co

408 课程交互式可视化项目合集。采用与 [ds](https://github.com/FutabaLy/ds) 类似的「门户首页 + 独立实验子路径」结构，首个项目为计算机网络物理层数字编码实验室。

**[打开网站](https://futabaly.github.io/co/)** · **[进入数字编码实验室](https://futabaly.github.io/co/digital-encoding/)**

## 项目索引

| 项目 | 内容 | 在线体验 |
| --- | --- | --- |
| [digital-encoding](projects/digital-encoding/) | NRZ、RZ、NRZI、曼彻斯特和差分曼彻斯特波形对比、逐位推导、随机读图练习 | [打开实验](https://futabaly.github.io/co/digital-encoding/) |

## 数字编码实验室

- 输入最多 12 位二进制序列，点击比特块或双击波形列翻转比特。
- 同步显示五种编码与时钟信号，可隐藏部分对比轨道。
- 切换初始高／低电平、曼彻斯特中心极性、差分曼彻斯特边界规则。
- 点击波形列、使用上一位／下一位，或启动自动演示查看逐位推导。
- 随机生成 8 位读图练习，支持辅助标记、提交批改和逐位答案解析。
- 提供编码规则速查表，小屏幕可横向滚动查看波形。

练习题由程序随机生成，并非历年真题题库。编码约定以页面配置与具体题目为准；NRZI 在本实验中采用「0 跳变、1 保持」。练习状态保存在当前页面内，刷新后重置。

## 本地运行

需要 Node.js 20 或更新版本进行检查和打包，无需安装 npm 依赖：

```sh
node scripts/check.mjs
node scripts/build-pages.mjs
python -m http.server 8000 --directory dist
```

打开 <http://localhost:8000/>。也可以直接打开 `projects/digital-encoding/index.html` 使用实验。

实验使用 Tailwind CSS CDN 与 Google Fonts，需要网络加载样式和在线字体；字体不可用时会使用系统字体。实验运算在浏览器本地执行，无需后端。

## 目录结构

```text
projects.json                       项目索引，首页由此生成
projects/digital-encoding/index.html 数字编码实验（基于提供的 408.html）
projects/digital-encoding/README.md  实验说明
scripts/check.mjs                    静态结构与 JavaScript 语法检查
scripts/build-pages.mjs              生成门户与各实验页面
.github/workflows/deploy-pages.yml   自动检查、构建与发布
dist/                               构建产物，不提交
```

## 发布与扩展

GitHub Pages 使用 GitHub Actions 部署。每次推送到 `main` 会先检查页面与脚本，再生成并部署 `dist/`；也可以在 Actions 页面手动运行工作流。PR 只检查和构建，不部署。

新增实验时，将静态文件放入 `projects/<项目名>/`，添加 README，并在 `projects.json` 中登记 `slug`、`title`、`description`、`tags`。运行上述检查和构建命令后提交。首页入口和 `/co/<项目名>/` 子路径会自动生成。
