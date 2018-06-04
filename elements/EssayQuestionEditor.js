import React from 'react'
import {View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class EssayQuestionEditor extends React.Component {
  static navigationOptions = { title: "Essay"}
  constructor(props) {
    super(props)
    this.state = {
        question: {
          title: '',
          description: '',
          points: 0
        },
        examId: 1
    }
  }
}

export default EssayQuestionEditor