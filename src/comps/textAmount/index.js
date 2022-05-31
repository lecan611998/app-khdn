import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { fontScale } from '../../utils/Fonts';
const TextAmount = (props) => {
    return (
        <Text style={[{ textAlign: "center" },props.style]}>
            <Text style={{ color: "#000000", fontSize: fontScale(18), fontWeight: "bold" }}>{props.text}</Text>
            <Text style={{ color: "#00BECC", fontSize: fontScale(18), fontWeight: "bold" }}> {props.number}</Text>
        </Text>
    )
}
export default TextAmount;