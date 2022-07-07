import { FC, ReactNode } from 'react';
import styles from './index.module.css';

interface IComp {
  children: ReactNode;
  onClick?: ()=> void;
  disabled?: boolean;
}

export const Button: FC<IComp> = ({children, onClick, disabled}) => {
  return (
    <button className={styles.btn}
      onClick={onClick? onClick: ()=>{}}
      disabled={disabled||false}
    >
      {children}
    </button>
  )
};