# Django-Next.js Project

A modern web application built with Django backend and Next.js frontend.

## Project Structure

### /api
Django REST API backend that handles:
- Data models and database operations
- API endpoints and business logic
- Data validation and serialization
- Admin interface configuration

### /core
Django project core configuration:
- Project settings and environment configuration
- URL routing and middleware setup
- WSGI/ASGI server configuration
- Database and security settings

### /frontend
Next.js frontend application featuring:
- Modern React components and pages
- TypeScript for type safety
- Tailwind CSS for styling
- API integration with the Django backend

## Prerequisites

- Python 3.13
- Node.js 18.x or later
- pnpm or npm

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

