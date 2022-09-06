export default interface User{
    id: number,
    accountType: boolean,
    firstName: string,
    lastName: string,
    password: string,
    proposition: [{
        allowed: [{
            id: string
        }],
        maxScore: number,
        propName: string,
        proptime: number,
        quiz:[{
            choice:[{
                content: string,
                correct: boolean
            }],
            choiceAmount: number,
            choiceType: 1,
            content: string,
            timeLimit: number
        }],
        quizAmount:number,
        startDate: Date,

    }],
    score: [{
        score: number
    }],
    username: string

}