import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LastValues = ({ data }) => {
    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }
    const time = timeConverter(data.timestamp)
    return (
        <View style={styles.container}>
            <Text style={styles.txt}>{time} - </Text>
            <Text style={styles.txt}>F&G Index - {data.value}</Text>
            <Text style={styles.txt}> - {data.value_classification}</Text>
        </View>
    )
}

export default LastValues

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8D99AE",
        paddingTop: 2,
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.8,
        shadowRadius: 11.14,

        elevation: 17,
    },
    txt: {
        fontWeight: "bold",
        fontSize: 16

    }
})