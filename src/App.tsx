import React, { useState } from 'react';
import './App.css';

import { AppContext } from './context';
import SearchSection from './components/SearchSection/searchSection.component';
import BattleSummary from './components/BattleSummary/battleSummary.component';


interface RenderSectionProps {
  battle: any
}

const RenderSection: React.FC<RenderSectionProps> = ({ battle }) => (
  battle != null ? <BattleSummary /> : <SearchSection />
);
 

const App: React.FC = () => {
  const [battle, setBattle] = useState<any>(null);
  return (<>
    <AppContext.Provider value={{ battle, setBattle }}>
      <div className='App'>
        <header className='App-header'>
          <RenderSection battle={battle} />
        </header>
      </div>
    </AppContext.Provider>
  </>);
}

export default App;

