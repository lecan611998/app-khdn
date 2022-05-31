import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { reportByUnitItem } from './stytes';

export const ReportByUnitItem = (props) => {
    const { item, index } = props;
    return <View style={[reportByUnitItem.container, { marginTop: index > 0 ? fontScale(60) : fontScale(30) }]}>
        <TouchableOpacity style={reportByUnitItem.subContainer} onPress={props.onPress}>
            <Image style={reportByUnitItem.icon} source={item.icon == "BRANCH" ? images.branch : item.icon == "COMPANY" ? images.company : item.icon == "UNIT" ? images.store : null} />
            <Text style={reportByUnitItem.shopCode}>{item.shopCode}</Text>
            <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                <ReportByUnitSubItem flex={1.3} title='SL TBTS' value={item.postpaid} />
                <ReportByUnitSubItem flex={1.3} title='SL cắt huỷ' value={item.revoke} />
                <ReportByUnitSubItem flex={2.9} title='TB chuyển Fone card' value={item.foneCard} />
                <ReportByUnitSubItem flex={1} title='Chặn 2c' value={item.deny2C} />
            </View>
        </TouchableOpacity>
    </View>
}
export const ReportByUnitItemFinal = (props) => {
    const { item, index } = props;
    return <View style={[reportByUnitItem.container, props.style, { marginTop: index > 0 ? fontScale(60) : fontScale(30) }]}>
        <View style={{ ...reportByUnitItem.subContainer, backgroundColor: "#EFFEFF" }} onPress={props.onPress}>
            <Image style={reportByUnitItem.icon} source={item.icon == "BRANCH" ? images.branch : item.icon == "COMPANY" ? images.company : item.icon == "UNIT" ? images.store : null} />
            <Text style={{ ...reportByUnitItem.shopCode, color: "#D19E01" }}>{item.shopCode}</Text>
            <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                <ReportByUnitSubItem flex={1.3} title='SL TBTS' value={item.postpaid} />
                <ReportByUnitSubItem flex={1.3} title='SL cắt huỷ' value={item.revoke} />
                <ReportByUnitSubItem flex={2.9} title='TB chuyển Fone card' value={item.foneCard} />
                <ReportByUnitSubItem flex={1} title='Chặn 2c' value={item.deny2C} />
            </View>
        </View>
    </View>
}


const ReportByUnitSubItem = ({ title, value, flex }) => {
    return <View style={{ flex: flex, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#9E9898", fontWeight: "bold", fontSize: fontScale(14) }}>{title}</Text>
        <Text style={{ color: "#00BECC", fontWeight: "bold", fontSize: fontScale(14), marginTop: fontScale(11) }}>{value}</Text>
    </View>
}

export default {
    ReportByUnitItem,
    ReportByUnitItemFinal
};