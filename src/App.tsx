import './App.css';
import { Routes, Route } from 'react-router-dom';
import Stepper from './components/stepper/Stepper';
import React from 'react';
import IntegrationSuccess from './components/IntegrationSuccess';
import Mainheader from './components/header/Index';
import Filiterprofiles from './components/profilefilter/filiter';
import { ConfigProvider } from 'antd';
import ShowRepositories from './components/ShowRepository';




const Basepath: React.FC = () => {
  return (
    <>
      <Mainheader />
      <Filiterprofiles />
    </>
  )
}

function App() {
  return (
    <>
      <ConfigProvider theme={{ token: { borderRadius: 4 } }} >
        <Routes>
          <Route path="/" element={<Basepath />} />
          <Route path="/serviceProfiles/:profileId/integration/create" element={<Stepper />} />
          <Route path="/IntegrationCompleted" element={<IntegrationSuccess />} />
          <Route path="/ProviderAuthenticationCompleted" element={<ShowRepositories />} />

          
        </Routes>
      </ConfigProvider>
    </>
  )
}

export default App
