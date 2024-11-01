export const CHAT_ROOMS = [
  {
    id: 1,
    name: 'General',
    description: 'General discussion room',
    isPrivate: false,
    subcategories: [
      { id: '1.1', name: 'General Chat', description: 'Chat about anything' },
      { id: '1.2', name: 'Announcements', description: 'Official announcements' }
    ]
  },
  {
    id: 2,
    name: 'Tech Talk',
    description: 'Technology discussions',
    isPrivate: false,
    subcategories: [
      { id: '2.1', name: 'Web Development', description: 'Discuss web development topics' },
      { id: '2.2', name: 'AI & ML', description: 'Talk about AI and machine learning' }
    ]
  },
  {
    id: 3,
    name: 'VIP Room',
    description: 'Private discussion room',
    isPrivate: true,
    password: 'vip123',
    subcategories: [
      { id: '3.1', name: 'VIP General', description: 'VIP general discussion' },
      { id: '3.2', name: 'VIP Events', description: 'VIP special events' }
    ]
  }
];