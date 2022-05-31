import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { getReportByUnit } from '../../../../../../api/manager';
import { Header, DateView, Body } from '../../../../../../comps';
import { SumReportU } from '../../../../../../models/Admin';
import { colors } from '../../../../../../utils/Colors';
import { width } from '../../../../../../utils/Dimenssion';
import { fontScale } from '../../../../../../utils/Fonts';
import { images } from '../../../../../../utils/Images';
import { ToastNotif } from '../../../../../../utils/Logistics';
import { _retrieveData } from '../../../../../../utils/Storage';
import { text } from '../../../../../../utils/Text';

const index = () => {
    const [beginMonth, setBeginMonth] = useState('')
    const [endMonth, setEndMonth] = useState('')
    const isFocus = useIsFocused();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute()
    const [data, setData] = useState(SumReportU)

    const getData = async (branchCode, shopCode) => {
        setLoading(true)

        await getReportByUnit(branchCode, shopCode).then((res) => {
            if (res.status == "success") {
                setLoading(res.loading);
                setData(res.data.data);
                setBeginMonth('Tháng ' + res.data.data.general.beginMonth)
                setEndMonth('Tháng ' + res.data.data.general.endMonth)
            }

            if (res.status == "failed") {
                ToastNotif('Cảnh báo', res.message, 'error', true);
                setLoading(res.loading)
            }
            if (res.status == "v_error") {
                Toast.show({
                    text1: "Cảnh báo",
                    text2: res.message,
                    type: "error",
                    visibilityTime: 100,
                    autoHide: true,
                    onHide: () => navigation.navigate("Home")
                });
            }
        })

    }

    const initial = async () => {
        if (route.params) {
            await getData(route.params.branchCode, route.params?.shopCode);
        } else {
            await _retrieveData("loginInfo").then((data) => {
                getData(data.parentShop, data.shopCode);
            })
        }
    }

    useEffect(() => {
        initial();
        return ()=>{isFocus}
    }, [isFocus])

    return (
        <SafeAreaView style={reportByUnitstyles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.reportByUnit} />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginLeft: -width / 5 }}><DateView dateLabel={beginMonth} width={width / 2 - fontScale(30)} /></View>
                <View style={{ flex: 1, marginLeft: -width / 4 }}><DateView dateLabel={endMonth} width={width / 2 - fontScale(30)} /></View>
            </View>
            <Body style={reportByUnitstyles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return <View>
                            <ReportByUnitItem item={item} index={index} />
                            {index == data.data.length - 1 ? <ReportByUnitItemFinal style={{ marginBottom: fontScale(30) }} item={data.general} index={index} /> : null}
                        </View>
                    }}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    )
}

const ReportByUnitItemFinal = (props) => {
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

const ReportByUnitItem = (props) => {
    const { item, index } = props;
    return <View style={[reportByUnitItem.container, { marginTop: index > 0 ? fontScale(40) : fontScale(10) }]}>
        <Image style={reportByUnitItem.icon} source={item.icon == "BRANCH" ? images.branch : item.icon == "COMPANY" ? images.company : item.icon == "UNIT" ? null : null} />
        <View style={reportByUnitItem.subContainer}>
            <Text style={reportByUnitItem.shopCode}>{item.shopName} ({item.shopCode})</Text>
            <View style={{ flexDirection: "row", marginTop: fontScale(20) }}>
                <ReportByUnitSubItem flex={1.2} title='SL TBTS' value={item.postpaid} />
                <ReportByUnitSubItem flex={1.5} title='SL cắt huỷ' value={item.revoke} />
                <ReportByUnitSubItem flex={2.5} title='TB chuyển Fone card' value={item.foneCard} />
                <ReportByUnitSubItem flex={1} title='Chặn 2c' value={item.deny2C} />
            </View>
        </View>
    </View>
}

const ReportByUnitSubItem = ({ title, value, flex }) => {
    return <View style={{ flex: flex, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#9E9898", fontWeight: "bold", fontSize: fontScale(13) }}>{title}</Text>
        <Text style={{ color: "#00BECC", fontWeight: "bold", fontSize: fontScale(13), marginTop: fontScale(11) }}>{value}</Text>
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
        fontSize: fontScale(16),
        fontWeight: "bold"
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

const reportByUnitstyles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    bodyScr: { marginTop: fontScale(10) }
})


export default index;