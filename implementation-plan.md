# Implementation Plan

This plan breaks the site implementation into small, independently reviewable pull requests. Each merged PR leaves the repository in a working state and builds only on earlier work.

## Status

- PR 1 through PR 3 are merged. `main` has the semantic shell, verified content, and the mobile-first visual foundation.
- The mobile foundation also introduced `script.js` (strict mode, progressive active-section highlighting). PR 9 is therefore rescoped to extend that file rather than create it.
- PR 4 (early CI validation) is open for review on the `olasubomiawodipe/early-ci-validation` branch.
- PR 5 (tablet, desktop, and widescreen layouts) is in progress on `olasubomiawodipe/responsive-layouts` and has grown well past its original scope. It now also carries a scroll-architecture change, a typography system, real Experience content, a new Education section, the removal of the Research and About sections, and a bug fix that also applies to `main`. See "PR 5: As built" and "Splitting the responsive-layouts branch".
- Two defects are known and open: trailing sections do not reliably receive the active-nav highlight, and the header navigation wraps to two rows below roughly 415px. Both are tracked under PR 9.

## PR 1: Establish the Semantic Site Shell

### Includes

- Create `index.html`.
- Add semantic `header`, `nav`, `main`, five required sections, and `footer`.
- Add one `h1`, visible section headings, stable IDs, and basic document order.
- Add minimal readable fallback styling.

### Does not include

- Final visual design.
- Final factual content or external URLs.
- JavaScript, metadata, assets, or deployment configuration.

### Design-doc sections

Sections 4.1, 4.3, 5, 6, and 18 step 1.

### Verification

- Open the page directly.
- Confirm all five sections are present and readable.
- Disable CSS and JavaScript; confirm the document still makes sense.
- Inspect landmarks and heading hierarchy.

## PR 2: Add Verified Content and Professional Links

### Includes

- Add fact-checked hero, About, Research, Experience, Awards, and Footer copy.
- Add verified roles, dates, award names, research statuses, and external URLs.
- Add research dates using machine-readable `<time datetime>` elements.
- Add descriptive link labels and appropriate external-link behavior.

### Does not include

- Final layout or visual styling.
- Metadata and JSON-LD.
- Unverified claims, placeholder organizations, or invented metrics.

### Design-doc sections

Sections 6, 7, 15.4, and 18 step 2.

### Verification

- Read every section for accuracy.
- Open every external link.
- Confirm research titles link to their primary sources.
- Confirm confidential work contains no proprietary details.
- Confirm award names and dates are exact.

## PR 3: Implement the Mobile-First Visual Foundation

### Includes

- Create `styles.css`.
- Add the Section 8 design tokens.
- Implement typography, colors, spacing, surfaces, borders, links, and buttons.
- Add mobile-first single-column layouts.
- Style the header, hero, sections, articles, tags, and footer.

### Does not include

- Tablet, desktop, or widescreen compositions.
- Final accessibility testing.

### As merged

This PR also added a minimal `script.js`: strict mode, a `js` body class, and progressive active-section highlighting. It is not required for navigation and degrades cleanly when JavaScript is disabled.

### Design-doc sections

Sections 8.1 through 8.4 and 18 step 3.

### Verification

- Inspect the page at approximately 320px and 440px widths.
- Check typography, spacing, contrast, link styling, and hierarchy.
- Confirm there is no horizontal overflow.
- Confirm the page has a restrained enterprise light-mode appearance.

## PR 4: Add Early CI Validation

### Includes

- Create `.github/workflows/lighthouse.yml`.
- Serve the static site locally in CI.
- Add HTML validation.
- Add basic link checking for links currently present.
- Add CSS and JavaScript syntax checks where applicable.
- Add one advisory Lighthouse run.
- Run on pull requests and pushes to the production branch.

### Does not include

- Metadata-specific validation for files that do not yet exist.
- A fixed Lighthouse score threshold.
- A second workflow file.
- Responsive layout changes.

### Design-doc sections

Sections 14.3, 15.1, 15.4, and 18 step 8.

### Verification

- Open the workflow and confirm its triggers and commands.
- Run the same validation locally.
- Confirm Lighthouse results are reported but do not block on arbitrary scores.
- Temporarily introduce invalid HTML and confirm the validation fails.
- Confirm the workflow validates the current site without requiring future metadata files.

## PR 5: Add Tablet, Desktop, and Widescreen Layouts

### Includes

- Add responsive breakpoints for tablet, desktop, and widescreen.
- Add Research and Experience grids where appropriate.
- Add the desktop hero composition.
- Align header, content, and footer containers.
- Add anchor offsets and overflow safeguards, including keeping the existing `script.js` header measurement in sync with the responsive header.

### Does not include

- New sections or new factual claims. Small footer link adjustments tied to the layout are allowed.
- Mobile-menu JavaScript.
- Metadata or additional CI workflows.
- Changes to the existing CI workflow unless required to keep current checks passing.

### As built

The branch delivered the planned responsive work and then absorbed several changes that belong to other PRs. Recorded here so the divergence is visible rather than discovered at review.

In the original scope:

- Breakpoints at 48rem, 75rem, and 120rem, with aligned header, content, and footer containers.
- Two-column grids for Experience, Education, and Awards, sharing one date rail so every dated entry aligns on a single vertical.
- Verified with no horizontal overflow at 320, 360, 375, 390, 410, 430, 768, 1024, 1280, and 1512px.

Beyond the original scope:

- **Contained scroll area.** `body` is a full-height flex column that does not scroll; a `.scroll-area` wrapper below the header is the page's only scroller, so the scrollbar begins at the header's lower edge instead of running the full window height. The header is in normal flow rather than `position: fixed`. This removed the `--header-height` measurement that this PR's scope had called for keeping in sync, and replaced it with `--scrollbar-width`, measured in `script.js`, so the header reserves the gutter the content below it loses to a classic scrollbar. Known cost: mobile browsers do not collapse their URL bar for non-root scrollers.
- **Scrollbar treatment.** `scrollbar-gutter: stable` and `scrollbar-width: thin` on the scroll area and on the throwaway probe `script.js` measures. The probe must carry the same width or the header reserves the wrong gutter.
- **Experience content.** Microsoft and Audible entries with roles, date ranges, and achievement bullets. This is PR 2 work landing late.
- **Education section.** Alabama A&M University, degree, GPA, and expected graduation. A new section, which this PR explicitly excluded.
- **Research and About sections removed.** Research shipped an editorial placeholder describing its own unfinished state, and About restated the hero almost verbatim. Section count is now three plus the hero, not the five PR 1 established.
- **Typography system.** Inter is now actually loaded; it was previously declared in the font stack but never fetched, so it resolved only on machines with Inter installed locally and every other visitor saw a system font. A full type scale was introduced with three text tones, and display sizes scale across the 48rem breakpoint while body sizes do not.
- **Active-section highlighting fix.** The click-to-scroll lock released only after the target section had scrolled entirely above the reading area, which froze the highlight for as long as that section was on screen. The same defect exists on `main`.

### Design-doc sections

Sections 8.4, 9, 15.3, and 18 step 4.

### Verification

- Test 320x568, 440x956, 768x1024, 1440x900, and 1920x1080.
- Check grid behavior, wrapping, line length, anchor positioning, and overflow.
- Confirm the first viewport reveals the beginning of the next content area.
- Confirm the page has exactly one scroll container and that the header never scrolls.
- Confirm the date rail aligns across Experience, Education, and Awards.
- Confirm Inter is fetched over the network rather than resolved from a local install.
- Confirm CI passes.

## Splitting the responsive-layouts branch

The branch is one uncommitted change set spanning four files. It is split into the commit series below before review, in dependency order. These are stacked rather than independent: the stylesheet hunks overlap heavily, so they cannot be cherry-picked into parallel branches without conflicts.

1. Active-section highlighting fix. `script.js` only. Fixes a defect present on `main` and stands alone.
2. Contained scroll area. The architecture change, kept as one commit so it can be reverted on its own if the mobile URL-bar cost proves unacceptable on real devices.
3. Scrollbar treatment. Gutter, thin scrollbars, and the `--scrollbar-width` measurement.
4. Experience content. Roles, date ranges, and bullets.
5. Education section.
6. Section removals, ordering, and navigation changes.
7. Typography. Font loading, type scale, and text tones.
8. Timeline rail layout and grid alignment.
9. Mobile refinements. Gutter width, responsive display sizes, and the body-size step-down.

## PR 6: Harden Keyboard and Motion Accessibility

### Includes

- Add a skip link.
- Add complete `:focus-visible` treatment.
- Ensure all links and controls are keyboard reachable.
- Add reduced-motion behavior.
- Refine section naming and heading hierarchy.
- Adjust tap targets and zoom/reflow behavior.

### Does not include

- A mobile disclosure menu.
- VoiceOver automation.
- New content or layout features.
- New workflow files.

### Design-doc sections

Section 10 and Sections 15.2 and 15.3.

### Verification

- Navigate using only Tab, Shift+Tab, Enter, and Space.
- Confirm the skip link moves focus to the main content.
- Zoom to 200 percent.
- Enable reduced motion.
- Confirm focus remains visible on every surface.
- Confirm CI passes.

## PR 7: Add SEO, Metadata, and Structured Data

### Includes

- Add title and meta description.
- Add robots directive, canonical URL, theme color, and viewport metadata.
- Add Open Graph and Twitter/X metadata.
- Add favicon and Apple touch icon references.
- Add validated `Person` JSON-LD.
- Add `robots.txt` and `sitemap.xml`.

### Does not include

- Analytics.
- Search Console submission.
- Domain configuration.
- New visible content.
- Changes to the CI workflow beyond keeping existing checks passing.

### Design-doc sections

Sections 5, 11, 15.1, and 18 step 6.

### Verification

- Inspect the document head.
- Validate the JSON-LD.
- Validate `robots.txt` and `sitemap.xml`.
- Confirm all canonical URLs use the preferred host.
- Confirm metadata contains only verified facts.
- Confirm CI still passes.

## PR 8: Extend the Existing CI Workflow for Metadata Validation

### Includes

- Modify the existing `.github/workflows/lighthouse.yml`.
- Preserve its HTML, link, syntax, static-server, and Lighthouse checks.
- Add validation for JSON-LD syntax and required properties.
- Add validation for `robots.txt` and `sitemap.xml`.
- Add validation for canonical, Open Graph, and final link requirements.
- Add a content-parity check asserting that the machine-readable copy still matches the visible copy: `<meta name="description">`, the Open Graph and Twitter/X description, and the JSON-LD `description` and `name` must agree with the rendered hero and About text. This is the one place the site genuinely duplicates content, and the drift is invisible without a check.
- Make these checks mandatory now that the artifacts exist.

### Does not include

- Creating a second workflow file.
- Replacing or duplicating the existing Lighthouse workflow.
- New site functionality.
- A fixed Lighthouse score threshold.

### Design-doc sections

Sections 7, 11, 14.3, 15.1, 15.4, and 18 step 8.

### Verification

- Confirm only `.github/workflows/lighthouse.yml` is changed for CI.
- Run the workflow successfully.
- Temporarily break one metadata artifact and confirm CI fails.
- Temporarily reword the hero or About copy without updating the metadata and confirm the content-parity check fails.
- Confirm Lighthouse remains advisory.
- Confirm all earlier validation steps still execute.

## PR 9: Extend Progressive JavaScript Enhancement

### Includes

- Keep `script.js` in strict mode with no external dependencies.
- Add a navigation disclosure menu only if the final layout needs one. If the header navigation still works without a toggle, limit this PR to hardening the existing active-section script.
- If a disclosure menu is added: implement correct `aria-expanded` and `aria-controls` state, support Escape-to-close, and restore focus to the menu trigger.
- Keep active-section and any header-scroll state only where it earns its place.

### Does not include

- Creating `script.js` from scratch; it already exists.
- Content rendering.
- Navigation that depends on JavaScript to function.
- Analytics or third-party scripts.
- Animations that hide content.
- Additional workflow files.

### As scoped after PR 5

- The disclosure menu is now required, not conditional. With the current type sizes the header navigation wraps to two rows below roughly 415px, taking the header from 73px to 111px on every common phone width. Repeated attempts to recover a single row by adjusting type and spacing traded the threshold back and forth without resolving it.
- This PR also owns the trailing-section highlighting defect. Sections near the end of the document cannot rise above the active line on tall viewports, and the bottom-of-page fallback is hardcoded to select the last section, so it overrides an otherwise correct answer. Education receives no highlight at all at 1512px. The fix is to rework how trailing sections are selected, not to widen the existing tolerance.

### Design-doc sections

Sections 4.2, 4.3, 6.2, 10, and 18 step 7.

### Verification

- Disable JavaScript and confirm content and anchor navigation still work.
- Test the menu with keyboard controls.
- Confirm Escape closes it.
- Confirm focus returns to the trigger.
- Check the browser console and script size.
- Confirm CI passes.

## PR 10: Optimize Fonts, Assets, Runtime Delivery, and Headers

### Includes

- Replace the Google Fonts stylesheet added in PR 5 with self-hosted Inter font files and the SIL license notice. PR 5 loaded Inter from `fonts.googleapis.com` to fix a font that was declared but never fetched; self-hosting removes the third-party request and the render-blocking stylesheet.
- Add favicon and Apple touch-icon assets.
- Add approved optimized images or the canonical resume if applicable.
- Add explicit dimensions, formats, lazy loading, and decoding attributes where needed.
- Add `vercel.json` security headers such as `X-Content-Type-Options` and `Referrer-Policy`.
- Review preload decisions and avoid unnecessary requests.

### Does not include

- New visual features.
- Analytics, embeds, or external widgets.
- Content changes.
- Domain cutover.
- New CI workflow files.

### Design-doc sections

Sections 5, 8.3, 12, 13, and 18 step 8.

### Verification

- Test with cache disabled and warm cache.
- Inspect the network waterfall.
- Confirm there are no font or image layout shifts.
- Verify response headers.
- Confirm the resume link has an accessible label.
- Confirm CI passes.

## PR 11: Document Local Development and Release Operations

### Includes

- Create `README.md`.
- Document local preview.
- Document content updates and verification.
- Document accessibility, responsive, link, metadata, and Lighthouse checks.
- Document Vercel previews, production deployment, and rollback.
- Align the release checklist with the Definition of Done.

### Does not include

- New site functionality.
- DNS changes.
- Search Console configuration.
- Credentials, secrets, or private information.

### Design-doc sections

Sections 5, 14, 15, 16, and 19.

### Verification

- Follow the README from a clean checkout.
- Confirm every documented command works.
- Compare the README against the actual workflow and repository structure.
- Confirm no secrets or private information are requested or committed.

## PR 12: Production Deployment and Canonical Domain Cutover

### Includes

- Connect the repository to Vercel.
- Configure the production branch and preview deployments.
- Configure the apex domain and `www` behavior.
- Establish the canonical host and permanent redirect.
- Verify managed TLS.
- Perform the final production smoke test.

### Does not include

- Last-minute content or design changes.
- New features.
- Unverified claims or URLs.
- A second implementation cycle after deployment.

### Design-doc sections

Sections 13, 14, 15, 16, and 19.

### Verification

- Review the Vercel preview at all required viewport sizes.
- Test keyboard navigation, VoiceOver, JavaScript-disabled behavior, and reduced motion.
- Confirm `https://olasubomiawodipe.com/` loads without certificate warnings.
- Confirm the non-canonical host redirects permanently.
- Check canonical, Open Graph, sitemap, and JSON-LD URLs.
- Run production validation and Lighthouse.
- Confirm the previous successful Vercel deployment can be restored.
