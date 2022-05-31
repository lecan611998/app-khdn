import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { fontScale } from '../../utils/Fonts';
const TopAmItem = (props) => {
    return (
        <View style={{ flexDirection: "row",backgroundColor: props.color == 1 ? "#F9F4B1" :'' }}>
            <Text style={{ flex: 1 / 10, textAlign: "center", fontSize: fontScale(14) }}>{props.stt}</Text>
            <Text style={{ flex: 3 / 10, textAlign: "center", fontSize: fontScale(14) }}>{props.leader}</Text>
            <Text style={{ flex: 2 / 10, textAlign: "center", fontSize: fontScale(14) }}>{props.empCode}</Text>
            <Text style={{ flex: 3 / 10, textAlign: "center", fontSize: fontScale(14) }}>{props.empName}</Text>
            <Text style={{ flex: 1 / 10, textAlign: "center", fontSize: fontScale(14) }}>{props.kpi}</Text>
        </View>
    )
}
export default TopAmItem;