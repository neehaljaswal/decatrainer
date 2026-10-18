# DECA Sprint — Practice Studio

A browser-based DECA preparation app built with plain HTML, CSS, and JavaScript. No build step, server code, account, API key, or package install is required.

## Features

- **100 original multiple-choice practice questions** across seven clusters: Business Administration Core, Marketing, Finance, Hospitality & Tourism, Business Management & Administration, Entrepreneurship, and Personal Financial Literacy.
- **Regional, Provincials, and ICDC training tiers** that adjust the emphasis of shorter sets. These are practice difficulty profiles, not claims that every competition stage uses different official exam rules.
- **Timed exam mode** and **study mode** with immediate feedback.
- **DECA-style answer sheet** after each set: your response, correct letter and option, topic, and explanation.
- **Flagging, question navigation, missed-question review, and flashcards.**
- **Case Study Lab** with 14 original practice scenarios, a 10-minute preparation timer, presentation rehearsal timer, autosaved outline fields, CRAFT structure, and a seven-item self-evaluation checklist.
- **Question Vault** with official DECA resource links and a CSV/JSON importer for question banks you are permitted to use.
- **Performance dashboard** with recent scores, cluster/topic accuracy, case practice, and exportable results.

## Run it

### Option A — open the standalone file

Open `DECA_Sprint.html` in a modern browser. It contains the CSS, question bank, and app code in one file.

### Option B — run the source folder

Keep `index.html`, `styles.css`, `questions.js`, and `app.js` in the same folder. Open the folder with a local web server for the most consistent browser storage behavior. For example, if Python is installed, run this command from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Import your own questions

Open **Question Vault → Import questions**. Supported formats are `.csv` and `.json`.

The CSV template is provided as `question-template.csv`. Its header is:

```text
cluster,topic,difficulty,question,optionA,optionB,optionC,optionD,answer,explanation,learningTarget
```

- `difficulty` should be `1`, `2`, or `3`.
- `answer` should be `A`, `B`, `C`, or `D`.
- Include all four options and a clear explanation for each question.
- JSON can be an array of question objects or an object with a `questions` array. Each question object should contain `cluster`, `topic`, `difficulty`, `question`, `options` (an array of four strings), `answer`, and `explanation`; `target` or `learningTarget` is optional.
- Imports are processed locally in the browser. The importer handles question data, **not raw PDFs**; convert materials you have permission to use into the template format first.

## PDF exam builder

Open **PDF exam builder** in the sidebar and upload a text-based PDF. The app uses PDF.js in the browser to extract numbered questions, A–D choices, common answer-key formats, and labeled explanations. It then lets you take the full extracted set with a countdown timer, navigate between questions, and review answers at the end.

Extraction is best-effort: scanned image-only PDFs, complex columns, and unusual layouts may need OCR or manual correction. Always review the preview before starting. The PDF is processed locally in the browser; the PDF itself is not uploaded to the app's server. The PDF.js library is loaded from a CDN, so an internet connection is required for the PDF reader to initialize. Questions without a detected answer key are still included in the quiz but are excluded from the score.

## Saved data and privacy

Progress, answer history, imported questions, and case notes are saved in browser `localStorage` on the device/profile where the app is used. The Account page stores a display name and email label locally only; it is not secure authentication and does not provide cross-device sync. Clearing browser site data can remove progress, so use **Performance → Export data** to keep a backup. The Question of the Day rotates daily. The Learning Coach prioritizes weak topics using your local answer history; it is adaptive logic, not a connected generative-AI service. The **Clear local data** control intentionally resets this browser's saved app data.

## Official resources and content notes

The app links to official DECA/DECA Ontario pages for current event requirements and publicly provided sample materials. It does not include a copied archive of official exam questions or PDFs. The built-in questions and case scenarios are original practice content written for this app, and the answer key is an instructional explanation—not an official DECA answer key.

Ontario DECA's current Regional online-testing guidance describes 100 multiple-choice questions and a 70-minute maximum for Regionals. The app uses that as a practice reference for a 100-question mock; always confirm the current guidance for your association, event, and season.

## Important limitation

Practice can build knowledge and presentation habits, but no app can guarantee a 100% exam result or a perfect case-study score the next day. Use missed-question explanations, targeted drills, timed mock sets, and repeated case-study rehearsals to find and close gaps.


## Production account and live AI roadmap

To launch secure accounts and a true AI tutor, configure Supabase Auth + Postgres row-level security (or Firebase Auth/Firestore) and a server-side AI route on Vercel. Keep all provider keys in server environment variables; never put them in `app.js`. The current account panel is intentionally labeled as local-only rather than pretending a secure account backend exists.
