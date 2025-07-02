# ReezBlank - Premium Fashion E-commerce Platform

A complete, production-ready e-commerce website built with Next.js, featuring modern design, AI integration planning, and comprehensive admin capabilities.

## 🚀 Features

### Customer Features

- **Modern Shopping Experience**: Clean, responsive design with smooth animations
- **Product Catalog**: Browse, search, and filter products with advanced options
- **Shopping Cart**: Add, remove, and manage items with persistent storage
- **Secure Checkout**: Integrated with Paystack for secure payment processing
- **User Authentication**: Email/password signup and login with Supabase
- **Order Tracking**: Complete order management and status tracking
- **AI LookOut (Coming Soon)**: Virtual try-on capabilities using AI

### Admin Features

- **Dashboard Analytics**: Sales metrics, product performance, and order analytics
- **Product Management**: Add, edit, delete products with image upload
- **Order Management**: View and manage customer orders in real-time
- **Inventory Tracking**: Monitor stock levels and sales performance
- **User Management**: Admin access control and user oversight

## 🛠 Tech Stack

- **Frontend**: Next.js 13+ with App Router, React 18
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth page transitions
- **State Management**: Zustand for cart and authentication state
- **Database**: Supabase (PostgreSQL) with real-time capabilities
- **Authentication**: Supabase Auth with email/password
- **Storage**: Supabase Storage for image uploads
- **Payments**: Paystack integration for secure transactions
- **UI Components**: Radix UI with shadcn/ui component library

## 🎨 Design System

### Color Palette

- **Primary Black**: `#000000` - Headers, text, primary buttons
- **Warm Cream**: `#F5F5DC` - Background, subtle sections
- **Soft Grey**: `#F8F9FA` - Secondary backgrounds
- **Gold Accent**: `#FFD700` - CTA buttons, highlights, premium touches

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with 150% line height
- **Spacing**: 8px system for consistent layouts

## 📁 Project Structure

```
reezblank/
├── app/                    # Next.js app directory
│   ├── page.js            # Landing page
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── success/           # Order confirmation
│   ├── lookout/           # AI try-on feature
│   ├── login/             # Authentication
│   ├── register/          # User registration
│   ├── admin/             # Admin dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/                # UI component library
│   ├── Header.js          # Navigation header
│   ├── Footer.js          # Site footer
│   ├── ProductCard.js     # Product display
│   └── AuthProvider.js    # Auth context
├── store/                 # Zustand state stores
│   ├── useAuthStore.js    # Authentication state
│   └── useCartStore.js    # Shopping cart state
├── lib/                   # Utility libraries
│   ├── supabase.js        # Database client
│   └── utils.js           # Helper functions
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Paystack account (for payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/reezblank.git
   cd reezblank
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure Environment Variables**

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_paystack_public_key
   PAYSTACK_SECRET_KEY=your_paystack_secret_key
   ADMIN_EMAIL=admin@reezblank.com
   ```

5. **Database Setup**

   - Create a new Supabase project
   - Run the following SQL to create tables:

   ```sql
   -- Products table
   CREATE TABLE products (
     id bigserial PRIMARY KEY,
     name text NOT NULL,
     description text,
     price decimal(10,2) NOT NULL,
     category text NOT NULL,
     image_url text,
     stock integer DEFAULT 0,
     active boolean DEFAULT true,
     created_at timestamp with time zone DEFAULT now()
   );

   -- Orders table
   CREATE TABLE orders (
     id bigserial PRIMARY KEY,
     user_id uuid REFERENCES auth.users(id),
     total decimal(10,2) NOT NULL,
     status text DEFAULT 'pending',
     shipping_address jsonb,
     items jsonb NOT NULL,
     payment_reference text,
     created_at timestamp with time zone DEFAULT now()
   );

   ```

CREATE POLICY "Allow public upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-images');

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies for products (public read, admin write)
CREATE POLICY "Products are viewable by everyone" ON products
FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON products
FOR ALL USING (auth.email() = 'admin@reezblank.com');

-- Policies for orders (users can view their own)
CREATE POLICY "Users can view their own orders" ON orders
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" ON orders
FOR SELECT USING (auth.email() = 'admin@reezblank.com');

````

6. **Storage Setup**
- Create a storage bucket named `product-images`
- Set it to public access for product images

7. **Run the development server**
```bash
npm run dev
````

8. **Open [http://localhost:3000](http://localhost:3000)**

## 🔧 Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Set up the database tables using the SQL provided above
4. Configure Row Level Security policies

### Paystack Integration

1. Create account at [paystack.com](https://paystack.com)
2. Get your public and secret keys from Settings > API Keys
3. Add keys to environment variables
4. The checkout process will use Paystack for secure payments

### Admin Access

- Set `ADMIN_EMAIL` in environment variables
- Users with this email will have admin dashboard access
- Admin can manage products, view orders, and access analytics

## 📊 Features in Detail

### State Management with Zustand

- **Cart Store**: Persisted shopping cart with localStorage
- **Auth Store**: User authentication state with Supabase integration
- **Real-time Updates**: Automatic state synchronization

### Authentication Flow

- Email/password registration and login
- Email verification (can be disabled)
- Password reset functionality
- Protected routes for admin access

### Payment Processing

- Secure checkout with Paystack
- Multiple payment methods supported
- Order confirmation and tracking
- Receipt generation

### Admin Dashboard

- Real-time sales analytics
- Product management with image upload
- Order tracking and status updates
- Inventory management
- Best/worst selling product insights

## 🔒 Security Features

- Row Level Security (RLS) with Supabase
- Protected admin routes
- Secure payment processing
- Input validation and sanitization
- HTTPS enforcement in production

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

### Environment Variables for Production

- Set all environment variables in your hosting platform
- Ensure Supabase URLs point to production database
- Use production Paystack keys

## 🔮 Future Features (AI LookOut)

The AI LookOut page is prepared for future AI integration:

- Virtual try-on using computer vision
- Body measurement estimation
- Personalized size recommendations
- Style matching and suggestions

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Errors**

   - Verify URL and keys in environment variables
   - Check if database tables exist
   - Ensure RLS policies are correctly set

2. **Payment Integration Issues**

   - Verify Paystack keys are correct
   - Check if Paystack is supported in your region
   - Test with Paystack test keys first

3. **Image Upload Problems**

   - Ensure Supabase storage bucket exists
   - Check bucket permissions (should be public)
   - Verify file size limits

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check for TypeScript/JavaScript syntax issues
   - Verify all imports are correct

### Performance Optimization

- Images are automatically optimized with Next.js Image component
- Lazy loading implemented for product grids
- Code splitting for better initial load times
- Supabase connection pooling for database efficiency

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:

- Email: support@reezblank.com
- Documentation: [Project Wiki](https://github.com/yourusername/reezblank/wiki)
- Issues: [GitHub Issues](https://github.com/yourusername/reezblank/issues)

---

Built with ❤️ by the ReezBlank team. Premium fashion, redefined.
