import React from 'react';
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { fontScale } from '../../utils/Fonts';
import { styles } from './styles';

const IFTable = (props) => { //table of screen SubFluct
    const TableItem = (props) => {
        return (
            <View style={{ flexDirection: "row", marginTop: fontScale(10), backgroundColor: props.index % 2 == 0 ? "#EFEFEF" : "white", height: fontScale(40), alignItems: "center" }}>
                <Text style={{ flex: 1 / 3, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.subNumber}</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.date}</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", color: "#515655", fontSize: fontScale(16) }}>{props.money}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{marginBottom:fontScale(25)}}>
            <View style={{ backgroundColor: props.color, height: fontScale(40), alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontWeight: "bold" }}>{props.title}</Text>
            </View>
            <View style={{ flexDirection: "row", height: fontScale(40), alignItems: "center", justifyContent: "center" }}>
            <Text style={{ flex: 1 / 3, textAlign: "center", fontWeight: "bold", color: "#031B1D", fontSize: fontScale(18) }}>Số TB</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", fontWeight: "bold", color: "#031B1D", fontSize: fontScale(18) }}>Ngày</Text>
                <Text style={{ flex: 1 / 3, textAlign: "center", fontWeight: "bold", color: "#031B1D", fontSize: fontScale(18) }}>Số tiền</Text>
            </View>
            <FlatList
                data={props.data}
                keyExtractor={(item, key) => key.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TableItem index={index} date={item.date} money={item.money} subNumber={item.subNumber}/>
                    )

                }}
            />

        </SafeAreaView>
    );
}

export default IFTable;