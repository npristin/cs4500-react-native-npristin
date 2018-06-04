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