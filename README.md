# LearnHub - Learning Management System (Frontend)

LearnHub is a responsive learning platform frontend built with React and Tailwind CSS. Learners can search and filter courses, read course details, enroll for free, watch lessons and track their progress. There is no backend: all data is dummy data in local files, and progress is saved on the device with localStorage.

## Screenshot

![LearnHub home page](./screenshots/home-desktop.png)

> Add your screenshots to the `screenshots/` folder (Home, Courses, Course Details, Dashboard and Lesson on desktop and mobile, and tablet for at least one page).

## Features

- Home page with hero search, featured courses, category cards and instructor cards
- Course listing with case-insensitive search (title, instructor, category, description), category and level filters, Reset Filters, result count and empty state
- Course details with outcomes, numbered curriculum, back link and "Course not found" page
- Enroll Now with duplicate prevention and an "Enrolled" state
- Student dashboard with progress bars, lesson counts, Continue Learning / Review Course and empty state
- Lesson page with HTML5 video, lesson sidebar (current and completed lessons), previous / next buttons, resources and Mark as Complete
- Enrollment and progress saved in localStorage (`learnhub_enrolled`, `learnhub_progress`) and kept after refresh
- Toast feedback (disappears after 3 seconds), loading spinner, empty and validation states
- Responsive layout (desktop, tablet, mobile), accessible labels, alt text and visible focus styles
- Extras: dashboard summary numbers, "undo" on a completed lesson

## Tech stack

React, Vite, Tailwind CSS, React Router (react-router-dom), Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Use `npm run build` to create a production build.

## Project structure

```
src/
  main.jsx, App.jsx (routes + shared state), index.css
  pages/        Home, Courses, CourseDetails, Dashboard, Lesson, NotFound
  components/   layout/ courses/ lessons/ common/
  data/         courses.js, instructors.js
  hooks/        useLocalStorage.js
  utils/        helpers.js
```

## Hooks and components used

- `useState`, `useEffect`, `useLocalStorage` (custom), `useParams`, `useSearchParams`, `useNavigate`
- Reusable components: Navbar, Footer, SearchBar, FilterPanel, CourseCard, CategoryCard, InstructorCard, LessonSidebar, VideoPlayer, ProgressBar, EmptyState, Spinner, Toast, Badge, Button

## Live demo and credits

- Live demo: https://learnhub-lms-two.vercel.app
- Course and instructor images: [Unsplash](https://unsplash.com) (Unsplash License)
- Sample video: CC0 "flower" clip from [MDN](https://developer.mozilla.org/)

## Deploy on Vercel

Import the GitHub repository in Vercel, keep the Vite preset and deploy. `vercel.json` rewrites all routes to `index.html` so pages such as `/courses` still work after a refresh.
