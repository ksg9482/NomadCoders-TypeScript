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
    ): string => CryptoJS.SHA256(index + previousHash + data + timeStamp).toString()

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timeStamp: number
        ){
            this.index = index,
            this.hash = hash,
            this.previousHash = previousHash,
            this.data = data,
            this.timeStamp = timeStamp
        }
}

const genesisBlock:Block = new Block(0, "123123123", "", "hello", 123456)

let blockChain:Block[] = [genesisBlock]

const getBlockChain = (): Block[]/*return은 Block타입 배열*/ => blockChain

//블록체인 안에서 가장 최근 것
const getLatestBlockChain = (): Block/*return은 Block타입*/ => blockChain[blockChain.length - 1]

const getNewTimeStamp = (): number => Math.round(new Date().getDate() / 1000)

console.log(blockChain)

export {}