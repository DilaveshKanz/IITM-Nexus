<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>IITMNexus — README</title>
  <meta name="description" content="IITMNexus — Under development. All-in-one IITM BS student platform for resources, mock tests, OPPE practice, grade tools and more." />
  <style>
    :root{
      --bg:#0f1724; --card:#0b1220; --muted:#9aa4b2; --accent:#7dd3fc; --glass: rgba(255,255,255,0.03);
      --maxw:900px; --radius:14px;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: #e6eef6;
    }
    html,body{height:100%;margin:0;background:linear-gradient(180deg,#071026 0%, #061021 100%);-webkit-font-smoothing:antialiased;}
    .wrap{max-width:var(--maxw);margin:36px auto;padding:28px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:var(--radius);box-shadow:0 8px 30px rgba(2,6,23,0.6);border:1px solid rgba(255,255,255,0.03);}
    header{display:flex;gap:16px;align-items:center;}
    .logo{
      width:76px;height:76px;border-radius:12px;background:linear-gradient(135deg,var(--accent),#60a5fa);display:flex;align-items:center;justify-content:center;font-weight:700;color:#02283a;font-size:22px;box-shadow:0 6px 18px rgba(29,78,216,0.12);
    }
    h1{margin:0;font-size:24px}
    p.lead{margin:6px 0 0;color:var(--muted)}
    .badges{margin-top:12px;display:flex;gap:8px;flex-wrap:wrap}
    .section{margin-top:22px;}
    h2{margin:0 0 8px 0;font-size:16px}
    ul{margin:8px 0 0 20px;color:var(--muted)line-height:1.6}
    code{background:var(--glass);padding:4px 8px;border-radius:8px;color:var(--accent);font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Helvetica Neue", monospace}
    .cta{margin-top:18px;display:flex;gap:10px;flex-wrap:wrap}
    .btn{
      background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:10px;color:var(--accent);text-decoration:none;font-weight:600;font-size:14px;
    }
    .pill{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.02);color:var(--muted);font-size:13px;border:1px solid rgba(255,255,255,0.02)}
    footer{margin-top:28px;color:var(--muted);font-size:13px;border-top:1px dashed rgba(255,255,255,0.02);padding-top:16px}
    pre.hl{background:rgba(0,0,0,0.25);padding:12px;border-radius:8px;overflow:auto;color:#dff3ff}
    @media (max-width:640px){.wrap{margin:18px;padding:18px}.logo{width:56px;height:56px;font-size:18px}}
  </style>
</head>
<body>
  <main class="wrap" role="main" aria-labelledby="title">
    <header>
      <div class="logo" aria-hidden="true">IN</div>
      <div>
        <h1 id="title">IITMNexus <span class="pill">Under development</span></h1>
        <p class="lead">All-in-one IITM BS student platform for resources, mock tests, OPPE practice, grade tools, community links and more.</p>
        <div class="badges" aria-hidden="true">
          <!-- Replace <USER>/<REPO> with actual repo path when publishing -->
          <img src="https://img.shields.io/badge/status-under%20development-orange" alt="status" />
          <img src="https://img.shields.io/badge/language-JavaScript%2FHTML-blue" alt="language" />
          <img src="https://img.shields.io/badge/license-MIT-lightgrey" alt="license" />
        </div>
      </div>
    </header>

```
<section class="section" aria-labelledby="about">
  <h2 id="about">About</h2>
  <p style="color:var(--muted)">IITMNexus is being built as a centralized hub for the <strong>IIT Madras BS</strong> community. Its goal is to combine study resources, exam practice, grade &amp; GPA utilities, and curated community links into one student-first experience — a modern alternative to tools like AceGrade.</p>
</section>

<section class="section" aria-labelledby="features">
  <h2 id="features">Key features (planned / in progress)</h2>
  <ul>
    <li><strong>Previous year question papers &amp; notes</strong> — organized by course &amp; semester.</li>
    <li><strong>Mock tests &amp; practice portal</strong> — topic-wise and full-length timed tests with analytics.</li>
    <li><strong>OPPE Playground</strong> — simulate Open Book Programming Exams with a code-run environment and problem sets.</li>
    <li><strong>Lecture library &amp; links</strong> — playlists, recorded lectures, and quick links to lecture pages.</li>
    <li><strong>CGPA / GPA calculator &amp; grade predictor</strong> — compute current CGPA and simulate future semester outcomes.</li>
    <li><strong>Curated community &amp; official links</strong> — GitHub repos, YouTube channels, official IITM pages, Discord/Matrix groups.</li>
    <li><strong>Announcements &amp; deadlines</strong> — centralized feed for academic notices and student-driven updates.</li>
  </ul>
</section>

<section class="section" aria-labelledby="quickstart">
  <h2 id="quickstart">Quick start</h2>
  <p class="lead" style="margin:6px 0 10px 0;color:var(--muted)">These instructions are provisional — adjust when the repository's modules are available.</p>

  <pre class="hl"><code>git clone https://github.com/&lt;USER&gt;/IITMNexus.git
```

cd IITMNexus

# check README in each subpackage (frontend, backend, data)

</code></pre>

```
  <p style="color:var(--muted)">Frontend will be a single-page app (likely React/Vite/Tailwind). Backend API (Node/Express or Flask) + a small DB will power the calculators, mock-tests, and OPPE playground runner.</p>
</section>

<section class="section" aria-labelledby="contribute">
  <h2 id="contribute">Contributing</h2>
  <p style="color:var(--muted)">IITMNexus is <strong>community-led</strong> — contributions, ideas, and feedback are very welcome. Suggested ways to help:</p>
  <ul>
    <li>File issues for bugs, feature ideas, or missing resources.</li>
    <li>Open pull requests for UI components, calculators, and data ingestion scripts.</li>
    <li>Help curate previous year papers, notes, and verified lecture links.</li>
    <li>Work on OPPE Playground problems and dockerized runtimes (sandboxed).</li>
  </ul>

  <div class="cta">
    <a class="btn" href="#" title="Open an issue">Open an issue</a>
    <a class="btn" href="#" title="Contribute">How to contribute</a>
  </div>

  <p style="color:var(--muted);margin-top:8px">When contributing resources (notes, papers), please ensure they are shared with permission and respect any copyright or distribution restrictions.</p>
</section>

<section class="section" aria-labelledby="roadmap">
  <h2 id="roadmap">Roadmap (high-level)</h2>
  <ul>
    <li>Phase 1 — Core design &amp; static content: README, docs, resource index, basic calculators (CGPA/GPA).</li>
    <li>Phase 2 — Mock tests engine, question bank ingestion, user profiles.</li>
    <li>Phase 3 — OPPE Playground (sandboxed runner), analytics dashboard, notifications.</li>
    <li>Phase 4 — Integrations: official links, YouTube playlists, collaborative notes, mobile PWA support.</li>
  </ul>
</section>

<section class="section" aria-labelledby="license">
  <h2 id="license">License &amp; contact</h2>
  <p style="color:var(--muted)">This repository will be licensed under the <strong>MIT License</strong> unless otherwise noted in submodules. For questions, ideas, or to request resource addition, open an issue or contact the maintainers via the repository's contact details.</p>
</section>

<footer>
  <strong>Tagline:</strong> <span style="color:var(--accent)">Under development — All-in-one IITM BS student platform for resources, mock tests, OPPE practice, and more.</span>
  <div style="margin-top:10px">
    <small>Created for the IIT Madras BS community • Built by students, contributors &amp; maintainers.</small>
  </div>
</footer>
```

  </main>
</body>
</html>
