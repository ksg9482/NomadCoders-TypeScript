import * as CryptoJS from "crypto-js"

class Block {
    public index: number
    public hash: string
    public previousHash: string
    public data: string
    public timeStamp: number
    //class 바깥에서 바로 클래스 내부의 메서드에 접근 ,사용하려면 static을 써야한다
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timeStamp: number
    ): string => CryptoJS.SHA256(index + previousHash + data + timeStamp).toString();

    //블록의 구조가 유효한지 판단
    static validateStructure = (aBlock: Block): boolean => 
        typeof aBlock.index === 'number' && 
        typeof aBlock.hash === 'string' && 
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timeStamp === 'number' &&
        typeof aBlock.data === 'string';
    
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timeStamp: number
    ) {
        this.index = index,
            this.hash = hash,
            this.previousHash = previousHash,
            this.data = data,
            this.timeStamp = timeStamp
    };
};

const genesisBlock: Block = new Block(0, "123123123", "", "hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[]/*return은 Block타입 배열*/ => blockChain;

//블록체인 안에서 가장 최근 것
const getLatestBlock = (): Block/*return은 Block타입*/ => blockChain[blockChain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        data,
        newTimeStamp
    );

    const newBlock: Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data, 
        newTimeStamp
        );

    addBlock(newBlock);

    return newBlock;
};

//들어온 정보로 해시를 생성
const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timeStamp);

//블록이 유효한지 아닌지 판단한다
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)){
        //구조가 유효한가
        return false;
    } else if(candidateBlock.index !== previousBlock.index + 1){
        //현 블럭의 인덱스는 이전 블럭 인덱스 + 1 인가
        return false;
    } else if(candidateBlock.previousHash !== previousBlock.hash){
        //현 블럭의 이전 해시는 이전 블럭의 해시와 동일한가
        return false;
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        //해쉬를 분석해서 실제로 그 해쉬가 있는가 판단
        //블럭에 담긴 해시가 실제로 생성한 해시와 동일한가
        return false;
    } else {
        return true;
    }
 };
//이 함수는 아무것도 리턴하지 않음 
const addBlock = (candidateBlock: Block): void => {
    //지금 넣으려는 블럭과 가장 최근의 블럭을 비교해 유효성검사
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockChain.push(candidateBlock)
    }
}

createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');

console.log(blockChain)

export { };