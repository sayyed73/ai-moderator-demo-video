import {AbsoluteFill} from 'remotion';
import {ConversationStage} from '../components/ConversationStage';

/** Scene 3 - customer conversation on a large phone (see ConversationStage / PhoneConversation). */
export const ConversationScene: React.FC = () => (
  <AbsoluteFill>
    <ConversationStage />
  </AbsoluteFill>
);
