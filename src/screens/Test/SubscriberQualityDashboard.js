import moment from 'moment';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header, DateView, Body, MenuItem } from '../../comps';
import { colors } from '../../utils/Colors';
import { width } from '../../utils/Dimenssion';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { text } from '../../utils/Text';

function SubscriberQualityDashboard(props) {
    const [beginMonth, setBeginMonth] = useState(moment(new Date()).subtract(12, "months").format("MM/YYYY"))
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"))
    
    return (
        <SafeAreaView style={substyles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title={text.subscriberQuality} />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginLeft: -width / 6 }}>
                    <DateView dateLabel={'Tháng ' + beginMonth} width={width / 2 - fontScale(50)} />
                </View>
                <View style={{ flex: 1, marginLeft: -width / 4 }}>
                    <DateView dateLabel={'Tháng ' + endMonth} width={width / 2 - fontScale(50)} />
                </View>
            </View>
            <Body style={substyles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <MenuItem style={{ marginTop: fontScale(30) }} title={text.reportByUnit} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.deliveenterpriseamount} width={width - fontScale(60)} onPress={() => navigation.navigate("KPIByMonthDashboard")} />
                <MenuItem style={{ marginTop: fontScale(50) }} title={text.reportByEmp} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.splashshape} width={width - fontScale(60)} onPress={() => navigation.navigate("KPIByMonthDashboard")} />
            </View>
        </SafeAreaView>
    );
}

const substyles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    dateView: {
        flex: 1,
        flexDirection: "row"
    },
    bodyScr: { marginTop: fontScale(27) },
})

export default SubscriberQualityDashboard;