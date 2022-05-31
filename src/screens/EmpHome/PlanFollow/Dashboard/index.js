import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Body, DatePicker, DateView, Header, MenuItem } from '../../../../comps';
import { colors } from '../../../../utils/Colors';
import { width } from '../../../../utils/Dimenssion';
import { fontScale } from '../../../../utils/Fonts';
import { images } from '../../../../utils/Images';
import { text } from '../../../../utils/Text';
import { styles } from './style';
import { useNavigation } from '@react-navigation/core';
import { useEffect } from 'react';
import { _retrieveData, _storeData } from '../../../../utils/Storage';
import { getMonth } from '../../../../utils/Logistics'

const PlanFollowDashboard = (props) => {
    const navigation = useNavigation();
    const [month, setMonth] = useState(moment(new Date()).subtract(0, "months").format("MM/YYYY"));
    const getDatePikerValue = async () => {
        let month = await getMonth()
        if (month != undefined) {
            setMonth(month)
        }
    }
    const onChangeDatePicker = (date) => {
        setMonth(date)
        _storeData("month", date)
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            getDatePikerValue()
        })

    })
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={colors.primary} />
            <Header title="Theo dõi thực hiện KH" />
            <DatePicker month={month} width={width - fontScale(120)} style={{ alignSelf: "center" }} onChangeDate={(date) => onChangeDatePicker(date)} />
            <Body style={{ marginTop: fontScale(27) }} showInfo={false} />
            <View style={styles.body}>
                <MenuItem style={{ marginTop: fontScale(30) }} title="Thực hiện kế hoạch" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.executeplan} width={width - fontScale(60)} onPress={() => navigation.navigate("ExecutePlanDashboard")} />
                <MenuItem style={{ marginTop: fontScale(40) }} title="Danh sách DN đang giao" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.deliveringenterprise} width={width - fontScale(60)} onPress={() => navigation.navigate("DeliveringEnterprise")} />
                <MenuItem style={{ marginTop: fontScale(40) }} title="Năng suất bình quân" titleMenuStyle={{ paddingTop: fontScale(17) }} icon={images.productivitysub} width={width - fontScale(60)} onPress={() => navigation.navigate("ProductivitySub")} />
            </View>
        </SafeAreaView>
    );
}

export default PlanFollowDashboard;