
import randomIntFromInterval from './randomIntFromInterval';

const generateRandomSolution = (n) =>{
        
        let number = 0;
        if(n > 30){
            number = randomIntFromInterval(1,Math.pow(2,30)-1);
        } else{
            number = randomIntFromInterval(1,Math.pow(2,n)-1);
        }
        var string = number.toString(2);
        while (string.length < n){
            string = Math.round(Math.random()) + string;
        }
        console.log("Solutia generata este:", string, ", cu lungimea: ", string.length);
        return string;
}

export default generateRandomSolution;