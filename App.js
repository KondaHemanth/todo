import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Keyboard } from 'react-native';

import 'react-native-gesture-handler';

// Fonts
import { useFonts } from 'expo-font';

// Themes
import { themeColor } from './theme'

import Task from './components/Task';
import WriteTaskContainer from './components/WriteTaskContainer'

import { useEffect, useState } from 'react';


export default function App() {
  // Font Load Status
  const [fontLoaded] = useFonts({
    BebasNeue: require('./assets/fonts/BebasNeue-Regular.ttf'),
  });


  const [task, setTask] = useState({ text: '', priority: 0, dueDate: new Date(0) });
  const [taskItems, setTaskItems] = useState([]);

  // Variables
  const [priority, setPriority] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date(0));



  // useEffect(() => {
  //   console.log(selectedDate, new Date(0))
  //   // if (dueDateDisplay !== null) {
  //   // console.log('dueDateDisplay changed:', selectedDate.getUTCDate());
  //   // }
  // }, []);


  if (!fontLoaded) {
    return null
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.text !== '') {
      const newTask = {
        text: task.text,
        priority: priority, // Set the priority from the state
        dueDate: selectedDate.getUTCDate() + ' ' + selectedDate.toLocaleString('en-us', { month: 'short', year: 'numeric' }),
      };

      // console.log(newTask)
      setTaskItems([...taskItems, newTask]);
      setTask({ text: '', priority: 0, dueDate: new Date(0) }); // Reset task state
    }
    setPriority(0);
    setSelectedDate(new Date(0))
  };


  const completeTask = (index) => {
    const newItems = [...taskItems];
    newItems.splice(index, 1);
    setTaskItems(newItems);

  }

  const onDateChange = (event, selectedDate) => {

    if (event.type === 'set') {
      const currentDate = selectedDate;
      setSelectedDate(currentDate);
    }


  };


  return (

    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" style='dark' />
      <View style={styles.tasksWrapper}>

        <Text style={styles.sectionTitle}>Inbox</Text>

        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <Task
                key={index}
                index={index}
                text={item.text}
                priority={`Priority ${item.priority}`}
                completeTask={completeTask}
                dueDate={item.dueDate}
              />
            );
          })}



        </View>

      </View>

      <WriteTaskContainer
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        onDateChange={onDateChange}
        priority={priority}
        setPriority={setPriority}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.background,
  },
  tasksWrapper: {
    marginTop: 100,
    marginHorizontal: 30,
  },
  sectionTitle: {
    color: themeColor.foreground,
    textAlign: 'right',
    fontFamily: 'BebasNeue',
    fontSize: 60,
    fontWeight: "600",
  },
  items: {
    textAlign: 'right',
  },

});
