# CSS Render-Blocking Fix - December 18, 2025

## Problem

CSS file `901e5d6112420725.css` (7.8 KiB) was blocking page rendering for 150ms, negatively impacting LCP (Largest Contentful Paint).

## Solution Applied

### 1. Font Preloading Optimization ([src/app/layout.tsx](src/app/layout.tsx))

**BEFORE:**

```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false, // ❌ Fonts not preloaded
});
```

**AFTER:**

```tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true, // ✅ Enable preloading
  adjustFontFallback: true, // ✅ Reduce layout shift
});
```

**Impact:** Fonts are now preloaded, reducing render-blocking time.

---

### 2. Resource Hints ([src/app/layout.tsx](src/app/layout.tsx))

**Added:**

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossOrigin="anonymous"
  />
</head>
```

**Impact:** Early DNS lookup and connection establishment for Google Fonts, reducing latency.

---

### 3. CSS Minification ([postcss.config.mjs](postcss.config.mjs))

**BEFORE:**

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

**AFTER:**

```javascript
const config = {
  plugins: [
    "@tailwindcss/postcss",
    ...(process.env.NODE_ENV === "production"
      ? [
          [
            "cssnano",
            {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                  normalizeWhitespace: true,
                },
              ],
            },
          ],
        ]
      : []),
  ],
};
```

**Impact:** CSS is now minified in production, reducing file size and transfer time.

---

### 4. Next.js Configuration ([next.config.ts](next.config.ts))

**Added:**

```typescript
experimental: {
  optimizePackageImports: ["react", "react-dom"],
  optimizeCss: true,  // ✅ Enable CSS optimization
},

compiler: {
  removeConsole: process.env.NODE_ENV === "production",
},

productionBrowserSourceMaps: false,

async headers() {
  return [
    // Aggressive caching for static CSS files
    {
      source: "/_next/static/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    // DNS prefetch control
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
  ];
}
```

**Impact:**

- CSS is optimized at build time
- Static CSS files are cached for 1 year
- DNS prefetching is enabled
- Console logs removed in production (smaller JS)
- No source maps in production (smaller files)

---

## Dependencies Installed

```bash
npm install --save-dev cssnano
```

---

## How to Verify the Fix

1. **Rebuild the application:**

   ```bash
   npm run build
   ```

2. **Deploy to production**

3. **Test with PageSpeed Insights:**

   - Visit: https://pagespeed.web.dev/
   - Enter: https://school.vova4o.com
   - Check LCP score (should be improved)
   - Check "Eliminate render-blocking resources" section

4. **Test with Chrome DevTools:**
   - Open DevTools → Network tab
   - Refresh page
   - Look for CSS files - they should be:
     - Smaller in size (minified)
     - Cached on subsequent loads
     - Not blocking rendering

---

## Expected Results

✅ **CSS file size reduced** (minification)  
✅ **Fonts preloaded** (faster initial render)  
✅ **DNS preconnect** (reduced latency)  
✅ **Aggressive caching** (faster subsequent loads)  
✅ **CSS optimization enabled** (Next.js optimizations)

**LCP improvement:** 150ms+ reduction expected

---

## Files Modified

1. [src/app/layout.tsx](src/app/layout.tsx) - Font preloading & resource hints
2. [next.config.ts](next.config.ts) - Performance optimizations & caching
3. [postcss.config.mjs](postcss.config.mjs) - CSS minification
4. [package.json](package.json) - Added cssnano dependency

---

## Maintenance Notes

This fix is **permanent** and will apply to all future builds. The optimizations are:

- Built into the configuration (not manual)
- Applied automatically during build process
- Compatible with Docker deployments
- No runtime overhead

**No further action needed** unless you change the build configuration.
