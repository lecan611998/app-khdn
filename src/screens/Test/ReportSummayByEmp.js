import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, DateView, Body, MenuItem } from '../../comps';
import { colors } from '../../utils/Colors';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { text } from '../../utils/Text';

function ReportSummayByEmp(props) {
    const [beginMonth, setBeginMonth] = useState(moment(new Date()).subtract(12, "months").format("MM/YYYY"))
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"))

    let data = {
        beginMonth: beginMonth,
        endMonth: endMonth,
        data: [{
            empCode: '001',
            empName: 'Nguyễn Văn A',
            shopCode: '2MFHCM1',
            postpaid: 30,
            revoke: 3,
            foneCard: 27,
            deny2C: 66
        },
        {
            empCode: '002',
            empName: 'Nguyễn Văn B',
            shopCode: '2MFHCM1',
            postpaid: 30,
            revoke: 3,
            foneCard: 27,
            deny2C: 66
        },
        {
            empCode: '003',
            empName: 'Nguyễn Văn C',
            shopCode: '2MFHCM1',
            postpaid: 30,
            revoke: 3,
            foneCard: 27,
            deny2C: 66
        }]
    }
    const header = ["Tên NV", "SL TBTS", "SL cắt huỷ", "Fone -> card", "Chặn 2C"]
    return (
        <SafeAreaView style={reportstyles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.reportByEmp} />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginLeft: -width / 6 }}>
                    <DateView dateLabel={'Tháng ' + beginMonth} width={width / 2 - fontScale(50)} />
                </View>
                <View style={{ flex: 1, marginLeft: -width / 4 }}>
                    <DateView dateLabel={'Tháng ' + endMonth} width={width / 2 - fontScale(50)} />
                </View>
            </View>
            <Body style={reportstyles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <View style={[itemStyles.header, { marginRight: fontScale(5) }]}>
                    <FieldItem item={header[0]} width={width * 1 / 4} />
                    <FieldItem item={header[1]} width={width * 1 / 6.3} />
                    <FieldItem item={header[2]} width={width * 1 / 5} />
                    <FieldItem item={header[3]} width={width * 1 / 5} />
                    <FieldItem item={header[4]} width={width * 1 / 5} />
                </View>
                <FlatList
                    data={data.data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => { return <ReportEmpItem item={item} index={index} width={[width / 4, width / 6, width / 5.2, width / 4.7, width / 5]} /> }}
                />
            </View>
        </SafeAreaView>
    );
}

const reportstyles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    dateView: {
        flex: 1,
        flexDirection: "row"
    },
    bodyScr: { marginTop: fontScale(10) }
})

export default ReportSummayByEmp;