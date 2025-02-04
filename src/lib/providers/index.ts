import { loadGroqChatModels } from './groq';
import { loadOpenAIChatModels, loadOpenAIEmbeddingsModels } from './openai';
import { loadAnthropicChatModels } from './anthropic';

const chatModelProviders = {
  openai: loadOpenAIChatModels,
  groq: loadGroqChatModels,
  anthropic: loadAnthropicChatModels,
};

const embeddingModelProviders = {
  openai: loadOpenAIEmbeddingsModels,
};

export const getAvailableChatModelProviders = async () => {
  const models = {};

  for (const provider in chatModelProviders) {
    const providerModels = await chatModelProviders[provider]();
    if (Object.keys(providerModels).length > 0) {
      models[provider] = providerModels;
    }
  }

  models['custom_openai'] = {};

  return models;
};

export const getAvailableEmbeddingModelProviders = async () => {
  const models = {};

  for (const provider in embeddingModelProviders) {
    const providerModels = await embeddingModelProviders[provider]();
    if (Object.keys(providerModels).length > 0) {
      models[provider] = providerModels;
    }
  }

  return models;
};
