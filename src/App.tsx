/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProjectsListPage } from './pages/ProjectsListPage';
import { ExpertiseDetailPage } from './pages/ExpertiseDetailPage';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Synchronise dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} 
        />
        <Route 
          path="/projets" 
          element={<ProjectsListPage />} 
        />
        <Route 
          path="/projets/:id" 
          element={<ProjectDetailPage />} 
        />
        <Route 
          path="/expertise/:id" 
          element={<ExpertiseDetailPage />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </HashRouter>
  );
}
