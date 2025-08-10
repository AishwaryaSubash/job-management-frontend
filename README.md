# Job Management Admin Interface – Frontend

This is the **frontend** for the Job Management Admin Interface built with **Next.js**, **Mantine**, **TailwindCSS**, and **React Hook Form**.  
It allows admins to view, filter, and create job postings.

---

## 🚀 Features
- **Next.js App Router** with **TypeScript**.
- **Mantine UI** components & theming.
- **TailwindCSS** utility classes for custom styling.
- **React Hook Form** for form handling and validation.
- **Pages**:
  - **Job List Page**:
    - Displays jobs in a responsive grid using `SimpleGrid` and `JobCard`.
    - Filter by:
      - Job Title
      - Location
      - Job Type (Full-time, Part-time, Contract, Internship)
      - Salary Range
    - Fallback UI when no jobs are found.
  - **Job Creation Page**:
    - Form to create jobs with validation.
    - Fields:
      - Job Title
      - Company Name
      - Location
      - Job Type
      - Salary Range
      - Job Description
      - Requirements
      - Responsibilities
      - Application Deadline
- **Error Handling**:
  - Custom `not-found.tsx` page for invalid routes.
  - "Back to Home" button to redirect to `/`.
- **API Communication**:
  - Uses `NEXT_PUBLIC_BACKEND_URL` environment variable to connect to backend API.

---

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/AishwaryaSubash/job-management-frontend.git
cd job-management-frontend

# Install dependencies
npm install
