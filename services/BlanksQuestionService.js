let _singleton = Symbol();

const BLANKS_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/blanks';
const BLANKS_EID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/exam/EID/blanks';

export default class BlanksQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton essay service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new BlanksQuestionService(_singleton);
        }
        return this[_singleton];
    }

    findEssayById(questionId) {
        return fetch(BLANKS_API_URL + '/' + questionId)
            .then(function(response) {
                return response.json();
            });
    }

    createEssayQuestion(examId, question) {
        return fetch(BLANKS_EID_API_URL.replace('EID', examId), {
            body: JSON.stringify(question),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          }).then(function (response)
        { return response.json(); })
    }

    deleteEssayQuestion(questionId) {
        return fetch(BLANKS_API_URL + '/' + questionId,
          {
            method: 'DELETE'
          });
    }
}
