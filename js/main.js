const trans =[], lim = String.fromCodePoint(0x22A2), empty = String.fromCodePoint(0x2293);
let input = [lim,'a','a','b','b','c','c','c',empty,empty,empty],i=1,flag=false,isFinished = false;
console.log(String.fromCodePoint(0x22A2));
let q0 = new State("q0",trans,true,false);
let q1 = new State("q1",trans,false,false);
let q2 = new State("q2",trans,false,false);
let q3 = new State("q3",trans,false,false);
let q4 = new State("q4", trans,false,false);
let qf = new State("qf",trans,false,true);
trans.push(new Tran(q0,'a','X','R',q1));
trans.push(new Tran(q0,'Y','Y','R',q4));
trans.push(new Tran(q1,'a','a','R',q1));
trans.push(new Tran(q1,'Y','Y','R',q1));
trans.push(new Tran(q1,'Y','Y','R',q1));
trans.push(new Tran(q1,'b','Y','R',q2));
trans.push(new Tran(q2,'b','b','R',q2));
trans.push(new Tran(q2,'Z','Z','R',q2));
trans.push(new Tran(q2,'c','Z','L',q3));
trans.push(new Tran(q3,'a','a','L',q3));
trans.push(new Tran(q3,'Y','Y','L',q3));
trans.push(new Tran(q3,'b','b','L',q3));
trans.push(new Tran(q3,'Z','Z','L',q3));
trans.push(new Tran(q3,'X','X','R',q0));
trans.push(new Tran(q4,'Y','Y','R',q4));
trans.push(new Tran(q4,'Z','Z','R',q4));
trans.push(new Tran(q4,empty,empty,'L',qf));
let current = q0;
function init(){
  document.open();
  for(let j=0;j<input.length;j++){
    document.write("<p id=\"ani"+j+"\">"+input[j]+"</p>");
  }
  document.close();
}
function resetStyle(){
  for(let j=0;j<input.length;j++)
  document.getElementById("ani"+j).style= "color:black";
}
function Turn() {
  flag=false;
  for(let j=0;j<current.trans.length;j++){
    if(current==current.trans[j].start){
      if(current.trans[j].input == input[i]){
        input[i]=current.trans[j].output;
        resetStyle();
        document.getElementById("ani"+i).innerHTML = input[i];
        document.getElementById("ani"+i).style = "color:red";
        flag=true;
        console.log(input[i]);
        if(current.trans[j].dir=='R'){
          i++;
        }
        else {
          i--;
        }
        current = current.trans[j].end;
        break;
      }
    }
  }
  if(current.final&&!flag){
    document.getElementsByTagName("h1")[0].innerHTML="Succes";
  }
  if(!(flag || current.final)){
    document.getElementsByTagName("h1")[0].innerHTML = "Fail";
  }
  console.log(input);

}
init();
document.addEventListener('keypress', logKey);

function logKey(e) {
  if(e.keyCode==32)
  Turn();
}
