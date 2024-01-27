import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';


// widgets
import DateTimePicker from '@react-native-community/datetimepicker';

import { SvgXml } from 'react-native-svg';

import { useState } from 'react';

import { themeColor } from '../theme'

const writeTaskContainer = (props) => {

    // Icons

    const flagIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#f5f5f5}</style><path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg>';
    const reminderIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>'
    const dueDateIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"/></svg>'


    const color = { '0': themeColor.accentForeground, '1': 'red', '2': 'blue', '3': 'green' };

    // Display triggers
    const [actionContainerDisplay, setActionContainerDisplay] = useState(false);
    const [priorityDisplay, setPriorityDisplay] = useState(false);
    const [dueDateDisplay, setDueDateDisplay] = useState(false)

    const onDateChange = (event, selectedDate) => {
        props.onDateChange(event, selectedDate)
        setDueDateDisplay(false);
    }

    const handleAddTask = () => {
        props.handleAddTask()

        setActionContainerDisplay(false);
        setPriorityDisplay(false);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.writeTaskWrapper}>

            {/* Priority thingy */}

            {priorityDisplay &&
                <View style={styles.priorityCollapsible} >

                    <TouchableOpacity
                        style={styles.priorityLvls}
                        onPress={() => { props.setPriority(1); setPriorityDisplay(false) }}>
                        <Text style={{ color: themeColor.secondaryForeground }}>Priority 1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.priorityLvls}
                        onPress={() => { props.setPriority(2); setPriorityDisplay(false) }}>
                        <Text style={{ color: themeColor.secondaryForeground }}>Priority 2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.priorityLvls}
                        onPress={() => { props.setPriority(3); setPriorityDisplay(false) }}>
                        <Text style={{ color: themeColor.secondaryForeground }}>Priority 3</Text>
                    </TouchableOpacity>
                </View>
            }

            <SafeAreaView style={styles.dueDateCollapsible} >
                {dueDateDisplay && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={props.selectedDate}
                        mode="date" // Set the mode to 'date'
                        is24Hour={true}
                        display="default" // Use 'default' display mode
                        onChange={onDateChange}
                    />
                )}
            </SafeAreaView>

            <View style={styles.writeTaskContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task'}
                    value={props.task.text}
                    onFocus={() => { setActionContainerDisplay(true) }}
                    onBlur={() => { setActionContainerDisplay(false) }}
                    onChangeText={text =>
                        props.setTask({ text: text })} />

                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>

            </View>


            {actionContainerDisplay &&
                <View style={styles.actionContainer}>

                    <ScrollView horizontal={true} style={styles.horizontalScrollView} keyboardShouldPersistTaps="handled">

                        <View style={styles.actionWrapper} >

                            <TouchableOpacity
                                style={[styles.actionables, { backgroundColor: color[props.priority] }]}
                                onPress={() => { setPriorityDisplay(true) }}>

                                <SvgXml xml={flagIcon} width="15" height="15" fill={themeColor.accent} />
                                <Text style={styles.actionText}>Priority {props.priority != 0 ? props.priority : ''}</Text>
                            </TouchableOpacity>

                        </View>


                        <View style={styles.actionWrapper} >

                            <TouchableOpacity style={styles.actionables} >
                                <SvgXml xml={reminderIcon} width="15" height="15" fill={themeColor.accent} />
                                <Text style={styles.actionText}>Reminder</Text>
                            </TouchableOpacity>

                        </View>


                        <View style={styles.actionWrapper} >
                            <TouchableOpacity style={styles.actionables} onPress={() => { setDueDateDisplay(true) }}>
                                <SvgXml xml={dueDateIcon} width="15" height="15" fill={themeColor.accent} />
                                <Text style={styles.actionText}>{props.selectedDate.getTime() == new Date(0).getTime() ? 'Due Date' : props.selectedDate.getUTCDate() + ' ' + props.selectedDate.toLocaleString('en-us', { month: 'short' })}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            }

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    writeTaskContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 25,
    },

    input: {
        borderColor: themeColor.border,
        borderWidth: 1,
        width: '75%',
        padding: 15,
        paddingHorizontal: 20,
        color: themeColor.secondaryForeground,
        backgroundColor: themeColor.background,
        borderRadius: 7,
    },
    addWrapper: {
        backgroundColor: themeColor.primary,
        width: 60,
        height: 60,
        // borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },

    addText: {
        color: themeColor.primaryForeground,
        fontWeight: '600',
        fontSize: 30,
    },

    horizontalScrollView: {
        display: 'flex',

    },

    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: 'black',
        marginTop: 10,
        width: '85%',
        backgroundColor: themeColor.card,
        borderColor: themeColor.border,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 25,
        overflow: 'scroll',
    },

    actionables: {
        backgroundColor: themeColor.cardForeground,
        position: 'relative',
        borderRadius: 5,
        padding: 10,
        color: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginHorizontal: 7,
    },

    actionText: {
        color: themeColor.primaryForeground,
        textAlign: 'center',
        marginLeft: 10,

    },

    priorityCollapsible: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'start',
        paddingVertical: 10,
        paddingHorizontal: 15,
        right: 0,
        borderRadius: 2,
        backgroundColor: themeColor.secondary,
        alignSelf: 'flex-start',
        marginHorizontal: 50,
        bottom: -10,
        zIndex: 10,
        // bottom: 30,
        // display: 'none'
    },

    priorityLvls: {
        margin: 3,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // backgroundColor: 'white'
    }

})

export default writeTaskContainer