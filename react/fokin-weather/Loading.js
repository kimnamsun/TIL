import React from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function Loading() {
    return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content"/>
        <Text style={styles.emoji}>🌈 ☀️ 🌤 ⛅️ 🌧</Text>
        <Text style={styles.text}>Do you wanna know the weather?</Text>
        <Text style={styles.emoji}>⛈ 🌩 ☔ ❄️ ☃️</Text>
        {/* <Text>Getting the fucking weather</Text> */}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal:  30,
        paddingVertical: 100,
        backgroundColor: "#DD6B70"
    },
    text: {
        fontSize: 20,
        textAlign: "center"
    },
    emoji: {
        fontSize: 50,
        textAlign: "center"
    }

});