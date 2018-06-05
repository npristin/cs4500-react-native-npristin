import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
    console.log(this.state.examId)
    fetch("https://cs4550-java-server-npristin.herokuapp.com/api/exam/"+examId+"/question")
      .then(response => (response.json()))
      .then(questions => this.setState({questions}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
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
                  .navigate("TrueFalseQuestionEditor", {questionId: question.id})
              if(question.type === "choice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id, examId: this.state.examId})
              if(question.type === "essay")
                this.props.navigation
                  .navigate("EssayQuestionEditor", {questionId: question.id, examId: this.state.examId})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}/>))}
      </View>
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