# Implementation Plan

This plan breaks the site implementation into small, independently reviewable pull requests. Each merged PR leaves the repository in a working state and builds only on earlier work.

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
- JavaScript behavior.
- Final accessibility testing.

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
- Add anchor offsets and overflow safeguards.

### Does not include

- New content.
- Mobile-menu JavaScript.
- Metadata or additional CI workflows.
- Changes to the existing CI workflow unless required to keep current checks passing.

### Design-doc sections

Sections 8.4, 9, 15.3, and 18 step 4.

### Verification

- Test 320x568, 440x956, 768x1024, 1440x900, and 1920x1080.
- Check grid behavior, wrapping, line length, anchor positioning, and overflow.
- Confirm the first viewport reveals the beginning of the next content area.
- Confirm CI passes.

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
- Make these checks mandatory now that the artifacts exist.

### Does not include

- Creating a second workflow file.
- Replacing or duplicating the existing Lighthouse workflow.
- New site functionality.
- A fixed Lighthouse score threshold.

### Design-doc sections

Sections 11, 14.3, 15.1, 15.4, and 18 step 8.

### Verification

- Confirm only `.github/workflows/lighthouse.yml` is changed for CI.
- Run the workflow successfully.
- Temporarily break one metadata artifact and confirm CI fails.
- Confirm Lighthouse remains advisory.
- Confirm all earlier validation steps still execute.

## PR 9: Add Progressive JavaScript Enhancement

### Includes

- Create `script.js` with strict mode.
- Add only the navigation enhancement required by the final layout.
- Implement correct `aria-expanded` and `aria-controls` state.
- Support Escape-to-close.
- Restore focus to the menu trigger.
- Add optional active-section or header-scroll state only if useful.

### Does not include

- Content rendering.
- Required navigation behavior.
- Analytics or third-party scripts.
- Animations that hide content.
- Additional workflow files.

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

- Add self-hosted Inter font files and the SIL license notice.
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
