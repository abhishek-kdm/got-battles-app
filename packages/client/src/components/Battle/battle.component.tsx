import React, { useEffect, useState, useContext } from 'react';
import { PageProps as GatsbyPageProps, Link } from 'gatsby';

import styles from './battle.module.css';
import globalStyle from '../../styles/global.module.css';

import KingdomSummary from '../__pure__/KingdomSummary/kingdomSummary.component';
import { AppContext } from '../../context';
import { fetchJson, pareseUrlParams } from '../../utils';
import { BATTLE_LIST_API } from '../../configs';

const Note: React.FC<{ children: string }> = ({ children }) => {
  return (children && children.length) ? (<>
    <hr style={{ width: '70%'}} />
    <div className={styles.note}>{children}</div>
  </>) : null;
}

interface BattleSummaryProps extends GatsbyPageProps { }

const BattleSummary: React.FC<BattleSummaryProps> = ({ location }) => {
  const { battle, setBattle } = useContext(AppContext);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!battle) {
      var id = pareseUrlParams(location.search).id;
      if (id) {
        fetchJson(BATTLE_LIST_API(id))
          .then(setBattle)
          .catch(() => setError(true));
      } else {
        setError(true);
      }
    }
  }, [battle, location]);

  if (error) {
    return (<>
      <div className={globalStyle.center} style={{ flexDirection: 'column',  alignItems: 'center' }}>
        <h2>{'Not Found'}</h2>
        <small><sub><Link to={'/'}>{'go home'}</Link></sub></small>
      </div>
    </>)
  }

  if (!battle) {
    return (<>
      <div className={globalStyle.center}>
        <code className={globalStyle.loader} />
      </div>
    </>)
  }

  return (<>
    <section
      className={[
        globalStyle.container,
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
