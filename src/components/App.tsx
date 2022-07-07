import { useState } from 'react';
import { Operator } from './operator';

export type TyOperators = '+' | '-' | 'X' | '/';

export const App = () => {

  const [operatorList, setOperatorList] = useState<TyOperators[]>(['+']);
  const [startGame, setStartGame] = useState(false);

  if(!startGame) {
    return <Operator 
      operatorList={operatorList} setOperatorList={setOperatorList}
      setStartGame={setStartGame}
    />
  }

  return null;

};