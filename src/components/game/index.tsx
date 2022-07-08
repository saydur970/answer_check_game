import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import { TyOperators } from '../App';
import { Button } from '../shared/button';
import { GameUtil } from './gameUtil';
import styles from './index.module.css';

interface IComp {
  operatorList: TyOperators[];
  setStartGame: Dispatch<SetStateAction<boolean>>;
}

type TyCurrentNumber = {
  first: number; second: number; operator: TyOperators; answer: number;
  optionList: string[];
}

const gameUtil = new GameUtil();


export const Game: FC<IComp> = ({operatorList, setStartGame}) => {

  const [score, setScore] = useState(0);
  const [isGameEnd, setIsGameIsEnd] = useState(false);
  const [currentNumber, setCurrentNumber] = useState<TyCurrentNumber|null>(null);
  const [remainingTime, setRemainingTime] = useState(100);

  const gameEndHandler = () => {
    setIsGameIsEnd(true);
  };

  useEffect(() => {

    if(remainingTime <= 0 || isGameEnd) {
      gameEndHandler();
      return;
    };

    const delayTime = gameUtil.timeReduceCounter(score);

    let timer = setTimeout(() => {
      setRemainingTime(prev => prev - delayTime);
    }, 50);

    return () => {
      clearTimeout(timer)
    }

  }, [remainingTime, isGameEnd, score]);

  // =========================== get next number ===========================
  useEffect(() => {

    // return;

    // -------- if game is end, then set null and retrun ----------
    if(isGameEnd) {
      return;
    }

    let { firstNum, secondNum, answer } = 
    gameUtil.generateCurrentNumber(score);

    const currentOperator = gameUtil.getRandomItem(operatorList) as TyOperators;

    // if currentOperator is /
    if(currentOperator === '/') {
      secondNum = secondNum === 0 ? 1: secondNum;
      firstNum = secondNum * answer;
    }
    // operator is -
    else if(currentOperator === '-') {
      answer = firstNum - secondNum;
    }
    // operator is *
    else if(currentOperator === 'X') {
      answer = firstNum * secondNum;
    }
    // operator is +
    else if(currentOperator === '+') {
      answer = firstNum + secondNum;
    }

    let optionList = {};

    // get index for corrent answer
    let optionAnswerIdx = gameUtil.getRandomNumber({min: 1, max: 2});

    let i = 1;

    while(i <= 2) {

      const optionOperator = gameUtil.getRandomItem(['+', '-']);
      // calculate percentage to add/subtract with answer
      // make sure it's > 0
      const optionPercentage = Math.round(
        Math.max(answer, 10)*gameUtil.getRandomNumber({min: 1, max: 200})/100
      );

      let optionNum = 1;

      // insert corrent answer
      if(optionAnswerIdx === i) {
        optionNum = answer;
      }
      else if(optionOperator === '+') {
        optionNum = answer + optionPercentage;
      }
      else if(optionOperator === '-') {
        optionNum = answer - optionPercentage;
      }

      // if optionNum is already exist
      if(optionList.hasOwnProperty(optionNum)) {
        continue;
      }

      // if optionNum === answer, but this was not planned answer
      if((optionNum === answer) && (optionAnswerIdx !== i)) {
        optionAnswerIdx = i;
      }

      optionList = {
        ...optionList,
        [optionNum.toString()]: true
      }

      i++;

    }

    setCurrentNumber({
      first: firstNum,
      second: secondNum,
      operator: currentOperator,
      answer,
      optionList: [...Object.keys(optionList)]
    });


  }, [score, isGameEnd, operatorList]);


  const optionClickHanlder = (num: string) => {
    const selecedNum = Number(num);
    if(!currentNumber || typeof selecedNum !== 'number') return null;
    if(currentNumber.answer === selecedNum) {
      setScore(score + 1);
      setRemainingTime(100);
    } else {
      setIsGameIsEnd(true);
    }
  };

  const clsIncludedCenter = (cls: string) => [styles.centerDiv, cls].join(' ');


  if(!currentNumber) {
    return <div> loading..... </div>
  }
  
  return (
    <div>

      <div className={clsIncludedCenter(styles.timeContainer)} >

        <div
          style={{
            backgroundColor: 'orange',
            width: `${Math.max(remainingTime - 6, 0)}%`,
          }} 
        >
        </div>

        <div
          style={{
            backgroundColor: '#ccc',
            width: `${Math.min(100 - remainingTime, 94)}%`,
          }} 
        >
        </div>

      </div>


      <div className={clsIncludedCenter(styles.gameBox)} >
        <div className={styles.question} > {currentNumber.first} </div>
        <div className={styles.question} > {currentNumber.operator} </div>
        <div className={styles.question} > {currentNumber.second} </div>
      </div>

      {
        currentNumber.optionList.length === 2 &&
        (
          <div className={clsIncludedCenter(styles.gameBox)} style={{marginTop: '6rem'}} >
            {
              currentNumber.optionList.map(el => (
                <div className={styles.option} key={el} 
                  onClick={()=> optionClickHanlder(el)} 
                >
                  {el}
                </div>
              ))
            }
          </div>
        )
      }

      <div className={clsIncludedCenter(styles.scoreCard)} >
        <div> {score} </div>
      </div>

      {
        isGameEnd && (
          <div className={styles.centerDiv} style={{marginTop: '6rem'}} >
            <Button onClick={()=> setStartGame(false)} >
              Restart
            </Button>
          </div>
        )
      }

    </div>
  )
}