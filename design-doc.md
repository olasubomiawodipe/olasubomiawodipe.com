# Technical Design Document: olasubomiawodipe.com

**Status:** V1
**Owner:** Olasubomi Awodipe
**Document type:** Product and technical design specification
**Target deployment:** Vercel with the custom apex domain `olasubomiawodipe.com`
**Primary audience:** Engineering leaders, AI research collaborators, hiring teams, founders, and technical communities

## 1. Executive Summary

This document defines the design and implementation plan for a production-grade personal portfolio website that positions Olasubomi Awodipe as an elite software engineer, AI research scientist, and future founder.

The site will be a fast, accessible, semantic single-page experience implemented with standards-based HTML5, modern CSS3, and minimal vanilla JavaScript. It will use a restrained enterprise visual language inspired by Google product surfaces: light, highly legible, structurally clear, and generous with whitespace. The experience will make technical depth and evidence easy to scan without becoming a resume dump.

The initial release will present five high-signal areas:

1. Hero
2. About
3. Research
4. Experience
5. Awards

The website is intentionally static-first. Content will be authored in source-controlled HTML or structured data files, built and deployed through Vercel, and delivered over managed HTTPS on the apex domain.

## 2. Goals and Non-Goals

### 2.1 Goals

- Transition the public identity from student to software engineer, AI research scientist, and future founder.
- Communicate credibility within the first viewport through a clear name, title, positioning statement, and proof-oriented navigation.
- Make research work, professional experience, and awards discoverable within one predictable page.
- Target a Lighthouse score of 95 across Performance, Accessibility, Best Practices, and SEO on representative mobile and desktop runs, while treating the score as an advisory signal for reviewing meaningful regressions rather than a binding CI threshold.
- Achieve WCAG 2.2 AA-compatible interaction and visual treatment.
- Provide machine-readable professional identity through semantic HTML, metadata, and `Person` JSON-LD.
- Load quickly on a mobile connection with minimal JavaScript and no unnecessary framework runtime.
- Support fluid layouts from a 440 x 956 CSS-pixel mobile viewport, representing the iPhone 17 Pro Max class of device, through widescreen desktop displays.
- Make every external professional link explicit, trustworthy, and easy to verify.
- Keep the source easy to maintain by using a small number of composable layout and content patterns.

### 2.2 Non-Goals

- A multi-page content management system or authenticated admin dashboard.
- A blog platform, newsletter system, or comments system in the initial release.
- A custom backend, database, API, or server-side application runtime.
- A visual-heavy personal brand site that prioritizes animation over evidence.
- Fabricated affiliations, publications, awards, metrics, or claims. All facts must be verified before publication.
- A full design system package intended for reuse across unrelated products.

## 3. Product Principles

### Evidence over adjectives

Claims such as "elite," "production-scale," or "research-driven" must be supported by specific projects, roles, outcomes, artifacts, or links wherever possible.

### Clarity over decoration

The interface should help a visitor answer three questions quickly:

- What does Subomi do?
- What evidence demonstrates it?
- How can I verify or contact him?

### Static-first by default

HTML should contain the meaningful content in the initial response. JavaScript may enhance navigation and presentation, but the site must remain understandable and usable when JavaScript is unavailable.

### Accessible by construction

Semantic elements, visible focus states, keyboard access, contrast, and reduced-motion behavior are requirements of the base implementation, not late-stage polish.

### Performance is a feature

Every dependency, font, image, animation, and script must justify its cost against the primary goals of credibility, readability, and discoverability.

## 4. Technical Architecture

### 4.1 Chosen architecture

The site will be a single-page static website composed of:

- `index.html` for semantic document structure, content, metadata, and JSON-LD.
- `styles.css` for design tokens, responsive layout, component styling, and state styles.
- `script.js` for small progressive enhancements only.
- Optional local assets under `assets/`, limited to optimized images or downloadable documents that are necessary to the experience.
- Vercel for build-free static hosting, TLS termination, domain routing, and deployment previews.

No client-side framework is required for the initial release. A lightweight utility-first approach may be introduced later only if it demonstrably improves maintainability without increasing runtime cost or obscuring semantic structure.

### 4.2 Runtime behavior

The default request path is:

1. Browser requests `https://olasubomiawodipe.com/`.
2. Vercel serves the static document over HTTPS.
3. The browser parses semantic HTML and renders the critical content immediately.
4. CSS applies the responsive layout and visual system.
5. JavaScript enhances same-page navigation, active section state, and any non-essential interaction.
6. External profile and research links open in a new tab only when that behavior is useful and communicated accessibly.

### 4.3 Progressive enhancement contract

The following must work without JavaScript:

- Reading every section.
- Navigating with in-page anchor links.
- Opening resume, profile, arXiv, and Overleaf destinations.
- Understanding section order and document hierarchy.

JavaScript may provide:

- A compact mobile navigation disclosure if the final header requires it.
- `IntersectionObserver`-based active-section indication.
- A subtle scroll state for the header.
- Optional reveal transitions that do not hide content from assistive technology.

JavaScript must not be required for content rendering, route resolution, or core navigation.

## 5. Repository and File Structure

The initial repository should use the following structure:

```text
/
├── index.html
├── styles.css
├── script.js
├── assets/
│   ├── fonts/
│   │   └── LICENSE.txt
│   ├── resume.pdf
│   └── images/
├── .github/
│   └── workflows/
│       └── lighthouse.yml
├── robots.txt
├── sitemap.xml
├── design-doc.md
└── README.md
```

### File responsibilities

- `index.html`: document structure, visible copy, canonical URL, social metadata, and JSON-LD.
- `styles.css`: all visual tokens and responsive rules. Avoid inline styles except where a generated asset requires them.
- `script.js`: small, defensive enhancements. Use strict mode and avoid global mutable state.
- `assets/fonts/`: self-hosted Inter font files and the applicable SIL Open Font License notice.
- `assets/resume.pdf`: the canonical resume, if published. It must have a descriptive accessible link label.
- `.github/workflows/lighthouse.yml`: GitHub Actions workflow that validates the local static output and runs one advisory Lighthouse CI pass.
- `robots.txt`: allow public crawling and identify the sitemap.
- `sitemap.xml`: identify the canonical homepage URL.
- `README.md`: local development, deployment, content update, and verification instructions.

## 6. Information Architecture

The document uses one landmark-oriented page with a persistent or visually prominent header and five primary sections.

### 6.1 Document outline

```text
<header>
  Brand / name
  Primary navigation
</header>
<main>
  <section id="home">Hero</section>
  <section id="about">About</section>
  <section id="research">Research / Preprints</section>
  <section id="experience">Experience</section>
  <section id="awards">Awards</section>
</main>
<footer>
  Contact and verified profile links
</footer>
```

Only one `h1` is permitted. Each primary section must have a visible heading and an accessible name. Repeated research items, experience milestones, and awards should use `article` elements when they represent independent content records.

### 6.2 Header and navigation

The header must include:

- The name or compact wordmark linking to `#home`.
- Text-based links to `About`, `Research`, `Experience`, and `Awards`.
- A clear action link to the resume.
- A keyboard-visible focus state for every link.

The navigation should remain simple. On mobile, it may remain a wrapping row or become a disclosure menu if the link count creates layout pressure. If a disclosure menu is used, it must expose correct `aria-expanded` and `aria-controls` state, support Escape to close, and restore focus to the trigger.

### 6.3 Hero section

**Purpose:** Establish identity, specialty, trajectory, and immediate verification paths.

**Required content:**

- Name: `Olasubomi Awodipe`.
- Title: `Software Engineer & AI Researcher`.
- Positioning statement connecting production engineering, AI research, and founder trajectory.
- Text links for LinkedIn, resume, and any verified research profile.
- Optional short availability or collaboration signal, only if current and accurate.

**Behavior:**

- The name and title must be rendered as text, not embedded in an image.
- The first viewport should reveal the beginning of the next content area on common desktop and mobile sizes, signaling that the page continues.
- Avoid a carousel, auto-rotating copy, or large decorative hero illustration.

### 6.4 About section

**Purpose:** Give a concise, high-signal narrative that frames technical execution and ambition.

The copy should explain:

- The types of systems and problems Subomi builds.
- Experience operating at meaningful production scale.
- The connection between engineering execution and AI research.
- The long-term founder trajectory without overclaiming current company status.

Keep the narrative to one short, high-signal paragraph. Follow it with a mandatory list of four to six concise focus-area tags or pills that make the technical emphasis scannable without repeating the Hero. Fold a brief, accurate mention of the Presidential Scholarship into the narrative as supporting context, using the official name and period when verified.

### 6.5 Research / Preprints section

**Purpose:** Make research direction and active work legible to both people and answer engines.

Each research item should include:

- Working title.
- Status, such as `Working preprint`, `Under review`, or `Published`, only when accurate.
- One-sentence problem statement.
- One-sentence contribution or research hypothesis.
- Topic tags kept concise and meaningful.
- Direct links to arXiv, Overleaf, code, or supplementary material when available.
- Date updated or date posted, using a machine-readable `<time datetime="...">` value.

Each research item's title should link directly to its primary source (arXiv or the most authoritative available link). When additional destinations exist (code, Overleaf, supplementary material), include them as separate, clearly labeled text links (e.g., `Read the preprint`, `View code`) rather than overloading the title link with multiple destinations.
The section should prioritize clarity over volume. A small number of well-described items is stronger than a long list of vague topics. Top-tier venues such as ICML and NeurIPS may be named only as explicitly labeled intended targets or submissions. Never present a venue name as evidence of acceptance, publication, or affiliation unless that claim has been verified.

### 6.6 Experience section

**Purpose:** Demonstrate progressively credible engineering execution through selected enterprise milestones.

Initial entries:

- Microsoft
- Audible, Inc.
- Activision - HBCU in LA Games

Each entry should include:

- Organization and role.
- Employment or engagement dates.
- One-line scope statement. When an entry name is simplified to the organization alone, use this line for organization-specific detail such as a team, product, or program. For `Activision - HBCU in LA Games`, explicitly identify HBCU in LA Games as a named program run through or with Activision so the relationship is clear on first read.
- Two to four outcome-oriented bullets.
- Technologies only where they clarify the work.
- Links to public evidence only when authorized and stable.

Confidential work must be described without exposing proprietary details. Avoid invented metrics; use qualitative outcomes or approved measurements.

### 6.7 Awards section

**Purpose:** Provide concise external validation.

Initial recognition includes:

- Overall Showcase Winner, Microsoft CISO Org Intern Showcase 2026.
- People's Choice Award, Microsoft CISO Org Intern Showcase 2026.

Each award record should include the exact official award name, awarding organization, year, and a short explanation of what was recognized. The section must distinguish awards from nominations, participation, or internal acknowledgements. Academic honors based on GPA or internal university recognition (e.g., dean's list, presidential medallions) are excluded from this section regardless of merit; they belong on the resume, not the public Awards section, since the section's purpose is competitive, externally-evaluated professional recognition.

### 6.8 Footer

The footer should contain:

- Copyright or ownership line, if desired.
- Email or contact route, if publicly intended.
- Verified external profile links.
- A compact back-to-top link.
- A statement that the page is the canonical professional profile only if that is useful and accurate.

## 7. Content and Link Governance

All externally verifiable claims must be reviewed before deployment.

### Required content checks 

- Confirm the exact spelling and preferred display of the name.
- Confirm current title and professional positioning.
- Confirm organization names, roles, dates, and award names.
- Confirm each external URL resolves and represents the intended profile or artifact.
- Confirm resume contents match the public claims on the page.
- Remove stale links, expired availability statements, and outdated research statuses.
- Do not expose personal phone numbers, private addresses, internal project details, or confidential employer information.

### Link rules

- Use descriptive link text such as `Resume` or `Read the preprint`; do not use `click here`. Where a content item (research entry, experience record) has a natural primary destination, the item's title itself may also be hyperlinked to that destination, provided a visible focus state and link styling (underline or accent color, not color alone) make it clear the title is interactive, not just styled text. Do not implement whole-card click targets using a non-link element with a JavaScript click handler; if a card should be fully clickable, wrap it in a single semantic `<a>` element so keyboard access, "open in new tab," and screen-reader link semantics all work without JavaScript.
- For links opening a new tab, add an accessible indication such as `(opens in a new tab)` or an equivalent visually hidden label.
- Use `rel="noopener noreferrer"` for external links opened with `target="_blank"`.
- Prefer HTTPS URLs and canonical profile URLs.

## 8. Design System

### 8.1 Visual direction

The visual system is a Google-inspired enterprise light mode:

- Matte off-white page background.
- Deep obsidian or dark slate for header and high-contrast surfaces.
- Muted dark gray for body copy.
- Very light gray containers with refined borders for grouped content.
- One intentional accent color for links, focus, and selected interactive states.
- Generous whitespace and an explicit vertical rhythm.

The page should feel calm, exact, and credible. Avoid decorative gradients, excessive rounded cards, neon colors, dense visual effects, and animation that competes with the content.

### 8.2 Design tokens

Use CSS custom properties so the system remains centrally adjustable:

```css
:root {
  --color-background: #f8f9f7;
  --color-surface: #eef0ed;
  --color-surface-strong: #e3e7e3;
  --color-border: #d6dbd6;
  --color-text: #202522;
  --color-text-muted: #5f6862;
  --color-heading: #101614;
  --color-header: #17201d;
  --color-header-text: #f5f7f4;
  --color-accent: #1769aa;
  --color-accent-hover: #0d4f83;
  --color-focus: #b45309;
  --font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --measure: 72rem;
  --reading-measure: 68ch;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4.5rem;
  --space-9: 7rem;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --shadow-subtle: 0 1px 2px rgb(16 22 20 / 0.05);
}
```

The accent `#1769aa` has a measured contrast ratio of `5.47:1` against the page background `#f8f9f7`, passing WCAG AA for normal text. Keep this value unless implementation testing identifies a background-specific issue. Body text, links, and focus indicators must meet WCAG AA contrast requirements against their actual backgrounds.

### 8.3 Typography

Self-host Inter from the official release under the SIL Open Font License in `assets/fonts/`. Include the license notice with the font assets, use only the weights required by the design, and preload only the font needed for above-the-fold rendering. Use `system-ui` and platform sans-serif fallbacks so the page remains usable if the local font cannot load; do not make a third-party font request.

Recommended type roles:

- `h1`: large but restrained display size, approximately `clamp(2.5rem, 7vw, 5.5rem)` with a readable line height.
- `h2`: section title with strong hierarchy, approximately `clamp(1.75rem, 3vw, 3rem)`.
- `h3`: item title or organization, approximately `1.1rem` to `1.35rem`.
- Body: `1rem` to `1.125rem`, line height around `1.6`.
- Metadata: at least `0.875rem`, never used as the only carrier of important information.

Do not use negative letter spacing. Keep prose within approximately 68 characters per line where practical.

### 8.4 Layout and spacing

- Use a centered container with a maximum width around 72rem and fluid side padding.
- Use CSS Grid for major section layouts and Flexbox for local alignment.
- Keep a consistent vertical rhythm based on the spacing tokens.
- Use `min()`, `max()`, `clamp()`, and responsive grid tracks to avoid hard-coded viewport assumptions.
- Avoid horizontal scrolling at every supported width.
- Use `scroll-margin-top` on section targets so anchor navigation is not obscured by the header.

## 9. Responsive Behavior

### Mobile: approximately 320px to 767px

- Stack hero content and metadata vertically.
- Allow navigation links to wrap or use a disclosure pattern.
- Use full-width content with consistent side padding.
- Convert multi-column experience and research layouts to a single column.
- Preserve comfortable tap targets of at least 44 x 44 CSS pixels.
- Prevent long organization names and URLs from causing overflow.

### Tablet: approximately 768px to 1199px

- Use two-column layouts for the Research and Experience sections, keeping each item independently scannable.
- Keep hero text width controlled so the title remains readable.
- Preserve section spacing without allowing empty space to dominate.

### Desktop: 1200px and above

- Use a wide constrained content container.
- Support a split hero or section label/content composition when it improves hierarchy.
- Use grids for research, experience, or awards only when each item remains independently scannable.
- Do not stretch paragraphs across the full viewport.

### Widescreen safeguards

- Cap line length and container width.
- Keep the header and footer content aligned to the same main container.
- Avoid oversized type that creates a marketing landing page rather than a professional profile.

## 10. Accessibility and Inclusive Interaction

The implementation must meet the following baseline:

- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Provide a skip link as the first focusable element.
- Use one logical `h1` and a consistent heading hierarchy.
- Give each primary section an accessible name through a visible heading or `aria-labelledby`.
- Ensure every interactive element is keyboard reachable and has a visible `:focus-visible` state.
- Never use color alone to communicate link state, selection, status, or error.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful graphical boundaries where applicable.
- Use real buttons for actions and links for navigation.
- Provide descriptive alternative text for meaningful images and empty alt text for decorative images.
- Respect `prefers-reduced-motion: reduce` by disabling reveal and scrolling animations.
- Ensure focus is not trapped in the page or lost after opening and closing a mobile menu.
- Keep text resizable to 200 percent without loss of content or functionality.
- Support zoom and reflow without requiring two-dimensional scrolling for normal content.
- Avoid flashing, autoplaying media, and motion that cannot be paused.

## 11. SEO and Answer Engine Optimization

### 11.1 HTML metadata

The document head must include:

- A unique, descriptive `<title>` such as `Olasubomi Awodipe | Software Engineer & AI Researcher`.
- A concise meta description describing engineering, AI research, and founder trajectory without keyword stuffing.
- `<meta name="robots" content="index, follow">`.
- A canonical link to `https://olasubomiawodipe.com/`.
- Open Graph title, description, canonical URL, type, site name, and a suitable image if one exists.
- Twitter/X card metadata with a large summary image only when the asset is optimized and brand-appropriate.
- A theme color that matches the visual system.
- A viewport declaration with `width=device-width, initial-scale=1`.
- A favicon link to a production `assets/favicon.svg` or `assets/favicon.ico` asset.
- An Apple touch icon link to `assets/apple-touch-icon.png`, with explicit dimensions and optimized file size.

Example description:

```html
<meta
  name="description"
  content="Olasubomi Awodipe is a software engineer and AI researcher building reliable production systems and pursuing high-impact machine learning research."
/>
```

The description must be updated if the actual positioning or public body of work changes.

### 11.2 Semantic and answer-oriented content

Write section headings and opening sentences so they answer likely questions directly:

- Who is Olasubomi Awodipe?
- What does Subomi work on?
- What AI research is Subomi pursuing?
- Where has Subomi worked?
- What recognition has Subomi received?

Use normal prose, not keyword blocks. Important facts must appear in visible HTML, not only in metadata or JSON-LD. Dates, roles, affiliations, and artifact links should be explicit and close to the content they describe.

### 11.3 Person JSON-LD

Include one validated `Person` entity in a `<script type="application/ld+json">` block with the verified name, canonical URL, job title, professional profile links, and relevant areas of expertise. Add `worksFor` or `affiliation` only when the relationship is current, public, and verified. Remove optional properties rather than publishing placeholders, and validate the final JSON-LD before launch.

### 11.4 Crawlability files

`robots.txt` should permit normal crawling and point to the sitemap:

```text
User-agent: *
Allow: /

Sitemap: https://olasubomiawodipe.com/sitemap.xml
```

`sitemap.xml` should contain the canonical homepage URL and a correct `lastmod` value only when the document meaningfully changes.

## 12. Performance Engineering

### Performance targets

- Run Lighthouse on representative mobile and desktop configurations and record the results as an advisory launch metric. Do not use a fixed score as a merge-blocking threshold; investigate meaningful regressions before promotion.
- Largest Contentful Paint: at or below 2.5 seconds on mobile testing.
- Cumulative Layout Shift: below 0.1.
- Interaction to Next Paint: below 200 milliseconds where measured.
- Total JavaScript shipped: ideally under 10 KB compressed, excluding tooling.
- No render-blocking third-party scripts.
- Avoid layout shifts from fonts, images, menus, or late-initialized content.

### Implementation requirements

- Ship static HTML with meaningful above-the-fold content.
- Minify production CSS and JavaScript through the deployment pipeline if needed.
- Use responsive images with explicit `width` and `height` attributes if images are added.
- Prefer AVIF or WebP for raster images and keep social preview images separate from in-page assets.
- Lazy-load below-the-fold images with `loading="lazy"` and `decoding="async"`.
- Preload only truly critical fonts or images.
- Avoid icon libraries when a text link or simple CSS treatment is sufficient.
- Do not load analytics, embeds, or external widgets until a clear product need exists.
- Keep JavaScript event handling delegated and small.
- Test with cache disabled as well as warm cache; both paths must remain usable.

## 13. Security and Privacy

- Serve the site exclusively over HTTPS through Vercel.
- Configure the apex domain and `www` behavior deliberately; redirect one canonical host to the other.
- Use Vercel-managed SSL/TLS certificates and verify automatic renewal after DNS configuration.
- Do not include secrets, API keys, private tokens, or build credentials in the repository.
- Avoid collecting personal data in the initial release.
- If a contact form is added later, define spam protection, validation, retention, and privacy requirements before implementation.
- Add `X-Content-Type-Options: nosniff` and a suitable `Referrer-Policy` through Vercel configuration at launch.
- Defer Content Security Policy, `Permissions-Policy`, and dependency scanning until the site adds third-party assets, dependencies, analytics, or other behavior that justifies them.

## 14. Deployment and Domain Configuration

### 14.1 Vercel project

1. Create or connect the repository to a Vercel project.
2. Select the static project root.
3. Use no build command unless a future toolchain requires one.
4. Set the output directory to the repository root or the configured static output directory.
5. Enable preview deployments for pull requests.
6. Configure the production branch.

### 14.2 Apex domain

Configure `olasubomiawodipe.com` in Vercel and follow the generated DNS instructions. The final configuration must:

- Resolve the apex domain to Vercel using the provider-recommended apex record.
- Resolve `www` according to the selected canonical-host strategy.
- Redirect the non-canonical host with a permanent redirect.
- Show a valid Vercel-managed SSL/TLS certificate.
- Confirm HTTPS works without certificate warnings.
- Confirm all canonical, Open Graph, sitemap, and JSON-LD URLs use the same preferred host.

### 14.3 Release process

- Every change is reviewed in a Vercel preview deployment.
- One GitHub Actions job, `.github/workflows/lighthouse.yml`, runs on pull requests and pushes to the production branch. It serves the static output locally, validates HTML, links, JSON-LD, sitemap, and robots files, and runs one Lighthouse CI pass against that output. Validation failures block the pull request; Lighthouse results are reported for review and do not block merging because scores vary between runs.
- A human reviews the Vercel preview on representative mobile and desktop viewports before production promotion, including canonical-host behavior, HTTPS, and obvious layout or content regressions. No Vercel webhook or second preview-URL Lighthouse job is required at launch.
- The production URL is tested on mobile and desktop after deployment.
- A rollback uses the previous successful Vercel deployment rather than an ad hoc file change.

## 15. Testing and Quality Gates

### 15.1 Automated checks

- HTML validation with the Nu HTML Checker or equivalent.
- CSS parsing and linting if a linter is introduced.
- JavaScript syntax check and linting if JavaScript grows beyond a trivial script.
- One Lighthouse CI pass, run by GitHub Actions through `.github/workflows/lighthouse.yml`, for Performance, Accessibility, Best Practices, and SEO; treat scores as advisory rather than a hard gate.
- Link checking for internal and external URLs.
- JSON-LD syntax validation.
- Sitemap and robots file validation.

### 15.2 Manual accessibility checks

- Navigate the entire page using only Tab, Shift+Tab, Enter, Space, and Escape.
- Use VoiceOver on macOS to inspect landmarks, headings, links, and expanded menu state.
- Zoom to 200 percent and verify no essential content is lost.
- Test reduced motion and high-contrast operating-system settings where available.
- Confirm focus remains visible against every surface.

### 15.3 Responsive checks

At minimum, verify four representative viewports: 320 x 568 narrow mobile, 440 x 956 for the target iPhone 17 Pro Max class, 768 x 1024 tablet, and 1440 x 900 desktop. Perform a one-time 1920 x 1080 spot-check when the widescreen CSS is first implemented; it is not a recurring release checklist item unless the container, grid, or breakpoint rules change.

Check for text overflow, clipped focus rings, accidental horizontal scrolling, unstable cards, broken anchor offsets, and long-link wrapping.

### 15.4 Content acceptance checks

Before production:

- Every professional claim has an owner-approved source.
- Every visible external link has been opened and verified.
- The resume and profile links are current.
- Research statuses and dates are accurate.
- Awards use official names and years.
- No placeholder URLs, placeholder organization names, or draft language remain.

## 16. Observability and Maintenance

The initial static site does not require application-level monitoring. Review Vercel deployment status and build logs, check links and content roughly quarterly, and run Lighthouse after major style or content changes. Submit the sitemap to Search Console after launch and review indexing or structured-data warnings when they appear.

A lightweight changelog or release note in version control is sufficient for content history. Do not add a CMS until content frequency or collaboration needs justify it.

## 17. Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Overstated or stale professional claims | Credibility loss | Require source verification and quarterly review |
| External links become invalid | Broken trust and SEO signals | Run link checks before release and periodically |
| Large fonts or media hurt mobile performance | Lower Lighthouse scores | Use system fallbacks, compressed assets, and performance budgets |
| Mobile navigation becomes difficult to use | Accessibility and conversion issues | Prefer simple wrapping links or a tested disclosure menu |
| JSON-LD contains unverifiable affiliation data | Search quality and trust issues | Include only verified, public facts |
| Confidential employer details are exposed | Legal and professional risk | Use approved, outcome-oriented summaries without proprietary specifics |
| Design drifts into generic personal-site patterns | Weak positioning | Keep the page evidence-led, restrained, and content-specific |
| Widescreen layout becomes too sparse | Poor scanning | Constrain reading widths and use intentional grid relationships |

## 18. Implementation Sequence

1. Create semantic HTML landmarks and the complete content outline.
2. Add visible copy, section identifiers, heading hierarchy, and verified link placeholders.
3. Implement design tokens and mobile-first layout rules.
4. Add responsive desktop and widescreen compositions.
5. Add skip navigation, focus states, reduced-motion behavior, and keyboard-tested navigation.
6. Add metadata, canonical URL, Open Graph tags, Twitter Card tags, robots file, sitemap, and validated JSON-LD.
7. Add only the minimum JavaScript enhancement required by the final navigation design.
8. Optimize assets and run Lighthouse, HTML, link, and accessibility checks.
9. Deploy a Vercel preview and perform manual responsive and VoiceOver checks.
10. Configure the apex domain, validate managed TLS, and promote the verified deployment.

## 19. Definition of Done

The website is ready for public launch when:

- The homepage is deployed to `https://olasubomiawodipe.com/` with a valid managed certificate.
- The canonical host and redirect behavior are correct.
- All five required content sections are present and fact-checked.
- Semantic landmarks and heading hierarchy are valid.
- Keyboard navigation, skip navigation, focus states, and reduced motion work as specified.
- Lighthouse has been run on representative mobile and desktop configurations, and its advisory results have been reviewed in context before launch. "Notable regression" is a judgment call based on user-visible performance, accessibility, or layout impact, not a fixed score threshold.
- The page remains usable with JavaScript disabled.
- JSON-LD, Open Graph, Twitter metadata, `robots.txt`, and `sitemap.xml` are present and validated.
- No placeholder claims, URLs, organization names, or draft statuses remain.
- The page has no horizontal overflow at supported viewport sizes.
- A preview deployment has passed manual representative mobile, desktop, keyboard, and VoiceOver review.
- The repository README documents local preview, content updates, validation, and deployment steps.

## 20. Future Extensions

These are explicitly deferred until the static experience proves its value:

- A research detail page or publication archive, including client-side search/filter (by author, venue, topic, or year) once publication volume makes a flat list impractical to scan.
- A technical writing section with RSS and article-level metadata.
- A privacy-conscious contact form.
- A small content data layer or static site generator if repeated updates become burdensome.
- Case-study pages with deeper architecture diagrams and approved metrics.
- Optional analytics with a documented privacy and retention policy.

Any future extension must preserve the core contract: fast delivery, accessible interaction, verifiable claims, semantic content, and a clear engineering identity.
