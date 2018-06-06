let _singleton = Symbol();

const QUESTION_EID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/exam/EID/question';

export default class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton question service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new QuestionService(_singleton);
        }
        return this[_singleton];
    }

    findAllQuestionsForExam(examId) {
        return fetch(
          QUESTION_EID_API_URL
            .replace('EID', examId))
          .then(function (response) {
            return response.json();
          })
    }
}
