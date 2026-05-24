# Manual Store GitHub + Vercel

Website store manual tanpa build, support GitHub Pages dan Vercel.

## Edit data toko
- `assets/js/config.js` untuk nama toko, WhatsApp, teks hero.
- `assets/js/products.js` untuk daftar produk.

## Deploy GitHub Pages
1. Upload semua file ke repository.
2. Buka Settings > Pages.
3. Source: Deploy from branch.
4. Branch: main, folder: `/root`.
5. Save.

## Deploy Vercel
1. Import repository ke Vercel.
2. Framework Preset: Other.
3. Build Command: kosongkan.
4. Output Directory: kosongkan atau `.`.
5. Deploy.
