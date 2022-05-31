import moment from 'moment';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { Body, DateView, Header, MenuItem } from '../../../../comps';
import { styles } from './stytes';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { text } from '../../../../utils/Text';
import { images } from '../../../../utils/Images';
import { useNavigation } from '@react-navigation/core';
import { _retrieveData } from '../../../../utils/Storage';

const SubscriberQualityAdminDashboard = (props) => {
    const [beginMonth, setBeginMonth] = useState(moment(new Date()).subtract(12, "months").format("MM/YYYY"))
    const [endMonth, setEndMonth] = useState(moment(new Date()).subtract(1, "months").format("MM/YYYY"))
    const navigation = useNavigation();

    const checkRole = async () => {
        await _retrieveData("loginInfo").then((item) => {
            switch (item.roleType) {
                case 'ROLE_COMPANY':
                    navigation.navigate("SumReportUnit");
                    break;
                case 'ROLE_BRANCH':
                    navigation.navigate("SumReportUnitShop");
                    break;
                case 'ROLE_LEADER':
                    navigation.navigate("SumReportUnitByEmp");
                    break;
                default:
                    break;
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={colors.primary} />
            <Header title={text.subscriberQuality} />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginLeft: -width / 5 }}>
                    <DateView dateLabel={'Tháng ' + beginMonth} width={width / 2 - fontScale(30)} />
                </View>
                <View style={{ flex: 1, marginLeft: -width / 4 }}>
                    <DateView dateLabel={'Tháng ' + endMonth} width={width / 2 - fontScale(30)} />
                </View>
            </View>
            <Body style={styles.bodyScr} />
            <View style={{ flex: 1, backgroundColor: colors.white }}>
                <MenuItem style={{ marginTop: fontScale(30) }} title={text.reportByUnit} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.deliveenterpriseamount} width={width - fontScale(60)} onPress={() => checkRole()} />
                <MenuItem style={{ marginTop: fontScale(50) }} title={text.reportByEmp} titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.splashshape} width={width - fontScale(60)} onPress={() => navigation.navigate("SumReportStaff")} />
            </View>
        </SafeAreaView>
    );
}

export default SubscriberQualityAdminDashboard;