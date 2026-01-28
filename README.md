# Mueblería Jenny Yax

> Muebles de madera hechos a mano en Sololá, Guatemala.  
> **"Dios es bueno Todo el Tiempo"**

![Mueblería Jenny Yax](public/images/hero/storefront.webp)

## 📋 About

Website for **Mueblería Jenny Yax**, a family-owned handcrafted furniture business run by Moses & Francisca Yax in San Andrés Semetabaj, Sololá, Guatemala.

**Key Features:**
- 🪑 Product catalog with categories (Roperos, Trinchantes, Libreros, etc.)
- 📱 WhatsApp-first ordering system (no online payments)
- 🌐 Bilingual (Spanish/English)
- 🔐 Admin panel for product & inquiry management
- 📸 Image uploads to Supabase Storage
- 📬 Contact form with inquiry tracking

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **Auth:** Supabase Auth
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aksaddd/muebleria-jenny-yax.git
   cd muebleria-jenny-yax
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=product-images
   NEXT_PUBLIC_ADMIN_EMAILS=moisesyax46@gmail.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

---

## 🗄 Supabase Setup

### 1. Create Database Tables

Go to **Supabase Dashboard → SQL Editor → New Query** and run the SQL from `supabase/schema.sql`:

This creates:
- `products` table with RLS policies
- `inquiries` table with RLS policies  
- Seed data (8 sample products)
- `is_admin()` function for access control

### 2. Create Storage Bucket

1. Go to **Storage** in Supabase sidebar
2. Click **New bucket**
3. Name: `product-images`
4. Check ✅ **Public bucket**
5. Click **Create bucket**

### 3. Run Storage Policies

Go to **SQL Editor → New Query** and run the SQL from `supabase/storage-policies.sql`.

### 4. Configure Authentication

1. Go to **Authentication → URL Configuration**
2. Add your domains to **Redirect URLs**:
   - `http://localhost:3000/**` (development)
   - `https://muebleria-jenny-yax.vercel.app/**` (production)
   - `https://your-custom-domain.com/**` (if applicable)

### 5. Update Admin Emails

To add more admin users, update the `is_admin()` function in Supabase:

```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' IN (
      'moisesyax46@gmail.com',
      'another-admin@email.com'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📦 Deployment (Vercel)

### Step-by-Step Checklist

#### 1. Connect Repository
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click **Add New → Project**
- [ ] Import your GitHub repository
- [ ] Select **Next.js** framework preset

#### 2. Configure Environment Variables

Add these in Vercel's **Settings → Environment Variables**:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://trecwshaaumtjeksngpx.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key | All |
| `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` | `product-images` | All |
| `NEXT_PUBLIC_ADMIN_EMAILS` | `moisesyax46@gmail.com` | All |

#### 3. Deploy
- [ ] Click **Deploy**
- [ ] Wait for build to complete
- [ ] Note your production URL (e.g., `muebleria-jenny-yax.vercel.app`)

#### 4. Update Supabase Auth URLs
- [ ] Go to Supabase → **Authentication → URL Configuration**
- [ ] Add production URL to **Redirect URLs**: `https://muebleria-jenny-yax.vercel.app/**`

#### 5. Test Production Flows
- [ ] ✅ Homepage loads with featured products
- [ ] ✅ Products page shows catalog
- [ ] ✅ Product detail pages work
- [ ] ✅ WhatsApp links open correctly
- [ ] ✅ Login/Register works
- [ ] ✅ Admin panel accessible (with admin email)
- [ ] ✅ Create/Edit product works
- [ ] ✅ Image upload works
- [ ] ✅ Contact form submits inquiry

---

## 🔧 Troubleshooting

### "Could not find the table 'public.products'"
- Run the SQL schema in Supabase SQL Editor (`supabase/schema.sql`)

### "new row violates row-level security policy"
- Ensure you're logged in with an admin email
- Check the `is_admin()` function includes your email

### Images not uploading
- Verify the `product-images` bucket exists
- Run storage policies SQL (`supabase/storage-policies.sql`)
- Check bucket is set to **Public**

### Auth redirect issues
- Add your domain to Supabase Auth **Redirect URLs**
- Include `/**` wildcard (e.g., `https://your-domain.com/**`)

### Admin panel not accessible
- Verify email is in `NEXT_PUBLIC_ADMIN_EMAILS` env var
- Verify email is in Supabase `is_admin()` function

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard
│   ├── api/og/          # OG image generator
│   ├── auth/            # Login/Register pages
│   ├── products/        # Product catalog & detail
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Homepage
│   ├── not-found.tsx    # 404 page
│   └── error.tsx        # Error boundary
├── components/
│   ├── admin/           # Admin components
│   ├── auth/            # Auth forms
│   ├── layout/          # Header, Footer
│   ├── products/        # Product cards, grids
│   ├── sections/        # Homepage sections
│   └── ui/              # Design system
├── lib/
│   ├── db/              # Database queries
│   ├── supabase/        # Supabase clients
│   └── utils.ts         # Utilities
└── data/
    └── products.ts      # Static fallback data
```

---

## 📞 Contact

**Mueblería Jenny Yax**
- 📍 San Andrés Semetabaj, Sololá, Guatemala
- 📱 WhatsApp: [+502 4033-7845](https://wa.me/50240337845)
- 📧 Email: moisesyax46@gmail.com
- 📘 Facebook: [Jennyyax2012](https://www.facebook.com/Jennyyax2012/)

---

## 📄 License

This project is proprietary software built for Mueblería Jenny Yax.

**Built with ❤️ by [Flow Productions](https://flowproductions.dev)**
