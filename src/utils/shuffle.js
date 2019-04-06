function shuffle(myArr) {       
    var l = myArr.length, temp, index;  
    while (l > 0) {  
       index = Math.floor(Math.random() * l);  
       l--;  
       temp = myArr[l];          
       myArr[l] = myArr[index];          
       myArr[index] = temp;       
    }     
    return myArr;    
 } 

 export default shuffle;