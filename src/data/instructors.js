const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=400&q=80`

const instructors = [
  {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Senior Frontend Engineer',
    photo: photo('photo-1494790108377-be9c29b29330'),
    bio: 'Ten years of building web apps. Priya teaches JavaScript and React with small, practical projects.',
  },
  {
    id: 'daniel-brooks',
    name: 'Daniel Brooks',
    role: 'Product Designer',
    photo: photo('photo-1507003211169-0a1dd7228f2d'),
    bio: 'Daniel has designed interfaces for startups and teaches visual design and user research.',
  },
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    role: 'Data Scientist',
    photo: photo('photo-1438761681033-6461ffad8d80'),
    bio: 'Amara turns messy data into clear answers and explains Python and SQL in plain language.',
  },
  {
    id: 'lucas-meyer',
    name: 'Lucas Meyer',
    role: 'Growth Marketing Lead',
    photo: photo('photo-1500648767791-00dcc994a43e'),
    bio: 'Lucas helps small teams find their audience with search, content and email.',
  },
]

export default instructors
