# 💰 ExpenseTrack

A modern personal finance and expense management application built with **Next.js**. ExpenseTrack helps users track their expenses, understand their spending habits, and manage their personal finances through a clean and responsive dashboard.

The application includes user authentication, expense management, spending statistics, interactive charts, light/dark themes, responsive design, and a modern finance-focused UI.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- User logout
- Authentication state management
- Protected user-specific expense data
- Cookie-based authentication
- Current user session endpoint

### 💸 Expense Management

- Add new expenses
- View all expenses
- Edit existing expenses
- Delete expenses
- Categorize expenses
- Add notes to expenses
- Track expense dates
- Display expenses in a clean card-based interface
- Animated expense cards
- Toast notifications for actions

### 📊 Financial Dashboard

- Total expense overview
- Total transaction count
- Current month spending
- Top spending category
- Recent expenses
- Category-based spending visualization
- Monthly spending visualization

### 📈 Charts & Analytics

- Spending by category pie/donut chart
- Monthly spending bar chart
- Responsive chart layouts
- Interactive chart tooltips
- Animated chart components

### 🎨 User Interface

- Modern personal finance design
- Responsive desktop and mobile layouts
- Light mode
- Dark mode
- Custom theme toggle
- Neumorphic-inspired visual elements
- Smooth animations
- Loading states
- Empty states
- Custom 404 page
- Custom loading page
- Responsive navigation bar

### 📱 Responsive Design

ExpenseTrack is designed to work across:

- Desktop computers
- Laptops
- Tablets
- Mobile devices

The layout adapts to different screen sizes while maintaining the same overall visual experience.

---

## 🛠️ Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- React
- Tailwind CSS
- Lucide React
- Framer Motion
- Recharts
- Sonner

### Backend

- Next.js App Router API Routes
- MongoDB
- Mongoose
- JWT-based authentication
- HTTP-only authentication cookies

### Development

- JavaScript
- ESLint
- npm
- Next.js App Router

---

## 📂 Project Structure

```text
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.js
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.js
│   │   │   │   ├── me/
│   │   │   │   │   └── route.js
│   │   │   │   └── register/
│   │   │   │       └── route.js
│   │   │   └── expenses/
│   │   │       ├── [id]/
│   │   │       │   └── route.js
│   │   │       ├── stats/
│   │   │       │   └── route.js
│   │   │       └── route.js
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   ├── expenses/
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.jsx
│   │   │   └── new/
│   │   │       └── page.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── register/
│   │   │   └── page.jsx
│   │   ├── globals.css
│   │   ├── icon.png
│   │   ├── layout.js
│   │   ├── loading.jsx
│   │   ├── not-found.jsx
│   │   └── page.js
│   ├── components/
│   │   ├── AnimatedCard.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── DashboardHeader.jsx
│   │   ├── DashboardPreview.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ExpenseCard.jsx
│   │   ├── ExpenseChart.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── Loading.jsx
│   │   ├── LogoutButton.jsx
│   │   ├── MonthlyChart.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileMenu.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── ThemeProvider.jsx
│   │   └── ThemeToggle.jsx
│   ├── lib/
│   │   ├── auth.js
│   │   ├── jwt.js
│   │   └── mongodb.js
│   ├── models/
│   │   ├── Expense.js
│   │   └── User.js
│   └── proxy.js
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md

```

---

## 🚀 Getting Started

Follow the steps below to run ExpenseTrack locally.

### 1. Clone the repository

```bash
git clone https://github.com/aswink-dev/expense-track.git
```

Navigate into the project:

```bash
cd expense-track
```

---

### 2. Install dependencies

Using npm:

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env.local` file in the root directory:

```text
expense-track/
├── .env.local
├── package.json
└── ...
```

Add your environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### Environment Variables

| Variable      | Description                                              |
| ------------- | -------------------------------------------------------- |
| `MONGODB_URI` | MongoDB database connection string                       |
| `JWT_SECRET`  | Secret key used to sign and verify authentication tokens |

> Never commit `.env.local` or any file containing secrets to GitHub.

Make sure your `.gitignore` includes:

```gitignore
.env
.env.local
.env.*.local
```

---

### 4. Start the development server

Run:

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Starts the application in production mode.

### Lint

```bash
npm run lint
```

Runs ESLint to check the project for code quality issues.

---

## 🔑 Authentication Flow

ExpenseTrack uses a cookie-based authentication system.

The general authentication flow is:

```text
User
 │
 ├── Register
 │      │
 │      ▼
 │   User created
 │
 ├── Login
 │      │
 │      ▼
 │   Authentication token
 │      │
 │      ▼
 │   HTTP-only cookie
 │
 └── Authenticated requests
        │
        ▼
      API
        │
        ▼
   User-specific data
```

The application provides the following authentication endpoints:

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

Authentication is used to ensure that users can access their own personal expense data.

---

## 💸 Expense API

The application provides API routes for managing expenses.

### Get Expenses

```text
GET /api/expenses
```

Returns expenses associated with the authenticated user.

---

### Create Expense

```text
POST /api/expenses
```

Creates a new expense.

---

### Update Expense

```text
PUT /api/expenses/[id]
```

Updates an existing expense.

---

### Delete Expense

```text
DELETE /api/expenses/[id]
```

Deletes an existing expense.

---

### Expense Statistics

```text
GET /api/expenses/stats
```

Returns aggregated spending information used by the dashboard charts and analytics.

---

## 📊 Dashboard

The dashboard provides a centralized overview of personal spending.

The summary section displays:

- Total Expense
- Number of Transactions
- Current Month Spending
- Top Spending Category

The dashboard also provides:

- Recent expenses
- Category spending chart
- Monthly spending chart
- Add expense functionality
- Edit expense functionality
- Delete expense functionality

---

## 🗂️ Expense Categories

Expenses can be organized into categories such as:

- Food 🍔
- Shopping 🛒
- Transport 🚗
- Entertainment 🎬
- Bills 🧾
- Health 💊
- Education 📚
- Other 📦

Each category has its own visual icon and styling throughout the application.

---

## 🎨 Theme System

ExpenseTrack supports:

- Light mode
- Dark mode

The application uses `next-themes` to manage theme switching.

The theme system is configured using the `class` attribute:

```jsx
<NextThemesProvider
  attribute="class"
  defaultTheme="light"
  enableSystem={false}
  disableTransitionOnChange
>
```

The theme can be changed using the theme toggle component.

The application uses Tailwind CSS dark mode classes such as:

```text
bg-white
dark:bg-gray-900
```

and:

```text
text-gray-900
dark:text-white
```

---

## 🎞️ Animations

ExpenseTrack uses **Framer Motion** for subtle UI animations.

Animations are used for:

- Dashboard cards
- Expense cards
- Empty states
- Charts
- Page elements
- Hover interactions

The goal is to provide a smooth interface without excessive animation.

---

## 🔔 Notifications

The application uses **Sonner** for toast notifications.

Notifications are used for actions such as:

- Expense deleted successfully
- Authentication errors
- Failed requests
- Other user feedback

The global toaster is configured in the root layout.

---

## 📱 Responsive Design

ExpenseTrack is designed with responsive layouts using Tailwind CSS.

The application supports:

```text
Mobile
   ↓
Tablet
   ↓
Laptop
   ↓
Desktop
```

Responsive behavior is applied to:

- Navigation
- Hero section
- Dashboard
- Summary cards
- Charts
- Expense cards
- Forms
- Buttons

---

## 🧭 Application Routes

### Public Routes

```text
/
```

Landing page.

```text
/login
```

User login page.

```text
/register
```

User registration page.

---

### Authenticated Routes

```text
/dashboard
```

Personal finance dashboard.

```text
/expenses/new
```

Create a new expense.

```text
/expenses/edit/[id]
```

Edit an existing expense.

---

### Special Routes

```text
/loading
```

Application loading UI handled by Next.js.

```text
/not-found
```

Custom 404 page for invalid routes.

---

## 🖼️ Branding

The application uses a custom ExpenseTrack logo.

The primary logo is located at:

```text
public/logo.png
```

The favicon/application icon is located at:

```text
src/app/icon.png
```

The logo can be displayed using Next.js's optimized image component:

```jsx
import Image from "next/image";

<Image src="/logo.png" alt="ExpenseTrack" width={220} height={60} />;
```

---

## 🛡️ Security Considerations

Before deploying the application to production, make sure to:

- Use a strong `JWT_SECRET`
- Keep `.env.local` private
- Never commit database credentials
- Never expose MongoDB credentials in client-side code
- Use secure authentication cookies
- Validate user input on the server
- Validate expense IDs
- Verify that users can only access their own expenses
- Return appropriate HTTP status codes from API routes
- Use HTTPS in production

---

## 🗄️ Database

ExpenseTrack uses MongoDB for persistent data storage.

The application includes models for:

```text
User
Expense
```

The MongoDB connection is managed through:

```text
src/lib/mongodb.js
```

Authentication-related functionality is handled through:

```text
src/lib/auth.js
src/lib/jwt.js
```

---

## 🧪 Testing Before Deployment

Before deploying to production, verify the following:

### Authentication

- [ ] User registration works
- [ ] Duplicate email registration is handled
- [ ] Login works
- [ ] Invalid credentials show an error
- [ ] Logout works
- [ ] Authentication persists after refresh
- [ ] Unauthenticated users cannot access private data

### Expenses

- [ ] New expense can be created
- [ ] Expense appears in the dashboard
- [ ] Expense can be edited
- [ ] Expense can be deleted
- [ ] Deleted expenses disappear immediately
- [ ] Expense categories work correctly
- [ ] Expense dates display correctly
- [ ] Expense notes work correctly

### Dashboard

- [ ] Total expense is calculated correctly
- [ ] Transaction count is correct
- [ ] Monthly spending is correct
- [ ] Top category is correct
- [ ] Category chart displays correctly
- [ ] Monthly chart displays correctly
- [ ] Dashboard updates after adding expenses

### UI

- [ ] Light mode works
- [ ] Dark mode works
- [ ] Theme persists after refresh
- [ ] Navbar works on mobile
- [ ] Navbar works on desktop
- [ ] Logo displays correctly
- [ ] Loading state works
- [ ] Empty state works
- [ ] 404 page works
- [ ] All buttons work
- [ ] All links work

### Responsive Testing

Test the application on:

- [ ] Mobile
- [ ] Tablet
- [ ] Laptop
- [ ] Desktop

Also test with different browsers:

- [ ] Google Chrome
- [ ] Microsoft Edge
- [ ] Brave
- [ ] Firefox
- [ ] Safari (if available)

---

## 🚀 Production Deployment

Before deploying:

### 1. Create a production MongoDB database

Use a production-ready MongoDB deployment and obtain your connection string.

### 2. Configure production environment variables

Set:

```env
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_secret
```

### 3. Build the application

Run:

```bash
npm run build
```

Make sure the build completes without errors.

### 4. Start the production server

```bash
npm run start
```

### 5. Deploy

ExpenseTrack can be deployed to a Next.js-compatible hosting platform.

When deploying, make sure your production environment variables are configured in the hosting provider's environment settings.

---

## 🌐 Deployment Checklist

Before going live:

- [ ] Production MongoDB configured
- [ ] Production environment variables added
- [ ] Strong JWT secret configured
- [ ] `.env.local` excluded from Git
- [ ] `npm run build` succeeds
- [ ] No console errors
- [ ] Authentication tested in production
- [ ] Database connection tested
- [ ] API routes tested
- [ ] Light/dark theme tested
- [ ] Mobile layout tested
- [ ] Desktop layout tested
- [ ] Custom logo added
- [ ] Favicon added
- [ ] 404 page tested
- [ ] Loading state tested
- [ ] Production URL tested
- [ ] HTTPS enabled

---

## 📸 Screenshots


### Home Page

<p align="center">
  <img
    src="./public/screenshots/home-light.png"
    alt="Home Light Mode"
    width="48%"
  />
  <img
    src="./public/screenshots/home-dark.png"
    alt="Home Dark Mode"
    width="48%"
  />
</p>

### Dashboard

<p align="center">
  <img
    src="./public/screenshots/dashboard-light.png"
    alt="Dashboard Light Mode"
    width="48%"
  />
  <img
    src="./public/screenshots/dashboard-dark.png"
    alt="Dashboard Dark Mode"
    width="48%"
  />
</p>

### Mobile Responsive Design

<p align="center">
  <img
    src="./public/screenshots/mobile-light.png"
    alt="Mobile Light Mode"
    width="30%"
  />
  <img
    src="./public/screenshots/mobile-dark.png"
    alt="Mobile Dark Mode"
    width="30%"
  />
</p>

```


## 🧑‍💻 Development

To contribute to the project:

1. Fork the repository
2. Clone your fork
3. Create a new branch

```bash
git checkout -b feature/your-feature
```

4. Install dependencies

```bash
npm install
```

5. Start the development server

```bash
npm run dev
```

6. Make your changes
7. Test your changes
8. Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

9. Push your branch

```bash
git push origin feature/your-feature
```

10. Open a Pull Request

---

## 📄 License

This project is currently available for personal and educational use.


---

## 👨‍💻 Author

Built with ❤️ using Next.js, React, MongoDB, and Tailwind CSS.

**ExpenseTrack** — Manage your money like a personal ledger.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

For bugs, suggestions, or feature requests, open an issue in the repository.

---

## 🔮 Future Improvements

Possible future improvements include:

- Budget limits
- Budget alerts
- Recurring expenses
- Income tracking
- Savings goals
- Advanced financial reports
- Export expenses to CSV
- Export expenses to PDF
- Date-range filtering
- Expense search
- Expense sorting
- Pagination
- More detailed analytics
- User profile management
- Password reset
- Email verification
- Social authentication
- Progressive Web App support
- Improved accessibility
- Automated testing
- Unit and integration tests

---

## 💰 ExpenseTrack

> Track your expenses. Understand your spending. Build better financial habits.
