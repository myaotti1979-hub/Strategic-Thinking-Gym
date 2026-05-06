# 更新履歴 — Strategic Thinking Gym

## v6（2025-05-06）🎯 1,000問達成
- 全1,000問（初級452＋中級325＋上級223）
- 全10フレームワーク×100問ずつの完全バランス達成
- 上級総合シナリオ10社を追加
- ボーナス個別問題48問を追加（中級22問＋上級26問）
- 業種：ペットフード、地方バス、ウェディング、学習塾、製薬、地方新聞、カーディーラー、クラフトビール、人材派遣、温泉旅館、総合商社、損保、牛丼チェーン、フィットネス、会計SaaS、化粧品OEM、物流倉庫、法律事務所、建設テック、介護テック 他

## v5（2025-05-06）🎯 弱点パーソナライズ壁打ち
- レビューカードに「思考パターン」フィールド追加（FW非依存の上位概念）
- `getTopWeaknessPattern()` で全レビューカードの思考パターンを集計
- 壁打ちのシステムプロンプトに弱点を自動注入
- 直接指摘ではなく問いかけで気づかせるコーチング設計

## v4（2025-05-06）📋 戦略レビューカード
- 壁打ち終了時にバックグラウンドで2回目のAPI呼出し
- AIが4項目をJSON生成：summary / strength / improvement / weaknessPattern
- 壁打ち履歴一覧にカードをサムネ表示
- 壁打ち詳細ページにカードを大きく表示
- saveSparringSession を try/catch でラップ

## v3（2025-05-06）🐛 壁打ちフリーズ修正
- `MAX_CHAT` 未定義変数を `chatMaxTurns` に修正（最終ターンフリーズの根本原因）
- sendChat の async IIFE + try/catch/finally で確実に chatLoading をリセット
- AbortController で30秒タイムアウト実装
- APIエラー時のフォールバックメッセージ表示

## v2（2025-05-06）🎨 HOME画面リニューアル + ブランディング
- タイトル変更：Strategic Thinking Gym（英語メイン）+ 副題（日本語）
- HOME画面を3画面構成に分離（ハブ / 個別設定 / 総合設定）
- スプラッシュスクリーン（幾何学ロゴ + フェードアップアニメーション）
- 🧠（脳みそ絵文字）を全箇所から削除→幾何学SVGロゴに統一
- アプリアイコンを幾何学ヘキサゴン×プリズムデザインに
- manifest.json: name="Strategic Thinking Gym", short_name="STGym"
- 壁打ち履歴保存機能（saveSparringSession / showSparringHistory）
- 壁打ち履歴の閲覧・削除画面

## v1（2025-05-05）🚀 初期リリース
- 初級452問（個別302＋総合15社×10=150）
- 中級200問（個別のみ）
- 上級100問（個別のみ）
- 壁打ちモード（Gemini API連携）
- PWA化（Service Worker + manifest.json）
- Firebase Realtime Database 自動同期
- 手動エクスポート/インポート
