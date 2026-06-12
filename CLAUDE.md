# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案說明

這是「100分教育資源整合中心」的靜態電商網站，販售 PDF 教材（題庫、補充教材、學習單），主要客群為國小、國中、高中學生及家長。

## 執行方式

無需任何建置工具。直接開啟 `index.html`，或啟動本地伺服器：

```bash
python -m http.server 8000
# 或
npx serve
```

無 package.json、無測試框架、無 lint 設定。

## 架構

專案由四個檔案組成，載入順序很重要：

1. **`index.html`** — 頁面骨架（導覽列、商品網格、購物車側欄、結帳 Modal）
2. **`data.js`** — 商品資料，將 `books` 陣列掛載到 `window.books`（需先於 app.js 載入）
3. **`app.js`** — 主邏輯：`renderBooks()` 渲染商品卡、`renderCart()` 渲染購物車、`addToCart` / `updateQuantity` / `removeFromCart` 管理狀態
4. **`styles.css`** — 完整樣式，使用 CSS 變數統一主題色

## 資料流

```
window.books (data.js) → renderBooks() → DOM 商品卡
使用者點擊「加入購物車」→ addToCart() → renderCart() → 購物車側欄更新
使用者送出表單 → POST Formspree endpoint → 清空購物車 + Toast 通知
```

## 商品資料欄位（data.js）

每筆商品包含：`id`, `title`, `description`, `price`, `image`, `hasUsb`, `dataComplete`。

- `hasUsb`：是否附贈隨身碟，預設 `true`，卡片上顯示為金黃色膠囊徽章。
- `dataComplete`：資料是否齊全，預設 `true`，卡片上顯示「資料齊全 ✓」或「資料不齊全 ✓」正方形框。

## 結帳 Modal

- 欄位：收件人姓名、收件人信箱、聯絡電話、收件地址。
- Modal 開啟時（`openModal()`）會動態渲染目前購物車的下單明細，含運費列。
- 明細區塊（`#order-summary-items`）設有 `max-height: 180px; overflow-y: auto`，商品多時可捲動。
- Modal 整體設有 `max-height: 90vh; overflow-y: auto`，避免表單被截斷。

## 運費

固定 NT$100，定義為 `app.js` 頂部的常數 `const SHIPPING = 100`。購物車側欄總計、Modal 明細總計、Formspree 送出資料均已加入此費用，與商品數量無關。

## 重要實作細節

- **Formspree 端點**：硬編碼於 [app.js](app.js)，變數名為 `FORMSPREE_ENDPOINT`，需要替換時直接改該行。
- **事件監聽器**：購物車按鈕（`+` / `-` / 移除）在每次 `renderCart()` 時重新綁定，沒有使用事件委派。修改購物車 DOM 結構時需注意同步更新綁定邏輯。

## 已知問題

- `data.js` 中商品 ID 20 重複出現三次（最後三筆資料），`addToCart` 用 `find()` 只會匹配到第一筆。
- 購物車狀態不持久化（重新整理即清空，未使用 localStorage）。
