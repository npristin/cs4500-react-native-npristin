let _singleton = Symbol();

const EXAM_WIDGET_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/widget';
const EXAM_LID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/lesson/LID/exam';
const ASSIGNMENT_WIDGET_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/assignment';
const ASSIGNMENT_LID_API_URL = 'https://cs4550-java-server-npristin.herokuapp.com/api/lesson/LID/assignment';

export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken) {
            throw new Error('Singleton widget service.')
        }
    }

    static instance() {
        if (!this[_singleton]) {
            this[_singleton] = new WidgetService(_singleton);
        }
        return this[_singleton];
    }


    findAllWidgets() {
        return fetch(EXAM_WIDGET_API_URL)
          .then(function(response){
           return response.json();
          });
    }

    createExamWidget(lessonId, widget) {
        return fetch(EXAM_LID_API_URL.replace('LID', lessonId), {
            body: JSON.stringify(widget),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          }).then(function (response)
        { return response.json(); })
    }

    deleteExamWidget(examId) {
        return fetch(EXAM_WIDGET_API_URL + '/' + examId,
          {
            method: 'DELETE'
          });
    }

    findAssignmentById(assignmentId) {
        return fetch(ASSIGNMENT_WIDGET_API_URL + '/' + assignmentId)
            .then(function(response) {
                return response.json();
            });
    }

    createAssignmentWidget(lessonId, widget) {
        return fetch(ASSIGNMENT_LID_API_URL.replace('LID', lessonId), {
            body: JSON.stringify(widget),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST'
          }).then(function (response)
        { return response.json(); })
    }

    deleteAssignmentWidget(assignmentId) {
        return fetch(ASSIGNMENT_WIDGET_API_URL + '/' + assignmentId,
          {
            method: 'DELETE'
          });
    }
}
