# Strategic Thinking Gym — セッション引継ぎ資料 (stgym-v63)

## プロジェクト概要
事業戦略練習アプリ（PWA）。10フレームワーク×3難易度のケーススタディ1000問。Gemini API壁打ち・AI問題生成・品質チェック機能付き。

## デプロイ情報
- GitHub Pages: https://myaotti1979-hub.github.io/Strategic-Thinking-Gym/
- リポジトリ: myaotti1979-hub/Strategic-Thinking-Gym（main branch、/(root)）

## ファイル構成（v63確定）
```
index.html      125KB  アプリ本体（UI・ロジック・全機能）
cases.js       1171KB  Claude作成問題データ（1000問、解説補完済み）
sw.js            1KB  Service Worker（PWAサポート、キャッシュなし）
manifest.json    1KB  PWAマニフェスト（1000問表記に修正済み）
icon-192.svg     2KB  アイコン（ゴールド×ブルー×ダークネイビー）
icon-512.svg     2KB  アイコン大
manual.html      8KB  使い方ガイド（v63対応済み）
README.md       10KB  リポジトリ説明（v63対応済み）
```

## トランスクリプト
```
/mnt/transcripts/2026-05-07-20-41-16-strategy-gym-quality-fixes-v31.txt
/mnt/transcripts/2026-05-08-10-41-07-strategy-gym-v45-full-session.txt
/mnt/transcripts/2026-05-09-06-30-01-strategy-gym-v31-to-v61-full-session.txt
```

## v63で完了した全作業

### バグ修正（5件）
1. `getApiKey()` 関数定義が欠落 → 追加（flash/flashliteは無料キー、他は有料キー）
2. ダッシュボード `\${gradeHtml}` がエスケープされ称号が表示されない → 修正
3. `runAdversarialReview()` が2重定義（旧版line 1032+新版line 1097）→ 旧版を削除
4. manifest.json 「952問」→「1000問」
5. manual.html / README.md のバージョン「v53」→「v63」

### 新機能実装（PENDING全7項目対応）
1. **❌ 間違えた問題の再出題** — `onlyWrong`フラグ、pool()フィルター、個別セットアップにトグル
2. **🔖 ブックマーク機能** — `bookmarks`オブジェクト(localStorage)、回答画面にトグルボタン、出題フィルター
3. **📊 ダッシュボードGemini統合** — GEMINI_CASESのFW別正答率をプログレスバーで表示
4. **📅 学習カレンダー** — `answerDates`で回答日時記録、月別カレンダーグリッド、連続日数(ストリーク)、月間統計
5. **🌙 ダーク/ライトモード切替** — CSS `.light-mode`クラス、`toggleDarkMode()`、`applyTheme()`、localStorage保存
6. **解説補完（442問）** — 不正解選択肢への言及が不足していた解説にdescriptionベースの参照を追加
7. **同一文字2回使用精査** — 重複3回以上は4件のみ、正答判定に影響なし確認済み

### その他の改善
- 初級壁打ちのモデル表示をFlash→Flash-Liteに統一
- 個別問題セットアップに不正解数・ブックマーク数の表示追加
- 3つの出題フィルター（未回答/間違えた問題/ブックマーク）は排他的に動作

## 重要な構造メモ（v63更新分）

### 新しいstate変数
```
onlyWrong=false          // 間違えた問題フィルター
bookmarks={}             // localStorage 'bookmarks' キー
answerDates={}           // localStorage 'answer_dates' キー
darkMode=true            // localStorage 'dark_mode' キー（デフォルト: ダーク）
window.onlyBookmarked    // ブックマークフィルター（window変数）
window._calMonth/Year    // カレンダーの表示月・年
```

### 新しい関数
```
getApiKey(model)         // flash/flashlite→無料キー、他→有料キー
toggleBookmark(id)       // ブックマーク追加/解除
rCalendar()              // カレンダー画面レンダー
calcStreak()             // 連続学習日数計算
toggleDarkMode()         // テーマ切替
applyTheme()             // body.light-modeクラスのtoggle
```

### 既存の構造（v62から変更なし）
- cases.js: `<script src="cases.js" defer>` + waitForCases()で250msポーリング
- GEMINI_CASES: localStorageの'gemini_questions'キーに保存
- sw.js: キャッシュなし、fetchイベントハンドラ空
- pool(): `questionSource==='gemini'?GEMINI_CASES:CASES` + 3フィルター（未回答/不正解/ブックマーク）
- getApiKey(model): flash/flashliteは無料キー、それ以外は有料キー
- saveAnswer: 回答結果 + 日時 を両方保存

## MODEL_INFO（v63、v62から変更なし）
```
flashlite: {api:'gemini-3.1-flash-lite', $0.25/$1.50, 最速・最安}
flash:     {api:'gemini-2.5-flash',      $0.30/$2.50, コスパ重視}
pro25:     {api:'gemini-2.5-pro',        $1.25/$10,   バランス型}
pro31:     {api:'gemini-3.1-pro-preview',$2.00/$12,   最高品質}
```

## RESOLVED（v63で解決済み、元PENDINGリスト）
1. ✅ 解説補完 — 442問の解説にオプション参照追加
2. ✅ 同一文字2回使用精査 — 重複3回以上は4件のみ、影響なし確認
3. ✅ ダッシュボードにGemini問題も集計
4. ✅ 間違えた問題だけの再出題モード
5. ✅ 学習進捗のカレンダービュー
6. ✅ ブックマーク機能
7. ✅ ダークモード/ライトモード切替

## PENDING（次セッション）
1. **残り約500問の解説を更にAIで高品質化** — 現在のテンプレ補完をAI生成で置換
2. **カレンダーの年間ヒートマップ表示** — GitHub風の年間グリッド
3. **問題の難易度フィードバック** — ユーザーが「簡単すぎ/難しすぎ」を報告
4. **成績トレンドグラフ** — 直近N問の正答率推移をチャート表示

## ユーザーの品質方針（確定、v62から継続）
- [DECISION] 選択肢の質は全難易度で高品質に。正答だけが長いのは絶対禁止
- [DECISION] FW用語を選択肢に書かない。テンプレ汎用表現禁止
- [DECISION] 品質チェック項目は全てエラー扱い（警告不可）
- [DECISION] モデルフォールバック禁止（品質を落とすな）
- [DECISION] 偽の進捗表示禁止（実際のステータスのみ）
- [DECISION] SWキャッシュなし（安定動作優先）
- [DECISION] ブラウザ履歴削除の案内は絶対にしない（ユーザーデータ消失事故の教訓）
