import React, { useContext } from 'react';
import './battleSummary.style.css';

import { AppContext } from '../../context';
import KingdomSummary from '../__pure__/KingdomSummary/kingdomSummary.component';


const Note: React.FC<{ children: string }> = ({ children }) => {
  return (children && children.length) ? (<>
    <hr style={{ width: '70%'}} />
    <div className={'note'}>{children}</div>
  </>) : null;
}

const GoBack = (props: React.HTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={'go-back'}>&lang;</button>
);



interface BattleSummaryProps { }
 
const BattleSummary: React.SFC<BattleSummaryProps> = () => {
  const { battle, setBattle } = useContext(AppContext);

  return (<>
    <section id={'battle-summary-section'} className={'container'}>
      <GoBack onClick={() => { setBattle(null) }} />

      <h2 className='battle-title'>
        <label>{battle.name}</label>
      </h2>

      <div className='battle-summary-wrapper'>
        <KingdomSummary battle={battle} battleRole={'attacker'} />
        <KingdomSummary battle={battle} battleRole={'defender'} reverse />
      </div>

      <span className={'battle-location'}>
        {`${battle.battle_type} at `}
        {battle.location ? battle.location + ', ' : ''}
        {battle.region}
      </span>

      <Note>{battle.note}</Note>
    </section>
  </>);
}
 
export default BattleSummary;
