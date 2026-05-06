# English Talk Trainer

AI-Powered English Conversation Practice PWA

Gemini 2.5 Flash/Pro × Azure Speech × PWA

## Features

### 4 Training Modes
- **Free Talk** — AI英会話（17カテゴリ・207トピック・54ロールプレイ）
- **Flash Translation** — 瞬間英作文（10問1セット×4カテゴリ×5レベル）
- **Shadowing** — AI発話を繰り返し＋Azure発音評価
- **News Discussion** — 実際のニュースを読んで議論（22ジャンル・Google Search Grounding）

### CEFR 5段階レベル
A1（入門）〜 C1（上級）。語彙・文法・話速・フィードバック基準を体系的に定義。

### 学習支援
- **チャレンジ表現** — 22スキルカテゴリ×ローテーション。トピック連動。使用判定＋AI評価
- **復習システム** — 間隔反復（1→3→7→14→30日）
- **フレーズ集** — ユーザー自身が使ったフレーズを自動抽出・記録
- **会話ログ** — 最大50セッション保存
- **ストリーク＋カレンダー** — 連続学習日数表示
- **自動CEFRレベル判定** — 直近10セッション平均から推奨レベル

### 音声
- **TTS**: Azure Neural TTS（10声×4アクセント）+ ブラウザ音声フォールバック
- **STT**: Azure STT（デフォルト）/ Web Speech API / 自動切替
- **発音評価**: Azure Pronunciation Assessment（Shadowing）

### コスト最適化
- Azure STT + Flash構成: 1セッション約7円
- Web Speech + Flash構成: 1セッション約3.5円
- 累計コストをホーム画面に表示

## Setup

### Required
- **Gemini API Key** — [Google AI Studio](https://aistudio.google.com/apikey)

### Recommended
- **Azure Speech Key** — [Azure Portal](https://portal.azure.com/) → Speech Services

### Deployment
GitHub Pages, Netlify, Cloudflare Pages 等のHTTPS環境に配置。

```
English-Talk-Trainer/
├── index.html          # メインアプリ（単一ファイルSPA）
├── sw.js               # Service Worker
├── manifest.json       # PWA マニフェスト
├── manual.html         # マニュアル
├── icon-192.png        # PWA アイコン
├── icon-512.png        # PWA アイコン（大）
└── apple-touch-icon-*.png  # iOS アイコン
```

## Tech Stack
- **AI**: Gemini 2.5 Flash / Pro（Google AI Studio API）
- **Speech**: Azure Cognitive Services Speech SDK
- **Frontend**: Vanilla HTML/CSS/JS（フレームワークなし）
- **PWA**: Service Worker + Web App Manifest

## Version
v2026.05.06o

## License
Private / Personal Use
