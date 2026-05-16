# Strategic Thinking Gym — 引継ぎ資料 (stgym-v65)

## ✅ v65: セキュリティ強化＋新機能11件

### GitHub Pages
- URL: https://myaotti1979-hub.github.io/Strategic-Thinking-Gym/
- リポジトリ: myaotti1979-hub/Strategic-Thinking-Gym

---

## デプロイ対象ファイル（5ファイル）

プレフィックス `stgym-v65-` を外してリポジトリルートにpush。

| 出力ファイル名 | リネーム先 | サイズ | 変更内容 |
|---|---|---|---|
| stgym-v65-index.html | `index.html` | 148KB | セキュリティ+新機能11件 |
| stgym-v65-sw.js | `sw.js` | 428B | キャッシュ名v65化 |
| stgym-v65-manual.html | `manual.html` | 8KB | v65＋新機能9セクション追加 |
| stgym-v65-README.md | `README.md` | 11KB | v65＋新機能セクション追加 |
| stgym-v65-CHANGELOG.md | `CHANGELOG.md` | 9KB | v65エントリ追加 |

cases.js, manifest.json, icon-*.svg は変更なし。

---

## v65 変更一覧

### セキュリティ（最優先で実施）
- `esc()` HTMLエスケープ関数を追加
- 全画面の全innerHTML挿入箇所にesc()適用（rQ, rSc, rSearch, rSparringHistory, rSparringView, rCreateQ, fixQuestionFromReview, rIndividualSetup Gemini一覧, rDashboard Gemini FW名）
- JSONインポート経由のXSSリスクを遮断

### コード品質
- `JPY_RATE = 152` 定数化（ハードコード排除）
- `sendChat()` IIFE二重ラップ除去
- `rQ()` を3ブロックに分解（optionsHtml / explHtml / crossNavHtml）
- `COMP_IDS` → `buildCompIds()` でCASESから自動生成

### データ整合性
- Firebase同期: answerDates, bookmarks, GEMINI_CASES, sparring_sessions, srsData, darkMode, dailyGoal を全て同期
- clearHistory(): answerDates, srsData もリセット

### 新機能11件
1. 結果画面振り返り（タップで解説展開）
2. 間隔反復SRS（正解→間隔延長、不正解→1日後）
3. 弱点FW自動検出＋「鍛える」ボタン
4. 問題検索（業種・キーワード）
5. 総合ケース進捗表示（✓ / (N/M)）
6. 日次目標プログレスバー
7. 週別正答率グラフ（SVG）
8. 壁打ちテキストコピー
9. FWクロスナビゲーション
10. 壁打ち途中保存（24時間以内なら復元）
11. 学習設定画面（日次目標数）

---

## 新しいデータ構造

### srsData (localStorage: 'srs_data')
```javascript
// srsData[questionId] = { nextReview: timestamp, interval: days, easeFactor: 2.5 }
// 正解: interval *= easeFactor, easeFactor += 0.1 (max 3.0)
// 不正解: interval = 1, easeFactor -= 0.2 (min 1.3)
```

### dailyGoal (localStorage: 'daily_goal')
```javascript
// デフォルト: 5問/日
// 設定画面で1〜50に変更可能
```

### sparring_draft (localStorage: 'sparring_draft')
```javascript
// { caseId, chatHist, chatTurns, savedAt }
// goHome()時に自動保存、同じ問題で自動復元、24時間で期限切れ
```

---

## COMP_IDS 自動生成ロジック

```javascript
function buildCompIds(){
  // 1. CASESからindustryフィールドの「〜社」「〜銀行」をパターンマッチ
  // 2. 同名企業のIDをグループ化
  // 3. 5問未満の企業は除外
  // 4. 各企業の多数派難易度で🟢🟡🔴のプレフィックスを決定
  // waitForCases()完了時に自動実行
}
```
cases.js差替え時の手動COMP_IDS更新は不要。

---

## Firebase同期データ（v65拡張）

| キー | データ | v64 | v65 |
|---|---|---|---|
| h | answerHistory | ✅ | ✅ |
| m | gemModel | ✅ | ✅ |
| k | gemKey | ✅ | ✅ |
| c | monthlyCost | ✅ | ✅ |
| ad | answerDates | ❌ | ✅ |
| bk | bookmarks | ❌ | ✅ |
| gq | GEMINI_CASES | ❌ | ✅ |
| sp | sparring_sessions | ❌ | ✅ |
| sr | srsData | ❌ | ✅ |
| dm | darkMode | ❌ | ✅ |
| dg | dailyGoal | ❌ | ✅ |

---

## Gemini API モデル情報（変更なし）

```javascript
const MODEL_INFO={
  flash:     { api:'gemini-2.5-flash',        ... },
  flashlite: { api:'gemini-3.1-flash-lite',    ... },
  pro25:     { api:'gemini-2.5-pro',            ... },
  pro31:     { api:'gemini-3.1-pro-preview',    ... }  // ← GA化時に要更新
};
```

---

## 品質ルール（変更なし）

1. 全選択肢を同じ詳細度（正答だけ長い＝絶対禁止）
2. FW用語を選択肢に書かない
3. 正答ポジション各25%均等
4. 解説は全4選択肢に言及
5. アプリ名勝手に変更禁止

---

## ユーザーの方針（確定事項・変更なし）

- [DECISION] SWキャッシュなし（安定動作優先）
- [DECISION] ブラウザ履歴削除の案内は絶対にしない
- [DECISION] モデルフォールバック禁止
- [DECISION] 偽の進捗表示禁止

---

## PENDING（次セッション候補）

1. **render monkey-patch統合** — _renderWithSync をrSに直接統合し、monkey-patchを解消
2. **bindAll()の整理** — インラインonclick vs bindAll の二重バインドを統一
3. **PWA通知** — 日次目標未達時のリマインド通知
4. **インラインstyle削減** — CSSクラスへの移行（現在241→さらに削減可能）
5. **問題データの930問解説補完** — 全4選択肢への言及が不足している問題
6. **gemini-3.1-pro-preview のGA化対応**
