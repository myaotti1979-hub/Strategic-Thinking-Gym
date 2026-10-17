// Usage: node validate_all.js <cases.js | merged.json>
// Full-dataset quality gate for Strategic Thinking Gym (1,000 questions).
const fs = require('fs');
const f = process.argv[2];
let raw = fs.readFileSync(f, 'utf8');
const C = f.endsWith('.json') ? JSON.parse(raw) : eval(raw.replace(/^[\s\S]*?const CASES\s*=\s*/, '(').replace(/;\s*$/, ')'));
const BANNED = {
  'PESTLE分析': ['PESTLE', 'Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental'],
  '5フォース分析': ['5フォース', 'ファイブフォース', '5Forces', '新規参入の脅威', '代替品の脅威', '買い手の交渉力', '売り手の交渉力', '業界内競争'],
  'SWOT分析': ['SWOT'], 'クロスSWOT分析': ['クロスSWOT', 'SO戦略', 'WO戦略', 'ST戦略', 'WT戦略'],
  'アンゾフの成長マトリクス': ['市場浸透', '新市場開拓', '新製品開発', '多角化', '既存市場', '新規市場', '既存製品', '新規製品', 'アンゾフ'],
  'STP分析': ['セグメンテーション', 'ターゲティング', 'ポジショニング', 'STP', 'セグメント選定', '標的市場'],
  '4P/4C分析': ['Product', 'Price', 'Place', 'Promotion', '4P', '4C', 'マーケティングミックス'],
  'グロースモデル選択': ['PLG', 'SLG', 'MLG', 'CLG', 'プロダクトレッドグロース', 'セールスレッドグロース'],
  'KPI設計': ['KPI', 'KGI', '先行指標', '遅行指標'], '実行戦略パターン': ['MVP', 'リーンスタートアップ', 'アジャイル']
};
const PARTICLE = 'をでにのとはがしてりめけさせ';
const FILLERS = ['これにより成長を確保する', 'これにより成長を加速する', 'これにより改善を加速する', 'これにより改善を実現する', 'これにより実行品質を確保する', '本問の課題に対して直接的な解決にならない'];
const CONTAM = ['Wait', 'Actually', 'Let me', 'my plan', 'Hmm', 'I think', 'I need', 'I should'];
const errs = []; const E = (q, m) => errs.push(`id=${q.id}: ${m}`);

if (C.length !== 1000) errs.push('total must be 1000, got ' + C.length);
if (new Set(C.map(q => q.id)).size !== C.length) errs.push('duplicate ids');
const diff = {}, fwCount = {}, sit = {}, optSet = {};
const st = {};
C.forEach(q => {
  diff[q.difficulty] = (diff[q.difficulty] || 0) + 1; fwCount[q.framework] = (fwCount[q.framework] || 0) + 1;
  if (!BANNED[q.framework]) E(q, 'unknown framework ' + q.framework);
  if (q.situation.length < 120) E(q, 'situation < 120');
  const sk = q.situation.replace(/^[^。]*。/, '').slice(0, 50); (sit[sk] = sit[sk] || []).push(q.id);
  const ok = q.options.map(o => o.label).sort().join('|'); (optSet[ok] = optSet[ok] || []).push(q.id);
  if (q.options.map(o => o.id).join('') !== 'abcd') E(q, 'option ids');
  q.options.forEach(o => {
    if (o.label.length > 40 || o.label.length < 14) E(q, `${o.id} label length ${o.label.length}`);
    if (o.description.length < 30 || o.description.length > 75) E(q, `${o.id} desc length ${o.description.length}`);
    if (/…|\.\.\./.test(o.label + o.description)) E(q, `${o.id} ellipsis`);
    if (PARTICLE.includes(o.label[o.label.length - 1])) E(q, `${o.id} label ends with particle`);
    (BANNED[q.framework] || []).forEach(w => { if ((o.label + o.description).includes(w)) E(q, `${o.id} banned term ${w}`); });
  });
  FILLERS.forEach(x => { if (JSON.stringify(q).includes(x)) E(q, 'filler phrase: ' + x); });
  CONTAM.forEach(w => { if (JSON.stringify(q).includes(w)) E(q, 'contamination ' + w); });
  ['a', 'b', 'c', 'd'].forEach(x => { if (!q.explanation.includes('選択肢' + x)) E(q, 'explanation missing 選択肢' + x); });
  if (!q.explanation.slice(0, 20).includes('選択肢' + q.bestAnswer)) E(q, 'explanation does not open with best answer');
  const rest = q.explanation.slice(q.explanation.indexOf('。') + 1);
  if (new RegExp('選択肢' + q.bestAnswer + 'は[^。]{0,40}(だが|ならない|不十分|できない|延命|限界|解決しない|欠ける|遅い)').test(rest)) E(q, 'explanation body criticises the best answer (possible wrong key)');
  if (/選択肢[a-d]の(一部|要素|実行手段)|選択肢[a-d](や選択肢[a-d])?の要素も含|選択肢[a-d]も含む|選択肢[a-d]は[^。]{0,12}包括的/.test(q.explanation)) E(q, 'answer justified as superset of another option (distractor is partly correct)');
  const ls = q.options.map(o => o.label.length), ds = q.options.map(o => o.description.length);
  if (Math.max(...ls) / Math.min(...ls) > 1.6) E(q, 'label spread');
  if (Math.max(...ds) / Math.min(...ds) > 1.35) E(q, 'desc spread');
  const bi = q.options.findIndex(o => o.id === q.bestAnswer);
  const oL = ls.filter((_, j) => j !== bi), oD = ds.filter((_, j) => j !== bi);
  const s = st[q.framework] = st[q.framework] || { n: 0, longL: 0, longD: 0, gL: 0, gD: 0, gsD: 0, cD: 0, wD: 0 };
  s.n++; if (ls[bi] > Math.max(...oL)) s.longL++; if (ds[bi] > Math.max(...oD)) s.longD++;
  const g = (v, pick) => { const t = pick(...v); return v[bi] === t ? 1 / v.filter(x => x === t).length : 0; };
  s.gL += g(ls, Math.max); s.gD += g(ds, Math.max); s.gsD += g(ds, Math.min);
  s.cD += ds[bi]; oD.forEach(x => s.wD += x / 3);
});
if (diff['初級'] !== 200 || diff['中級'] !== 300 || diff['上級'] !== 500) errs.push('difficulty split ' + JSON.stringify(diff));
Object.entries(fwCount).forEach(([k, v]) => { if (v !== 100) errs.push(k + ' has ' + v); });
Object.values(sit).filter(v => v.length > 1).forEach(v => errs.push('duplicate situation body: ' + v.join(',')));
Object.values(optSet).filter(v => v.length > 1).forEach(v => errs.push('identical option sets: ' + v.join(',')));
console.log('FW | 正解が最長(厳密) label/desc | 「最長を選ぶ」正答率 label/desc | 「最短を選ぶ」正答率 desc | 平均長比 desc');
let tot = { n: 0, longL: 0, longD: 0 };
Object.entries(st).forEach(([fw, s]) => {
  const p = x => Math.round(x / s.n * 100) + '%';
  console.log(`${fw.padEnd(14)} | ${p(s.longL)} / ${p(s.longD)} | ${p(s.gL)} / ${p(s.gD)} | ${p(s.gsD)} | ${(s.cD / s.wD).toFixed(2)}`);
  if (s.longL / s.n > 0.35 || s.longD / s.n > 0.35) errs.push(fw + ': correct strictly longest > 35%');
  if (s.gL / s.n > 0.40 || s.gD / s.n > 0.40 || s.gsD / s.n > 0.40) errs.push(fw + ': guessing by length is right > 40%');
  tot.n += s.n; tot.longL += s.longL; tot.longD += s.longD;
});
console.log(`全体: 正解が最長 label ${(tot.longL / tot.n * 100).toFixed(1)}% / desc ${(tot.longD / tot.n * 100).toFixed(1)}%（偶然なら約25%）`);
errs.slice(0, 60).forEach(e => console.log('❌ ' + e)); if (errs.length > 60) console.log(`… and ${errs.length - 60} more`);
console.log(`\nerrors: ${errs.length}`); console.log(errs.length ? '🚫 FAIL' : '✅ ALL PASS');
process.exit(errs.length ? 1 : 0);
