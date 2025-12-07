# StoreLux - Modern E-Commerce Platform

A fully-featured, modern e-commerce platform built with Next.js, TypeScript, Tailwind CSS, and Prisma. It features advanced functionality like real-time cart management, user authentication, product management, and more.

## 🚀 Features

### Core Features
- 🛍️ **Product Catalog** - Browse and search thousands of products
- 🛒 **Shopping Cart** - Add/remove items with real-time updates
- ❤️ **Wishlist** - Save favorite items for later
- 👤 **User Authentication** - Secure registration and login
- 📦 **Order Management** - Track orders and history
- ⭐ **Product Reviews** - Rate and review products
- 💳 **Payment Ready** - Stripe integration ready
- 🎨 **Modern UI** - Beautiful animations and gradients

### Technical Stack
- ⚡ Next.js 16 with TypeScript
- 🎨 Tailwind CSS for styling
- 📊 Prisma ORM with SQLite
- 📦 Zustand for state management
- 🎬 Framer Motion for animations
- 🔐 bcryptjs for password hashing
- 🔔 React Hot Toast for notifications

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/register/route.ts
│   │   └── products/route.ts
│   ├── cart/page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── wishlist/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── index.ts
├── lib/
│   ├── utils.ts
│   └── prisma.ts
└── store/index.ts
```

## 🎯 Quick Start

### Install & Setup
```bash
cd /home/cristian/Desktop/sito
npm install
export DATABASE_URL="file:./prisma/dev.db"
npx prisma migrate dev
npm run dev
```

### Visit
Open [http://localhost:3000](http://localhost:3000)

## 📝 Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm start        # Production server
```

## 🗄️ Database Models

- User - Authentication and profiles
- Product - Product catalog
- Review - Ratings and comments
- CartItem - Shopping cart
- Order - Order tracking
- Address - Shipping addresses
- Wishlist - Saved products

## 🎨 Key Components

### Header
- Responsive navigation
- Search bar
- Cart counter
- User menu

### ProductCard
- Product image with hover
- Price and discounts
- Star ratings
- Add to cart button

### Footer
- Newsletter signup
- Links and info
- Social media

## 🔐 State Management

**useCartStore** - Shopping cart state
**useAuthStore** - User authentication
**useUIStore** - UI state (mobile menu, search)

## 🚀 Deploy to Vercel

```bash
npm run build
git push
```

Add environment variables in Vercel:
- DATABASE_URL
- NEXTAUTH_SECRET
- STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY

## 📚 API Routes

- `POST /api/auth/register` - Register user
- `GET /api/products` - Get products
- `POST /api/products` - Create product

## 🎯 Ready Features

✅ Home page with hero section
✅ Shopping cart with persistence
✅ User registration and login UI
✅ Product card component
✅ Wishlist page
✅ Responsive header and footer
✅ Beautiful animations
✅ Database schema

## 📋 To Do

- [ ] Complete checkout flow
- [ ] Stripe payment integration
- [ ] Product detail pages
- [ ] Category pages
- [ ] Search functionality
- [ ] Admin dashboard
- [ ] Order tracking
- [ ] Email notifications
- [ ] Product filters
- [ ] User dashboard

## 📄 License

MIT License - Free to use and modify

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

For support and questions, check the documentation or create an issue.
