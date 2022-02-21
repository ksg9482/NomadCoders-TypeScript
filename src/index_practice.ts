class Human {
    public name: string
    public age: number
    public gender: string
    constructor(name: string, age: number, gender: string) {
        //이 클래스 속성의 이름인 name은 생성자의 name과 같다는 뜻
        this.name = name
        this.age = age
        this.gender = gender
    }
}
//constructor(생성자)는 메소드인데 클래스가 호출될 때마다 즉, 클래스로 객체를 만들때 마다  호출된다
//interface는 js에 들어가지 않는다.
// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }

const secondKim = new Human('Kim', 20, 'male')

const sayHi = function(person: Human): string {
    //?는 옵션임을 선언, void는 빈공간. 주어진 function에 대한 return나오지 않아야 함.
    return `Hello ${person.name}, You are ${person.age} and You are a ${person.gender}!`
}

console.log(sayHi(secondKim))


export = {}