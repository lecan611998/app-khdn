import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { fontScale } from '../../../../../utils/Fonts';
import { images } from '../../../../../utils/Images';
const DEItem = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{
            flexDirection: "row", backgroundColor: props.type == "COMPANY" ? "#FBFDC3" : props.type == "BRANCH" ? "#EBFDFD" : "white", borderBottomWidth: 0.2,
            borderBottomColor: "#cccccc", marginBottom: 0.3, justifyContent: "center", alignItems: "center", minHeight: fontScale(40)
        }}>
            <Text style={{ flex: 3 / 10, fontSize: fontScale(16), textAlign: "center", fontWeight: props.type == "COMPANY" ? "bold" : props.type == "BRANCH" ? "600" : "normal" }}>{props.name}</Text>
            <Text style={{ flex: 2 / 10, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.preMonth}</Text>
            <Text style={{ flex: 2 / 10, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.curMonth}</Text>
            <Text style={{ flex: 2 / 10, fontSize: fontScale(16), textAlign: "center", color: props.type == "COMPANY" ? "#000101" : props.type == "BRANCH" ? "#000101" : "#D19E01" }}>{props.difference}</Text>
            {/* <Text style={{ flex: 1 / 10, fontSize: fontScale(16), textAlign: "center", color: props.type == "company" ? "#000101" : props.type == "branch" ? "#000101" : "#D19E01" }}>*</Text> */}
            <TouchableOpacity style={{ flex: 1 / 10 }} onPress={() => { props.onPress(props.code) }} >

                {
                    props.type == "LEADER" ?
                        <View>
                            <Image source={images.eye} style={{ width: fontScale(25), height: fontScale(25), tintColor: '#cccccc' }} />
                        </View>

                        : null
                }

            </TouchableOpacity>

        </View>
    )
}
export default DEItem;