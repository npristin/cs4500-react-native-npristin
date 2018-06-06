import React, {Component} from 'react'
import {View, Alert, ScrollView, StyleSheet} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import WidgetService from "../services/WidgetService";
import QuestionService from "../services/QuestionService"

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1
    }

    this.widgetService = WidgetService.instance();
    this.questionService = QuestionService.instance();
  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
    console.log(this.state.examId)
    this.questionService
        .findAllQuestionsForExam(examId)
        .then(questions => this.setState({questions}))
  }

  componentWillReceiveProps(newProps) {
      const {navigation} = newProps;
      console.log(newProps)

      this.questionService
        .findAllQuestionsForExam(this.state.examId)
        .then(questions => this.setState({questions}))
  }

  deleteExam() {
    this.widgetService
        .deleteExamWidget(this.state.examId)
        .then(this.props.navigation.navigate('WidgetList', {widgets: []}))
  }

  render() {
    return(
      <ScrollView style={StyleSheet.absoluteFill}>
      <Text h4>Add Exam Question</Text>
      {questions.map( (question, index) => (
        <ListItem
          onPress={() => this.props.navigation.navigate(question.nav, {examId: this.state.examId})}
          key={index}
          leftIcon={{name: question.icon}}
          subtitle={question.subtitle}
          title={question.title}/>
      ))}
      <Text h4>Questions</Text>
      {this.state.questions.map(
        (question, index) => (
          <ListItem
            onPress={() => {
              if(question.type === "truefalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor", {questionId: question.id, examId: this.state.examId})
              if(question.type === "choice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id, examId: this.state.examId})
              if(question.type === "essay")
                this.props.navigation
                  .navigate("EssayQuestionEditor", {questionId: question.id, examId: this.state.examId})
              if(question.type === "blanks")
                this.props.navigation
                  .navigate("FillInTheBlanksQuestionEditor", {questionId: question.id, examId: this.state.examId})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}/>))}
      <View style={{paddingTop:10, paddingBottom: 15}}>
      <Button backgroundColor="red"
               color="white"
               title="Delete Exam"
               onPress={() => this.deleteExam()}/>
      </View>
      </ScrollView>
    )
  }
}
export default QuestionList

const questions = [
  {	title: 'Multiple choice',
    icon: 'list',
    nav: 'MultipleChoiceQuestionEditor'},
  {	title: 'Fill-in the blanks',
    icon: 'code',
    nav: 'FillInTheBlanksQuestionEditor'},
  {	title: 'True or false',
    icon: 'check',
    nav: 'TrueFalseQuestionEditor'},
  {	title: 'Essay',
    icon: 'subject',
    nav: 'EssayQuestionEditor'}]