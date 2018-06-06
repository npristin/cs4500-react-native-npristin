let _singleton = Symbol();

const CHOICE_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/choice';
const CHOICE_EID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/exam/EID/choice';

export default class ChoicesQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton choices question service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new ChoicesQuestionService(_singleton);
        }
        return this[_singleton];
    }

    findMCQuestionById(questionId) {
        return fetch(CHOICE_API_URL + '/' + questionId)
            .then(function(response) {
                return response.json();
            });
    }

    createMultipleChoiceQuestion(examId, question) {
        return fetch(CHOICE_EID_API_URL.replace('EID', examId), {
            body: JSON.stringify(question),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          }).then(function (response)
        { return response.json(); })
    }

    deleteMultipleChoiceQuestion(questionId) {
        return fetch(CHOICE_API_URL + '/' + questionId,
          {
            method: 'DELETE'
          });
    }
}
