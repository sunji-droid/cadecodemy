import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './app/Layout';
import { PathView } from './features/path/PathView';
import { TracksView } from './features/courses/TracksView';
import { LessonRunner } from './features/lessons/LessonRunner';
import { Playground } from './features/playground/Playground';
import { StagesView } from './features/stages/StagesView';
import { BadgesView } from './features/badges/BadgesView';
import { CertificatesView } from './features/certificates/CertificatesView';
import { ProfileView } from './features/profile/ProfileView';
import { About } from './features/about/About';
import { VerifyView } from './features/verify/VerifyView';
import { DatasetsView } from './features/datasets/DatasetsView';
import { SettingsView } from './features/settings/SettingsView';
import { CapstoneRunner } from './features/capstones/CapstoneRunner';
import { CodeReviewView } from './features/review/CodeReviewView';
import { MysteryView } from './features/mystery/MysteryView';
import { AlgorithmsView } from './features/algorithms/AlgorithmsView';
import { SortingVisualizerView } from './features/visualizer/SortingVisualizerView';
import { CareerHubView } from './features/career/CareerHubView';
import { GraphVisualizerView } from './features/graphs/GraphVisualizerView';
import { ReferenceHubView } from './features/reference/ReferenceHubView';
import { BitwiseLabView } from './features/bitwise/BitwiseLabView';
import { AccreditationGuideView } from './features/institutional/AccreditationGuideView';
import { DailyChallengeView } from './features/daily/DailyChallengeView';
import { BugHuntView } from './features/bughunt/BugHuntView';
import { AssessmentView } from './features/assessments/AssessmentView';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PathView />} />
        <Route path="tracks" element={<TracksView />} />
        <Route path="lesson/:lessonId" element={<LessonRunner />} />
        <Route path="playground" element={<Playground />} />
        <Route path="daily" element={<DailyChallengeView />} />
        <Route path="bughunt" element={<BugHuntView />} />
        <Route path="assessment" element={<AssessmentView />} />
        <Route path="stages" element={<StagesView />} />
        <Route path="datasets" element={<DatasetsView />} />
        <Route path="review" element={<CodeReviewView />} />
        <Route path="mystery" element={<MysteryView />} />
        <Route path="algorithms" element={<AlgorithmsView />} />
        <Route path="visualizer" element={<SortingVisualizerView />} />
        <Route path="graphs" element={<GraphVisualizerView />} />
        <Route path="bitwise" element={<BitwiseLabView />} />
        <Route path="career" element={<CareerHubView />} />
        <Route path="reference" element={<ReferenceHubView />} />
        <Route path="institutional" element={<AccreditationGuideView />} />
        <Route path="capstone/:trackId" element={<CapstoneRunner />} />
        <Route path="badges" element={<BadgesView />} />
        <Route path="certificates" element={<CertificatesView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="settings" element={<SettingsView />} />
        <Route path="about" element={<About />} />
        <Route path="verify" element={<VerifyView />} />
        <Route path="*" element={<PathView />} />
      </Route>
    </Routes>
  );
};
