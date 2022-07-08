export class GameUtil {

  // ======================== get random number ========================
  getRandomNumber ({min, max}: {min: number; max: number}): number{
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  getRandomItem (item: string[]): string {
    const idx = this.getRandomNumber({min: 0, max: item.length-1});
    return item[idx];
  };


  timeReduceCounter (score: number): number {

    let main = 2;
  
    if(score < 10) {
      main = 1;
    }
    else if(score < 20) {
      main = 1.5;
    }
    else if(score < 30) {
      main = 2;
    }
    else if(score < 40) {
      main = 2.5;
    }
    else if(score < 50) {
      main = 3;
    }
    else if(score < 60) {
      main = 3.5;
    }
    else {
      return 4;
    }

    const subArr = score.toString().split('');
    const sumNum = Number(subArr[subArr.length-1]) || 0;

    let time = (main + sumNum/20).toFixed(1);

    return Number(time);
  
  }


  maxNumberCount (score: number): number {

    if(score < 15) {
      return 9;
    }
    else if(score < 25) {
      return 12;
    }
    else if(score < 40) {
      return 15;
    }
    else if(score < 50) {
      return 20;
    }
    return 20;
  }

  // ===========================================================================
  // ========================= generate current number =========================
  generateCurrentNumber(score: number) {

    const maxNumber = this.maxNumberCount(score);
    let firstNum = 1;
    let secondNum = 1;
    let answer = 1;

    if(score < 10) {
      firstNum = this.getRandomNumber({min: 0, max: maxNumber});
      secondNum = this.getRandomNumber({min: 0, max: maxNumber});
      answer = this.getRandomNumber({min: 0, max: maxNumber});
    }
    else if(score < 20) {
      firstNum = this.getRandomNumber({min: -maxNumber, max: maxNumber});
      secondNum = this.getRandomNumber({min: 0, max: maxNumber});
      answer = this.getRandomNumber({min: -maxNumber, max: maxNumber});
    }
    else {
      firstNum = this.getRandomNumber({min: -maxNumber, max: maxNumber});
      secondNum = this.getRandomNumber({min: -maxNumber, max: maxNumber});
      answer = this.getRandomNumber({min: -maxNumber, max: maxNumber});
    }

    return {
      firstNum, secondNum, answer
    }

  }



}