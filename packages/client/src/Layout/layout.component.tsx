import React, { useState } from 'react';
import styles from './layout.module.css';
import '../styles/global.css';

import Head from '../components/head';

import { AppContext } from '../context';

const Layout: React.FC = ({ children }) => {
  const [battle, setBattle] = useState<any>(null);

  return (<>
    <AppContext.Provider value={{ battle, setBattle }}>
      <Head />
      <main className={styles.main}>
        <header>{children}</header>
      </main>
    </AppContext.Provider>
  </>);
}

export default Layout;
