import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
const DEDetailItem = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{ flexDirection: "row", backgroundColor: props.index % 2 == 0 ? "#EFEFEF" : "white", justifyContent: "center", alignItems: "center", minHeight: fontScale(40) }}>
            <Text style={{ flex: 2 / 9, fontSize: fontScale(14), textAlign: "center" }}>{props.empCode}</Text>
            <Text style={{ flex: 3 / 9, fontSize: fontScale(14), textAlign: "center" }}>{props.empName}</Text>
            <Text style={{ flex: 2 / 9, fontSize: fontScale(14), textAlign: "center" }}>{props.taxCode}</Text>
            <View style={{ flex: 2 / 9 }}>
                {
                    props.status == "new" ?
                        <Text style={{ fontSize: fontScale(16), textAlign: "center", fontWeight: 'bold', color: "#66CC44" }}>New</Text>
                        :
                        <Image source={images.revokeAmount} style={{ width: fontScale(20), height: fontScale(20), alignSelf: "center" }} />
                }

            </View>


        </View>
    )
}
export default DEDetailItem;