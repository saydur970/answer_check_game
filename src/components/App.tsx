import { useState } from 'react';
import { Operator } from './operator';
import { Game } from './game';

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

  return <Game operatorList={operatorList} setStartGame={setStartGame} />

};