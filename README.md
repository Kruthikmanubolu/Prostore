# 🛒 Shopeezy – E-commerce Web Application

Shopeezy is a modern, full-stack e-commerce platform built with **Next.js** and **TypeScript**, offering a smooth shopping experience with secure authentication, product browsing, and cart management. Powered by **Prisma** and **PostgreSQL** (NeonDB), it ensures scalability and performance. The frontend is styled using **Tailwind CSS** and enhanced with elegant UI components from **Shadcn/UI**.

## 🚀 Features

- 🧾 **Product Listing**: Clean UI for browsing items with categories and filters.
- 🔐 **Authentication**: Secure login/signup via [NextAuth.js](https://next-auth.js.org/) (OAuth, Credentials).
- 🛒 **Cart System**: Add/remove items, quantity management, and cart persistence.
- 🧠 **Tech Stack**: Type-safe development with **TypeScript** and Prisma ORM.
- ☁️ **Database**: PostgreSQL hosted on [NeonDB](https://neon.tech/).
- 🌐 **Deployment**: Hosted on [Vercel](https://vercel.com/) for instant global availability.
- 💅 **UI/UX**: Styled with **Tailwind CSS** and **Shadcn UI** for a beautiful and responsive experience.

## 🧱 Tech Stack

| Tech            | Usage                             |
|-----------------|-----------------------------------|
| Next.js         | Framework for SSR & API routes    |
| TypeScript      | Static typing                     |
| Prisma          | ORM for PostgreSQL                |
| PostgreSQL      | Database (via NeonDB)             |
| NextAuth        | Authentication                    |
| Tailwind CSS    | Utility-first CSS styling         |
| Shadcn/UI       | Prebuilt UI components            |
| Vercel          | Deployment platform               |

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/shopeezy.git
cd shopeezy
```

### 2. Dependency Installation

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

#### Create a .env file in the root and fill in the following:

```bash
DATABASE_URL="your_neondb_url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_nextauth_secret"
```
Replace placeholders with your actual values.

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Start the Dev Server

```bash
npm run dev         # Start local dev server
npm run build       # Build for production
npm run lint        # Run ESLint
```

### 6. Deployment

Shopeezy is deployed on Vercel. Simply connect your GitHub repo and set your environment variables on the Vercel dashboard.





