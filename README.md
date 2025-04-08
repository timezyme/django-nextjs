# Django Next.js Social Media Platform

A social media platform built with Django REST API backend and Next.js frontend.

## Features

- User authentication system with login/registration
- Create, edit, and delete posts
- Follow/unfollow other users
- Like/unlike posts
- View all posts or just posts from users you follow
- User profiles with follower stats

## Technology Stack

### Backend
- Django 5.0
- Django REST Framework
- SQLite3 database

### Frontend
- Next.js 15 with TypeScript
- Tailwind CSS 4
- ShadCN UI components
- Lucide React icons

## Setup Instructions

### Backend Setup

1. Clone the repository
2. Create a virtual environment and activate it
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd django-nextjs
```

2. Set up the Django backend:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run the development server
python manage.py runserver
```

3. Set up the Next.js frontend:
```bash
cd frontend

# Install dependencies
pnpm install  # or npm install

# Run the development server
pnpm dev  # or npm run dev
```

## Development

- Backend API runs on `http://localhost:8000`
- Frontend development server runs on `http://localhost:3000`
- API documentation available at `http://localhost:8000/api/docs/`

## Database Migrations

When making changes to Django models (e.g., adding/modifying fields or creating new models), follow these steps to update the database:

1. Make your changes to the models in `api/models.py`

2. Create migrations for your changes:
```bash
python manage.py makemigrations api
```

3. Apply the migrations to update the database:
```bash
python manage.py migrate
```

Note: Always commit migration files to version control as they are essential for other developers and production deployments.

## Testing

- Backend tests: `python manage.py test`
- Frontend tests: `cd frontend && pnpm test`

