# Nestroam Holidays — pre-launch SEO handover

## Current pre-launch behavior

- All 14 configured public routes receive a unique title, meta description, canonical URL, Open Graph metadata, Twitter/X card metadata, and JSON-LD in the generated route HTML.
- The production and staging frontend workflow builds with `VITE_SITE_INDEXABLE=false`. Route documents therefore include `noindex, follow` while allowing crawlers to read the directive.
- `robots.txt` allows crawling so search engines can see the `noindex` directive. A sitemap is deliberately not published while all pages are noindex.
- When launch content is approved, change the build job's `VITE_SITE_INDEXABLE` value to `${{ github.ref == 'refs/heads/main' && 'true' || 'false' }}`. This enables indexing only for the production `main` branch while keeping staging noindex. The build then emits `index, follow`, `sitemap.xml`, and a sitemap reference in `robots.txt` for production.
- Full HTML rendering of the React page body is not included. The generated route files contain route-specific SEO head data and an empty React mount point; React Router still renders the visible page in the browser.

## Before the public launch

1. Replace placeholder or borrowed written copy with original, client-approved descriptions, itineraries, inclusions, exclusions, policies, and package terms. Open-source image licensing does not grant rights to reuse another site's written copy.
2. Replace or remove all sample/fake testimonials. Do not add review, rating, or aggregate-rating structured data unless there are genuine, permissioned customer reviews.
3. Confirm every package's price, dates, availability, inclusions, exclusions, cancellation terms, and booking process. Product/Offer structured data is intentionally omitted for now.
4. Confirm that the company is ready to accept enquiries/bookings and that the published email and phone are monitored.
5. Upload the approved social-sharing image to `client/public/og-image.webp` (1200 × 630 px; compressed WebP recommended). The current metadata references this exact path. Until then, the social preview image URL will return 404. The build script intentionally blocks indexable builds until this asset exists.
6. Confirm the final official logo file and favicon appearance on desktop and mobile.
7. Verify the apex and `www` DNS records and ensure the SSL certificate covers both `nestroamholidays.com` and `www.nestroamholidays.com` before relying on the HTTPS/non-www redirects.
8. Deploy the generated `dist` contents to the frontend document root. The build copies the supplied `.htaccess` into `dist/.htaccess`; verify that the host permits the required `mod_rewrite` directives and that the deployment does not overwrite the PHP configuration unexpectedly.
9. Smoke-test all 14 routes, all legacy redirects, canonical URLs, and enquiry submission on staging before production deployment. A branded 404 page and true HTTP 404 response are not included yet because they would introduce a new visible UI; approve that UI before the launch indexing switch. The current SPA fallback serves `index.html` for unknown paths, which can be treated as a soft 404.
10. At launch, change the build job-level `VITE_SITE_INDEXABLE` value in `.github/workflows/frontend-deploy.yml` to `${{ github.ref == 'refs/heads/main' && 'true' || 'false' }}`. This makes only the `main` production build indexable; `design` staging remains noindex. Then run the workflow and inspect the live page source and sitemap.

## Deferred/manual work

- Google Search Console ownership verification, sitemap submission, URL inspection, and index coverage monitoring were intentionally excluded at the user's request.
- Google Analytics 4 property creation, measurement ID, consent/privacy review, and conversion event validation were also excluded at the user's request.
- Full SSR or full-body prerendering is deferred. It requires a separate rendering architecture decision and test pass; the current output only prerenders route-specific SEO head data.
- A branded not-found screen with a real HTTP 404 status is deferred for explicit UI approval. Do not enable indexing until this has been addressed.
- Google Business Profile and social profile links are deferred until the business creates/claims those profiles.
- Genuine local business address data is unavailable; LocalBusiness schema is intentionally omitted.
- Real customer reviews and post-launch blog/content expansion are deferred.

## Operational note

The frontend workflow sets the production build's `VITE_API_URL` to `https://api.nestroamholidays.com` and leaves the staging build without a production API URL. For local development, copy `client/.env.example` to `client/.env.local` and adjust values only when using a separate test API. This avoids sending staging test enquiries into the production database; staging enquiry submission remains unavailable until a separate staging API is configured. Both builds remain `noindex, follow` pre-launch. Keep secrets out of source control. The backend CORS allowlist already includes the canonical domain and its `www` variant; verify the live enquiry endpoint accepts the current frontend payload before launch.

The main Travel Enquiry form posts to `/api/enquiries`. The Navbar's separate Book Now modal currently logs its form values in the browser rather than posting them to the API. Connect/test that flow before relying on it for leads; it was not changed as part of this SEO-only pass.
