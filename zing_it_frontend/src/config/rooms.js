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
      F1: { 
        id: 'sports-f1', 
        name: 'F1',
        description: 'Formula 1 racing discussions',
        isPrivate: false
      },
      MotoGp: { 
        id: 'sports-motogp', 
        name: 'MotoGp',
        description: 'MotoGP racing discussions',
        isPrivate: false
      },
      Motocross: { 
        id: 'sports-motocross', 
        name: 'Motocross',
        description: 'Motocross racing discussions',
        isPrivate: false
      },
      Football: { 
        id: 'sports-football', 
        name: 'Football',
        description: 'Football (soccer) discussions',
        isPrivate: false
      },
    },
  },
  VIPRoom: { 
    id: 'vip-room', 
    name: 'VIP Room',
    description: 'Exclusive room for VIP members',
    isPrivate: true,
    password: 'vip123'
  },
};

export const getAllRoomIds = () => {
  const roomIds = [];
  Object.values(CHAT_ROOMS).forEach(room => {
    roomIds.push(room.id);
    if (room.subCategories) {
      Object.values(room.subCategories).forEach(subRoom => {
        roomIds.push(subRoom.id);
      });
    }
  });
  return roomIds;
};

export const getRoomById = (roomId) => {
  for (const room of Object.values(CHAT_ROOMS)) {
    if (room.id === roomId) return room;
    if (room.subCategories) {
      for (const subRoom of Object.values(room.subCategories)) {
        if (subRoom.id === roomId) return subRoom;
      }
    }
  }
  return null;
};