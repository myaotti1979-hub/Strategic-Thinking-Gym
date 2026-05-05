# 事業戦略ケース Practice

マーケティングフレームワーク10種×3難易度のケーススタディ練習アプリ（PWA対応）

## 📊 コンテンツ

| 難易度 | 個別問題 | 総合シナリオ | 合計 |
|---|---|---|---|
| 🟢 初級 | 302問 | 15本×10ステップ=150問 | 452問 |
| 🟡 中級 | 200問 | — | 200問 |
| 🔴 上級 | 100問 | — | 100問 |
| **合計** | | | **752問** |

## 🎯 フレームワーク（10種）

**マーケティングフレームワーク**: PESTLE分析 → 5フォース分析 → SWOT分析 → クロスSWOT分析 → アンゾフの成長マトリクス → STP分析 → 4P/4C分析

**グロースモデル**: グロースモデル選択 → KPI設計 → 実行戦略パターン

## 🚀 使い方

### GitHub Pages でホスト

1. このリポジトリをフォークまたはクローン
2. Settings → Pages → Source: `main` branch, `/ (root)` を選択
3. `https://<username>.github.io/<repo-name>/` でアクセス

### PWA としてインストール

- **iOS**: Safari でアクセス → 共有 → ホーム画面に追加
- **Android**: Chrome でアクセス → メニュー → アプリをインストール
- **PC**: Chrome/Edge でアクセス → アドレスバーのインストールアイコン

### デバイス間自動同期（Firebase）

**初回セットアップ（2分）：**

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」→ 適当な名前 → 作成
3. 左メニュー「構築」→「Realtime Database」→「データベースを作成」
4. 「テストモードで開始」を選択 → 有効にする
5. 表示されるURL（`https://xxx-default-rtdb.firebaseio.com`）をコピー

**アプリでの設定：**

1. スタート画面の「☁️ クラウド同期を設定」をタップ
2. Firebase URLと同期ID（好きな文字列）を入力
3. 全端末で同じURL＋同期IDを設定すれば自動同期

回答するたびに自動でクラウドに保存され、別端末を開くと自動で同期されます。

**手動同期（Firebase なしでも利用可能）：**

📤 ボタンでエクスポート → 📥 ボタンでインポート

## 💬 壁打ちモード（Gemini API連携）

問題の解説後に「壁打ちする」ボタンでAIと議論できます。

- **⚡ Gemini 2.5 Flash**: ≈¥0.7/ターン（初級はFlash限定）
- **💎 Gemini 2.5 Pro**: ≈¥7/ターン
- **🧠 Gemini 3.1 Pro Preview**: ≈¥11/ターン

Gemini APIキーは [Google AI Studio](https://aistudio.google.com/apikey) で無料取得できます。

## 📁 ファイル構成

```
├── index.html      # メインアプリ（全コンテンツ内蔵）
├── manifest.json   # PWAマニフェスト
├── sw.js           # Service Worker（オフライン対応）
├── icon-192.svg    # アプリアイコン
├── icon-512.svg    # アプリアイコン（大）
└── README.md
```

## ⚡ オフライン対応

Service Workerにより一度アクセスすればオフラインでも利用可能（壁打ちモードのみオンライン必要）。
