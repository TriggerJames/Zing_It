import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true,
  },
  members: [
      { type: mongoose.Schema.ObjectId,
      ref: 'users'}
    ],
    groupName: {
      type: String,
      required: function() {return this.type === 'group';}
    },
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
