(() => {
  'use strict';

  const STORAGE_KEY = 'decaSprint.workspace.v1';
  const CLUSTERS = [
    'Business Administration Core', 'Marketing', 'Finance', 'Hospitality & Tourism',
    'Business Management & Administration', 'Entrepreneurship', 'Personal Financial Literacy'
  ];
  const LEVELS = {
    Regional: { label: 'Regional', icon: '↗', desc: 'Build speed and master the fundamentals.', mix: [0.60, 0.30, 0.10] },
    Provincials: { label: 'Provincials', icon: '✦', desc: 'Apply concepts to less obvious business situations.', mix: [0.30, 0.50, 0.20] },
    ICDC: { label: 'ICDC', icon: '◎', desc: 'Stretch your reasoning with more challenge questions.', mix: [0.20, 0.45, 0.35] }
  };
  const CASES = [
    { id:'cafe-growth', cluster:'Marketing', title:'A local café needs a growth plan', role:'You are a marketing consultant for Northline Café.', brief:'Northline Café has built a loyal morning crowd, but afternoon traffic is low. The owner wants to increase weekday revenue without turning the café into a discount-first brand. A nearby school has clubs and events, and customer comments mention study space and seasonal drinks.', problem:'Recommend a focused marketing plan that increases afternoon visits while protecting profit and the café’s neighbourhood identity.', data:[['Afternoon sales','$420 / weekday'],['Gross margin','62% average'],['Promo budget','$1,200 / month']], tasks:['Identify the likely target segment and the customer need you will address.','Recommend two connected tactics and explain why they fit this café.','Provide a 30-day launch timeline with owners and a simple budget split.','Choose two KPIs and explain how the owner should adjust based on results.'] },
    { id:'retail-stock', cluster:'Business Management & Administration', title:'A retailer’s stock problem', role:'You are an operations adviser to a small sports retailer.', brief:'Peak-season products keep selling out while slower items occupy shelves. Staff use a spreadsheet that is updated inconsistently. The owner has one month before the next school sports season and cannot afford a full new inventory system.', problem:'Propose an achievable inventory-control improvement that reduces stockouts and excess inventory.', data:[['Stockout rate','14% of top items'],['Unsold seasonal stock','$8,600 at cost'],['Implementation budget','$900']], tasks:['Explain the likely causes and what data to check first.','Recommend a practical replenishment process and responsibility split.','Outline the pilot timeline and how to train staff.','Set KPIs for stockouts, inventory accuracy, and unsold stock.'] },
    { id:'hotel-checkin', cluster:'Hospitality & Tourism', title:'A hotel wants a smoother arrival', role:'You are an assistant front-office manager at Harbourlight Hotel.', brief:'Guest reviews praise the hotel’s location but increasingly mention queues at check-in from 3:00 to 5:00 p.m. The hotel cannot add permanent staff this quarter. Housekeeping status updates sometimes reach the front desk late.', problem:'Design a guest-focused plan that shortens perceived and actual wait times without compromising privacy or service.', data:[['Average peak wait','18 minutes'],['Rooms per day','145 occupied / 180 available'],['One-time budget','$1,500']], tasks:['Identify the likely process bottlenecks and what you would measure.','Recommend two service or workflow changes that can be piloted quickly.','Describe how departments will coordinate and keep guest information secure.','Set a target, timeline, and review process for the pilot.'] },
    { id:'finance-cash', cluster:'Finance', title:'A growing business has a cash gap', role:'You are a junior financial analyst for BrightPath Supplies.', brief:'Sales are growing, but several large customers now pay 45 days after invoicing. The company must pay suppliers within 20 days and is considering a short-term loan. Management needs a plan to protect day-to-day cash while continuing to grow.', problem:'Recommend a short-term working-capital plan and show how management can judge whether it is working.', data:[['Monthly sales','$80,000'],['Average collection time','45 days'],['Supplier terms','20 days']], tasks:['Explain why sales growth may not solve the cash-flow problem.','Recommend two practical actions for collections, payment timing, or forecasting.','Discuss the trade-offs before taking a loan.','Name three cash-flow indicators to review weekly.'] },
    { id:'startup-launch', cluster:'Entrepreneurship', title:'Validate a student-focused service', role:'You are the founder of StudySwap, a proposed peer tutoring marketplace.', brief:'Students say they want easier ways to find tutoring, but the team has only interviewed eight friends. The initial budget is small and the founder is deciding whether to build a full app or test a manual matching service first.', problem:'Create a low-cost validation plan that demonstrates whether real users will adopt and pay for the service.', data:[['Available test budget','$600'],['Initial interviewees','8 friends'],['Proposed pilot','4 weeks']], tasks:['Define the first customer segment and riskiest assumption.','Design an MVP test and specify how participants will be recruited.','Set measurable success criteria and a decision rule.','Explain next steps if the pilot works—and if it does not.'] },
    { id:'core-team', cluster:'Business Administration Core', title:'A team project keeps missing deadlines', role:'You are a team lead at an event-planning company.', brief:'A cross-functional team has missed two internal deadlines because responsibilities are unclear and the event brief has changed several times. The client’s deadline is firm. Team members are capable but frustrated.', problem:'Present a plan that restores accountability and keeps the client informed without lowering quality.', data:[['Client deadline','12 days away'],['Open tasks','17'],['Budget remaining','$2,400']], tasks:['Identify the most urgent risks and clarify the deliverables.','Prioritize tasks, owners, and checkpoints.','Explain how changes will be approved and communicated.','Choose progress metrics and a backup plan for a critical delay.'] },
    { id:'personal-finance', cluster:'Personal Financial Literacy', title:'Build a realistic savings plan', role:'You are a financial-literacy coach helping a student plan a major purchase.', brief:'A student wants to buy a laptop for school in six months. They have irregular part-time income, a small savings balance, and recurring costs for transit and phone service. They also want to keep some money available for surprises.', problem:'Create a practical plan that balances the purchase goal, recurring costs, and emergency savings without relying on debt.', data:[['Laptop target','$900'],['Current savings','$180'],['Time horizon','6 months']], tasks:['Calculate the remaining amount and a realistic monthly target.','Separate needs, wants, and irregular expenses in the budget.','Recommend a safe savings habit and an emergency buffer.','Explain how to adjust the plan if income changes.'] },
    { id:'marketing-loyalty', cluster:'Marketing', title:'Turn one-time buyers into regulars', role:'You are a marketing strategist for a school-supplies retailer.', brief:'A neighbourhood retailer receives strong back-to-school traffic but sees few repeat purchases after September. The owner wants a loyalty approach that feels useful to students and families, not spammy, and can be managed by the existing team.', problem:'Recommend a repeat-purchase strategy that creates value for customers and can be measured affordably.', data:[['September sales','$32,000'],['Returning-customer rate','18%'],['Test budget','$750']], tasks:['Identify one priority segment and a plausible reason customers do not return.','Recommend a loyalty value exchange and one communication channel.','Outline a six-week pilot and how customers will opt in.','Choose measures for repeat visits, margin, and customer feedback.'] },
    { id:'staff-scheduling', cluster:'Business Management & Administration', title:'Fix uneven shift coverage', role:'You are the store operations coordinator.', brief:'Customer wait times spike after school, while some morning shifts are overstaffed. Employees feel the schedule is unfair because shift changes are often made at the last minute. The store manager wants a fairer process without increasing total labour hours.', problem:'Build a staffing plan that matches demand, improves predictability, and gives employees a voice.', data:[['Peak wait time','9 minutes'],['Quiet-hour utilization','54%'],['Labour-hour budget','No increase']], tasks:['Identify which demand and availability data to collect.','Propose a scheduling rule and a fair shift-change process.','Explain how staff will be informed and how exceptions are handled.','Set a short pilot and track service, labour, and employee feedback.'] },
    { id:'restaurant-waste', cluster:'Hospitality & Tourism', title:'Reduce restaurant food waste', role:'You are an assistant manager at Maple & Main Bistro.', brief:'The bistro discards prepared food at closing, yet occasionally sells out of two popular dishes at dinner. The chef wants reliable availability; the owner wants to reduce waste without shrinking portions or disappointing guests.', problem:'Recommend a practical food-preparation and monitoring plan that balances guest satisfaction with waste reduction.', data:[['Food discarded','$480 / week'],['Most common sell-out','2 menu items'],['Pilot period','4 weeks']], tasks:['Explain which records will help distinguish overproduction from demand shifts.','Recommend a forecast, batch-prep, or menu adjustment.','Set responsibilities for the kitchen and service team.','Define waste and availability KPIs and a review checkpoint.'] },
    { id:'pricing-cash', cluster:'Finance', title:'Review pricing before costs rise', role:'You are a financial analyst for a small maker of reusable bottles.', brief:'A supplier has announced a cost increase next month. The business has steady demand but fears a sudden price rise could push customers to alternatives. Management wants to protect contribution margin while maintaining a clear value proposition.', problem:'Present a financially grounded pricing and cost response rather than relying on a blanket price change.', data:[['Current price','$28 / unit'],['Variable cost','$16 / unit'],['Supplier increase','12% on component cost']], tasks:['Calculate the current contribution per unit and explain the cost pressure.','Identify what additional data is needed before changing prices.','Recommend a pricing or sourcing test with a defined segment.','Set a margin target and customer-response monitoring plan.'] },
    { id:'pop-up-validation', cluster:'Entrepreneurship', title:'Validate a weekend pop-up idea', role:'You are an entrepreneur planning a student-run snack pop-up.', brief:'Your team wants to sell snack boxes at local community events. You have a menu idea and social followers but no paid orders yet. You can run one small trial before deciding whether to invest in equipment and inventory.', problem:'Design the smallest useful test that checks demand, price, and operating feasibility before committing major funds.', data:[['Trial budget','$350'],['Potential event visitors','400'],['Proposed price','$9 / box']], tasks:['State the riskiest assumptions about customer demand and operations.','Design a pre-order or sample test and explain how you will recruit buyers.','Estimate a break-even signal using costs you would need to gather.','Make a clear go / revise / stop decision rule for the trial.'] },
    { id:'customer-complaint', cluster:'Business Administration Core', title:'Recover trust after a service error', role:'You are a customer experience lead for an online retailer.', brief:'A shipping-system change caused a group of customers to receive inaccurate delivery estimates. Social comments are becoming negative. Orders are still moving, and the team needs a response that is accurate, fair, and operationally realistic.', problem:'Create a coordinated recovery response for affected customers and prevent the same communication error from recurring.', data:[['Affected orders','86'],['Support response time','22 hours'],['Recovery budget','$1,000']], tasks:['Prioritize what customers need to know now and what must be verified first.','Recommend a communication and remedy approach that treats cases fairly.','Coordinate support, logistics, and marketing responsibilities.','Choose KPIs for resolution time, repeat contacts, and customer sentiment.'] },
    { id:'income-planning', cluster:'Personal Financial Literacy', title:'Plan around irregular income', role:'You are a financial-literacy coach helping a teen with part-time work.', brief:'A student’s shifts vary each week, but their transit pass and phone payment are predictable. They want to save for a course while avoiding overdrafts and still keeping a small amount for fun. Their current approach is to spend first and save what remains.', problem:'Create a simple cash-flow routine that prioritizes essentials, savings, and flexibility when pay varies.', data:[['Typical monthly income','$450–$650'],['Recurring costs','$125 / month'],['Savings goal','$300 in 5 months']], tasks:['Set a savings target that adapts to lower-income months.','Explain how to separate fixed costs, flexible spending, and savings.','Recommend a weekly check-in and a small cash buffer.','Describe what should change if a month’s income falls below expectations.'] }
  ];

  const defaultState = () => ({
    version: 1, attempts: [], caseAttempts: [], customQuestions: [],
    reviewIds: [], masteredIds: [], dailyChecks: {},
    prefs: { level: 'Regional', cluster: 'All clusters', count: 25, mode: 'exam', caseCluster: 'Marketing' },
    caseDraft: null
  });

  function readState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const loaded = JSON.parse(raw);
      const fresh = { ...defaultState(), ...loaded };
      fresh.prefs = { ...defaultState().prefs, ...(loaded.prefs || {}) };
      fresh.attempts = Array.isArray(fresh.attempts) ? fresh.attempts : [];
      fresh.caseAttempts = Array.isArray(fresh.caseAttempts) ? fresh.caseAttempts : [];
      fresh.customQuestions = Array.isArray(fresh.customQuestions) ? fresh.customQuestions : [];
      fresh.reviewIds = Array.isArray(fresh.reviewIds) ? fresh.reviewIds : [];
      fresh.masteredIds = Array.isArray(fresh.masteredIds) ? fresh.masteredIds : [];
      fresh.dailyChecks = fresh.dailyChecks && typeof fresh.dailyChecks === 'object' ? fresh.dailyChecks : {};
      return fresh;
    } catch { return defaultState(); }
  }

  let store = readState();
  let view = 'dashboard';
  let activeExam = null;
  let examInterval = null;
  let resultFilter = 'all';
  let shownResult = null;
  let studyDeck = [];
  let studyIndex = 0;
  let studyFlipped = false;
  let caseSession = loadCaseDraft();
  let caseInterval = null;
  let toastTimeout = null;
  const content = document.getElementById('appContent');
  const toastEl = document.getElementById('toast');
  const importInput = document.getElementById('importFile');

  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); }
    catch { showToast('Browser storage is full. Export your progress before importing a large question set.'); }
    updateReviewBadge();
  }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }
  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function getDaily() {
    const key = todayKey();
    if (!store.dailyChecks[key]) store.dailyChecks[key] = { exam:false, case:false, review:false };
    return store.dailyChecks[key];
  }
  function formatDate(value, options={month:'short',day:'numeric'}) {
    try { return new Intl.DateTimeFormat('en-CA', options).format(new Date(value)); }
    catch { return ''; }
  }
  function shuffle(list) {
    const a = [...list];
    for (let i=a.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }
  function allQuestions() {
    const originals = Array.isArray(window.DECA_QUESTIONS) ? window.DECA_QUESTIONS : [];
    return [...originals, ...store.customQuestions];
  }
  function allClusterNames() {
    return [...new Set([...CLUSTERS, ...store.customQuestions.map(q=>q.cluster).filter(Boolean)])];
  }
  function questionById(id) { return allQuestions().find(q => q.id === id); }
  function selectedClusterQuestions(cluster) {
    const all = allQuestions();
    return cluster === 'All clusters' ? all : all.filter(q => q.cluster === cluster);
  }
  function clusterQuestionCount(cluster) { return selectedClusterQuestions(cluster).length; }
  function maximumExamCount(cluster) {
    return Math.min(100, clusterQuestionCount(cluster));
  }
  function normalizedCount(cluster) {
    const max = maximumExamCount(cluster);
    const requested = Number(store.prefs.count || 25);
    return Math.min(Math.max(1, requested), max);
  }
  function levelQuestionPick(pool, count, level) {
    const clean = pool.filter(q => q && q.options && q.options.length === 4 && ['A','B','C','D'].includes(q.answer));
    if (count >= clean.length) return shuffle(clean);
    const mix = (LEVELS[level] || LEVELS.Regional).mix;
    const buckets = [clean.filter(q=>Number(q.difficulty)===1), clean.filter(q=>Number(q.difficulty)===2), clean.filter(q=>Number(q.difficulty)===3)];
    let picked = [];
    const used = new Set();
    mix.forEach((weight, idx) => {
      const target = Math.floor(count * weight);
      const slice = shuffle(buckets[idx]).slice(0, target);
      slice.forEach(q=>{if(!used.has(q.id)){picked.push(q);used.add(q.id);}});
    });
    let rest = shuffle(clean.filter(q=>!used.has(q.id)));
    while (picked.length < count && rest.length) picked.push(rest.pop());
    return shuffle(picked.slice(0,count));
  }
  function toastText(str) {
    toastEl.textContent = str;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(()=>toastEl.classList.remove('show'), 3100);
  }
  function showToast(str) { toastText(str); }
  function updateReviewBadge() {
    const n = store.reviewIds.filter(id=>!store.masteredIds.includes(id) && questionById(id)).length;
    const el = document.getElementById('reviewNavCount');
    if (el) { el.classList.toggle('show', n>0); el.title = n ? `${n} questions to review` : 'No questions due'; }
  }
  function stopExamTimer() { if (examInterval) clearInterval(examInterval); examInterval = null; }
  function stopCaseTimer() { if (caseInterval) clearInterval(caseInterval); caseInterval = null; }
  function showView(next, force=false) {
    if (activeExam && next !== 'exam') { showToast('Finish or submit your current exam before leaving this screen.'); return; }
    view = next;
    document.querySelectorAll('[data-view]').forEach(el=>el.classList.toggle('active', el.dataset.view===next));
    const labels = { dashboard:'Overview','daily':'Question of the day',coach:'AI learning coach',account:'Account & sync','exam-setup':'Exam practice', exam:'Exam in progress', results:'Answer key & results','case-coach':'Case study lab', review:'Review & flashcards', progress:'Performance', vault:'Question vault' };
    document.getElementById('pageCrumb').textContent = labels[next] || 'Workspace';
    render();
    content.focus({preventScroll:true});
    window.scrollTo({top:0,behavior:'smooth'});
    if (next === 'review') { /* deck is initialized inside render */ }
  }
  function render() {
    const renderers = {
      dashboard: renderDashboard, 'exam-setup': renderSetup, exam: renderExam, results: renderResults,
      'case-coach': renderCases, review: renderReview, progress: renderProgress, vault: renderVault, daily: renderDailyQuestion, coach: renderLearningCoach, account: renderAccount
    };
    content.innerHTML = (renderers[view] || renderDashboard)();
    if (view==='exam') updateExamTimerText();
    if (view==='case-coach') updateCaseTimerText();
    updateReviewBadge();
  }
  function button(label, action, cls='btn btn-primary', attrs='') {
    return `<button class="${cls}" data-action="${action}" ${attrs}>${label}</button>`;
  }
  function htmlEmpty(icon, title, desc, buttonText='', action='') {
    return `<div class="empty-state"><div class="empty-symbol">${icon}</div><strong>${title}</strong><p>${desc}</p>${buttonText ? button(buttonText,action,'btn btn-primary btn-small') : ''}</div>`;
  }

  // Dashboard
  function dailyQuestion() {
    const qs=allQuestions(); if(!qs.length) return null;
    const d=new Date(); const seed=Number(`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`);
    return qs[seed % qs.length];
  }
  function renderDailyQuestion() {
    const q=dailyQuestion(); if(!q) return htmlEmpty('☀','No question available','Add questions to your vault first.');
    const key=todayKey(), done=store.dailyChecks[key]?.questionId===q.id;
    const chosen=store.dailyChecks[key]?.answer;
    const options=q.options.map((o,i)=>{const l='ABCD'[i];let cls='answer-option';if(done&&l===q.answer)cls+=' correct-choice';else if(done&&l===chosen&&chosen!==q.answer)cls+=' incorrect-choice';return `<button class="${cls}" data-action="daily-answer" data-key="${l}" ${done?'disabled':''}><span class="answer-letter">${l}</span><span class="answer-text">${escapeHtml(o)}</span></button>`}).join('');
    return `<div class="header-row"><div><div class="eyebrow">DAILY REP · ${escapeHtml(formatDate(new Date(),{weekday:'long',month:'long',day:'numeric'}))}</div><h1 class="page-title">DECA question of the day</h1><p class="page-subtitle">One focused question a day. Build consistency, then learn from the answer explanation.</p></div><span class="pill">${done?'Completed today':'2–3 minutes'}</span></div><section class="panel question-panel"><div class="question-meta"><span class="question-number">TODAY’S CHALLENGE</span><span class="pill">${escapeHtml(q.cluster)} · ${escapeHtml(q.topic)}</span></div><h2 class="question-stem">${escapeHtml(q.question)}</h2><div class="answer-options">${options}</div>${done?`<div class="case-feedback"><strong>${chosen===q.answer?'Correct! Great work.':'Good attempt—review the reasoning below.'}</strong><br>Correct answer: ${q.answer}. ${escapeHtml(q.explanation||'Review this concept and try a related question in practice mode.')}</div><div style="margin-top:16px">${button('Practice this cluster →','daily-practice','btn btn-primary')}</div>`:'<p class="section-desc" style="margin-top:14px">Choose your answer to reveal the answer key and explanation.</p>'}</section><div class="disclaimer" style="margin-top:16px">Questions are original practice items, not official DECA exam questions. The daily question rotates by date using your current question bank.</div>`;
  }
  function renderLearningCoach() {
    const qs=allQuestions(), stats=getTopicStats().filter(x=>x.total).sort((a,b)=>a.accuracy-b.accuracy);
    const attempts=store.attempts.length, weak=stats.slice(0,3);
    const recommendations=weak.length?weak.map((s,i)=>`<div class="resource-row"><div class="resource-icon">${i+1}</div><div class="resource-copy"><strong>${escapeHtml(s.topic||s.cluster||'Mixed skills')} · ${Math.round(s.accuracy)}% accuracy</strong><p>Review the explanation for missed items, then do a focused 10-question study set. Aim for two clean attempts before moving on.</p></div><button class="btn btn-secondary btn-small" data-action="coach-practice" data-cluster="${escapeHtml(s.cluster||'All clusters')}">Practice</button></div>`).join(''):`<div class="empty-state"><div class="empty-symbol">✦</div><strong>Your learning profile is starting fresh</strong><p>Complete an exam or a short study set. The coach will use your recorded answers to identify patterns and recommend your next practice session.</p><button class="btn btn-primary" data-action="open-setup">Start a diagnostic set</button></div>`;
    const latest=store.attempts.slice(-3).reverse();
    return `<div class="header-row"><div><div class="eyebrow">PERSONALIZED PRACTICE</div><h1 class="page-title">Your learning coach</h1><p class="page-subtitle">A data-driven study plan based on your own practice history—not generic advice.</p></div><span class="pill">${attempts} exam session${attempts===1?'':'s'} analyzed</span></div><section class="panel panel-pad"><div class="panel-heading"><div><h2 class="section-title">Your next best moves</h2><p class="section-desc">Prioritized from your lowest-accuracy topics.</p></div><span class="resource-icon">✦</span></div><div class="resource-list">${recommendations}</div></section><div class="overview-grid" style="margin-top:17px"><section class="panel panel-pad"><h2 class="section-title">Suggested 25-minute plan</h2><div class="craft-list"><div class="craft-item"><span class="craft-letter">1</span><div><strong>5 min · Retrieve</strong><p>Answer flashcards from memory before reading notes.</p></div></div><div class="craft-item"><span class="craft-letter">2</span><div><strong>10 min · Target</strong><p>Complete a focused practice set in your weakest cluster.</p></div></div><div class="craft-item"><span class="craft-letter">3</span><div><strong>7 min · Explain</strong><p>For every miss, explain why the correct choice fits and why a tempting distractor fails.</p></div></div><div class="craft-item"><span class="craft-letter">4</span><div><strong>3 min · Recall</strong><p>Write three takeaways without looking, then revisit them tomorrow.</p></div></div></div></section><section class="panel panel-pad"><h2 class="section-title">Recent performance</h2>${latest.length?latest.map(a=>`<div class="history-row"><div><strong>${escapeHtml(a.cluster||'Mixed clusters')}</strong><span>${escapeHtml(formatDate(a.date||Date.now()))} · ${a.correct||0}/${a.total||0} correct</span></div><div class="history-score">${Math.round(a.score||0)}%</div></div>`).join(''):'<p class="section-desc">Your first completed set will appear here.</p>'}</section></div><div class="disclaimer" style="margin-top:16px"><strong>AI status:</strong> this version provides adaptive recommendations using your recorded results and transparent study rules. It does not send your data to a generative AI service. A live AI tutor needs a securely configured server-side AI API and privacy controls.</div>`;
  }
  function renderAccount() {
    const profile=store.profile||{};
    return `<div class="header-row"><div><div class="eyebrow">YOUR DECA WORKSPACE</div><h1 class="page-title">Account & saved progress</h1><p class="page-subtitle">Keep your study identity and protect your score history.</p></div></div><div class="vault-grid"><section class="panel panel-pad"><h2 class="section-title">${profile.email?'Your local profile':'Create your study profile'}</h2><p class="section-desc">Set a name and email label for this browser. This prototype does not create a secure online account yet.</p><form id="profileForm" style="display:grid;gap:13px;margin-top:18px"><label class="notes-area">Display name<input class="field" name="displayName" required maxlength="60" value="${escapeHtml(profile.name||'')}" placeholder="e.g. DECA competitor"></label><label class="notes-area">Email address<input class="field" name="email" type="email" required maxlength="160" value="${escapeHtml(profile.email||'')}" placeholder="you@example.com"></label><button class="btn btn-primary" type="submit">Save profile on this device</button></form><div class="disclaimer" style="margin-top:15px">Do not enter a password here. Scores remain in this browser until you export them; this is not cross-device sync.</div></section><section class="panel panel-pad"><h2 class="section-title">Back up your scores</h2><p class="section-desc">Export a portable copy now, then import it on another device when you need to move your history.</p><div style="display:grid;gap:10px;margin-top:17px">${button('Export all progress ↓','export-all-results','btn btn-primary')}${button('Open performance dashboard','account-progress','btn btn-secondary')}</div><hr style="border:0;border-top:1px solid var(--line);margin:22px 0"><h3 class="section-title">Want real accounts?</h3><p class="section-desc">Production accounts require a backend such as Supabase or Firebase, verified email/password authentication, cloud database rules, and a privacy policy. Secrets must never be embedded in browser JavaScript.</p></section></div>`;
  }

  function renderDashboard() {
    const attempts = store.attempts;
    const totalQuestions = attempts.reduce((sum,a)=>sum+(a.total||0),0);
    const avg = attempts.length ? Math.round(attempts.reduce((sum,a)=>sum+(a.percent||0),0)/attempts.length) : 0;
    const best = attempts.length ? Math.max(...attempts.map(a=>a.percent||0)) : 0;
    const daily = getDaily();
    const tasks = [
      {key:'exam', title:'10-question quick drill', sub:'Build speed and recall'},
      {key:'case', title:'One case-study rep', sub:'Practice your recommendation'},
      {key:'review', title:'Review missed questions', sub:'Fix one weak concept'}
    ];
    const done = tasks.filter(t=>daily[t.key]).length;
    const dashChart = attempts.slice(-5);
    const chart = dashChart.length ? dashChart.map((a,i)=>`<div class="chart-col"><span class="chart-val">${Math.round(a.percent)}%</span><div class="chart-bar ${i===dashChart.length-1?'latest':''}" style="height:${Math.max(5,a.percent)}%" title="${escapeHtml(a.level)}: ${Math.round(a.percent)}%"></div><span class="chart-label">${escapeHtml(formatDate(a.date,{month:'numeric',day:'numeric'}))}</span></div>`).join('') : `<div class="chart-empty">Complete your first practice exam to start your score trend.</div>`;
    const topicStats = getTopicStats();
    const weakest = topicStats.filter(t=>t.total>=1).sort((a,b)=>a.accuracy-b.accuracy).slice(0,3);
    const weakHtml = weakest.length ? `<div class="weak-list">${weakest.map(t=>`<div class="weak-row"><div><div class="weak-row-title">${escapeHtml(t.name)}</div><div class="weak-row-sub">${t.total} question${t.total===1?'':'s'} attempted</div></div><div><div class="weak-row-rate">${t.accuracy}%</div><div class="weak-track"><div class="weak-fill ${t.accuracy<60?'low':''}" style="width:${t.accuracy}%"></div></div></div></div>`).join('')}</div>` : htmlEmpty('↗','Your weak areas will appear here','Complete a practice set to find the topics worth revisiting.');
    const taskHtml = tasks.map(t=>`<div class="task-line"><span class="task-check ${daily[t.key]?'done':''}">${daily[t.key]?'✓':''}</span><span>${escapeHtml(t.title)}</span><span style="margin-left:auto;color:#a0a9b9;font-size:9px">${daily[t.key]?'Done':'5–15 min'}</span></div>`).join('');
    return `
      <div class="header-row"><div><div class="eyebrow">YOUR TRAINING DESK</div><h1 class="page-title">Turn practice into performance.</h1><p class="page-subtitle">Build the knowledge, decision-making, and presentation habits that help you walk into DECA prepared.</p></div><div class="header-actions">${button('＋ Build a practice set','open-setup','btn btn-secondary')} ${button('Start 100-question mock →','full-mock','btn btn-primary')}</div></div>
      <div class="grid stats-grid">
        <div class="stat-card"><div class="stat-top">Questions answered <span class="stat-icon">▤</span></div><div class="stat-value">${totalQuestions.toLocaleString()}</div><div class="stat-foot"><span class="delta">${allQuestions().length}</span> original bank questions available</div></div>
        <div class="stat-card"><div class="stat-top">Average score <span class="stat-icon">↗</span></div><div class="stat-value">${attempts.length?avg+'%':'—'}</div><div class="stat-foot">${attempts.length?`${attempts.length} completed set${attempts.length===1?'':'s'}`:'Complete a set to set your baseline'}</div></div>
        <div class="stat-card"><div class="stat-top">Personal best <span class="stat-icon">✦</span></div><div class="stat-value">${attempts.length?best+'%':'—'}</div><div class="stat-foot">${attempts.length?'Your highest practice score':'Your next milestone starts here'}</div></div>
        <div class="stat-card"><div class="stat-top">Review queue <span class="stat-icon">⟲</span></div><div class="stat-value">${store.reviewIds.filter(id=>!store.masteredIds.includes(id)&&questionById(id)).length}</div><div class="stat-foot">Questions to revisit before competition</div></div>
      </div>
      <div class="grid overview-grid">
        <section class="panel hero-card"><div class="hero-kicker"><span>✦</span> YOUR NEXT LEVEL STARTS HERE</div><h2 class="hero-title">Train like the room is full of judges.</h2><p class="hero-copy">Challenge your business knowledge, understand every answer, and turn case prompts into clear recommendations with evidence behind them.</p><div class="hero-actions">${button('Run a mock exam →','full-mock','btn btn-cyan')} ${button('Practice a case study','open-case','btn hero-secondary')}</div><div class="hero-orbit"><span class="orbit-spark">✦</span><span class="orbit-dot"></span><div class="orbit-center">D+</div></div></section>
        <section class="panel daily-card"><div class="daily-top"><h2>Today's training plan</h2><span class="day-pill">${done===3?'COMPLETE':`${done}/3 DONE`}</span></div><div class="daily-progress"><div class="progress-ring"><svg viewBox="0 0 52 52"><circle class="ring-bg" cx="26" cy="26" r="22"></circle><circle class="ring-value" cx="26" cy="26" r="22" style="stroke-dashoffset:${138-(138*done/3)}"></circle></svg><div class="ring-center">${Math.round(done/3*100)}%</div></div><div><strong>${done===3?'Great work today.':done===0?'20 minutes. One better rep.':'Keep the momentum going.'}</strong><p>Short, repeatable practice for exam recall and case confidence.</p></div></div><div class="task-list">${taskHtml}</div>${button(done===3?'Review your progress':'Start today’s reps →','daily-session','btn btn-secondary btn-full')}</section>
      </div>
      <div class="grid lower-grid">
        <section class="panel performance-card"><div class="panel-heading"><div><h2 class="section-title">Score trend</h2><p class="section-desc">Your five most recent practice sets</p></div><button class="link-btn" data-view="progress">Full report ↗</button></div><div class="mini-chart">${chart}</div><div class="tip-strip"><div class="tip-icon">✦</div><div><strong>Train the reason, not just the letter.</strong><p>For every missed question, explain why the correct option fits the situation better than the distractors.</p></div></div></section>
        <section class="panel weak-card"><div class="panel-heading"><div><h2 class="section-title">Focus areas</h2><p class="section-desc">Topics with the most room to improve</p></div><button class="link-btn" data-view="review">Review queue ↗</button></div>${weakHtml}</section>
      </div>
      <div class="disclaimer" style="margin-top:17px"><strong>Important:</strong> This is a training tool, not a promise of a particular competition score. Questions in the built-in bank are original DECA-style practice items, not official DECA exam questions.</div>`;
  }

  // Exam setup
  function renderSetup() {
    const level = store.prefs.level || 'Regional';
    const cluster = store.prefs.cluster || 'All clusters';
    const max = maximumExamCount(cluster);
    const count = normalizedCount(cluster);
    const countOptions = cluster === 'All clusters'
      ? [10,25,50,100].filter(n=>n<=max)
      : [...new Set([10,max].filter(n=>n<=max))].sort((a,b)=>a-b);
    const levelCards = Object.entries(LEVELS).map(([key,l])=>`<button type="button" class="choice-card ${level===key?'selected':''}" data-level="${key}"><span class="choice-icon">${l.icon}</span><span class="choice-name">${key}</span><span class="choice-detail">${l.desc}</span></button>`).join('');
    const clusterOptions = ['All clusters',...allClusterNames()].map(c=>`<option value="${escapeHtml(c)}" ${cluster===c?'selected':''}>${escapeHtml(c)}</option>`).join('');
    const counts = countOptions.map(n=>`<button class="count-choice ${count===n?'selected':''}" data-count="${n}"><strong>${n===max&&cluster!=='All clusters'?'All '+n:n}</strong><span>${n===100?'full mock':n===max&&cluster!=='All clusters'?'unique questions':n<=10?'quick drill':n<=25?'focused set':n<=50?'deep practice':'full mock'}</span></button>`).join('');
    const mode = store.prefs.mode || 'exam';
    return `
      <div class="header-row"><div><div class="eyebrow">EXAM SIMULATOR</div><h1 class="page-title">Build your practice set.</h1><p class="page-subtitle">Choose your competition training tier, focus area, and session length. Your answer key appears after you finish.</p></div><div class="header-actions">${button('Back to overview','back-dashboard','btn btn-secondary')}</div></div>
      <div class="setup-layout"><section class="panel setup-main">
        <div class="setup-section"><div class="step-head"><div class="step-number">01</div><div><h2 class="step-title">Choose your training level</h2><p class="step-copy">The tier changes question selection emphasis; it is not an official stage-specific exam blueprint.</p></div></div><div class="choice-grid">${levelCards}</div></div>
        <div class="setup-section"><div class="step-head"><div class="step-number">02</div><div><h2 class="step-title">Choose a cluster</h2><p class="step-copy">Practice across the core or focus on the cluster for your event.</p></div></div><label for="clusterSelect" class="form-label">Career cluster / exam focus</label><select class="field" id="clusterSelect">${clusterOptions}</select><div class="field-note">The built-in bank contains ${allQuestions().length} original questions across ${CLUSTERS.length} clusters. A focused set only uses available questions for that cluster.</div></div>
        <div class="setup-section"><div class="step-head"><div class="step-number">03</div><div><h2 class="step-title">Set your session length</h2><p class="step-copy">For the 100-question mock, use the full mixed bank for a fresh run.</p></div></div><div class="count-grid">${counts}</div><div class="field-note">${cluster==='All clusters'?'The full mixed mock uses all 100 built-in questions once.':'This focus has '+max+' available unique questions; the longest option uses each once.'}</div></div>
        <div class="setup-section"><div class="step-head"><div class="step-number">04</div><div><h2 class="step-title">Choose how you want to practice</h2><p class="step-copy">Study mode gives immediate explanations; exam mode saves explanations for the answer key.</p></div></div><div class="field-grid"><div><label class="form-label" for="practiceMode">Session style</label><select class="field" id="practiceMode"><option value="exam" ${mode==='exam'?'selected':''}>Exam simulation — answers at the end</option><option value="study" ${mode==='study'?'selected':''}>Study mode — instant feedback</option></select></div><div><label class="form-label">Question sequence</label><div class="field" style="background:#f8f9fc;color:#77839a">Randomized for each new set</div></div></div></div>
        ${button('Start practice →','start-exam','btn btn-primary btn-full')}
      </section>
      <aside class="setup-side"><section class="exam-preview"><div class="preview-chip">YOUR SESSION PREVIEW</div><div class="preview-big">${count}<small> questions</small></div><p class="preview-sub">${escapeHtml(level)} training · ${escapeHtml(cluster)}</p><div class="preview-metrics"><div><div class="preview-metric-label">Estimated time</div><div class="preview-metric-value">${mode==='study'?'Self-paced':formatDuration(Math.round(count/100*70*60))}</div></div><div><div class="preview-metric-label">After completion</div><div class="preview-metric-value">Answer key + why</div></div></div><p class="preview-note">Ontario DECA currently describes Regionals as 100 multiple-choice questions with a 70-minute maximum. The 70-minute clock here is a practice reference, not a guarantee that every association or level uses identical rules.</p></section>
        <section class="panel standards-card"><h2 class="section-title">Built into every set</h2><p class="section-desc">A practice loop designed to convert mistakes into learning.</p><div class="standards-list"><div class="standard-row"><span class="standard-check">✓</span><div class="standards-row-copy"><strong>Answer explanations</strong><span>Why the right choice fits the business situation</span></div></div><div class="standard-row"><span class="standard-check">✓</span><div class="standards-row-copy"><strong>Topic tagging</strong><span>See the concept behind each question</span></div></div><div class="standard-row"><span class="standard-check">✓</span><div class="standards-row-copy"><strong>Answer sheet</strong><span>Question-by-question review at the end</span></div></div><div class="standard-row"><span class="standard-check">✓</span><div class="standards-row-copy"><strong>Weak-area tracking</strong><span>Missed questions stay in your review queue</span></div></div></div></section>
      </aside></div>`;
  }
  function formatDuration(seconds) {
    const mins = Math.max(1,Math.round(seconds/60));
    return mins>=60 ? `${Math.floor(mins/60)}h ${mins%60 ? mins%60+'m':''}`.trim() : `${mins} min`;
  }
  function startExam(modeOverride) {
    const cluster = store.prefs.cluster || 'All clusters';
    const pool = selectedClusterQuestions(cluster);
    if (pool.length < 1) { showToast('No questions found for this selection. Import a question bank or choose another cluster.'); return; }
    const count = Math.min(modeOverride==='daily' ? 10 : normalizedCount(cluster), pool.length, 100);
    const picked = levelQuestionPick(pool, count, store.prefs.level || 'Regional');
    const mode = modeOverride==='daily' ? 'exam' : (store.prefs.mode || 'exam');
    const seconds = Math.max(60, Math.round(count/100*70*60));
    activeExam = { questions:picked, index:0, answers:{}, flagged:[], startedAt:Date.now(), remaining:seconds, initialSeconds:seconds, mode, level:store.prefs.level||'Regional', cluster, special:modeOverride||'standard' };
    resultFilter = 'all';
    showView('exam',true);
    if (mode==='exam') {
      stopExamTimer();
      examInterval = setInterval(()=>{
        if (!activeExam) return;
        activeExam.remaining = Math.max(0,activeExam.remaining-1);
        updateExamTimerText();
        if (activeExam.remaining<=0) finishExam(true);
      },1000);
    }
  }
  function updateExamTimerText() {
    const timer = document.getElementById('examTimer');
    if (!timer || !activeExam) return;
    if (activeExam.mode==='study') { timer.textContent='Study mode'; timer.classList.remove('warning'); return; }
    timer.textContent = `${String(Math.floor(activeExam.remaining/60)).padStart(2,'0')}:${String(activeExam.remaining%60).padStart(2,'0')}`;
    timer.classList.toggle('warning',activeExam.remaining<=300);
  }
  function renderExam() {
    if (!activeExam) { view='exam-setup'; return renderSetup(); }
    const ex = activeExam;
    const q = ex.questions[ex.index];
    const selected = ex.answers[q.id];
    const isStudyReveal = ex.mode==='study' && selected;
    const progress = Object.keys(ex.answers).length;
    const optionRows = q.options.map((opt,i)=>{
      const letter = 'ABCD'[i];
      let cls = 'answer-option';
      if (selected===letter) cls+=' selected';
      if (isStudyReveal && letter===q.answer) cls+=' correct-choice';
      if (isStudyReveal && selected===letter && letter!==q.answer) cls+=' incorrect-choice';
      return `<button class="${cls}" data-action="choose-option" data-key="${letter}" ${selected&&ex.mode==='study'?'disabled':''}><span class="answer-letter">${letter}</span><span class="answer-text">${escapeHtml(opt)}</span></button>`;
    }).join('');
    const nav = ex.questions.map((item,i)=>`<button class="qnav ${i===ex.index?'current':''} ${ex.answers[item.id]&&i!==ex.index?'answered':''} ${ex.flagged.includes(item.id)?'flagged':''}" data-action="jump-question" data-index="${i}" title="Question ${i+1}">${i+1}</button>`).join('');
    const clusterShort = ex.cluster==='All clusters'?'Mixed clusters':ex.cluster;
    return `<div class="exam-toolbar"><div class="exam-labels"><span class="pill blue">${escapeHtml(ex.level)} training</span><span class="pill">${escapeHtml(clusterShort)}</span><span class="pill">${ex.mode==='study'?'Study mode':'Exam mode'}</span></div><div id="examTimer" class="exam-timer"><span class="timer-icon">◷</span>--:--</div></div>
      <div class="exam-progress-track"><div class="exam-progress-fill" style="width:${(ex.index+1)/ex.questions.length*100}%"></div></div>
      <div class="exam-layout"><section class="panel question-panel"><div class="question-meta"><span class="question-number">QUESTION ${String(ex.index+1).padStart(2,'0')} <span style="color:#c1c8d7">/ ${ex.questions.length}</span></span><button class="flag-btn ${ex.flagged.includes(q.id)?'flagged':''}" data-action="toggle-flag">⚑ ${ex.flagged.includes(q.id)?'Flagged':'Flag for review'}</button></div><span class="pill" style="margin-bottom:12px">${escapeHtml(q.topic)} · ${q.difficulty===1?'Foundation':q.difficulty===2?'Application':'Challenge'}</span><h1 class="question-stem">${escapeHtml(q.question)}</h1><div class="answer-options">${optionRows}</div>
      ${isStudyReveal?`<div class="case-feedback" style="margin-top:15px;background:${selected===q.answer?'#eaf8f1':'#fff0f1'};color:${selected===q.answer?'#267355':'#a83f4b'}"><strong>${selected===q.answer?'Correct.':'Not quite.'}</strong> ${escapeHtml(q.explanation)}<div style="margin-top:5px;color:inherit;opacity:.85">Learning target: ${escapeHtml(q.target||q.topic)}</div></div>`:''}
      <div class="question-foot"><div class="question-foot-left">${progress} of ${ex.questions.length} answered · ${ex.questions.length-progress} unanswered</div><div class="question-foot-right">${button('← Previous','prev-question','btn btn-secondary',ex.index===0?'disabled':'')}${ex.index===ex.questions.length-1?button('Finish & see key →','finish-exam','btn btn-primary'):button('Next question →','next-question','btn btn-primary')}</div></div></section>
      <aside class="question-side"><section class="panel question-map"><div class="map-head"><span>Question map</span><span>${progress}/${ex.questions.length}</span></div><div class="map-sub">Jump to any question in your set.</div><div class="question-grid">${nav}</div><div class="map-legend"><span><i class="legend-dot current"></i>Current</span><span><i class="legend-dot"></i>Answered</span><span><i class="legend-dot flag"></i>Flagged</span></div></section><section class="panel submit-card"><strong>Ready to check your work?</strong><p>When you finish, every question will show the selected answer, correct answer, and a short explanation.</p>${Object.keys(ex.answers).length<ex.questions.length?`<div class="submit-warning">${ex.questions.length-Object.keys(ex.answers).length} question(s) unanswered.</div>`:''}${button('Submit set & view answer key','finish-exam','btn btn-primary btn-full')}</section></aside></div>`;
  }
  function finishExam(timeExpired=false) {
    if (!activeExam) return;
    if (!timeExpired) {
      const unanswered = activeExam.questions.filter(q=>!activeExam.answers[q.id]).length;
      if (unanswered && !confirm(`You have ${unanswered} unanswered question${unanswered===1?'':'s'}. Submit this practice set?`)) return;
    }
    stopExamTimer();
    const ex = activeExam;
    const rows = ex.questions.map((q,i)=>({
      id:q.id, index:i+1, cluster:q.cluster, topic:q.topic, difficulty:q.difficulty, question:q.question,
      options:q.options, answer:q.answer, selected:ex.answers[q.id]||'', isCorrect:ex.answers[q.id]===q.answer,
      explanation:q.explanation, target:q.target||q.topic, source:q.source||'Original practice', flagged:ex.flagged.includes(q.id)
    }));
    const correct = rows.filter(r=>r.isCorrect).length;
    const attempt = { id:`attempt-${Date.now()}`, date:new Date().toISOString(), level:ex.level, cluster:ex.cluster, total:rows.length, correct, percent:Math.round(correct/rows.length*100), durationSecs:Math.max(0,Math.round((Date.now()-ex.startedAt)/1000)), timeExpired, mode:ex.mode, rows, special:ex.special };
    store.attempts.push(attempt);
    if (store.attempts.length>100) store.attempts=store.attempts.slice(-100);
    rows.filter(r=>!r.isCorrect).forEach(r=>{ if(!store.reviewIds.includes(r.id)) store.reviewIds.push(r.id); store.masteredIds=store.masteredIds.filter(id=>id!==r.id); });
    if (ex.special==='daily') getDaily().exam=true;
    persist();
    shownResult=attempt;
    activeExam=null;
    stopExamTimer();
    showView('results',true);
    if(timeExpired) showToast('Time is up. Your answers have been saved to the answer key.');
  }
  function resultRows(result) {
    if (!result) return [];
    if (resultFilter==='correct') return result.rows.filter(r=>r.isCorrect);
    if (resultFilter==='incorrect') return result.rows.filter(r=>!r.isCorrect);
    return result.rows;
  }
  function renderResults() {
    const result = shownResult || store.attempts[store.attempts.length-1];
    if (!result) return `<div class="header-row"><div><h1 class="page-title">Answer key</h1></div></div>${htmlEmpty('▤','No practice set yet','Complete an exam to see your DECA-style answer key.','Build a practice set','open-setup')}`;
    const pct = result.percent;
    const advice = pct>=90?'Excellent practice result. Keep testing consistency under time pressure.':pct>=75?'Solid base. Review the missed concepts and practice explaining why each answer fits.':pct>=60?'You have useful starting knowledge. Prioritize the top missed topics, then repeat a shorter set.':'Treat this as a diagnostic, not a verdict. Read the explanations, review the concepts, and try a focused set.';
    const rows = resultRows(result);
    const tableRows = rows.map(r=>{const chosen=r.selected?r.options['ABCD'.indexOf(r.selected)]:'Unanswered';const correctText=r.options['ABCD'.indexOf(r.answer)];return `<tr><td>${r.index}</td><td class="key-q">${escapeHtml(r.question)}<div class="key-topic">${escapeHtml(r.cluster)} · ${escapeHtml(r.topic)}</div></td><td class="key-label ${r.isCorrect?'good':'bad'}">${r.selected?`${r.selected} · ${escapeHtml(chosen)}`:'— Unanswered'}</td><td class="key-label good">${r.answer} · ${escapeHtml(correctText)}</td><td class="key-explain">${escapeHtml(r.explanation)}</td></tr>`}).join('');
    return `<div class="header-row"><div><div class="eyebrow">PRACTICE REPORT</div><h1 class="page-title">Your answer key.</h1><p class="page-subtitle">The score is feedback. The explanation is where improvement happens.</p></div><div class="header-actions">${button('Export answer sheet ↓','export-results','btn btn-secondary')} ${button('Run another set →','open-setup','btn btn-primary')}</div></div>
      <section class="results-hero"><div><div class="results-kicker">${escapeHtml(result.level)} TRAINING · ${escapeHtml(result.cluster)}</div><h2 class="results-title">${pct>=90?'Strong work. Keep it repeatable.':pct>=75?'Good progress. Sharpen the edges.':'Now you know what to work on.'}</h2><p class="results-copy">${advice} ${result.timeExpired?'This session ended when the timer ran out.':''}</p></div><div class="score-ring"><div class="score-ring-inner"><div class="score-num">${pct}%</div><div class="score-caption">PRACTICE SCORE</div></div></div></section>
      <div class="result-stat-row"><div class="result-stat"><div class="result-stat-label">Correct answers</div><div class="result-stat-value">${result.correct}<span style="font-size:11px;color:#97a0b2;font-weight:600"> / ${result.total}</span></div></div><div class="result-stat"><div class="result-stat-label">Time used</div><div class="result-stat-value">${formatDuration(result.durationSecs)}</div></div><div class="result-stat"><div class="result-stat-label">Added to review queue</div><div class="result-stat-value">${result.rows.filter(r=>!r.isCorrect).length}</div></div></div>
      <section class="panel answer-key-card"><div class="panel-heading"><div><h2 class="section-title">Answer sheet & explanations</h2><p class="section-desc">Correct answers are listed separately from your responses, like an exam answer key.</p></div><div class="filter-tabs"><button class="filter-tab ${resultFilter==='all'?'active':''}" data-filter="all">All (${result.total})</button><button class="filter-tab ${resultFilter==='incorrect'?'active':''}" data-filter="incorrect">Missed (${result.total-result.correct})</button><button class="filter-tab ${resultFilter==='correct'?'active':''}" data-filter="correct">Correct (${result.correct})</button></div></div><div class="table-wrap"><table class="answer-table"><thead><tr><th>#</th><th>Question & topic</th><th>Your answer</th><th>Correct</th><th>Why it is correct</th></tr></thead><tbody>${tableRows||`<tr><td colspan="5" style="text-align:center;padding:30px;color:#98a1b4">No questions in this filter.</td></tr>`}</tbody></table></div></section>
      <div class="tip-strip" style="margin-top:15px"><div class="tip-icon">✦</div><div><strong>Make your review active.</strong><p>Before reading the explanation, say why your option was tempting and which business concept changes the decision. Then use Review & Flashcards for spaced repetition.</p></div></div>`;
  }

  // Topic diagnostics
  function getTopicStats() {
    const map = new Map();
    store.attempts.forEach(a=>(a.rows||[]).forEach(r=>{
      const name=r.topic||r.cluster||'Other';
      if(!map.has(name)) map.set(name,{name,total:0,correct:0,cluster:r.cluster});
      const item=map.get(name); item.total++; if(r.isCorrect)item.correct++;
    }));
    return [...map.values()].map(x=>({...x,accuracy:Math.round(x.correct/x.total*100)}));
  }
  function clusterStats() {
    const map = new Map();
    store.attempts.forEach(a=>(a.rows||[]).forEach(r=>{
      const key=r.cluster||'Other';
      if(!map.has(key)) map.set(key,{name:key,total:0,correct:0});
      const item=map.get(key); item.total++; if(r.isCorrect)item.correct++;
    }));
    return CLUSTERS.map(name=>{ const x=map.get(name); return x?{...x,accuracy:Math.round(x.correct/x.total*100)}:{name,total:0,correct:0,accuracy:0}; });
  }
  function renderProgress() {
    const attempts=store.attempts;
    const total=attempts.reduce((s,a)=>s+a.total,0);
    const avg=attempts.length?Math.round(attempts.reduce((s,a)=>s+a.percent,0)/attempts.length):0;
    const best=attempts.length?Math.max(...attempts.map(a=>a.percent)):0;
    const cs=[...clusterStats(), ...allClusterNames().filter(n=>!CLUSTERS.includes(n)).map(n=>{const qs=store.attempts.flatMap(a=>a.rows||[]).filter(r=>r.cluster===n);const good=qs.filter(r=>r.isCorrect).length;return {name:n,total:qs.length,correct:good,accuracy:qs.length?Math.round(good/qs.length*100):0};})];
    const maxTotal=Math.max(1,...cs.map(c=>c.total));
    const clusterHtml=cs.map(c=>`<div class="cluster-bar-row"><span class="cluster-bar-name">${escapeHtml(c.name)}</span><div class="cluster-bar-track"><div class="cluster-bar-fill" style="width:${c.total?c.accuracy:0}%;opacity:${c.total?1:.18}"></div></div><span class="cluster-bar-score">${c.total?c.accuracy+'%':'—'}</span></div>`).join('');
    const history=attempts.slice().reverse().slice(0,10).map(a=>`<div class="history-row"><div><strong>${escapeHtml(a.cluster==='All clusters'?'Mixed clusters':a.cluster)} · ${escapeHtml(a.level)} training</strong><span>${escapeHtml(formatDate(a.date,{month:'short',day:'numeric',year:'numeric'}))} · ${a.total} questions · ${a.mode==='study'?'Study mode':'Exam mode'}</span></div><div class="history-score" style="color:${a.percent>=80?'#188960':a.percent>=60?'#bd8327':'#bf4b59'}">${a.percent}%</div><div class="history-mark">${a.correct}/${a.total}</div></div>`).join('');
    return `<div class="header-row"><div><div class="eyebrow">PERFORMANCE REPORT</div><h1 class="page-title">Know what to work on next.</h1><p class="page-subtitle">Use your actual answers to decide where to spend your next practice session.</p></div><div class="header-actions">${button('Clear local data','clear-progress','btn btn-ghost btn-small')} ${button('Practice weak areas →','weak-practice','btn btn-primary')}</div></div>
      <div class="grid stats-grid"><div class="stat-card"><div class="stat-top">Questions attempted <span class="stat-icon">▤</span></div><div class="stat-value">${total}</div><div class="stat-foot">Across ${attempts.length} completed set${attempts.length===1?'':'s'}</div></div><div class="stat-card"><div class="stat-top">Average score <span class="stat-icon">↗</span></div><div class="stat-value">${attempts.length?avg+'%':'—'}</div><div class="stat-foot">Mean of practice-set scores</div></div><div class="stat-card"><div class="stat-top">Personal best <span class="stat-icon">✦</span></div><div class="stat-value">${attempts.length?best+'%':'—'}</div><div class="stat-foot">Your highest score so far</div></div><div class="stat-card"><div class="stat-top">Case reps <span class="stat-icon">◈</span></div><div class="stat-value">${store.caseAttempts.length}</div><div class="stat-foot">Case study self-evaluations completed</div></div></div>
      <div class="grid lower-grid"><section class="panel panel-pad"><div class="panel-heading"><div><h2 class="section-title">Accuracy by cluster</h2><p class="section-desc">Only attempted questions count toward accuracy.</p></div></div>${attempts.length?`<div class="cluster-bars">${clusterHtml}</div>`:htmlEmpty('↗','No accuracy data yet','Start a mixed or cluster-focused practice set to populate this report.')}</section><section class="panel panel-pad"><div class="panel-heading"><div><h2 class="section-title">Case study practice</h2><p class="section-desc">Self-scored against the presentation checklist</p></div></div>${store.caseAttempts.length?`<div class="stat-value">${Math.round(store.caseAttempts.reduce((s,a)=>s+a.score,0)/store.caseAttempts.length/7*100)}%</div><div class="section-desc">Average checklist completion</div><hr class="rule"><div class="history-list">${store.caseAttempts.slice(-4).reverse().map(c=>`<div class="history-row"><div><strong>${escapeHtml(c.title)}</strong><span>${escapeHtml(formatDate(c.date,{month:'short',day:'numeric'}))} · ${escapeHtml(c.cluster)}</span></div><div class="history-score">${c.score}/7</div><div class="history-mark">rubric</div></div>`).join('')}</div>`:htmlEmpty('◈','No case reps yet','Complete a scenario and score yourself on the evidence, plan, risks, and metrics.','Open case lab','open-case')}</section></div>
      <section class="panel panel-pad" style="margin-top:17px"><div class="panel-heading"><div><h2 class="section-title">Recent exam sessions</h2><p class="section-desc">Your practice history stays in this browser.</p></div><button class="link-btn" data-action="export-all-results">Export data ↓</button></div>${history?`<div class="history-list">${history}</div>`:htmlEmpty('▤','No completed sets yet','Your completed exam sessions and scores will appear here.','Start a practice set','open-setup')}</section>
      <p class="subtle-link" style="margin-top:13px">Accuracy is a learning signal, not an official DECA score prediction. Revisit topics where you have only answered a few questions.</p>`;
  }

  // Case study lab
  function loadCaseDraft() {
    const draft=store.caseDraft;
    if (draft && CASES.some(c=>c.id===draft.caseId)) {
      const item=CASES.find(c=>c.id===draft.caseId);
      return {...makeFreshCaseSession(item),...draft,scenario:item,timerRunning:false};
    }
    return makeFreshCaseSession(CASES[0]);
  }
  function makeFreshCaseSession(scenario) {
    return {caseId:scenario.id,scenario,phase:'brief',prepRemaining:600,pitchRemaining:600,notes:{context:'',recommendation:'',actions:'',metrics:'',risks:''},checks:[],timerRunning:false};
  }
  function persistCaseDraft() {
    if (!caseSession) return;
    const serial={caseId:caseSession.caseId,phase:caseSession.phase,prepRemaining:caseSession.prepRemaining,pitchRemaining:caseSession.pitchRemaining,notes:caseSession.notes,checks:caseSession.checks};
    store.caseDraft=serial; persist();
  }
  function caseById(id) { return CASES.find(c=>c.id===id) || CASES[0]; }
  function selectedCase() { return caseSession?.scenario || CASES[0]; }
  function renderCases() {
    if (!caseSession || !caseSession.scenario) caseSession=makeFreshCaseSession(CASES[0]);
    const c=selectedCase();
    const phases=[['brief','Read the brief'],['prep','10-min prep'],['pitch','10-min pitch']];
    const timer = caseSession.phase==='pitch'?caseSession.pitchRemaining:caseSession.prepRemaining;
    const phaseHtml=phases.map(([p,l])=>`<div class="phase ${caseSession.phase===p?'active':(['prep','pitch'].indexOf(caseSession.phase)>['prep','pitch'].indexOf(p)&&p!=='brief'?'done':'')} ">${l}</div>`).join('');
    const prompts=[['context','C · Context & objective','What does success mean here? Which case facts matter most?'],['recommendation','R · Recommendation','State your best recommendation and why it beats the alternatives.'],['actions','A · Action plan','List steps, timing, owners, budget, and stakeholder communication.'],['metrics','F · Financials & KPIs','Use numbers from the prompt; define how you will measure success.'],['risks','T · Trade-offs & risks','Name a risk, mitigation, and backup plan.']];
    const notes=prompts.map(([key,label,hint])=>`<div class="notes-area"><label class="form-label" for="note-${key}">${label}</label><textarea id="note-${key}" class="field" data-note="${key}" placeholder="${escapeHtml(hint)}">${escapeHtml(caseSession.notes?.[key]||'')}</textarea></div>`).join('');
    const rubric=['I identified the decision-maker’s objective and key constraints.','I used specific facts or numbers from the case.','I made one clear recommendation and justified it.','I gave a phased action plan with owners or timing.','I named measurable KPIs and targets.','I covered an ethical, operational, or financial risk.','I closed with a concise summary and next step.'];
    const rubricHtml=rubric.map((r,i)=>`<label class="rubric-item"><input type="checkbox" data-rubric="${i}" ${caseSession.checks.includes(i)?'checked':''}/><span>${escapeHtml(r)}</span></label>`).join('');
    const clusterOptions=CLUSTERS.map(cl=>`<option value="${escapeHtml(cl)}" ${cl===c.cluster?'selected':''}>${escapeHtml(cl)}</option>`).join('');
    let feedback='';
    if(caseSession.phase==='feedback') {
      const score=caseSession.lastScore ?? caseSession.checks.length;
      feedback=`<div class="case-feedback"><strong>Self-score: ${score}/7.</strong> ${score>=6?'Your structure hits most of the essentials. Now rehearse the transitions and tighten the evidence.':score>=4?'A solid outline. Add stronger case-specific evidence, concrete measures, or a clearer risk plan where you left boxes unchecked.':'Use the CRAFT framework to rebuild the pitch. Prioritize a clear recommendation, numbers from the prompt, and a specific action plan.'}</div>`;
    }
    return `<div class="header-row"><div><div class="eyebrow">ROLE-PLAY & CASE STUDY COACH</div><h1 class="page-title">Make your recommendation feel inevitable.</h1><p class="page-subtitle">Practice turning a short business prompt into a clear, evidence-backed recommendation, an action plan, and measurable results.</p></div><div class="header-actions">${button('New scenario ↻','new-case','btn btn-secondary')}</div></div>
      <div class="field-grid" style="margin-bottom:15px;max-width:550px"><div><label class="form-label" for="caseCluster">Practice cluster</label><select class="field" id="caseCluster">${clusterOptions}</select></div><div><label class="form-label">Rehearsal format</label><div class="field" style="background:#f8f9fc">10 min prep · 10 min pitch</div></div></div>
      <div class="case-layout"><section class="panel case-brief"><div class="case-banner"><span class="pill">${escapeHtml(c.cluster)}</span><h2>${escapeHtml(c.title)}</h2><p>${escapeHtml(c.role)}</p></div><div class="case-block"><h3>THE SITUATION</h3><p>${escapeHtml(c.brief)}</p></div><div class="case-block"><h3>YOUR OBJECTIVE</h3><p>${escapeHtml(c.problem)}</p></div><div class="case-block"><h3>CASE FACTS</h3><div class="case-data-grid">${c.data.map(d=>`<div class="case-data"><span>${escapeHtml(d[0])}</span><strong>${escapeHtml(d[1])}</strong></div>`).join('')}</div></div><div class="case-block"><h3>YOUR DELIVERABLES</h3><ol class="case-asks">${c.tasks.map(t=>`<li>${escapeHtml(t)}</li>`).join('')}</ol></div><div class="tip-strip"><div class="tip-icon">✦</div><div><strong>Judge mindset</strong><p>Make the judge’s job easy: be specific, support your choices with the prompt, and tell them how you will measure success.</p></div></div></section>
      <aside class="case-side"><section class="panel case-timer-card"><div class="panel-heading" style="margin-bottom:8px"><div><h2 class="section-title">Rehearsal timer</h2><p class="section-desc">Use the timer to train under realistic pressure.</p></div><span class="pill blue">Practice</span></div><div class="phase-row">${phaseHtml}</div><div id="caseTimerText" class="large-timer">${String(Math.floor(timer/60)).padStart(2,'0')}:${String(timer%60).padStart(2,'0')}</div><div class="timer-caption">${caseSession.phase==='pitch'?'Presentation rehearsal':caseSession.phase==='prep'?'Preparation time':caseSession.phase==='feedback'?'Session complete':'Start when you are ready'}</div><div class="case-tools">${caseSession.phase==='brief'||caseSession.phase==='feedback'?button('Start 10-min prep','case-start-prep','btn btn-primary'):caseSession.phase==='prep'?button('Begin pitch phase →','case-start-pitch','btn btn-primary'):button('Restart pitch timer','case-start-pitch','btn btn-primary')}${button('Reset timer','case-reset-timer','btn btn-secondary')}</div><div class="field-note">Timer phases are configurable practice prompts, not a statement of every event’s official timing. Check your event guidelines.</div></section>
      <section class="panel craft-card"><h2 class="section-title">The CRAFT framework</h2><p class="section-desc">A simple structure when you need to think clearly under pressure.</p><div class="craft-list"><div class="craft-item"><span class="craft-letter">C</span><div><strong>Context</strong><p>Restate the goal, constraints, and what the case data says.</p></div></div><div class="craft-item"><span class="craft-letter">R</span><div><strong>Recommendation</strong><p>Lead with one specific decision and a reason.</p></div></div><div class="craft-item"><span class="craft-letter">A</span><div><strong>Action plan</strong><p>Break execution into steps, owners, and timing.</p></div></div><div class="craft-item"><span class="craft-letter">F</span><div><strong>Financials & KPIs</strong><p>Use a target, a budget, or a measurable result.</p></div></div><div class="craft-item"><span class="craft-letter">T</span><div><strong>Trade-offs</strong><p>Address the risk, mitigation, and what happens next.</p></div></div></div></section></aside></div>
      <section class="panel notes-panel"><div class="panel-heading"><div><h2 class="section-title">Build your response</h2><p class="section-desc">Your notes save in this browser as you type. Use them as an outline, not a script to read word-for-word.</p></div><span class="pill green">Autosaves locally</span></div><div class="notes-grid">${notes}</div><hr class="rule"/><div class="panel-heading" style="margin-bottom:10px"><div><h2 class="section-title">Self-evaluation checklist</h2><p class="section-desc">Check each item you can clearly demonstrate in your pitch.</p></div><span class="pill">${caseSession.checks.length}/7</span></div><div class="rubric-grid">${rubricHtml}</div>${feedback}<div class="header-actions" style="margin-top:16px">${caseSession.phase==='feedback'?button('Start a new scenario ↻','new-case','btn btn-primary'):button('Finish rehearsal & save score','case-finish','btn btn-primary')} ${button('Clear notes','case-clear-notes','btn btn-secondary')}</div></section>`;
  }
  function updateCaseTimerText() {
    const el=document.getElementById('caseTimerText');
    if(!el||!caseSession)return;
    const time=caseSession.phase==='pitch'?caseSession.pitchRemaining:caseSession.prepRemaining;
    el.textContent=`${String(Math.floor(time/60)).padStart(2,'0')}:${String(time%60).padStart(2,'0')}`;
  }
  function startCaseTimer(phase) {
    stopCaseTimer();
    caseSession.phase=phase;
    caseSession.timerRunning=true;
    persistCaseDraft(); render();
    caseInterval=setInterval(()=>{
      if(!caseSession)return;
      const key=caseSession.phase==='pitch'?'pitchRemaining':'prepRemaining';
      caseSession[key]=Math.max(0,caseSession[key]-1);
      updateCaseTimerText();
      if(caseSession[key]<=0){stopCaseTimer();caseSession.timerRunning=false;persistCaseDraft();showToast(caseSession.phase==='pitch'?'Pitch timer complete. Score your rehearsal.':'Prep time complete. Move into the presentation phase.');}
    },1000);
  }
  function finishCase() {
    if(caseSession.phase==='feedback'){showToast('This rehearsal has already been saved. Start a new scenario for another rep.');return;}
    stopCaseTimer();
    caseSession.phase='feedback'; caseSession.timerRunning=false; caseSession.lastScore=caseSession.checks.length;
    const c=selectedCase();
    store.caseAttempts.push({id:`case-${Date.now()}`,date:new Date().toISOString(),caseId:c.id,title:c.title,cluster:c.cluster,score:caseSession.checks.length,notes:{...caseSession.notes}});
    if(store.caseAttempts.length>100)store.caseAttempts=store.caseAttempts.slice(-100);
    getDaily().case=true; persistCaseDraft(); persist(); showView('case-coach',true); showToast('Case rehearsal saved to your progress.');
  }

  // Review queue & flashcards
  function availableReviewItems() {
    return store.reviewIds.filter((id,idx,arr)=>arr.indexOf(id)===idx&&!store.masteredIds.includes(id)).map(questionById).filter(Boolean);
  }
  function resetStudyDeck() {
    const due=availableReviewItems();
    studyDeck=due.length?shuffle(due):shuffle(allQuestions()).slice(0,Math.min(12,allQuestions().length));
    studyIndex=0; studyFlipped=false;
  }
  function renderReview() {
    if(!studyDeck.length || studyIndex>=studyDeck.length)resetStudyDeck();
    const due=availableReviewItems();
    const q=studyDeck[studyIndex] || allQuestions()[0];
    if(!q) return htmlEmpty('✳','No questions loaded','Add a question bank in the Question Vault first.','Open question vault','open-vault');
    const flipped=studyFlipped;
    const front=flipped?`<div class="flashcard-badge"><span class="pill green">ANSWER & WHY</span></div><div class="flashcard-question">${q.answer}. ${escapeHtml(q.options['ABCD'.indexOf(q.answer)])}</div><p class="flashcard-answer">${escapeHtml(q.explanation)}<br/><br/><strong>Learning target:</strong> ${escapeHtml(q.target||q.topic)}</p>`:`<div class="flashcard-badge"><span class="pill blue">${escapeHtml(q.cluster)}</span> <span class="pill">${escapeHtml(q.topic)}</span></div><div class="flashcard-question">${escapeHtml(q.question)}</div><p class="flashcard-answer">Think of the concept before revealing the answer.</p>`;
    const sideDue=due.slice(0,6).map(item=>`<div class="missed-row"><span class="missed-icon">↺</span><div><strong>${escapeHtml(item.topic)}</strong><span>${escapeHtml(item.cluster)}</span></div><button data-action="review-select" data-id="${escapeHtml(item.id)}" aria-label="Review this question">→</button></div>`).join('');
    return `<div class="header-row"><div><div class="eyebrow">RECALL PRACTICE</div><h1 class="page-title">Review until it clicks.</h1><p class="page-subtitle">Try to retrieve the concept before flipping the card. Recognition is easier than recall—train recall.</p></div><div class="header-actions">${button('Practice missed topics →','weak-practice','btn btn-primary')}</div></div>
      <div class="review-layout"><section class="panel flashcard-area"><div class="panel-heading"><div><h2 class="section-title">${due.length?'Your missed-question deck':'Mixed warm-up deck'}</h2><p class="section-desc">Card ${studyIndex+1} of ${studyDeck.length} · ${due.length?'From your own mistakes':'A few questions selected from the bank'}</p></div><button class="btn btn-secondary btn-small" data-action="shuffle-deck">Shuffle ↻</button></div><div class="flashcard">${front}</div><div class="flashcard-actions">${button('← Previous','study-prev','btn btn-secondary',studyIndex===0?'disabled':'')}${flipped?button('Mark mastered ✓','study-master','btn btn-primary'):button('Reveal answer','study-flip','btn btn-primary')}${button('Next card →','study-next','btn btn-secondary',studyIndex===studyDeck.length-1?'disabled':'')}</div></section>
      <aside><section class="panel review-stats"><h2 class="section-title">Your review queue</h2><p class="section-desc">Missed questions are added automatically after an exam.</p><div class="review-counter"><span>Questions to revisit</span><strong>${due.length}</strong></div><div class="review-track"><span style="width:${Math.max(0,Math.min(100,store.masteredIds.length/(Math.max(1,store.reviewIds.length))*100))}%"></span></div><div class="review-counter"><span>Marked mastered</span><strong>${store.masteredIds.filter(id=>store.reviewIds.includes(id)).length}</strong></div><hr class="rule"/><div class="panel-heading" style="margin-bottom:8px"><div><h2 class="section-title">Priority concepts</h2><p class="section-desc">Choose one to jump to the card.</p></div></div><div class="missed-list">${sideDue || `<div class="section-desc">Your queue is clear. Keep your knowledge sharp with a mixed warm-up.</div>`}</div>${due.length?button('Clear queue by reviewing','study-next','btn btn-secondary btn-full','style="margin-top:12px"'):''}</section><div class="tip-strip"><div class="tip-icon">✦</div><div><strong>Active recall beats rereading.</strong><p>Say the answer in your own words before flipping. A correct guess without a reason is a cue to review again.</p></div></div></aside></div>`;
  }

  // Question vault / official materials
  function renderVault() {
    const count=allQuestions().length;
    const custom=store.customQuestions.length;
    const resources=[
      {icon:'↗',title:'Ontario DECA Regional online testing',desc:'Current guidance for online Regionals, including the 100-question multiple-choice format and 70-minute maximum.',url:'https://deca.ca/v2/about-regionals/regionals-online-testing/',label:'Open Ontario guidance'},
      {icon:'▤',title:'Official DECA competitive events',desc:'Explore current event offerings, clusters, sample exams, exam blueprints, and performance indicators.',url:'https://www.deca.org/compete',label:'Browse event library'},
      {icon:'✦',title:'Principles of Entrepreneurship event page',desc:'Official event requirements and resources, including a sample exam link when provided.',url:'https://www.deca.org/compete/principles-of-entrepreneurship',label:'Open event page'},
      {icon:'◈',title:'Principles of Business Management & Administration',desc:'Event overview and official preparation resources for the business administration core.',url:'https://www.deca.org/compete/principles-of-business-management-and-administration',label:'Open event page'},
      {icon:'◎',title:'Business Services Marketing Series',desc:'Marketing-cluster event overview with current preparation resources and sample materials.',url:'https://www.deca.org/compete/business-services-marketing-series',label:'Open event page'},
      {icon:'▣',title:'Ontario DECA Provincials',desc:'Provincials information and season-specific announcements for Ontario participants.',url:'https://deca.ca/v2/about-provincials/',label:'Open Ontario guidance'}
    ];
    return `<div class="header-row"><div><div class="eyebrow">YOUR QUESTION LIBRARY</div><h1 class="page-title">One vault. Official sources. Your own practice.</h1><p class="page-subtitle">Use official DECA resources for the latest event rules, then add approved question sets to your personal browser library.</p></div><div class="header-actions">${button('＋ Import questions','import-questions','btn btn-primary')} ${button('Export bank ↓','export-bank','btn btn-secondary')}</div></div>
      <div class="vault-metrics"><div class="vault-metric"><strong>${count}</strong><span>Total questions in this browser</span></div><div class="vault-metric"><strong>${custom}</strong><span>Imported / custom questions</span></div><div class="vault-metric"><strong>${CLUSTERS.length}</strong><span>Practice clusters</span></div></div>
      <div class="vault-grid"><section class="panel panel-pad"><div class="panel-heading"><div><h2 class="section-title">Official DECA resource links</h2><p class="section-desc">These pages are the source of truth for the current season and event-specific requirements.</p></div><span class="pill blue">External links</span></div><div class="resource-list">${resources.map(r=>`<div class="resource-row"><div class="resource-icon">${r.icon}</div><div class="resource-copy"><strong>${escapeHtml(r.title)}</strong><p>${escapeHtml(r.desc)}</p></div><a href="${r.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(r.label)} ↗</a></div>`).join('')}</div><div class="disclaimer" style="margin-top:14px"><strong>Respect the source.</strong> This app does not copy or redistribute a collection of official past exams. Use official materials under their stated terms; the built-in 100 questions are original practice content.</div></section>
      <aside class="grid"><section class="panel panel-pad"><div class="panel-heading"><div><h2 class="section-title">Add your own questions</h2><p class="section-desc">Import a CSV or JSON question bank stored locally in your browser.</p></div></div><div class="import-drop"><div class="import-symbol">↑</div><strong>Import a question bank</strong><p>Bring in questions from materials you’re allowed to use. This static app imports question data, not raw PDF files.</p>${button('Choose CSV or JSON','import-questions','btn btn-primary btn-small')}<div class="field-note">CSV header: cluster, topic, difficulty, question, optionA, optionB, optionC, optionD, answer, explanation, learningTarget</div></div><div class="header-actions" style="margin-top:12px">${button('Download CSV template ↓','download-template','btn btn-secondary btn-small')} ${button('Export custom bank','export-custom','btn btn-secondary btn-small')}</div></section>
      <section class="panel panel-pad"><h2 class="section-title">Expected JSON format</h2><p class="section-desc">Your file can be a question array or an object with a questions array.</p><pre class="code-sample">[\n  {\n    "cluster": "Marketing",\n    "topic": "Segmentation",\n    "difficulty": 2,\n    "question": "Your question text",\n    "options": ["A", "B", "C", "D"],\n    "answer": "B",\n    "explanation": "Why B is correct",\n    "target": "Market segmentation"\n  }\n]</pre></section></aside></div>
      <section class="panel panel-pad" style="margin-top:17px"><div class="panel-heading"><div><h2 class="section-title">Cluster coverage</h2><p class="section-desc">Original built-in questions available per cluster.</p></div></div><div class="cluster-bars">${allClusterNames().map(cl=>{const n=allQuestions().filter(q=>q.cluster===cl).length;return `<div class="cluster-bar-row"><span class="cluster-bar-name">${escapeHtml(cl)}</span><div class="cluster-bar-track"><div class="cluster-bar-fill" style="width:${n/Math.max(1,...CLUSTERS.map(x=>allQuestions().filter(q=>q.cluster===x).length))*100}%"></div></div><span class="cluster-bar-score">${n}</span></div>`;}).join('')}</div></section>`;
  }

  // Download / import helpers
  function downloadFile(name, contentText, mime='text/plain;charset=utf-8') {
    const blob=new Blob([contentText],{type:mime});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function csvEscape(value) { const s=String(value??''); return /[",\n\r]/.test(s)?`"${s.replace(/"/g,'""')}"`:s; }
  function rowsToCsv(rows, headers) { return [headers.map(csvEscape).join(','),...rows.map(row=>headers.map(h=>csvEscape(row[h])).join(','))].join('\r\n'); }
  function exportResults(attempt=shownResult||store.attempts[store.attempts.length-1]) {
    if(!attempt){showToast('No exam answer sheet to export yet.');return;}
    const rows=attempt.rows.map(r=>({'Question #':r.index,Cluster:r.cluster,Topic:r.topic,Question:r.question,'Your answer':r.selected||'Unanswered','Correct answer':r.answer,Correct:r.isCorrect?'Yes':'No',Explanation:r.explanation}));
    downloadFile(`deca-sprint-answer-key-${todayKey()}.csv`,rowsToCsv(rows,Object.keys(rows[0]||{'Question #':'','Cluster':'','Topic':'','Question':'','Your answer':'','Correct answer':'','Correct':'','Explanation':''})),'text/csv;charset=utf-8');
    showToast('Answer sheet exported as CSV.');
  }
  function exportAllResults() {
    const payload={app:'DECA Sprint',exportedAt:new Date().toISOString(),attempts:store.attempts,caseAttempts:store.caseAttempts,customQuestions:store.customQuestions,reviewIds:store.reviewIds,masteredIds:store.masteredIds};
    downloadFile(`deca-sprint-progress-${todayKey()}.json`,JSON.stringify(payload,null,2),'application/json');
    showToast('Progress export downloaded.');
  }
  function exportBank(customOnly=false) {
    const qs=customOnly?store.customQuestions:allQuestions();
    downloadFile(`deca-sprint-${customOnly?'custom-':''}question-bank-${todayKey()}.json`,JSON.stringify({questions:qs},null,2),'application/json');
    showToast(`${qs.length} question${qs.length===1?'':'s'} exported.`);
  }
  function downloadTemplate() {
    const headers=['cluster','topic','difficulty','question','optionA','optionB','optionC','optionD','answer','explanation','learningTarget'];
    const example={cluster:'Marketing',topic:'Segmentation',difficulty:2,question:'Example question text?',optionA:'Option A',optionB:'Option B',optionC:'Option C',optionD:'Option D',answer:'B',explanation:'Explain why B is correct.',learningTarget:'Market segmentation'};
    downloadFile('deca-sprint-question-template.csv',rowsToCsv([example],headers),'text/csv;charset=utf-8');
    showToast('CSV template downloaded.');
  }
  function parseCsv(text) {
    const rows=[]; let row=[], field='', quoted=false;
    for(let i=0;i<text.length;i++){
      const ch=text[i], next=text[i+1];
      if(ch==='"'&&quoted&&next==='"'){field+='"';i++;}
      else if(ch==='"'){quoted=!quoted;}
      else if(ch===','&&!quoted){row.push(field);field='';}
      else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&next==='\n')i++;row.push(field);if(row.some(c=>String(c).trim()!==''))rows.push(row);row=[];field='';}
      else field+=ch;
    }
    if(field.length||row.length){row.push(field);rows.push(row);}
    if(!rows.length)return [];
    const headers=rows.shift().map(h=>h.trim());
    return rows.map(cells=>Object.fromEntries(headers.map((h,i)=>[h,(cells[i]??'').trim()])));
  }
  function normalizeImportedQuestion(raw,index) {
    const options=Array.isArray(raw.options)?raw.options:[raw.optionA,raw.optionB,raw.optionC,raw.optionD];
    const answer=String(raw.answer||'').trim().toUpperCase();
    const cluster=String(raw.cluster||'Custom').trim();
    const question=String(raw.question||raw.stem||'').trim();
    const expl=String(raw.explanation||raw.rationale||'').trim();
    if(!question||options.length!==4||options.some(o=>!String(o??'').trim())||!['A','B','C','D'].includes(answer)||!expl) return null;
    const base={cluster,topic:String(raw.topic||'Imported').trim(),difficulty:Math.max(1,Math.min(3,Number(raw.difficulty)||2)),question,options:options.map(o=>String(o).trim()),answer,explanation:expl,target:String(raw.learningTarget||raw.target||raw.topic||'Imported concept').trim(),source:'Imported practice'};
    const hash=hashText(`${base.cluster}|${base.topic}|${base.question}`);
    return {...base,id:`custom-${hash}-${index}`};
  }
  function hashText(str) { let h=2166136261; for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);} return (h>>>0).toString(36); }
  function importFile(file) {
    if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{
      try {
        let raw;
        if(file.name.toLowerCase().endsWith('.json')) {const parsed=JSON.parse(reader.result);raw=Array.isArray(parsed)?parsed:parsed.questions;}
        else raw=parseCsv(String(reader.result||''));
        if(!Array.isArray(raw))throw new Error('Expected a question array.');
        const normalized=raw.map(normalizeImportedQuestion).filter(Boolean);
        if(!normalized.length)throw new Error('No valid questions found. Check the format, four options, A–D answer, and explanation field.');
        const existing=new Set(store.customQuestions.map(q=>q.id));
        const unique=normalized.filter(q=>!existing.has(q.id));
        store.customQuestions.push(...unique);
        persist(); showView('vault',true); showToast(`${unique.length} question${unique.length===1?'':'s'} imported${normalized.length!==unique.length?`; ${normalized.length-unique.length} duplicate ID(s) skipped`:''}.`);
      } catch(err) {showToast(err.message||'Could not import this file.');}
      importInput.value='';
    };
    reader.onerror=()=>showToast('The file could not be read.');
    reader.readAsText(file);
  }

  // Event handlers
  document.addEventListener('click',e=>{
    const viewTarget=e.target.closest('[data-view]');
    if(viewTarget){e.preventDefault();showView(viewTarget.dataset.view);return;}
    const levelBtn=e.target.closest('[data-level]');
    if(levelBtn){store.prefs.level=levelBtn.dataset.level;persist();render();return;}
    const countBtn=e.target.closest('[data-count]');
    if(countBtn&&!countBtn.disabled){store.prefs.count=Number(countBtn.dataset.count);persist();render();return;}
    const filter=e.target.closest('[data-filter]');
    if(filter){resultFilter=filter.dataset.filter;render();return;}
    const actionEl=e.target.closest('[data-action]');
    if(!actionEl)return;
    const action=actionEl.dataset.action;
    switch(action){
      case 'daily-answer': { const q=dailyQuestion(); if(!q)break; const key=todayKey();store.dailyChecks[key]={...(store.dailyChecks[key]||{}),questionId:q.id,answer:actionEl.dataset.key,question:true};persist();render();break; }
      case 'daily-practice': { const q=dailyQuestion();store.prefs.cluster=q?.cluster||'All clusters';store.prefs.count=Math.min(10,maximumExamCount(store.prefs.cluster));store.prefs.mode='study';persist();startExam();break; }
      case 'coach-practice': { store.prefs.cluster=actionEl.dataset.cluster||'All clusters';store.prefs.count=Math.min(10,maximumExamCount(store.prefs.cluster));store.prefs.mode='study';persist();startExam();break; }
      case 'account-progress': showView('progress');break;
      case 'dashboard': showView('dashboard'); break;
      case 'back-dashboard': showView('dashboard'); break;
      case 'open-setup': showView('exam-setup'); break;
      case 'open-case': showView('case-coach'); break;
      case 'open-vault': showView('vault'); break;
      case 'full-mock': store.prefs.cluster='All clusters';store.prefs.count=100;store.prefs.level='Regional';store.prefs.mode='exam';persist();startExam();break;
      case 'daily-session': store.prefs.cluster='All clusters';store.prefs.count=10;store.prefs.mode='exam';persist();startExam('daily');break;
      case 'start-exam': startExam();break;
      case 'choose-option': {
        if(!activeExam)break;
        const q=activeExam.questions[activeExam.index];
        if(activeExam.mode==='study'&&activeExam.answers[q.id])break;
        activeExam.answers[q.id]=actionEl.dataset.key;
        render();
        break;
      }
      case 'prev-question': if(activeExam&&activeExam.index>0){activeExam.index--;render();} break;
      case 'next-question': if(activeExam&&activeExam.index<activeExam.questions.length-1){activeExam.index++;render();} break;
      case 'jump-question': if(activeExam){activeExam.index=Number(actionEl.dataset.index);render();} break;
      case 'toggle-flag': if(activeExam){const id=activeExam.questions[activeExam.index].id;activeExam.flagged=activeExam.flagged.includes(id)?activeExam.flagged.filter(x=>x!==id):[...activeExam.flagged,id];render();} break;
      case 'finish-exam': finishExam(false);break;
      case 'export-results': exportResults();break;
      case 'export-all-results': exportAllResults();break;
      case 'export-bank': exportBank(false);break;
      case 'export-custom': exportBank(true);break;
      case 'import-questions': importInput.click();break;
      case 'download-template': downloadTemplate();break;
      case 'weak-practice': {
        const stats=getTopicStats().filter(x=>x.total).sort((a,b)=>a.accuracy-b.accuracy);
        if(stats.length){const worst=stats[0];store.prefs.cluster=worst.cluster||'All clusters';store.prefs.count=Math.min(10,maximumExamCount(store.prefs.cluster));}
        else {store.prefs.cluster='All clusters';store.prefs.count=10;}
        store.prefs.mode='study';persist();startExam();break;
      }
      case 'study-flip': studyFlipped=true;getDaily().review=true;persist();render();break;
      case 'study-next': if(studyIndex<studyDeck.length-1){studyIndex++;studyFlipped=false;render();}else{studyIndex=0;studyFlipped=false;showToast('You reached the end of this deck. Shuffle for another round.');render();} break;
      case 'study-prev': if(studyIndex>0){studyIndex--;studyFlipped=false;render();}break;
      case 'study-master': {
        const q=studyDeck[studyIndex];if(q&&!store.masteredIds.includes(q.id))store.masteredIds.push(q.id);
        getDaily().review=true;persist();
        const due=availableReviewItems();
        studyDeck=due.length?shuffle(due):shuffle(allQuestions()).slice(0,Math.min(12,allQuestions().length));
        studyIndex=0;studyFlipped=false;render();showToast('Marked as mastered for now. Keep coming back to it later.');break;
      }
      case 'shuffle-deck': studyDeck=shuffle(studyDeck);studyIndex=0;studyFlipped=false;render();break;
      case 'review-select': {
        const id=actionEl.dataset.id;const selected=questionById(id);if(selected){studyDeck=[selected,...studyDeck.filter(q=>q.id!==id)];studyIndex=0;studyFlipped=false;render();}break;
      }
      case 'new-case': {
        const cluster=document.getElementById('caseCluster')?.value||store.prefs.caseCluster||'Marketing';
        store.prefs.caseCluster=cluster;const options=CASES.filter(c=>c.cluster===cluster);const pool=options.length?options:CASES;
        let scenario=pool[Math.floor(Math.random()*pool.length)];if(pool.length>1&&scenario.id===caseSession.caseId)scenario=pool[(pool.findIndex(x=>x.id===scenario.id)+1)%pool.length];caseSession=makeFreshCaseSession(scenario);persistCaseDraft();stopCaseTimer();showView('case-coach',true);break;
      }
      case 'case-start-prep': startCaseTimer('prep');break;
      case 'case-start-pitch': startCaseTimer('pitch');break;
      case 'case-reset-timer': stopCaseTimer();caseSession.prepRemaining=600;caseSession.pitchRemaining=600;caseSession.phase='brief';caseSession.timerRunning=false;persistCaseDraft();render();showToast('Rehearsal timer reset.');break;
      case 'case-finish': finishCase();break;
      case 'case-clear-notes': if(confirm('Clear your notes for this scenario?')){caseSession.notes={context:'',recommendation:'',actions:'',metrics:'',risks:''};persistCaseDraft();render();showToast('Notes cleared.');}break;
      case 'quick-help': showToast('Choose Exam Practice for multiple choice, Case Study Lab for a timed response, and Review for missed questions. Your progress stays in this browser.');break;
      case 'clear-progress': if(confirm('Clear all saved practice results, review flags, imported questions, and case notes on this device? This cannot be undone.')){localStorage.removeItem(STORAGE_KEY);store=defaultState();shownResult=null;caseSession=makeFreshCaseSession(CASES[0]);studyDeck=[];persist();showView('dashboard',true);showToast('Local practice data cleared.');}break;
      case 'export-custom': exportBank(true);break;
    }
  });

  document.addEventListener('submit',e=>{
    if(e.target.id==='profileForm'){e.preventDefault();const fd=new FormData(e.target);store.profile={name:String(fd.get('displayName')||'').trim(),email:String(fd.get('email')||'').trim()};persist();const n=document.getElementById('profileName'),a=document.getElementById('profileAvatar');if(n)n.textContent=store.profile.name||'Student';if(a)a.textContent=(store.profile.name||'S').slice(0,1).toUpperCase();showToast('Profile saved on this device. Export progress for backup.');render();}
  });
  document.addEventListener('change',e=>{
    if(e.target.id==='clusterSelect'){
      store.prefs.cluster=e.target.value;
      store.prefs.count=Math.min(Number(store.prefs.count)||25,maximumExamCount(store.prefs.cluster));
      if(store.prefs.count<10)store.prefs.count=maximumExamCount(store.prefs.cluster);
      persist();render();
    } else if(e.target.id==='practiceMode') {
      store.prefs.mode=e.target.value;persist();render();
    } else if(e.target.id==='caseCluster') {
      const cluster=e.target.value;store.prefs.caseCluster=cluster;
      const c=CASES.find(c=>c.cluster===cluster)||CASES[0];stopCaseTimer();caseSession=makeFreshCaseSession(c);persistCaseDraft();persist();render();
    } else if(e.target.matches('[data-rubric]')) {
      const index=Number(e.target.dataset.rubric);
      caseSession.checks=e.target.checked?[...new Set([...caseSession.checks,index])]:caseSession.checks.filter(x=>x!==index);
      persistCaseDraft();
      const badge=content.querySelector('.notes-panel .pill'); if(badge)badge.textContent=`${caseSession.checks.length}/7`;
    }
  });
  document.addEventListener('input',e=>{
    if(e.target.matches('[data-note]')) {
      if(!caseSession.notes)caseSession.notes={};
      caseSession.notes[e.target.dataset.note]=e.target.value;
      // Debounced enough for small local note objects; no network requests are made.
      persistCaseDraft();
    }
  });
  importInput.addEventListener('change',e=>importFile(e.target.files?.[0]));
  document.addEventListener('keydown',e=>{
    if(view==='exam'&&activeExam&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){
      const q=activeExam.questions[activeExam.index];
      if(['a','b','c','d'].includes(e.key.toLowerCase())){
        const key=e.key.toUpperCase();
        if(activeExam.mode!=='study'||!activeExam.answers[q.id]){activeExam.answers[q.id]=key;render();}
      } else if(e.key==='ArrowRight'&&activeExam.index<activeExam.questions.length-1){activeExam.index++;render();}
      else if(e.key==='ArrowLeft'&&activeExam.index>0){activeExam.index--;render();}
    }
  });

  // Add a few missing action aliases that are used by page navigation buttons.
  const observer = new MutationObserver(()=>{
    // Keep nav state synchronized when a view is changed by an action.
    document.querySelectorAll('.nav-item').forEach(el=>el.classList.toggle('active',el.dataset.view===view));
  });
  observer.observe(content,{childList:true,subtree:false});

  // Small helper so the daily quick practice is correctly marked and setup buttons work.
  // Initial screen.
  render();
  updateReviewBadge();
})();
