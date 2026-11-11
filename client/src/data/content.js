/* --------------------------------------------------------------------------
   SmartLearn sample content
   All data is illustrative and shaped to feel like a live product.
   -------------------------------------------------------------------------- */

export const student = {
  name: 'Aarav Mehta',
  firstName: 'Aarav',
  initials: 'AM',
  email: 'aarav.mehta@example.com',
  grade: 'Class 10',
  board: 'CBSE',
  city: 'Bengaluru, India',
  joined: 'June 2025',
  level: 7,
  levelName: 'Diligent Learner',
  xp: 2840,
  nextLevelXp: 3200,
  streak: 12,
  hours: 34.5,
  topicsCompleted: 8,
  avgQuiz: 78,
  savedCount: 1,
}

export const subjects = [
  { id: 'math', name: 'Mathematics', icon: 'calculator', tint: '#E5F0EB' },
  { id: 'physics', name: 'Physics', icon: 'atom', tint: '#EEF4F9' },
  { id: 'chemistry', name: 'Chemistry', icon: 'flask', tint: '#FDF4E3' },
  { id: 'biology', name: 'Biology', icon: 'dna', tint: '#EAF3EE' },
  { id: 'english', name: 'English', icon: 'book', tint: '#F3EEF7' },
  { id: 'cs', name: 'Computer Science', icon: 'terminal', tint: '#EDF2F5' },
]

export const subjectsById = Object.fromEntries(
  subjects.map((subject) => [subject.id, subject]),
)

export const goalOptions = [
  { id: 'concepts', label: 'Concept clarity', short: 'Concepts' },
  { id: 'exam', label: 'Exam preparation', short: 'Exam prep' },
  { id: 'practice', label: 'Practice & drills', short: 'Practice' },
]

export const difficultyOptions = ['Foundation', 'Intermediate', 'Advanced']

export const languageOptions = ['English', 'Hindi', 'Tamil', 'Malayalam']

/* --------------------------------------------------------------------------
   Teachers
   -------------------------------------------------------------------------- */

export const teachers = [
  {
    id: 'ananya-iyer',
    name: 'Dr. Ananya Iyer',
    initials: 'AI',
    tint: ['#DDEBE4', '#2C7264'],
    qualification: 'M.Sc. Mathematics, B.Ed.',
    headline: 'Makes abstract algebra feel visual and intuitive.',
    subjects: ['Mathematics'],
    topics: ['Quadratic Equations', 'Trigonometry', 'Coordinate Geometry', 'Probability'],
    experience: 12,
    rating: 4.9,
    reviews: 214,
    students: 540,
    lessons: 1280,
    compatibility: 96,
    style: 'Visual & conceptual',
    languages: ['English', 'Hindi', 'Tamil'],
    levels: ['Class 9–10', 'Class 11–12'],
    response: 'Replies in ~2 hours',
    verified: true,
    bio: 'Ananya has spent twelve years helping students stop memorising formulae and start seeing the structure underneath them. Her sessions open with a graph, a story or a real-world hook, then build towards rigorous problem solving. She teaches CBSE and ICSE mathematics for Classes 9–12 and mentors students preparing for competitive exams.',
    approach:
      'Every concept begins with a visual model before notation. Students leave each session with one “aha” idea and three graded problems to consolidate it.',
    highlights: [
      'CBSE & ICSE board specialist',
      'Graph-first explanations for algebra',
      'Weekly parent progress notes',
    ],
    availability: [
      { day: 'Mon', slots: ['4:00 PM'] },
      { day: 'Wed', slots: ['5:30 PM', '7:00 PM'] },
      { day: 'Sat', slots: ['10:00 AM'] },
    ],
    testimonials: [
      {
        name: 'Ishita R.',
        grade: 'Class 10',
        rating: 5,
        when: '2 weeks ago',
        text: 'I went from dreading quadratic word problems to solving them first in the exam. The graph-first method finally made the formula make sense.',
      },
      {
        name: 'Kabir S.',
        grade: 'Class 11',
        rating: 5,
        when: '1 month ago',
        text: 'Ananya ma’am is patient and extremely structured. She spotted the exact gap in my factorisation and fixed it in two sessions.',
      },
      {
        name: 'Ritu M.',
        grade: 'Parent · Class 10',
        rating: 4.8,
        when: '1 month ago',
        text: 'The weekly notes are thoughtful and specific. We always know what our daughter is working on and why.',
      },
    ],
  },
  {
    id: 'rohit-sharma',
    name: 'Rohit Sharma',
    initials: 'RS',
    tint: ['#E3ECF5', '#2B5477'],
    qualification: 'B.Tech (IIT Delhi), M.Sc. Physics',
    headline: 'Step-by-step problem solving for ambitious students.',
    subjects: ['Mathematics', 'Physics'],
    topics: ['Laws of Motion', 'Electricity', 'Trigonometry', 'Quadratic Equations'],
    experience: 8,
    rating: 4.8,
    reviews: 168,
    students: 410,
    lessons: 960,
    compatibility: 92,
    style: 'Step-by-step coaching',
    languages: ['English', 'Hindi'],
    levels: ['Class 9–12'],
    response: 'Replies in ~4 hours',
    verified: true,
    bio: 'Rohit blends an engineering background with eight years of classroom teaching. He is known for turning messy multi-step problems into a repeatable routine: read, model, solve, verify. His students often describe physics as “suddenly logical” after a few sessions.',
    approach:
      'We solve one problem together, one problem with hints, and one alone. The goal is independence, not answers.',
    highlights: [
      'JEE & NEET foundation support',
      'Error-log method for silly mistakes',
      'Live doubt solving on weekends',
    ],
    availability: [
      { day: 'Tue', slots: ['5:00 PM'] },
      { day: 'Thu', slots: ['6:30 PM'] },
      { day: 'Sun', slots: ['11:00 AM'] },
    ],
    testimonials: [
      {
        name: 'Aditya P.',
        grade: 'Class 12',
        rating: 5,
        when: '3 weeks ago',
        text: 'The error log changed everything. I stopped losing marks on the same three types of questions.',
      },
      {
        name: 'Sneha K.',
        grade: 'Class 9',
        rating: 4.7,
        when: '1 month ago',
        text: 'Very calm and clear. He never moves on until you can explain the step back to him.',
      },
    ],
  },
  {
    id: 'meera-nair',
    name: 'Meera Nair',
    initials: 'MN',
    tint: ['#F1EADB', '#8A6A2F'],
    qualification: 'M.Sc. Chemistry, B.Ed.',
    headline: 'Real-world analogies that make chemistry stick.',
    subjects: ['Chemistry', 'Biology'],
    topics: ['Chemical Bonding', 'Acids, Bases & Salts', 'Cell Structure', 'Organic Chemistry'],
    experience: 10,
    rating: 4.9,
    reviews: 241,
    students: 620,
    lessons: 1140,
    compatibility: 94,
    style: 'Analogy-led & inquiry based',
    languages: ['English', 'Malayalam', 'Hindi'],
    levels: ['Class 9–12'],
    response: 'Replies in ~3 hours',
    verified: true,
    bio: 'Meera believes chemistry is a language of stories about why things behave the way they do. With a decade of teaching across CBSE and state boards, she uses kitchen experiments, molecular animations and diagram-first notes to make the invisible visible.',
    approach:
      'Start with a phenomenon, ask students to predict, then reveal the model. Predictions — even wrong ones — build durable understanding.',
    highlights: [
      'Diagram-first notes for bonding',
      'Lab demonstration walkthroughs',
      'NEET foundation counselling',
    ],
    availability: [
      { day: 'Mon', slots: ['6:00 PM'] },
      { day: 'Fri', slots: ['4:30 PM'] },
      { day: 'Sat', slots: ['9:30 AM'] },
    ],
    testimonials: [
      {
        name: 'Nikhil V.',
        grade: 'Class 10',
        rating: 5,
        when: '1 week ago',
        text: 'I finally understand why ionic and covalent bonds behave so differently. The analogy with magnets was brilliant.',
      },
      {
        name: 'Fatima A.',
        grade: 'Class 11',
        rating: 4.9,
        when: '3 weeks ago',
        text: 'Her notes are the only thing I revise from now. Clear, labelled, and never overwhelming.',
      },
    ],
  },
  {
    id: 'arjun-verma',
    name: 'Arjun Verma',
    initials: 'AV',
    tint: ['#E6EAF4', '#39497A'],
    qualification: 'M.Sc. Physics, NET Qualified',
    headline: 'Exam-first physics with zero wasted effort.',
    subjects: ['Physics'],
    topics: ['Laws of Motion', 'Electricity', 'Chemical Bonding'],
    experience: 14,
    rating: 4.7,
    reviews: 302,
    students: 780,
    lessons: 1620,
    compatibility: 89,
    style: 'Exam-first & rigorous',
    languages: ['English', 'Hindi'],
    levels: ['Class 10–12'],
    response: 'Replies in ~6 hours',
    verified: true,
    bio: 'Arjun has trained board and competitive exam aspirants for fourteen years. Lessons are mapped directly to marking schemes: what examiners look for, where marks are usually lost, and how to present a derivation. Dense, practical, and very effective for students who already know the basics.',
    approach:
      'Work backwards from the exam. Each session ends with a timed question set and a model answer breakdown.',
    highlights: [
      'Marking-scheme oriented practice',
      'Timed mock question sets',
      'Formula-ladder revision sheets',
    ],
    availability: [
      { day: 'Tue', slots: ['7:00 PM'] },
      { day: 'Thu', slots: ['7:30 PM'] },
      { day: 'Sat', slots: ['6:00 PM'] },
    ],
    testimonials: [
      {
        name: 'Devansh T.',
        grade: 'Class 12',
        rating: 4.8,
        when: '2 weeks ago',
        text: 'Extremely exam focused. I improved my paper presentation and gained 11 marks in physics.',
      },
      {
        name: 'Anita G.',
        grade: 'Parent · Class 11',
        rating: 4.5,
        when: '2 months ago',
        text: 'Very rigorous. Not the right fit if your child needs gentle pacing, but excellent for serious aspirants.',
      },
    ],
  },
  {
    id: 'sara-khan',
    name: 'Sara Khan',
    initials: 'SK',
    tint: ['#F3E9EF', '#8B3F63'],
    qualification: 'M.A. English Literature, CELTA',
    headline: 'Confident writing and speaking, one small win at a time.',
    subjects: ['English'],
    topics: ['Grammar & Tenses', 'Reading Comprehension', 'Creative Writing'],
    experience: 9,
    rating: 4.8,
    reviews: 184,
    students: 460,
    lessons: 870,
    compatibility: 90,
    style: 'Conversational & feedback-driven',
    languages: ['English', 'Hindi'],
    levels: ['Class 6–10'],
    response: 'Replies in ~2 hours',
    verified: true,
    bio: 'Sara teaches English as a craft rather than a set of rules. Students read closely, write often, and receive precise feedback on one skill at a time. She specialises in grammar remediation for Classes 6–10 and in building the confidence to speak in class.',
    approach:
      'One focus per session. Every piece of writing gets a two-point feedback note: one strength and one next step.',
    highlights: [
      'Error-pattern tracking across essays',
      'Spoken English confidence drills',
      'Board answer presentation',
    ],
    availability: [
      { day: 'Mon', slots: ['5:00 PM'] },
      { day: 'Wed', slots: ['5:00 PM'] },
      { day: 'Sat', slots: ['12:00 PM'] },
    ],
    testimonials: [
      {
        name: 'Aisha N.',
        grade: 'Class 9',
        rating: 5,
        when: '1 week ago',
        text: 'I stopped being scared of writing answers. The feedback is always specific, never just “improve”.',
      },
      {
        name: 'Rehan M.',
        grade: 'Class 8',
        rating: 4.7,
        when: '1 month ago',
        text: 'Tenses finally make sense. The practice sheets are short, so I actually finish them.',
      },
    ],
  },
  {
    id: 'vikram-rao',
    name: 'Vikram Rao',
    initials: 'VR',
    tint: ['#E4EFE7', '#356B4B'],
    qualification: 'B.Sc. Mathematics, M.Ed.',
    headline: 'Practice-heavy coaching that builds real speed.',
    subjects: ['Mathematics'],
    topics: ['Quadratic Equations', 'Probability', 'Trigonometry', 'Mensuration'],
    experience: 6,
    rating: 4.6,
    reviews: 96,
    students: 310,
    lessons: 520,
    compatibility: 87,
    style: 'Practice-heavy & patient',
    languages: ['English', 'Hindi'],
    levels: ['Class 8–10'],
    response: 'Replies in ~1 hour',
    verified: true,
    bio: 'Vikram is the tutor students call when they understand the concept but freeze in exams. His sessions are full of carefully sequenced drills that move from familiar to unfamiliar, with instant correction and a visible accuracy tracker.',
    approach:
      'Small sets, immediate feedback, rising difficulty. Accuracy is tracked every session so effort becomes visible.',
    highlights: [
      'Accuracy tracker shared after every class',
      'Question bank of 400+ solved problems',
      'Special focus on calculation speed',
    ],
    availability: [
      { day: 'Mon', slots: ['8:00 PM'] },
      { day: 'Thu', slots: ['4:00 PM'] },
      { day: 'Sat', slots: ['4:00 PM'] },
    ],
    testimonials: [
      {
        name: 'Tara S.',
        grade: 'Class 10',
        rating: 4.8,
        when: '3 weeks ago',
        text: 'He gave me a 15-question set before every class. My accuracy went from 60% to 85% in a month.',
      },
      {
        name: 'Yash D.',
        grade: 'Class 9',
        rating: 4.4,
        when: '2 months ago',
        text: 'Very patient and encouraging. The pace is brisk, but he repeats anything you miss.',
      },
    ],
  },
  {
    id: 'priya-deshpande',
    name: 'Priya Deshpande',
    initials: 'PD',
    tint: ['#E2F0E6', '#2F6B4B'],
    qualification: 'M.Sc. Biotechnology, B.Ed.',
    headline: 'Diagram-led biology for visual learners.',
    subjects: ['Biology'],
    topics: ['Cell Structure', 'Photosynthesis', 'Human Physiology', 'Genetics'],
    experience: 11,
    rating: 4.9,
    reviews: 198,
    students: 590,
    lessons: 1030,
    compatibility: 95,
    style: 'Diagram-led & conceptual',
    languages: ['English', 'Hindi', 'Malayalam'],
    levels: ['Class 9–12'],
    response: 'Replies in ~3 hours',
    verified: true,
    bio: 'Priya turns dense biological processes into clean, memorable diagrams. Students learn to draw, label and explain — the exact skill board exams reward. Her classes include weekly retrieval quizzes so knowledge stays fresh instead of being crammed.',
    approach:
      'Draw it, label it, explain it aloud. If a student cannot narrate the diagram, the concept is not finished.',
    highlights: [
      'Label-first diagram drills',
      'Spaced retrieval quizzes',
      'Board answer writing practice',
    ],
    availability: [
      { day: 'Wed', slots: ['4:00 PM'] },
      { day: 'Fri', slots: ['6:00 PM'] },
      { day: 'Sun', slots: ['9:00 AM'] },
    ],
    testimonials: [
      {
        name: 'Navya P.',
        grade: 'Class 10',
        rating: 5,
        when: '2 weeks ago',
        text: 'Photosynthesis finally stayed in my head because we drew it five different ways. Her retrieval quizzes are gold.',
      },
      {
        name: 'Ishan B.',
        grade: 'Class 12',
        rating: 5,
        when: '1 month ago',
        text: 'Extremely organised. Every class had a clear outcome and a small test at the end.',
      },
    ],
  },
  {
    id: 'neha-kulkarni',
    name: 'Neha Kulkarni',
    initials: 'NK',
    tint: ['#F5EBDC', '#8B6323'],
    qualification: 'M.Sc. Organic Chemistry',
    headline: 'Reaction mechanisms, simplified and sketched.',
    subjects: ['Chemistry'],
    topics: ['Organic Chemistry', 'Chemical Bonding', 'Acids, Bases & Salts'],
    experience: 9,
    rating: 4.7,
    reviews: 132,
    students: 350,
    lessons: 690,
    compatibility: 88,
    style: 'Mechanism-first & structured',
    languages: ['English', 'Hindi'],
    levels: ['Class 11–12'],
    response: 'Replies in ~5 hours',
    verified: true,
    bio: 'Neha specialises in the jump from school chemistry to organic mechanisms. She teaches students to see electrons moving rather than memorising products, and provides annotated reaction maps they can revise quickly before exams.',
    approach:
      'Every mechanism is drawn from first principles. Repetition is welcomed; shortcuts come only after understanding.',
    highlights: [
      'Annotated reaction maps',
      'Electron-flow drills',
      'JEE & NEET foundation coaching',
    ],
    availability: [
      { day: 'Tue', slots: ['6:00 PM'] },
      { day: 'Fri', slots: ['7:00 PM'] },
    ],
    testimonials: [
      {
        name: 'Omkar J.',
        grade: 'Class 12',
        rating: 4.8,
        when: '1 month ago',
        text: 'I used to memorise reagents. Now I can reason my way to the product. Huge difference.',
      },
    ],
  },
  {
    id: 'daniel-thomas',
    name: 'Daniel Thomas',
    initials: 'DT',
    tint: ['#E7EDF2', '#365A74'],
    qualification: 'B.Tech Computer Science',
    headline: 'Learn to code by building things you can show.',
    subjects: ['Computer Science'],
    topics: ['Python Loops', 'Data Structures', 'Web Foundations'],
    experience: 7,
    rating: 4.8,
    reviews: 118,
    students: 290,
    lessons: 480,
    compatibility: 84,
    style: 'Project-based & playful',
    languages: ['English'],
    levels: ['Class 9–12'],
    response: 'Replies in ~3 hours',
    verified: true,
    bio: 'Daniel teaches programming through small, satisfying projects. Students build a quiz app, a score tracker and a mini portfolio while learning loops, conditionals and functions. Each class ends with working code and a clear next step.',
    approach:
      'Explain less, build more. Concepts appear exactly when a project needs them.',
    highlights: [
      'Project-first Python curriculum',
      'Live debugging sessions',
      'Portfolio-ready mini apps',
    ],
    availability: [
      { day: 'Thu', slots: ['6:00 PM'] },
      { day: 'Sun', slots: ['5:00 PM'] },
    ],
    testimonials: [
      {
        name: 'Maya L.',
        grade: 'Class 11',
        rating: 5,
        when: '2 weeks ago',
        text: 'I built a working quiz app in three classes. I finally understand what loops are for.',
      },
    ],
  },
]

export const teachersById = Object.fromEntries(
  teachers.map((teacher) => [teacher.id, teacher]),
)

/* --------------------------------------------------------------------------
   Topics
   -------------------------------------------------------------------------- */

export const topics = [
  {
    id: 'quadratic-equations',
    name: 'Quadratic Equations',
    subjectId: 'math',
    classLevel: 'Class 10',
    level: 'Intermediate',
    languages: ['English', 'Hindi'],
    goals: ['concepts', 'exam', 'practice'],
    tags: ['algebra', 'factorisation', 'roots', 'word problems', 'discriminant'],
    blurb:
      'Factorise, complete the square and use the quadratic formula — then decide which method is fastest for the question in front of you.',
    why: 'Your last diagnostic showed 3 of 5 factorisation questions incorrect, so we start with visual factorisation before word problems.',
    teacherIds: ['ananya-iyer', 'vikram-rao'],
    lessons: 12,
    videos: 8,
    notes: 4,
    quizzes: 3,
    hours: 5.5,
    mastery: 42,
    matchBase: 98,
    weeklyLearners: 1240,
    featured: true,
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    subjectId: 'math',
    classLevel: 'Class 10',
    level: 'Intermediate',
    languages: ['English', 'Hindi', 'Tamil'],
    goals: ['concepts', 'exam', 'practice'],
    tags: ['ratios', 'identities', 'heights and distances', 'angles'],
    blurb:
      'Connect ratios to the unit circle, prove identities with confidence, and apply heights-and-distances to board-style problems.',
    why: 'You solve direct ratio questions well but lose marks on identity proofs — a targeted 3-lesson plan covers it.',
    teacherIds: ['ananya-iyer', 'rohit-sharma'],
    lessons: 14,
    videos: 9,
    notes: 5,
    quizzes: 4,
    hours: 6,
    mastery: 61,
    matchBase: 93,
    weeklyLearners: 980,
    featured: true,
  },
  {
    id: 'chemical-bonding',
    name: 'Chemical Bonding',
    subjectId: 'chemistry',
    classLevel: 'Class 10',
    level: 'Intermediate',
    languages: ['English', 'Hindi', 'Malayalam'],
    goals: ['concepts', 'exam'],
    tags: ['ionic', 'covalent', 'lewis structures', 'molecules'],
    blurb:
      'Why atoms bond, how to draw it, and how bond type predicts the properties you get asked about in exams.',
    why: 'Your notes and quiz history show confusion between ionic and covalent properties — diagrams will anchor this next.',
    teacherIds: ['meera-nair', 'neha-kulkarni'],
    lessons: 10,
    videos: 7,
    notes: 3,
    quizzes: 3,
    hours: 4.5,
    mastery: 55,
    matchBase: 95,
    weeklyLearners: 1105,
    featured: true,
  },
  {
    id: 'laws-of-motion',
    name: 'Laws of Motion',
    subjectId: 'physics',
    classLevel: 'Class 9',
    level: 'Foundation',
    languages: ['English', 'Hindi'],
    goals: ['concepts', 'practice'],
    tags: ['newton', 'force', 'friction', 'free body diagrams'],
    blurb:
      'Build free-body diagrams you can trust and use Newton’s three laws to explain everyday motion.',
    why: 'Recommended for your foundation path — strong diagram habits here pay off in Class 10 electricity and mechanics.',
    teacherIds: ['arjun-verma', 'rohit-sharma'],
    lessons: 11,
    videos: 8,
    notes: 4,
    quizzes: 2,
    hours: 5,
    mastery: 74,
    matchBase: 84,
    weeklyLearners: 860,
    featured: false,
  },
  {
    id: 'cell-structure',
    name: 'Cell Structure & Function',
    subjectId: 'biology',
    classLevel: 'Class 9',
    level: 'Foundation',
    languages: ['English', 'Hindi', 'Malayalam'],
    goals: ['concepts', 'exam'],
    tags: ['organelles', 'cell membrane', 'mitosis', 'diagrams'],
    blurb:
      'Learn every organelle through labelled diagrams, then connect structure to the job it performs in the cell.',
    why: 'Diagram-led revision suits your visual learning preference, and this topic underpins Class 10 biology.',
    teacherIds: ['priya-deshpande', 'meera-nair'],
    lessons: 9,
    videos: 6,
    notes: 4,
    quizzes: 2,
    hours: 4,
    mastery: 81,
    matchBase: 83,
    weeklyLearners: 720,
    featured: false,
  },
  {
    id: 'electricity',
    name: 'Electricity',
    subjectId: 'physics',
    classLevel: 'Class 10',
    level: 'Intermediate',
    languages: ['English', 'Hindi'],
    goals: ['exam', 'practice'],
    tags: ['ohm law', 'resistance', 'circuits', 'numericals'],
    blurb:
      'Master circuit diagrams, Ohm’s law and numericals with a repeatable method for series and parallel combinations.',
    why: 'A high-weightage board topic where regular timed practice historically lifts your score fastest.',
    teacherIds: ['arjun-verma', 'rohit-sharma'],
    lessons: 12,
    videos: 8,
    notes: 4,
    quizzes: 4,
    hours: 5.5,
    mastery: 67,
    matchBase: 88,
    weeklyLearners: 1010,
    featured: true,
  },
  {
    id: 'organic-chemistry',
    name: 'Organic Chemistry Basics',
    subjectId: 'chemistry',
    classLevel: 'Class 11',
    level: 'Advanced',
    languages: ['English', 'Hindi'],
    goals: ['concepts', 'exam'],
    tags: ['mechanisms', 'functional groups', 'isomers', 'reactions'],
    blurb:
      'See electrons move. Build a mechanism-first foundation for functional groups, isomerism and reaction pathways.',
    why: 'A stretch topic based on your chemistry accuracy — worth previewing if you are considering science streams.',
    teacherIds: ['neha-kulkarni', 'meera-nair'],
    lessons: 15,
    videos: 10,
    notes: 6,
    quizzes: 4,
    hours: 7,
    mastery: 32,
    matchBase: 79,
    weeklyLearners: 640,
    featured: false,
  },
  {
    id: 'probability',
    name: 'Probability',
    subjectId: 'math',
    classLevel: 'Class 10',
    level: 'Intermediate',
    languages: ['English', 'Hindi'],
    goals: ['concepts', 'practice'],
    tags: ['dice', 'cards', 'events', 'conditional'],
    blurb:
      'Turn word problems into sample spaces, then calculate with confidence using complementary events and the addition rule.',
    why: 'Short, high-yield topic. Your algebra strength makes the counting side of probability a quick win.',
    teacherIds: ['vikram-rao', 'ananya-iyer'],
    lessons: 8,
    videos: 5,
    notes: 3,
    quizzes: 3,
    hours: 3.5,
    mastery: 70,
    matchBase: 86,
    weeklyLearners: 690,
    featured: false,
  },
  {
    id: 'acids-bases-salts',
    name: 'Acids, Bases & Salts',
    subjectId: 'chemistry',
    classLevel: 'Class 10',
    level: 'Foundation',
    languages: ['English', 'Hindi', 'Malayalam'],
    goals: ['exam', 'practice'],
    tags: ['ph', 'neutralisation', 'indicators', 'salts'],
    blurb:
      'Use pH, indicators and neutralisation reactions to answer the table-based and reasoning questions exams love.',
    why: 'A foundation gap flagged in your last chemistry assessment — best closed before organic chemistry.',
    teacherIds: ['neha-kulkarni', 'meera-nair'],
    lessons: 9,
    videos: 6,
    notes: 3,
    quizzes: 2,
    hours: 4,
    mastery: 58,
    matchBase: 82,
    weeklyLearners: 580,
    featured: false,
  },
  {
    id: 'photosynthesis',
    name: 'Photosynthesis',
    subjectId: 'biology',
    classLevel: 'Class 10',
    level: 'Foundation',
    languages: ['English', 'Hindi', 'Malayalam'],
    goals: ['concepts', 'exam'],
    tags: ['chloroplast', 'light reaction', 'calvin cycle', 'stomata'],
    blurb:
      'Follow light energy from the leaf to glucose with a diagram sequence you can reproduce under exam pressure.',
    why: 'One of your strongest topics — a good confidence builder before the next diagnostic.',
    teacherIds: ['priya-deshpande'],
    lessons: 7,
    videos: 5,
    notes: 3,
    quizzes: 2,
    hours: 3,
    mastery: 88,
    matchBase: 80,
    weeklyLearners: 540,
    featured: false,
  },
  {
    id: 'grammar-tenses',
    name: 'Grammar & Tenses',
    subjectId: 'english',
    classLevel: 'Class 8',
    level: 'Foundation',
    languages: ['English', 'Hindi'],
    goals: ['concepts', 'practice'],
    tags: ['verbs', 'perfect tense', 'editing', 'error correction'],
    blurb:
      'Fix the five tense errors that appear most often in editing and gap-fill questions, with short daily drills.',
    why: 'Your writing samples show recurring tense slips. Ten focused minutes a day would remove them.',
    teacherIds: ['sara-khan'],
    lessons: 8,
    videos: 5,
    notes: 4,
    quizzes: 3,
    hours: 3,
    mastery: 76,
    matchBase: 81,
    weeklyLearners: 760,
    featured: false,
  },
  {
    id: 'python-loops',
    name: 'Python Loops & Logic',
    subjectId: 'cs',
    classLevel: 'Class 11',
    level: 'Foundation',
    languages: ['English'],
    goals: ['concepts', 'practice'],
    tags: ['for loops', 'while loops', 'conditionals', 'projects'],
    blurb:
      'Learn loops by building a score tracker and a quiz app, with debugging habits that transfer to any language.',
    why: 'A project-based entry point for computational thinking, matched to your preference for active learning.',
    teacherIds: ['daniel-thomas'],
    lessons: 10,
    videos: 6,
    notes: 3,
    quizzes: 3,
    hours: 4.5,
    mastery: 45,
    matchBase: 78,
    weeklyLearners: 430,
    featured: false,
  },
]

export const topicsById = Object.fromEntries(
  topics.map((topic) => [topic.id, topic]),
)

/* --------------------------------------------------------------------------
   Course workspace — Quadratic Equations
   -------------------------------------------------------------------------- */

export const course = {
  id: 'quadratic-equations',
  title: 'Quadratic Equations',
  subtitle: 'From factors to fluency',
  subjectId: 'math',
  teacherId: 'ananya-iyer',
  level: 'Intermediate · Class 10',
  totalMinutes: 265,
  modules: [
    {
      id: 'm1',
      title: 'Meet the parabola',
      kind: 'Video',
      minutes: 18,
      summary: 'What a quadratic really represents, and how the graph tells you the number of solutions.',
      objectives: [
        'Recognise a quadratic from its equation and graph',
        'Read the number of roots from the parabola',
        'Connect the vertex to the maximum or minimum value',
      ],
    },
    {
      id: 'm2',
      title: 'Factorisation: splitting the middle term',
      kind: 'Video',
      minutes: 24,
      summary: 'A visual method for finding two numbers that multiply and add correctly — every time.',
      objectives: [
        'Split the middle term without guessing',
        'Factorise expressions with a leading coefficient',
        'Verify roots by substitution',
      ],
    },
    {
      id: 'm3',
      title: 'The quadratic formula',
      kind: 'Lesson',
      minutes: 28,
      summary: 'Where the formula comes from, how to use it accurately, and when it beats factorising.',
      objectives: [
        'Derive the formula by completing the square',
        'Substitute coefficients without sign errors',
        'Choose between factorising and the formula',
      ],
    },
    {
      id: 'm4',
      title: 'The discriminant & nature of roots',
      kind: 'Practice',
      minutes: 22,
      summary: 'Use b² − 4ac to predict roots before you solve — a favourite exam shortcut.',
      objectives: [
        'Interpret positive, zero and negative discriminants',
        'Find unknown coefficients for equal roots',
        'Justify the nature of roots in one line',
      ],
    },
    {
      id: 'm5',
      title: 'Word problems that become quadratics',
      kind: 'Lesson',
      minutes: 34,
      summary: 'Translate ages, speeds, areas and number puzzles into equations you can actually solve.',
      objectives: [
        'Define variables from a real situation',
        'Build the equation from the constraint',
        'Reject impossible roots with reasoning',
      ],
    },
    {
      id: 'm6',
      title: 'Mixed practice & exam simulation',
      kind: 'Quiz',
      minutes: 30,
      summary: 'A timed, mixed set modelled on board paper patterns with a full solution walkthrough.',
      objectives: [
        'Work under a time limit',
        'Pick the fastest method per question',
        'Review mistakes with a correction log',
      ],
    },
  ],
}

export const lessonChapters = [
  { time: '0:00', title: 'Why the formula exists' },
  { time: '4:12', title: 'Completing the square, step by step' },
  { time: '11:35', title: 'Substituting without sign errors' },
  { time: '18:20', title: 'Choosing the faster method' },
  { time: '23:05', title: 'Worked board question' },
]

export const lessonNotes = [
  {
    id: 'n1',
    title: 'Quadratic Formula — Master Notes',
    meta: 'PDF · 6 pages · 1.2 MB',
    description: 'Derivation, worked examples and a one-page method selector.',
    content:
      'QUADRATIC FORMULA — MASTER NOTES\n\n1. Standard form: ax² + bx + c = 0, a ≠ 0\n2. Formula: x = (-b ± √(b² - 4ac)) / 2a\n3. Discriminant D = b² - 4ac\n   D > 0 → two distinct real roots\n   D = 0 → two equal real roots\n   D < 0 → no real roots\n4. Method selector:\n   - Integer roots? Try factorisation first.\n   - Messy coefficients? Use the formula.\n   - Asked about nature of roots? Use D only.\n5. Common error: forgetting that -b becomes positive when b is negative.\n',
  },
  {
    id: 'n2',
    title: 'Factorisation Methods Cheat Sheet',
    meta: 'PDF · 2 pages · 480 KB',
    description: 'Splitting the middle term, grouping and the difference of squares.',
    content:
      'FACTORISATION CHEAT SHEET\n\nSplit the middle term:\nFind p and q so that p·q = a·c and p + q = b.\nThen split bx into px + qx and group.\n\nDifference of squares: a² - b² = (a - b)(a + b)\nPerfect square: a² + 2ab + b² = (a + b)²\n\nAlways verify by expanding your factors.\n',
  },
  {
    id: 'n3',
    title: 'Word Problem Translation Guide',
    meta: 'PDF · 3 pages · 620 KB',
    description: 'A phrase-to-equation table with five fully solved examples.',
    content:
      'WORD PROBLEM TRANSLATION GUIDE\n\n"Product of two consecutive integers" → x(x + 1)\n"Sum of a number and its reciprocal" → x + 1/x\n"Area of a rectangle" → length × breadth\n"Speed, distance, time" → t = d / s\n\nSteps: define → constrain → solve → reject impossible roots → state the answer in words.\n',
  },
  {
    id: 'n4',
    title: '30 Practice Questions (with hints)',
    meta: 'PDF · 8 pages · 1.8 MB',
    description: 'Graded practice from warm-up to board-level, hints on the back page.',
    content:
      'PRACTICE SET — 30 QUESTIONS\n\nSection A (warm-up): x² - 5x + 6 = 0, x² = 49, 2x² - 8 = 0\nSection B: 3x² - 10x + 3 = 0, x² + 4x - 21 = 0\nSection C (word problems): The product of two consecutive even numbers is 168. Find them.\nSection D (challenge): Find k if x² + kx + 9 = 0 has equal roots.\n\nHints are on the final page. Attempt before checking.\n',
  },
]

export const practiceQuiz = [
  {
    id: 'q1',
    prompt: 'Which method is fastest for x² − 7x + 12 = 0?',
    options: [
      'Quadratic formula',
      'Splitting the middle term',
      'Completing the square',
      'Graphing the parabola',
    ],
    answer: 1,
    explanation:
      'The factors of 12 that add to −7 are −3 and −4, so the equation becomes (x − 3)(x − 4) = 0. Factorising is fastest when roots are integers.',
  },
  {
    id: 'q2',
    prompt: 'What is the discriminant of 2x² + 3x + 5 = 0?',
    options: ['−31', '31', '49', '−49'],
    answer: 0,
    explanation:
      'D = b² − 4ac = 3² − 4(2)(5) = 9 − 40 = −31. Since D < 0, the equation has no real roots.',
  },
  {
    id: 'q3',
    prompt: 'If a quadratic has equal roots, what must be true?',
    options: ['D > 0', 'D = 0', 'D < 0', 'a = c'],
    answer: 1,
    explanation:
      'Equal (repeated) real roots occur exactly when the discriminant is zero, so the parabola touches the x-axis at one point.',
  },
]

/* --------------------------------------------------------------------------
   Assessments
   -------------------------------------------------------------------------- */

export const assessmentQuestions = [
  {
    id: 'a1',
    concept: 'Factorisation',
    difficulty: 'Foundation',
    prompt: 'Factorise x² − 5x + 6.',
    options: ['(x − 2)(x − 3)', '(x + 2)(x + 3)', '(x − 1)(x − 6)', '(x − 2)(x + 3)'],
    answer: 0,
    explanation:
      'The numbers that multiply to 6 and add to −5 are −2 and −3, so the factors are (x − 2)(x − 3).',
  },
  {
    id: 'a2',
    concept: 'Discriminant',
    difficulty: 'Intermediate',
    prompt: 'The equation x² + 4x + 8 = 0 has:',
    options: ['Two distinct real roots', 'Equal real roots', 'No real roots', 'Three real roots'],
    answer: 2,
    explanation: 'D = 16 − 32 = −16. A negative discriminant means there are no real roots.',
  },
  {
    id: 'a3',
    concept: 'Quadratic formula',
    difficulty: 'Intermediate',
    prompt: 'Solve 2x² − 7x + 3 = 0.',
    options: ['x = 3 or ½', 'x = −3 or −½', 'x = 3 or 2', 'x = 1 or 1.5'],
    answer: 0,
    explanation:
      'D = 49 − 24 = 25. So x = (7 ± 5) / 4, giving x = 3 or x = ½.',
  },
  {
    id: 'a4',
    concept: 'Word problems',
    difficulty: 'Advanced',
    prompt:
      'The product of two consecutive positive integers is 56. Which equation models this?',
    options: ['x(x + 1) = 56', 'x + (x + 1) = 56', '2x + 1 = 56', 'x² + 1 = 56'],
    answer: 0,
    explanation:
      'If the integers are x and x + 1, their product is x(x + 1) = 56, which becomes x² + x − 56 = 0.',
  },
  {
    id: 'a5',
    concept: 'Graphing',
    difficulty: 'Intermediate',
    prompt: 'The graph of y = x² − 4x + 4 touches the x-axis at:',
    options: ['Two points', 'One point', 'No point', 'The y-axis only'],
    answer: 1,
    explanation:
      'D = 16 − 16 = 0, so the parabola touches the x-axis once, at x = 2. This is a repeated root.',
  },
  {
    id: 'a6',
    concept: 'Roots & coefficients',
    difficulty: 'Advanced',
    prompt: 'If α and β are roots of x² − 6x + 8 = 0, what is α + β?',
    options: ['−6', '6', '8', '−8'],
    answer: 1,
    explanation:
      'The sum of roots is −b/a = 6. The product would be c/a = 8.',
  },
]

export const assessmentMeta = {
  title: 'Quadratic Equations diagnostic',
  subject: 'Mathematics · Class 10',
  minutes: 8,
  questions: assessmentQuestions.length,
  concepts: ['Factorisation', 'Discriminant', 'Quadratic formula', 'Word problems', 'Graphing', 'Roots & coefficients'],
}

/* --------------------------------------------------------------------------
   Progress data
   -------------------------------------------------------------------------- */

export const weeklyActivity = [
  { label: 'Mon', value: 32 },
  { label: 'Tue', value: 54 },
  { label: 'Wed', value: 28 },
  { label: 'Thu', value: 68 },
  { label: 'Fri', value: 46 },
  { label: 'Sat', value: 82 },
  { label: 'Sun', value: 60 },
]

export const lastWeekActivity = [
  { label: 'Mon', value: 24 },
  { label: 'Tue', value: 38 },
  { label: 'Wed', value: 42 },
  { label: 'Thu', value: 30 },
  { label: 'Fri', value: 52 },
  { label: 'Sat', value: 46 },
  { label: 'Sun', value: 34 },
]

export const quizPerformance = [
  { label: 'Algebra', value: 84 },
  { label: 'Trigonometry', value: 72 },
  { label: 'Bonding', value: 64 },
  { label: 'Physics', value: 82 },
  { label: 'Biology', value: 88 },
]

export const improvementTrend = [
  { label: 'W1', value: 61 },
  { label: 'W2', value: 66 },
  { label: 'W3', value: 64 },
  { label: 'W4', value: 71 },
  { label: 'W5', value: 76 },
  { label: 'W6', value: 78 },
]

export const weakTopics = [
  {
    id: 'quadratic-equations',
    name: 'Quadratic Equations',
    subject: 'Mathematics',
    mastery: 42,
    trend: '+6%',
    lastPracticed: '2 days ago',
  },
  {
    id: 'chemical-bonding',
    name: 'Chemical Bonding',
    subject: 'Chemistry',
    mastery: 55,
    trend: '+4%',
    lastPracticed: '4 days ago',
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    subject: 'Mathematics',
    mastery: 61,
    trend: '+2%',
    lastPracticed: '1 week ago',
  },
  {
    id: 'organic-chemistry',
    name: 'Organic Chemistry',
    subject: 'Chemistry',
    mastery: 32,
    trend: 'New',
    lastPracticed: 'Not started',
  },
]

export const strongTopics = [
  { name: 'Linear Equations', mastery: 92 },
  { name: 'Photosynthesis', mastery: 88 },
  { name: 'Cell Structure', mastery: 81 },
]

export const recentMaterials = [
  {
    id: 'rm1',
    title: 'Quadratic Formula — Master Notes',
    type: 'Notes',
    meta: 'PDF · 6 pages',
    topic: 'Quadratic Equations',
    when: 'Today',
    icon: 'file',
  },
  {
    id: 'rm2',
    title: 'Factorisation methods',
    type: 'Video',
    meta: '12 min · Chapter 2',
    topic: 'Quadratic Equations',
    when: 'Yesterday',
    icon: 'play',
  },
  {
    id: 'rm3',
    title: 'Bonding practice set',
    type: 'Practice',
    meta: '15 questions · 55%',
    topic: 'Chemical Bonding',
    when: '2 days ago',
    icon: 'quiz',
  },
  {
    id: 'rm4',
    title: 'Trigonometry identity sheet',
    type: 'Notes',
    meta: 'PDF · 3 pages',
    topic: 'Trigonometry',
    when: '4 days ago',
    icon: 'file',
  },
]

export const recentAttempts = [
  { id: 1, topic: 'Quadratic Equations', date: 'Today', score: 72, questions: 15, time: '11 min' },
  { id: 2, topic: 'Chemical Bonding', date: '2 days ago', score: 55, questions: 12, time: '9 min' },
  { id: 3, topic: 'Trigonometry', date: '5 days ago', score: 64, questions: 10, time: '12 min' },
  { id: 4, topic: 'Linear Equations', date: '1 week ago', score: 94, questions: 15, time: '10 min' },
]

export const achievements = [
  { id: 'a1', title: '12-day streak', note: 'Studied every day for 12 days', icon: 'flame', tone: 'gold' },
  { id: 'a2', title: 'Quiz improver', note: 'Up 17% in four weeks', icon: 'trending', tone: 'teal' },
  { id: 'a3', title: 'Concept closer', note: 'Closed 4 knowledge gaps', icon: 'target', tone: 'navy' },
  { id: 'a4', title: 'Deep focus', note: 'Three 45-minute sessions', icon: 'clock', tone: 'sage' },
  { id: 'a5', title: 'Night owl', note: 'Completed 5 evening lessons', icon: 'moon', tone: 'navy' },
  { id: 'a6', title: 'First mock', note: 'Finished a timed assessment', icon: 'award', tone: 'gold' },
]

export const learningGoals = [
  { id: 'lg1', title: 'Finish 6 lessons this week', progress: 67, target: '6 lessons', note: '4 of 6 complete' },
  { id: 'lg2', title: 'Raise algebra accuracy to 85%', progress: 82, target: '85% accuracy', note: 'Currently 82%' },
  { id: 'lg3', title: 'Study 5 hours this week', progress: 74, target: '5 hours', note: '3h 42m logged' },
]

export const recommendations = [
  {
    id: 'r1',
    type: 'Teacher',
    title: 'Dr. Ananya Iyer',
    note: '96% compatibility · visual algebra specialist',
    cta: 'View profile',
    href: '/teachers/ananya-iyer',
  },
  {
    id: 'r2',
    type: 'Lesson',
    title: 'The discriminant & nature of roots',
    note: 'Closes your biggest algebra gap in 22 minutes',
    cta: 'Open lesson',
    href: '/learning',
  },
  {
    id: 'r3',
    type: 'Practice',
    title: '10 discriminant questions',
    note: 'Short retrieval set, adapted to your pace',
    cta: 'Start practice',
    href: '/learning',
  },
]

export const dashboardPlan = [
  { label: 'Continue the quadratic lesson', detail: '12 min left', done: false },
  { label: 'Attempt the bonding quiz', detail: '10 questions', done: false },
  { label: 'Revise trigonometry identities', detail: 'Flashcards', done: false },
]

export const streakDays = [
  { day: 'M', done: true },
  { day: 'T', done: true },
  { day: 'W', done: true },
  { day: 'T', done: true },
  { day: 'F', done: true },
  { day: 'S', done: false },
  { day: 'S', done: false },
]
