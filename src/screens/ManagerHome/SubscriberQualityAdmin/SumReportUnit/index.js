import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, DateView, Body } from '../../../../comps';
import { reportstyles, styles } from './stytes';
import { colors } from '../../../../utils/Colors';
import { text } from '../../../../utils/Text';
import moment from 'moment';
import { fontScale } from '../../../../utils/Fonts';
import { width } from '../../../../utils/Dimenssion';
import { images } from '../../../../utils/Images';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { getReportByUnit } from '../../../../api/manager';
import Toast from 'react-native-toast-message';
import { SumReportU } from "../../../../models/Admin"
import { ToastNotif } from '../../../../utils/Logistics';
import { ReportByUnitItem, ReportByUnitItemFinal } from './ListItem';

//Branch
const SumReportUnit = (props) => {
    const [beginMonth, setBeginMonth] = useState(moment(new Date()).subtract(12, "months").format("MM/YYYY"))
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"))
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const isFocus = useIsFocused();
    const [data, setData] = useState(SumReportU)

    const getData = async (branchCode, shopCode) => {
        setLoading(true);
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

    useEffect(() => {
        getData();
    }, [isFocus])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title={text.reportByUnit} />
            <View style={{ flexDirection: "row" }}>
                <View style={styles.firstDateView}>
                    <DateView dateLabel={beginMonth} width={width / 2 - fontScale(30)} />
                </View>
                <View style={styles.secondDateView}>
                    <DateView dateLabel={endMonth} width={width / 2 - fontScale(30)} />
                </View>
            </View>
            <Body style={reportstyles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                {loading == true ? <ActivityIndicator size="small" color={colors.primary} /> : null}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return <View>
                            <ReportByUnitItem item={item} index={index} onPress={() => navigation.navigate("SumReportUnitShop", { "branchCode": item.shopCode })} />
                            {
                                index == data.data.length - 1 ? <ReportByUnitItemFinal style={{ marginBottom: fontScale(30), marginTop: fontScale(50) }} item={data.general} index={index} /> : null
                            }
                        </View>
                    }}
                />
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
}

export default SumReportUnit;