let _singleton = Symbol();

const TRUE_FALSE_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/truefalse';
const TRUE_FALSE_EID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/exam/EID/truefalse';

export default class EssayQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton essay service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new EssayQuestionService(_singleton);
        }
        return this[_singleton];
    }

    findTrueFalseQuestionById(questionId) {
        return fetch(TRUE_FALSE_API_URL + '/' + questionId)
            .then(function(response) {
                return response.json();
            });
    }

    createTrueFalseQuestion(examId, question) {
        return fetch(TRUE_FALSE_EID_API_URL.replace('EID', examId), {
            body: JSON.stringify(question),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          }).then(function (response)
        { return response.json(); })
    }

    deleteTrueFalseQuestion(questionId) {
        return fetch(TRUE_FALSE_API_URL + '/' + questionId,
          {
            method: 'DELETE'
          });
    }
}
