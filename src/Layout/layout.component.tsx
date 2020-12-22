import React, { useState } from 'react';
import style from './layout.module.css';
import '../styles/global.css';

import { AppContext } from '../context';

const Layout: React.FC = ({ children }) => {
  const [battle, setBattle] = useState<any>(null);

  return (<>
    <AppContext.Provider value={{ battle, setBattle }}>
      <main className={style.main}>
        <header>{children}</header>
      </main>
    </AppContext.Provider>
  </>);
}

export default Layout;
