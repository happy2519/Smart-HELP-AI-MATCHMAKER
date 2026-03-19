export interface Task {
  id: string;
  title: string;
  ngoName: string;
  timeRequired: string;
  category: string;
  points: number;
}

export const FLASH_TASKS: Task[] = [
  { id: '1', title: 'Review NGO Website Content', ngoName: 'Education First', timeRequired: '30 min', category: 'Digital', points: 50 },
  { id: '2', title: 'Data Entry for Health Camp', ngoName: 'Swasthya Bharat', timeRequired: '45 min', category: 'Admin', points: 75 },
  { id: '3', title: 'Social Media Graphic Design', ngoName: 'Green Earth', timeRequired: '60 min', category: 'Creative', points: 100 },
  { id: '4', title: 'Translate Newsletter to Hindi', ngoName: 'Bhasha Setu', timeRequired: '40 min', category: 'Translation', points: 80 },
];

export const USER_STATS = {
  name: "Anjali",
  level: "Contributor",
  points: 1250,
  nextLevelPoints: 2000,
  skills: ["Graphic Design", "Content Writing", "Data Analysis"],
  availability: "Weekends, 4-6 hours",
  history: [
    { id: 'h1', task: 'Logo Design', ngo: 'Asha Foundation', date: '2024-03-10', points: 200 },
    { id: 'h2', task: 'English Tutoring', ngo: 'Vidya Trust', date: '2024-03-05', points: 150 },
  ]
};
