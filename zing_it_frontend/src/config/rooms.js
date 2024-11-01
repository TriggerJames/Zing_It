// src/config/rooms.js

export const CHAT_ROOMS = {
  General: { 
    id: 'general', 
    name: 'General',
    description: 'General discussion for all topics',
    isPrivate: false
  },
  Devs: {
    id: 'devs',
    name: 'Devs',
    description: 'Discussions for developers',
    isPrivate: false,
    subCategories: {
      TechNews: { 
        id: 'devs-tech-news', 
        name: 'Tech News',
        description: 'Latest technology news and updates',
        isPrivate: false
      },
      Backend: { 
        id: 'devs-backend', 
        name: 'Backend',
        description: 'Backend development discussions',
        isPrivate: false
      },
      Frontend: { 
        id: 'devs-frontend', 
        name: 'Frontend',
        description: 'Frontend development discussions',
        isPrivate: false
      },
    },
  },
  Sports: {
    id: 'sports',
    name: 'Sports',
    description: 'All things sports',
    isPrivate: false,
    subCategories: {
      Football: { 
        id: 'sports-football', 
        name: 'Football',
        description: 'Football discussions',
        isPrivate: false
      },
      Basketball: { 
        id: 'sports-basketball', 
        name: 'Basketball',
        description: 'Basketball discussions',
        isPrivate: false
      },
      Tennis: { 
        id: 'sports-tennis', 
        name: 'Tennis',
        description: 'Tennis discussions',
        isPrivate: false
      }
    },
  },
  VIPRoom: { 
    id: 'vip-room', 
    name: 'Private Room',
    description: 'Exclusive room for VIP members',
    isPrivate: true,
    password: 'vip123'
  },
};