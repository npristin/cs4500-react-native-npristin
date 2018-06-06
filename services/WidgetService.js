let _singleton = Symbol();

const WIDGET_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/widget';
const EXAM_LID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/lesson/LID/exam';

export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton module service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new WidgetService(_singleton);
        }
        return this[_singleton];
    }


    findAllWidgets() {
        return fetch(WIDGET_API_URL)
          .then(function(response){
           return response.json();
          });
    }



}