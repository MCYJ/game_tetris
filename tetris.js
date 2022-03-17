'use strict'
let table = document.getElementsByTagName('table');
// block 종류별로 생성
// 0: 사각형모양
const blocks = [[0,1,-12,-11]]
// rockbottom을 포함한 tetris matrix(12X25) 생성
//let matrix = Array(24).fill(Array.prototype.concat(1,Array(10).fill(0), 1))
let matrix = []
for(var i=0;i<24;i++){
    matrix.push(Array.prototype.concat(1,Array(10).fill(0), 1));
}
matrix.push(Array(12).fill(1))
// level time : 1000ms 로 시작, 난이도 올라갈수록 짧아져야함
let levelTime = 1000;

// tetris table 생성
for(let i=0; i<20; i++){
    let _tr = document.createElement('tr');
    for(let j=0;j<10;j++){
        let _td = document.createElement('td');
        _tr.append(_td);
    }
    table[0].append(_tr);
}

let someTd = document.getElementsByTagName('td');
let blockIndex = 15;

// 해당 block의 종류를 나타내는 index를 받으면 거기에 맞는 array를 가져와서 forEach로 모든 항목 적용으로 리팩필요
let setRed = () => {
    someTd[blockIndex].style.backgroundImage = 'linear-gradient(red, #ff8585)';
    someTd[blockIndex+blocks[0][1]].style.backgroundImage = 'linear-gradient(red, #ff8585)';
    someTd[blockIndex+blocks[0][2]+2].style.backgroundImage = 'linear-gradient(red, #ff8585)';
    someTd[blockIndex+blocks[0][3]+2].style.backgroundImage = 'linear-gradient(red, #ff8585)';
}

let setWhite = () => {
    someTd[blockIndex].style.backgroundImage = 'linear-gradient(white, white)';
    someTd[blockIndex+blocks[0][1]].style.backgroundImage = 'linear-gradient(white, white)';
    someTd[blockIndex+blocks[0][2]+2].style.backgroundImage = 'linear-gradient(white, white)';
    someTd[blockIndex+blocks[0][3]+2].style.backgroundImage = 'linear-gradient(white, white)';
}
setRed();

let setControl = (event) => {
    setWhite();
    // 두번째 if문에 해당 동작이 가능할지 예상하는 함수를 넣고, return을 boolean으로 받아야함
    // para : block 종류 index, 동작 index
    if(event.key === 'ArrowUp'){ // test용 key
        if(blockIndex-10>=0) {blockIndex -= 10;}
    } else if(event.key === 'ArrowDown'){ // test용 key
        if(isMove(blockToTotal(blockIndex), blocks[0], 12)) {blockIndex += 10;}
    } else if(event.key === 'ArrowLeft'){
        if(isMove(blockToTotal(blockIndex), blocks[0], -1)) {blockIndex--;}
    } else if(event.key === 'ArrowRight'){
        if(isMove(blockToTotal(blockIndex), blocks[0], 1)) {blockIndex++;}
    } else if(event.key === ' '){ // spacebar 클릭 case : blockindex가 가장 밑으로 내려갈 수 있는 수치까지 내려가야함
        while(isMove(blockToTotal(blockIndex), blocks[0], 0)) {blockIndex+=10;console.log(blockIndex)}
        // while 문에서 의도한 blockindex보다 -10만큼 보상
        blockIndex-=10; 
        setBlock(blockToTotal(blockIndex), blocks[0]);
    } else {
        
    }
    console.log(event.key)
    setRed();
}

// 매 시간마다 블록이 내려오는 것 구현
let interval = setInterval(()=>{
    setWhite();
    if(isMove(blockIndex+49+(~~(blockIndex/10)*2), blocks[0], 12)) {
        blockIndex += 10;

        setRed();
    }else{
        setRed();
    //    clearInterval(interval);
        console.log('stopped1');
        setBlock(blockToTotal(blockIndex), blocks[0]);

        blockIndex = 15;
        setRed();
    }
    
},levelTime);

// 다음 진행상황을 미리 계산해서 가능한지 불가능한지 검증
let isMove = (blockIndex, arr, moving) => {
    // matrix 기준 탐색위해 blockindex를 x,y좌표로 변환

    // blockindex + arr[0]에서 moving만큼 움직인 예측 구간에 블록이 없는상태인 경우 true반환
    if(matrix[~~((blockIndex+arr[0]+moving)/12)][(blockIndex+arr[0]+moving)%12] === 0
    && matrix[~~((blockIndex+arr[1]+moving)/12)][(blockIndex+arr[1]+moving)%12] === 0
    && matrix[~~((blockIndex+arr[2]+moving)/12)][(blockIndex+arr[2]+moving)%12] === 0
    && matrix[~~((blockIndex+arr[3]+moving)/12)][(blockIndex+arr[3]+moving)%12] === 0){
        return true;
    }else{
        return false;
    }
}

let blockToTotal = (blockIdx) => {
    return blockIdx+49+(~~(blockIdx/10)*2);
}

// matrix 에 상태반영
let setBlock = (blockIndex, arr) => {
    matrix[~~((blockIndex+arr[0])/12)][(blockIndex+arr[0])%12] = 1;
    matrix[~~((blockIndex+arr[1])/12)][(blockIndex+arr[1])%12] = 1;
    matrix[~~((blockIndex+arr[2])/12)][(blockIndex+arr[2])%12] = 1;
    matrix[~~((blockIndex+arr[3])/12)][(blockIndex+arr[3])%12] = 1;
}