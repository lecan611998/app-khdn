import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, Image } from 'react-native';
import { fontScale } from '../../utils/Fonts';
import { images } from '../../utils/Images';
import { styles } from './styles';

const GenaralItem = (props) => {
    return (
        <View style={styles.bg}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 4 / 5, fontSize: fontScale(18), fontWeight: "bold", marginBottom: fontScale(10), marginTop: fontScale(15), marginLeft: fontScale(15) }}>{props.shopName}</Text>
                <Image source={props.icon} style={{ flex: 1 / 5, width: fontScale(60), height: fontScale(60), top: fontScale(-20) }} resizeMode="contain" />
            </View>
            <View style={{ flexDirection: "row", marginBottom: fontScale(10) }}>
                <View style={{ flex: 1 / 3 }}></View>
                <Text style={{ flex: 1 / 3, fontSize: fontScale(17), fontWeight: "bold", color: "#CBAD15", textAlign: "center" }}>Thuê bao</Text>
                <Text style={{ flex: 1 / 3, fontSize: fontScale(17), fontWeight: "bold", color: "#CBAD15", textAlign: "center" }}>Doanh thu</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: fontScale(10) }}>
                <Text style={{ color: "#9E9898", fontWeight: "bold", flex: 1 / 3, textAlign: "center" }}>BQ chuẩn: </Text>
                <Text style={{ flex: 1 / 3, fontSize: fontScale(15), fontWeight: "bold", color: "#00BECC", textAlign: "center" }}>{props.standardSub}</Text>
                <Text style={{ flex: 1 / 3, fontSize: fontScale(15), fontWeight: "bold", color: "#00BECC", textAlign: "center" }}>{props.standardRevenue}</Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: fontScale(20) }}>
                <Text style={{ color: "#9E9898", fontWeight: "bold", flex: 1 / 3, textAlign: "center" }}>BQ thực tế: </Text>
                <Text style={{ flex: 1 / 3, fontSize: fontScale(15), fontWeight: "bold", color: "#00BECC", textAlign: "center" }}>{props.realSub}</Text>
                <Text style={{ flex: 1 / 3, fontSize: fontScale(15), fontWeight: "bold", color: "#00BECC", textAlign: "center" }}>{props.realRevenue}</Text>
            </View>
        </View>
    );
}

export default GenaralItem;