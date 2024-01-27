import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"

import { themeColor } from '../theme'


const Task = (props) => {
    const color = {'Priority 0': themeColor.accentForeground, 'Priority 1': 'red', 'Priority 2': 'blue', 'Priority 3': 'green'};
    // console.log(props.dueDate)

    return(
        <View style={styles.taskItem}>
            <View style={styles.itemLeft}>
                <Text style={styles.taskLabel}>{props.text}</Text>
                {props.dueDate !== new Date(0).getUTCDate() + ' ' + new Date(0).toLocaleString('en-us',{month:'short', year: 'numeric'}) ? <Text style={styles.dueDate}>{props.dueDate}</Text> : null}
            </View>
            
            <TouchableOpacity onPress={() => {props.completeTask(props.index)}}>
                <View style={[styles.checkbox, {borderColor: color[props.priority]}]} />
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    taskItem:{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: colors.primaryForeground,
        paddingVertical: 20,
        borderTopColor: themeColor.background,
        borderBottomColor: themeColor.primaryForeground,
        borderLeftColor: themeColor.background,
        borderRightColor: themeColor.background,
        borderWidth: 2,
        // borderColor: '#000000',
        // borderWidth: 2
    },
    itemLeft: {
        paddingHorizontal:10,
    },
    taskLabel:{
        color: themeColor.foreground,
        fontSize: 20,
        fontWeight: '500',
    },
    dueDate:{
        color: themeColor.accentForeground,
        textTransform: 'capitalize',
        textAlign: 'right',
    },
    checkbox:{
        width: 20,
        height: 20,
        borderWidth: 3,
        borderRadius: 10,
    }

});

export default Task;