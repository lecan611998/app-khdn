import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { fontScale } from '../../utils/Fonts';
const GroupKPIItem = (props) => {
    return (
        <View style={{ flexDirection: "row", backgroundColor: props.type == "COMPANY" ? "#FBFDC3" : props.type == "BRANCH" ? "#EBFDFD" : "white",
         borderBottomWidth: 0.2, borderBottomColor:"#cccccc", marginBottom: 0.3, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ flex: 2 / 7, fontSize: fontScale(16), textAlign: "center", fontWeight: props.type == "COMPANY" ? "bold" : props.type == "BRANCH" ? "600" : "normal" }}>{props.name}</Text>
            <Text style={{ flex: 1 / 7, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.kpi100}</Text>
            <Text style={{ flex: 1 / 7, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.kpi90}</Text>
            <Text style={{ flex: 1 / 7, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.kpi70}</Text>
            <Text style={{ flex: 1 / 7, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.kpilow}</Text>
            <Text style={{ flex: 1 / 7, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.total}</Text>
        </View>
    )
}
export default GroupKPIItem;