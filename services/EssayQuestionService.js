let _singleton = Symbol();

const ESSAY_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/essay/';
const ESSAY_EID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/exam/EID/essay';

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

    findEssayById(questionId) {
        return fetch(ESSAY_API_URL + '/' + questionId)
            .then(function(response) {
                return response.json();
            });
    }

}
