# BC PropertyHub

A comprehensive property management platform designed for British Columbia's rental market. Built with React, TypeScript, Node.js, and PostgreSQL.

## Features

### ✅ **Completed**
- **Property Management**: Add, view, edit, and delete rental properties
- **Tenant Management**: Complete tenant lifecycle management with lease tracking
- **Authentication**: Secure user authentication with Replit Auth
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Payment Processing**: Stripe integration for rent collection
- **Responsive Design**: Mobile-first UI with modern components

### 🚧 **Roadmap** 
- Maintenance request management
- Financial transaction tracking
- Document generation (leases, receipts)
- Tenant screening and credit checks
- RTB compliance features
- Vendor management
- Insurance integration

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **Payments**: Stripe
- **Deployment**: Replit

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account for payment processing

### Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_32_character_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
REPLIT_DOMAINS=your_domain.com
REPL_ID=your_repl_id
```

### Installation

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express backend
│   ├── db.ts             # Database connection
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Data access layer
│   └── replitAuth.ts     # Authentication setup
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema definitions
└── package.json
```

## API Routes

- `GET /api/auth/user` - Get current user
- `GET /api/properties` - List user properties
- `POST /api/properties` - Create property
- `GET /api/tenants` - List tenants
- `POST /api/tenants` - Create tenant
- `GET /api/dashboard/stats` - Dashboard statistics

## Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts and authentication
- `properties` - Rental property information
- `tenants` - Tenant information and lease details
- `maintenance_requests` - Property maintenance tracking
- `transactions` - Financial transactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support with BC PropertyHub, please contact the development team or create an issue in the repository.