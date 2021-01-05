import React, { useEffect, useState } from 'react';
import styles from './layout.module.css';
import '../styles/global.css';

import Head from '../components/head';

import { AppContext } from '../context';
import {GQLRequestInit, SERVER_URI} from '../configs';

const Layout: React.FC = ({ children }) => {
  const [battle, setBattle] = useState<any>(null);

  useEffect(() => {
    // waking up the heroku server.
    fetch(SERVER_URI, GQLRequestInit('{"query": "{ ping }"}'));
  }, []);

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
