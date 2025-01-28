# TechHive

A modern tech product review and management platform built with React and Node.js. TechHive allows users to discover, review, and manage tech products with features like upvoting, tagging, and moderation.

## Features

### User Management

- Email/Password and Google Authentication
- Role-based access (Admin, Moderator, User)
- User profile management
- Subscription options

### Product Management

- Add new tech products with details and tags
- Product review queue for moderation
- Upvoting system
- Product reporting functionality
- Featured products showcase

### Review System

- Post product reviews with ratings
- View user reviews
- Moderation of reviews

### Dashboard Features

- Admin Dashboard
  - User management
  - Statistics overview
  - Coupon management
- Moderator Dashboard
  - Product review queue
  - Report management
- User Dashboard
  - My products
  - Profile management

### UI/UX

- Responsive design
- Dark/Light theme toggle
- Modern gradient UI
- Loading states and animations

## Tech Stack

### Frontend

- React with Vite
- React Router DOM
- TanStack Query for data fetching
- Axios for API calls
- Tailwind CSS with DaisyUI
- Firebase Authentication
- React Hook Form
- React Tag Input
- Framer Motion for animations
- React Toastify for notifications
- SweetAlert2 for modals

### Backend

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Stripe for payments

## Getting Started

1. Clone the repository

#### client_Side:
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-omarFaruk99.git
```
#### Server_side:
```bash
git clone https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-omarFaruk99.git
```

2. Install dependencies

```bash
cd tech-hive
npm install
```

3. Create `.env.local` file with:

```env
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
```

4. Run development server

```bash
npm run dev
```

## Directory Structure

```
src/
├── assets/
├── components/
├── context/
├── firebase/
├── hooks/
├── layouts/
├── pages/
│   ├── Dashboard/
│   └── Home/
├── route/
└── main.jsx
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Live_Link: https://techhive-94903.web.app/

## License

[MIT](https://choosealicense.com/licenses/mit/)
