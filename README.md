# Admin Notice Management System

A full-stack React application for managing and publishing notices/announcements for an organization. This application provides a secure admin interface for creating, editing, and managing notices with rich text content and file attachments.

## Features

- **User Authentication**: Secure login and registration with JWT
- **Dashboard**: Overview of notice statistics and recent activities
- **Notice Management**:
  - Create notices with rich text editor (TinyMCE)
  - Categorize notices (General, Academic, Administrative, etc.)
  - Mark notices as important
  - Set expiry dates for time-sensitive announcements
  - Upload and manage file attachments
- **Responsive Design**: Built with Tailwind CSS for a fully responsive UI
- **Modern UI**: Clean and intuitive user interface

## Tech Stack

### Frontend
- React 19
- React Router v7
- TinyMCE for rich text editing
- Tailwind CSS for styling
- React Toastify for notifications
- Context API for state management

### Backend (API)
- RESTful API integration
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/admin-notice.git
cd admin-notice
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory and add:
```
VITE_API_URL=http://localhost:8000
```
Replace with your actual API URL.

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## Project Structure

```
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # React components
│   │   ├── ConfirmModal.jsx
│   │   ├── CreateNotice.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditNotice.jsx
│   │   ├── Login.jsx
│   │   ├── Navbar.jsx
│   │   ├── NoticeDetails.jsx
│   │   ├── NoticeForm.jsx
│   │   ├── NoticeList.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Signup.jsx
│   ├── contexts/        # Context providers
│   │   └── AuthContext.jsx
│   ├── services/        # API services
│   │   ├── authService.js
│   │   └── noticeService.js
│   ├── App.jsx          # Main application component
│   ├── ErrorBoundary.jsx # Error handling
│   ├── config.js        # Application configuration
│   └── main.jsx         # Application entry point
```

## API Integration

The application connects to a backend API with the following endpoints:

- Authentication
  - POST `/admin/signin` - Login
  - POST `/admin/signup` - Register new admin

- Notices
  - GET `/admin/get-notices` - Get all notices
  - POST `/admin/notices` - Create a new notice
  - PUT `/admin/update-notices/:id` - Update a notice
  - DELETE `/admin/delete-notices/:id` - Delete a notice

## Key Components

- **AuthContext**: Manages authentication state across the application
- **ProtectedRoute**: Ensures that certain routes are accessible only to authenticated users
- **NoticeForm**: Reusable form component for creating and editing notices
- **TinyMCE Editor**: Rich text editor for notice content


## Acknowledgments

- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [TinyMCE](https://www.tiny.cloud/) for the rich text editor
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Router](https://reactrouter.com/) for routing