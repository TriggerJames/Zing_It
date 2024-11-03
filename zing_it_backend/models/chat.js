import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'users'
    }
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'messages'
  },
  unreadMessageCount: {
    type: Number,
    default: 0
  }
},
 {timestamps: true}
);

export default mongoose.model('chats', chatSchema);
