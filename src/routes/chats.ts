import express from 'express';
import logger from '../utils/logger';

const router = express.Router();

// In-memory storage using Maps
const chatsStore = new Map();
const messagesStore = new Map();

// Helper function to generate IDs (simple implementation)
const generateId = () => Math.random().toString(36).substr(2, 9);

router.get('/', async (_, res) => {
  try {
    // Convert Map to array and reverse it
    const chats = Array.from(chatsStore.values()).reverse();
    return res.status(200).json({ chats });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in getting chats: ${err.message}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const chat = chatsStore.get(req.params.id);
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Get all messages for this chat
    const chatMessages = Array.from(messagesStore.values())
      .filter(message => message.chatId === req.params.id);

    return res.status(200).json({ 
      chat: chat, 
      messages: chatMessages 
    });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in getting chat: ${err.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!chatsStore.has(req.params.id)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Delete the chat
    chatsStore.delete(req.params.id);

    // Delete all messages associated with this chat
    for (const [messageId, message] of messagesStore.entries()) {
      if (message.chatId === req.params.id) {
        messagesStore.delete(messageId);
      }
    }

    return res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in deleting chat: ${err.message}`);
  }
});

// Helper function to add a new chat (for testing)
router.post('/', async (req, res) => {
  try {
    const chatId = generateId();
    const newChat = {
      id: chatId,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    chatsStore.set(chatId, newChat);
    return res.status(201).json({ chat: newChat });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in creating chat: ${err.message}`);
  }
});

// Helper function to add a message to a chat (for testing)
router.post('/:id/messages', async (req, res) => {
  try {
    if (!chatsStore.has(req.params.id)) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const messageId = generateId();
    const newMessage = {
      id: messageId,
      chatId: req.params.id,
      ...req.body,
      createdAt: new Date().toISOString()
    };
    
    messagesStore.set(messageId, newMessage);
    return res.status(201).json({ message: newMessage });
  } catch (err) {
    res.status(500).json({ message: 'An error has occurred.' });
    logger.error(`Error in creating message: ${err.message}`);
  }
});

export default router;