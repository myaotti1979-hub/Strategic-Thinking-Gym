# 事業戦略ケース Practice — セッション引継ぎ資料 (stgym-v62)

## プロジェクト概要
事業戦略練習アプリ（PWA）。10フレームワーク×3難易度のケーススタディ1000問。Gemini API壁打ち・AI問題生成・品質チェック機能付き。

## デプロイ情報
- GitHub Pages: https://myaotti1979-hub.github.io/Strategic-Thinking-Gym/
- リポジトリ: myaotti1979-hub/Strategic-Thinking-Gym（main branch、/(root)）

## ファイル構成（v62確定）
```
index.html      120KB  アプリ本体（UI・ロジック・全機能）
cases.js       2565KB  Claude作成問題データ（1000問）
sw.js            1KB  Service Worker（PWAサポート、キャッシュなし）
manifest.json    1KB  PWAマニフェスト
icon-192.svg     2KB  アイコン（ゴールド×ブルー×ダークネイビー）
icon-512.svg     2KB  アイコン大
manual.html      8KB  使い方ガイド
README.md       10KB  リポジトリ説明
```

## トランスクリプト
```
/mnt/transcripts/2026-05-07-20-41-16-strategy-gym-quality-fixes-v31.txt
/mnt/transcripts/2026-05-08-10-41-07-strategy-gym-v45-full-session.txt
/mnt/transcripts/2026-05-09-06-30-01-strategy-gym-v31-to-v61-full-session.txt
```

## 現セッション（v45→v62）で完了した全作業

### 問題品質修正 [304件修正]
- 「前者/後者」表現241件削除
- レター取り違え（A↔B等）59件修正
- 正答を否定する解説12件修正
- 不正解を正答扱い4件修正
- 存在しない選択肢参照1件修正（ID:881 G→D）
- 選択肢途切れ2件修正（ID:621,967）
- 数値整合性チェック → 問題なし（0件）
- Claude1000問全問の回答・選択肢・解説の整合性チェック完了

### SW問題の最終解決
- [DECISION] SWからキャッシュ機能を完全削除。fetchイベントハンドラ空（ネットワーク直通）
- install時にskipWaiting、activate時に古いキャッシュ全削除
- PWAインストールサポートのみ残す
- デプロイ→即反映（?v=XX不要）

### 新機能実装
1. **問題データ分離** — cases.js（2.5MB）をdefer読み込み、waitForCases()で250msポーリング
2. **ダッシュボード** — SVGレーダーチャート、難易度別正答率、FW別プログレスバー、称号表示（30問以上回答後、直近50問評価）
3. **データ管理** — 問題データ/回答履歴のエクスポート/インポート
4. **問題作成モード** — リスト選択式（11カテゴリ×10業種＝110業種）、企業規模・経営状況・FW・難易度をプルダウン選択、モデル選択（3.1 Pro/2.5 Pro）
5. **品質チェック体制** — 構造チェック10項目（全てエラー扱い）、反論テスト（手動ボタン）、AIレビュー（5項目評価）、不合格時のAI修正機能、自己反論テストをプロンプトに統合
6. **Claude/Gemini問題分離タブ** — Gemini問題のlocalStorage保存、個別削除機能
7. **デュアルAPIキー** — 有料キー（Pro用）＋無料キー（Flash用）、getApiKey(model)で自動切替
8. **3.1 Flash-Lite対応** — MODEL_INFOに追加、初級壁打ちは自動的にFlash-Lite使用
9. **商社・卸売カテゴリ** — 10業種追加（CQ_INDUSTRIESに統合、rCreateQは参照のみ）
10. **アイコン刷新** — ゴールド×ブルー×ダークネイビー、STG白文字上部
11. **アプリ名変更** — Strategic Thinking Gym → 事業戦略ケース Practice

### 称号システム
- 👑 ストラテジスト（80%+）、🎖️ マネージャー（60-79%）、⭐ リーダー（40-59%）、📚 インターン（0-39%）
- ダッシュボードに表示（30問以上回答後、直近50問評価）
- 結果画面にも表示

### コードレビュー対応
- インラインstyle 258→241個（30個のCSSクラス追加）
- エラーメッセージ日本語化
- モバイルタッチ最適化（touch-action:manipulation）
- 重要ボタン（壁打ち、設定等）にインラインonclick追加
- bindAll→CQ_INDUSTRIES統一（業種リスト重複解消）
- 偽の進捗表示を削除（実際のステータスのみ表示）

## MODEL_INFO（v62）
```
flashlite: {api:'gemini-3.1-flash-lite', $0.25/$1.50, 最速・最安}
flash:     {api:'gemini-2.5-flash',      $0.30/$2.50, コスパ重視}
pro25:     {api:'gemini-2.5-pro',        $1.25/$10,   バランス型}
pro31:     {api:'gemini-3.1-pro-preview',$2.00/$12,   最高品質}
```

## 品質チェック体制（問題作成時）
```
STEP 1: 生成（自己反論込みプロンプト、1回のAPI）
STEP 2: 構造チェック（10項目、自動、無料）
STEP 3: 反論テスト（手動ボタン）
STEP 4: AI品質レビュー（手動ボタン、5項目評価）
不合格時: AIで修正→再チェック or やり直し
```

## プロンプトに組み込まれた品質ルール
- FW別出題パターン（PESTLE=外部要因のインパクト、5F=脅威×発生確率、KPI=因果関係の強さ等）
- FW別分析アプローチ（PESTLE/5F=外部環境を読む力、SWOT/4P=打ち手を選ぶ力、KPI/実行=測定・実行する力）
- 戦略の実現可能性（赤字企業に大規模投資禁止、安直SO戦略禁止）
- 数値整合性（売上÷拠点数、業界コスト構造との整合）
- 上級構造設計（全選択肢にデータ、罠の選択肢設定、消去法不可、一見最良に見える罠）
- 正答ポジションローテーション（GEMINI_CASES.length%4でa→b→c→d）
- 自己反論テスト（生成後に内部で反論試行→修正してから出力）
- 状況文ヒント禁止（状況文に「○○を検討」→そのまま正答にしない）
- 設問文ヒント禁止（「強みを活かし」「機会を捉え」等を設問に書かない）

## 重要な構造メモ
- cases.js: `<script src="cases.js" defer>` + waitForCases()で250msポーリング
- GEMINI_CASES: localStorageの'gemini_questions'キーに保存
- sw.js: キャッシュなし、fetchイベントハンドラ空（PWAインストールサポートのみ）
- pool(): `questionSource==='gemini'?GEMINI_CASES:CASES`
- rIndividualSetup: `const _src=questionSource==='gemini'?GEMINI_CASES:CASES`
- getApiKey(model): flash/flashliteは無料キー、それ以外は有料キー
- ID採番: `max(CASES全ID, GEMINI全ID)+1`
- 正答ポジション: `'abcd'[GEMINI_CASES.length%4]`
- CQ_INDUSTRIES: グローバル定数、rCreateQはこれを参照（重複なし）

## PENDING（次セッション）
1. **930問の解説補完** — 全4選択肢への言及がない問題。初級から順に100問ずつAIで補完
2. **残り約50件の「同一文字2回使用」精査** — 正答判定には影響しないが要確認
3. **ダッシュボードにGemini問題も集計** — 品質安定後に統合
4. **間違えた問題だけの再出題モード**
5. **学習進捗のカレンダービュー**
6. **ブックマーク機能**
7. **ダークモード/ライトモード切替**

## ユーザーの品質方針（確定）
- [DECISION] 選択肢の質は全難易度で高品質に。正答だけが長いのは絶対禁止
- [DECISION] FW用語を選択肢に書かない。テンプレ汎用表現禁止
- [DECISION] 品質チェック項目は全てエラー扱い（警告不可）
- [DECISION] モデルフォールバック禁止（品質を落とすな）
- [DECISION] 偽の進捗表示禁止（実際のステータスのみ）
- [DECISION] SWキャッシュなし（安定動作優先）
- [DECISION] ブラウザ履歴削除の案内は絶対にしない（ユーザーデータ消失事故の教訓）
