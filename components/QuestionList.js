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