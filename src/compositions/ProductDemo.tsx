import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {SceneKey, scenes, sceneOrder} from '../config/timing';
import {brand, fontFamily} from '../config/brand';
import {Background} from '../components/Background';
import {ConceptLabel} from '../components/ConceptLabel';
import {OptionalAudio} from '../components/OptionalAudio';
import {SceneFade} from '../components/SceneFade';
import {ProblemScene} from '../scenes/ProblemScene';
import {UnifiedInboxScene} from '../scenes/UnifiedInboxScene';
import {ConversationScene} from '../scenes/ConversationScene';
import {OrderApprovalScene} from '../scenes/OrderApprovalScene';
import {HumanTakeoverScene} from '../scenes/HumanTakeoverScene';
import {OverviewScene} from '../scenes/OverviewScene';
import {ClosingScene} from '../scenes/ClosingScene';

/**
 * Scene registry. fadeIn/fadeOut = short fade at the scene edge.
 * Scenes that hand objects to the next scene (message cards, phone) skip the fade on that edge.
 */
const registry: Record<SceneKey, {Scene: React.FC; fadeIn: boolean; fadeOut: boolean}> = {
  problem: {Scene: ProblemScene, fadeIn: true, fadeOut: false},
  unifiedInbox: {Scene: UnifiedInboxScene, fadeIn: false, fadeOut: true},
  conversation: {Scene: ConversationScene, fadeIn: true, fadeOut: false},
  orderApproval: {Scene: OrderApprovalScene, fadeIn: false, fadeOut: true},
  humanTakeover: {Scene: HumanTakeoverScene, fadeIn: true, fadeOut: true},
  overview: {Scene: OverviewScene, fadeIn: true, fadeOut: true},
  closing: {Scene: ClosingScene, fadeIn: true, fadeOut: false},
};

export const ProductDemo: React.FC = () => (
  <AbsoluteFill style={{fontFamily, color: brand.colors.text}}>
    <Background />
    {sceneOrder.map((key) => {
      const {Scene, fadeIn, fadeOut} = registry[key];
      const {from, duration} = scenes[key];
      return (
        <Sequence key={key} name={key} from={from} durationInFrames={duration} layout="none">
          <SceneFade duration={duration} fadeIn={fadeIn} fadeOut={fadeOut}>
            <Scene />
          </SceneFade>
        </Sequence>
      );
    })}
    <ConceptLabel />
    <OptionalAudio />
  </AbsoluteFill>
);
