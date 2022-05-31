import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, DateView, Body, MenuItem } from '../../comps';
import { colors } from '../../utils/Colors';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { text } from '../../utils/Text';

const ReportByUnitShop = () => {
    const [beginMonth, setBeginMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"))
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(12, "months").format("MM/YYYY"))

    const data = {
        "data": [{
            "icon": 'UNIT',
            "shopCode": '2HCM1',
            "shopName": 'Ho Cho Minh 1',
            "postpaid": 1,
            "revoke": 2,
            "foneCard": 3,
            "deny2C": 4
        },
        {
            "icon": 'UNIT',
            "shopCode": '2HCM1',
            "shopName": 'Ho Cho Minh 1',
            "postpaid": 1,
            "revoke": 2,
            "foneCard": 3,
            "deny2C": 4
        },
        {
            "icon": 'UNIT',
            "shopCode": '2HCM1',
            "shopName": 'Ho Cho Minh 1',
            "postpaid": 1,
            "revoke": 2,
            "foneCard": 3,
            "deny2C": 4
        }],
        "general": {
            "beginMonth": "09/2020",
            "endMonth": "08/2021",
            "shopType": "BRANCH",
            "shopCode": "CTY2",
            "shopName": "Công ty 2",
            "postpaid": 1,
            "revoke": 2,
            "foneCard": 3,
            "deny2C": 4
        }
    }

    return (
        <SafeAreaView style={reportByUnitstyles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.reportByUnit} />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginLeft: -width / 5 }}>
                    <DateView dateLabel={'Tháng ' + beginMonth} width={width / 2 - fontScale(30)} />
                </View>
                <View style={{ flex: 1, marginLeft: -width / 4 }}>
                    <DateView dateLabel={'Tháng ' + endMonth} width={width / 2 - fontScale(30)} />
                </View>
            </View>
            <Body style={reportByUnitstyles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return <View>
                            <ReportByUnitItem item={item} index={index} />
                            {
                                index == data.data.length - 1 ? <ReportByUnitItemFinal style={{marginBottom:fontScale(30)}}item={data.general} index={index} /> : null
                            }
                        </View>
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const ReportByUnitItemFinal = (props) => {
    const { item, index } = props;
    return <View style={[reportByUnitItem.container,props.style, { marginTop: index > 0 ? fontScale(60) : fontScale(30)}]}>
        <Image style={reportByUnitItem.icon} source={item.shopType == "BRANCH" ? images.branch : images.shop} />
        <View style={{...reportByUnitItem.subContainer,backgroundColor:"#EFFEFF" }}>
            <Text style={{ ...reportByUnitItem.shopCode, color: "#D19E01" }}>{item.shopCode}</Text>
            <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                <ReportByUnitSubItem flex={1} title='SL TBTS' value={item.postpaid} />
                <ReportByUnitSubItem flex={1.5} title='SL cắt huỷ' value={item.revoke} />
                <ReportByUnitSubItem flex={3} title='TB chuyển Fone card' value={item.foneCard} />
                <ReportByUnitSubItem flex={1} title='Chặn 2c' value={item.deny2C} />
            </View>
        </View>
    </View>
}

const ReportByUnitItem = (props) => {
    const { item, index } = props;
    return <View style={[reportByUnitItem.container, { marginTop: index > 0 ? fontScale(60) : fontScale(30) }]}>
        <Image style={reportByUnitItem.icon} source={item.icon == "BRANCH" ? images.branch : item.icon == "COMPANY" ? images.company :item.icon == "UNIT" ?images.store : null} />
        <TouchableOpacity style={reportByUnitItem.subContainer}>
            <Text style={reportByUnitItem.shopCode}>{item.shopCode}</Text>
            <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                <ReportByUnitSubItem flex={1} title='SL TBTS' value={item.postpaid} />
                <ReportByUnitSubItem flex={1.5} title='SL cắt huỷ' value={item.revoke} />
                <ReportByUnitSubItem flex={3} title='TB chuyển Fone card' value={item.foneCard} />
                <ReportByUnitSubItem flex={1} title='Chặn 2c' value={item.deny2C} />
            </View>
        </TouchableOpacity>
    </View>
}

const ReportByUnitSubItem = ({ title, value, flex }) => {
    return <View style={{ flex: flex, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#9E9898", fontWeight: "bold", fontSize: fontScale(14) }}>{title}</Text>
        <Text style={{ color: "#00BECC", fontWeight: "bold", fontSize: fontScale(14),marginTop:fontScale(11) }}>{value}</Text>
    </View>
}

const reportByUnitItem = StyleSheet.create({
    container: {

    },
    icon: {
        resizeMode: "cover",
        width: fontScale(50),
        height: fontScale(50),
        position: "absolute",
        right: fontScale(20),
        top: -fontScale(25),
        zIndex: 10
    },
    shopCode: {
        fontSize: fontScale(20),
        fontWeight: "bold",
        marginLeft: fontScale(10)
    },
    subContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        backgroundColor: "#fff",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: fontScale(10),
        alignSelf: "center",
        borderRadius: fontScale(20),
        width: width - fontScale(20)
    }
})

const reportItemStyle = StyleSheet.create({
    container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        backgroundColor: "#fff",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: fontScale(10),
        alignSelf: "center",
        borderRadius: fontScale(20),
        width: width - fontScale(20)

    }
})

// const reportByUnitstyles = StyleSheet.create({
//     container: {
//         backgroundColor: colors.primary,
//         flex: 1
//     },
//     bodyScr: { marginTop: fontScale(10) }
// })


const reportByUnitstyles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    bodyScr: { marginTop: fontScale(10) }
})


export default ReportByUnitShop;