import { FC, Dispatch, SetStateAction } from 'react';
import { TyOperators } from '../App';
import { Button } from '../shared/button';
import styles from './index.module.css';
import { UI_COLORS } from '../../utils/color';

interface IComp {
  operatorList: TyOperators[];
  setOperatorList: Dispatch<SetStateAction<TyOperators[]>>;
  setStartGame: Dispatch<SetStateAction<boolean>>;
}

const listItem: TyOperators[] = ['+', '-', 'X', '/'];

export const Operator: FC<IComp> = ({operatorList, setOperatorList, setStartGame}) => {

  const clickHandler = (item: TyOperators) => {

    const idxNum = operatorList.findIndex(el => el === item);
    let prevList = [...operatorList];

    if(idxNum === -1) {
      prevList = [...prevList, item];
    } 
    else {
      prevList.splice(idxNum, 1);
    }
    
    setOperatorList([...prevList]);
  }

  const renderList = () => {
    return (
      listItem.map(el => {

        const isSelected = operatorList.find(item => item === el);

        return (
          <div key={el} className={styles.operator_item}
            style={isSelected? {
              borderColor: UI_COLORS.primary, backgroundColor: UI_COLORS.primary,
              color: '#fff'
            }: {}}
            onClick={()=> clickHandler(el)}
          >
            {el}
          </div>
        )
      })
    )
  }


  return (
    <div className={styles.container}>

      <div className={styles.operator_list} >
        {renderList()}
      </div>

      <div className={styles.buttonContainer} >
        <Button onClick={()=> setStartGame(true)}
          disabled={operatorList.length > 0 ? false: true}
        > 
          Start Game 
        </Button>
      </div>

    </div>
  )
};