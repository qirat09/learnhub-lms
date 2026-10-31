// Dummy course data. Thumbnails are from Unsplash (free to use under the Unsplash License).
// The sample video is the CC0 "flower" clip from MDN.
const VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`
const R = (title, type, url) => ({ title, type, url })

// rows: [title, minutes, description]
function buildLessons(prefix, rows, resources) {
  return rows.map(([title, duration, description], i) => ({
    id: `${prefix}-${i + 1}`,
    title,
    duration,
    description,
    videoUrl: VIDEO,
    resources,
  }))
}

function formatTotal(lessons) {
  const total = lessons.reduce((sum, l) => sum + l.duration, 0)
  const h = Math.floor(total / 60)
  const m = total % 60
  return h ? `${h}h ${m}m` : `${m} min`
}

function course(data) {
  return { ...data, duration: formatTotal(data.lessons) }
}

const courses = [
  course({
    id: 'react-basics',
    title: 'React Basics for Beginners',
    thumbnail: img('photo-1633356122544-f134324a6cee'),
    description:
      'Learn how to build interactive user interfaces with React. You will create components, pass props, manage state and handle events while building small real projects.',
    instructor: 'Priya Sharma',
    category: 'Web Development',
    level: 'Beginner',
    featured: true,
    outcomes: [
      'Write clean JSX and build reusable components',
      'Pass data between components with props',
      'Manage interface changes with useState',
      'Handle clicks, typing and form events',
      'Render lists and conditional content',
      'Run side effects safely with useEffect',
    ],
    lessons: buildLessons(
      'rb',
      [
        ['Welcome to React and JSX', 12, 'Understand what React solves and write your first JSX elements.'],
        ['Components and Props', 15, 'Split a page into reusable components and pass data down with props.'],
        ['State with useState', 18, 'Make interfaces interactive by storing and updating state.'],
        ['Handling Events and Forms', 16, 'Respond to clicks and typing with controlled form inputs.'],
        ['Rendering Lists and Conditionals', 14, 'Use map(), keys and conditional rendering to build dynamic UI.'],
        ['Side Effects with useEffect', 20, 'Run code after render, save data and clean up safely.'],
      ],
      [
        R('React Learn: Quick Start', 'Documentation', 'https://react.dev/learn'),
        R('Thinking in React', 'Article', 'https://react.dev/learn/thinking-in-react'),
        R('Vite Getting Started Guide', 'Documentation', 'https://vite.dev/guide/'),
      ],
    ),
  }),
  course({
    id: 'ui-design',
    title: 'UI Design Fundamentals',
    thumbnail: img('photo-1561070791-2526d30994b8'),
    description:
      'Make interfaces that look clear and professional. Study hierarchy, colour, type and spacing, then finish with a small design system you can reuse.',
    instructor: 'Daniel Brooks',
    category: 'Design',
    level: 'Beginner',
    featured: true,
    outcomes: [
      'Guide attention with visual hierarchy',
      'Pick accessible colour palettes',
      'Choose and pair typefaces that read well',
      'Lay out pages with grids and consistent spacing',
      'Design buttons, forms and cards',
      'Document your choices as a simple design system',
    ],
    lessons: buildLessons(
      'ud',
      [
        ['Principles of Visual Hierarchy', 14, 'See how size, weight and contrast tell people where to look first.'],
        ['Colour Theory for Interfaces', 16, 'Build a palette with enough contrast for real screens.'],
        ['Typography That Reads Well', 15, 'Set type scales, line lengths and line heights.'],
        ['Spacing, Grids and Layout', 18, 'Use a spacing scale and a grid to keep layouts tidy.'],
        ['Designing Buttons, Forms and Cards', 17, 'Create consistent components with clear states.'],
        ['Building a Simple Design System', 20, 'Collect colours, type and components into one reference.'],
      ],
      [
        R('Material Design Guidelines', 'Documentation', 'https://m3.material.io/'),
        R('WCAG Minimum Contrast Explained', 'Article', 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html'),
        R('Laws of UX', 'Article', 'https://lawsofux.com/'),
      ],
    ),
  }),
  course({
    id: 'js-essentials',
    title: 'JavaScript Essentials',
    thumbnail: img('photo-1555066931-4365d14bab8c'),
    description:
      'Start programming with the language of the web. Practise variables, functions, arrays, objects, the DOM and your first asynchronous code.',
    instructor: 'Priya Sharma',
    category: 'Programming',
    level: 'Beginner',
    featured: false,
    outcomes: [
      'Store and transform data with variables and types',
      'Write functions and understand scope',
      'Work with arrays and objects confidently',
      'Use map, filter and find to process lists',
      'React to user events on a web page',
    ],
    lessons: buildLessons(
      'js',
      [
        ['Variables and Data Types', 12, 'Learn let, const and the core value types.'],
        ['Functions and Scope', 16, 'Write reusable functions and learn where variables live.'],
        ['Arrays and Objects', 18, 'Group related data and read it back.'],
        ['Working with Array Methods', 17, 'Use map, filter and find instead of manual loops.'],
        ['The DOM and Events', 19, 'Select elements and react to clicks and input.'],
        ['Async JavaScript Basics', 21, 'Understand promises, async/await and timers.'],
      ],
      [
        R('MDN JavaScript Guide', 'Documentation', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'),
        R('The Modern JavaScript Tutorial', 'Article', 'https://javascript.info/'),
        R('MDN Array Reference', 'Documentation', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'),
      ],
    ),
  }),
  course({
    id: 'advanced-react',
    title: 'Advanced React Patterns',
    thumbnail: img('photo-1498050108023-c5249f4df085'),
    description:
      'Go beyond the basics. Build custom hooks, share state with context, manage complex state with reducers and keep large React apps fast and testable.',
    instructor: 'Priya Sharma',
    category: 'Web Development',
    level: 'Advanced',
    featured: true,
    outcomes: [
      'Extract logic into reusable custom hooks',
      'Share state with the Context API',
      'Model complex state with useReducer',
      'Avoid needless renders with memo and useMemo',
      'Design flexible compound components',
    ],
    lessons: buildLessons(
      'ar',
      [
        ['Custom Hooks in Practice', 22, 'Turn repeated stateful logic into hooks you can share.'],
        ['Context and Shared State', 24, 'Pass data deep into the tree without prop drilling.'],
        ['Reducers with useReducer', 20, 'Handle multi-step state changes with a single reducer.'],
        ['Performance with memo and useMemo', 23, 'Measure first, then remove unnecessary renders.'],
        ['Compound Components', 21, 'Build components that work together through shared state.'],
        ['Error Boundaries and Testing Strategy', 25, 'Catch render errors and decide what is worth testing.'],
      ],
      [
        R('Reusing Logic with Custom Hooks', 'Documentation', 'https://react.dev/learn/reusing-logic-with-custom-hooks'),
        R('Scaling Up with Reducer and Context', 'Documentation', 'https://react.dev/learn/scaling-up-with-reducer-and-context'),
        R('React memo Reference', 'Documentation', 'https://react.dev/reference/react/memo'),
      ],
    ),
  }),
  course({
    id: 'python-data',
    title: 'Python for Data Analysis',
    thumbnail: img('photo-1551288049-bebda4e38f71'),
    description:
      'Use Python and pandas to load, clean, summarise and chart real-world style datasets, then present your findings clearly.',
    instructor: 'Amara Okafor',
    category: 'Data Science',
    level: 'Intermediate',
    featured: true,
    outcomes: [
      'Set up Python and work in notebooks',
      'Load CSV data into pandas DataFrames',
      'Clean missing and inconsistent values',
      'Group and summarise data to answer questions',
      'Create clear charts with Matplotlib',
    ],
    lessons: buildLessons(
      'pd',
      [
        ['Setting Up Python and Notebooks', 13, 'Install the tools and run your first notebook.'],
        ['Loading Data with pandas', 18, 'Read files into DataFrames and inspect them.'],
        ['Cleaning Messy Data', 22, 'Fix missing values, duplicates and wrong types.'],
        ['Grouping and Summarising', 20, 'Use groupby and aggregates to find patterns.'],
        ['Visualising with Matplotlib', 21, 'Draw line, bar and scatter charts that are easy to read.'],
        ['Telling a Story with Your Data', 19, 'Turn charts and numbers into a short, clear report.'],
      ],
      [
        R('pandas User Guide', 'Documentation', 'https://pandas.pydata.org/docs/user_guide/index.html'),
        R('Matplotlib Tutorials', 'Documentation', 'https://matplotlib.org/stable/tutorials/index.html'),
        R('The Python Tutorial', 'Documentation', 'https://docs.python.org/3/tutorial/'),
      ],
    ),
  }),
  course({
    id: 'ux-research',
    title: 'UX Research Methods',
    thumbnail: img('photo-1522202176988-66273c2fd55f'),
    description:
      'Learn how to find out what users really need. Plan studies, run interviews and usability tests, and share what you learn with your team.',
    instructor: 'Daniel Brooks',
    category: 'Design',
    level: 'Intermediate',
    featured: false,
    outcomes: [
      'Write research goals and questions',
      'Recruit participants and plan a study',
      'Run interviews without leading the answers',
      'Test a prototype with real users',
      'Turn notes into patterns and recommendations',
    ],
    lessons: buildLessons(
      'ux',
      [
        ['Why UX Research Matters', 12, 'See how research saves time and prevents costly guesses.'],
        ['Planning a Research Study', 17, 'Set goals, pick methods and choose participants.'],
        ['Conducting User Interviews', 21, 'Ask open questions and listen for what is not said.'],
        ['Usability Testing Step by Step', 23, 'Write tasks, observe users and record issues.'],
        ['Analysing Findings and Finding Patterns', 19, 'Group notes into themes and rank the problems.'],
        ['Presenting Insights to a Team', 16, 'Share findings in a way that leads to decisions.'],
      ],
      [
        R('Nielsen Norman Group Articles', 'Article', 'https://www.nngroup.com/articles/'),
        R('Laws of UX', 'Article', 'https://lawsofux.com/'),
        R('Google Design', 'Article', 'https://design.google/'),
      ],
    ),
  }),
  course({
    id: 'digital-marketing',
    title: 'Digital Marketing Foundations',
    thumbnail: img('photo-1460925895917-afdab827c52f'),
    description:
      'Understand how brands reach people online. Cover audiences, content, search, email and analytics with practical examples for small teams.',
    instructor: 'Lucas Meyer',
    category: 'Business',
    level: 'Beginner',
    featured: false,
    outcomes: [
      'Describe the main digital marketing channels',
      'Define an audience and its needs',
      'Plan simple content and social posts',
      'Apply basic search engine optimisation',
      'Read analytics to judge what is working',
    ],
    lessons: buildLessons(
      'dm',
      [
        ['The Digital Marketing Landscape', 11, 'A tour of the channels and how they fit together.'],
        ['Knowing Your Audience', 14, 'Build simple audience profiles from real questions.'],
        ['Content and Social Media Basics', 17, 'Plan posts that are useful, not just frequent.'],
        ['SEO Fundamentals', 18, 'Help search engines understand and rank your pages.'],
        ['Email Marketing That People Read', 15, 'Write subject lines and emails people open.'],
        ['Measuring Results with Analytics', 16, 'Track the numbers that matter and ignore the rest.'],
      ],
      [
        R('Google SEO Starter Guide', 'Documentation', 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide'),
        R('Google Analytics Help Centre', 'Documentation', 'https://support.google.com/analytics'),
        R('Plain Language Guidelines', 'Article', 'https://www.plainlanguage.gov/guidelines/'),
      ],
    ),
  }),
  course({
    id: 'sql-advanced',
    title: 'Advanced SQL and Query Design',
    thumbnail: img('photo-1558494949-ef010cbdcc31'),
    description:
      'Write faster and clearer SQL. Master joins, window functions, CTEs, indexes and schema design, then tune slow queries with query plans.',
    instructor: 'Amara Okafor',
    category: 'Data Science',
    level: 'Advanced',
    featured: false,
    outcomes: [
      'Combine tables with advanced join patterns',
      'Rank and compare rows with window functions',
      'Structure queries with common table expressions',
      'Read query plans and design useful indexes',
      'Design normalised schemas',
    ],
    lessons: buildLessons(
      'sq',
      [
        ['Joins Beyond the Basics', 20, 'Use self joins, anti joins and lateral joins correctly.'],
        ['Window Functions', 25, 'Rank, lag and calculate running totals without subqueries.'],
        ['Common Table Expressions', 22, 'Break long queries into readable named steps.'],
        ['Indexes and Query Plans', 26, 'Understand how the database finds rows and why it is slow.'],
        ['Designing Normalised Schemas', 24, 'Model tables and relationships that stay consistent.'],
        ['Optimising Slow Queries', 28, 'Diagnose and fix real slow-query examples step by step.'],
      ],
      [
        R('PostgreSQL Documentation', 'Documentation', 'https://www.postgresql.org/docs/current/'),
        R('SQLite Window Functions', 'Documentation', 'https://www.sqlite.org/windowfunctions.html'),
        R('Use The Index, Luke', 'Article', 'https://use-the-index-luke.com/'),
      ],
    ),
  }),
]

export default courses
