import React, { useEffect, useState, useContext } from 'react';
import { PageProps as GatsbyPageProps, Link } from 'gatsby';

import styles from './battle.module.css';
import globalStyles from '../../styles/global.module.css';

import KingdomSummary from '../__pure__/KingdomSummary/kingdomSummary.component';
import { AppContext } from '../../context';
import { fetchJson, pareseUrlParams } from '../../utils';
import { GQLOptions, GQLRequestInit, SERVER_URI } from '../../configs';

const Note: React.FC<{ children: string }> = ({ children }) => {
  return (children && children.length) ? (<>
    <hr style={{ width: '70%'}} />
    <div className={styles.note}>{children}</div>
  </>) : null;
}

export const query = `
query FilteredBattles($id: String!) {
  battle(id: $id) {
    ${GQLOptions.commonQueryFields}
  }
}
`;

interface BattleSummaryProps extends GatsbyPageProps { }

const BattleSummary: React.FC<BattleSummaryProps> = ({ location }) => {
  const { battle, setBattle } = useContext(AppContext);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!battle) {
      const id = pareseUrlParams(location.search).id;
      if (id) {
        const body = JSON.stringify({ query, variables: { id } });
        fetchJson(SERVER_URI, GQLRequestInit(body))
          .then(({ data }: any) => setBattle(data.battle))
          .catch(() => setError(true));
      } else {
        setError(true);
      }
    }
  }, [battle, location]);

  if (error) {
    return (<>
      <div className={globalStyles.center} style={{ flexDirection: 'column',  alignItems: 'center' }}>
        <h2>{'Not Found'}</h2>
        <small><sub><Link to={'/'}>{'go home'}</Link></sub></small>
      </div>
    </>)
  }

  if (!battle) {
    return (<>
      <div className={globalStyles.center}>
        <code className={globalStyles.loader} />
      </div>
    </>)
  }
//
  return (<>
    <section
      className={[
        globalStyles.container,
        styles.battle__summary_section
      ].join(' ')}
    >
      <Link to='/' className={styles.goback}>&lang;</Link>

      <h2 className={styles.battle__title}>
        <label>{battle.name}</label>
      </h2>

      <div className={styles.battle__summary_wrapper}>
        <KingdomSummary battle={battle} battleRole={'attacker'} />
        <KingdomSummary battle={battle} battleRole={'defender'} reverse />
      </div>

      <span className={styles.battle__location}>
        {`${battle.battle_type} at `}
        {battle.location ? battle.location + ', ' : ''}
        {battle.region}
      </span>

      <Note>{battle.note}</Note>
    </section>
  </>);
}

export default BattleSummary;
