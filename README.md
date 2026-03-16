# Todo List App

一個簡潔、無依賴的純前端待辦事項應用，使用原生 HTML、CSS 和 JavaScript 打造。

## 功能特色

- 新增待辦事項（標題 + 描述）
- 點擊標題展開／收合描述
- 勾選核取方塊標記完成狀態
- 刪除待辦事項
- 響應式設計，支援行動裝置
- 無需安裝或建置，開箱即用

## 快速開始

直接用瀏覽器開啟 `index.html` 即可使用，無需任何安裝或建置流程。

```bash
# 複製專案
git clone <repository-url>
cd todo-app

# 用瀏覽器開啟
open index.html   # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

## 使用方式

1. 在輸入欄位輸入待辦事項標題（必填）與描述（選填）
2. 點擊 **add** 按鈕或按下 **Enter** 新增
3. 點擊待辦事項標題展開或收合描述內容
4. 點擊核取方塊標記為已完成／未完成
5. 點擊 **delete** 刪除待辦事項

## 專案結構

```
todo-app/
├── index.html    # 主要 HTML 結構
├── app.js        # 應用程式邏輯（狀態管理、DOM 操作）
├── styles.css    # 樣式（響應式設計）
└── package.json  # 專案元資料
```

## 技術細節

- **語言：** 原生 JavaScript (ES6+)、HTML5、CSS3
- **外部依賴：** 無
- **建置工具：** 無
- **瀏覽器支援：** 所有現代瀏覽器

## 授權

MIT
