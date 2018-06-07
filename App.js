import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'
import MultipleChoiceQuestionWidget from './elements/MultipleChoiceQuestionWidget'
import EssayQuestionWidget from './elements/EssayQuestionWidget'
import AssignmentWidget from './elements/AssignmentWidget'
import { createStackNavigator } from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import ExamWidget from './components/ExamWidget'
import FillInTheBlanksQuestionWidget from './elements/FillInTheBlanksQuestionWidget'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <ScrollView>
        <StatusBar barStyle="light-content"/>
        <FixedHeader/>

        <View style={{paddingTop:10}}>
        <Button title="Courses"
                onPress={() => this.props.navigation
                  .navigate('CourseList') } />
        </View>

      </ScrollView>
    )
  }
}

const App = createStackNavigator({
  Home,
  FixedHeader,
  CourseList,
  ModuleList,
  LessonList,
  WidgetList,
  ExamWidget,
  TrueOrFalseQuestionWidget,
  MultipleChoiceQuestionWidget,
  EssayQuestionWidget,
  FillInTheBlanksQuestionWidget,
  AssignmentWidget
});

export default App;
