import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { Body, DatePicker, GeneralListItem, Header } from "../../../../comps";
import { styles } from "./style";
import { images } from "../../../../utils/Images";
import moment from "moment";
import {
  getSalaryByMonth,
} from "../../../../api/manager";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../utils/Text";
import { colors } from "../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { _retrieveData } from "../../../../utils/Storage";

const index = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const [month, setMonth] = useState(
    moment(new Date()).subtract(1, "months").format("MM/YYYY")
  );
  const navigation = useNavigation();
  const route = useRoute();
  const [message, setMessage] = useState("");

  const getData = async (month, branchcode, shopCode) => {
    setLoading(true);
    setMessage("");
    setData([]);
    await getSalaryByMonth(month, branchcode, shopCode).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([]);
          setMessage(text.dataIsNull);
        } else {
          setData(data.data.data);
          setGeneralData(data.data.general);
        }
      }

      if (data.status == "failed") {
        setLoading(false);
      }
      if (data.status == "v_error") {
        Toast.show({
          text1: "Cảnh báo",
          text2: data.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack(),
        });
      }
    });
  };

  useEffect(() => {
    const { month, branchCode, shopCode } = route.params?.item;
    setMonth(month);
    getData(month, branchCode, shopCode);
  }, [navigation]);

  const _onChangeMonth = (value) => {
    setMonth(value);
    const { branchCode, shopCode } = route.params?.item;
    getData(value, branchCode, shopCode);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.salaryMonth} />
      <DatePicker
        month={month}
        width={width - fontScale(120)}
        style={{ alignSelf: "center" }}
        onChangeDate={(date) => _onChangeMonth(date)}
      />
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(15), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginVertical: fontScale(10) }}
          />
        ) : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>
          {message && message}
        </Text>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: -fontScale(30) }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View key={index} style={{ marginTop: index == 0 ? -fontScale(50) : 0 }}>
                <GeneralListItem
                  view
                  style={{
                    marginTop: index == 0 ? fontScale(15) : fontScale(30),
                  }}
                  monthSalary
                  textColor={"#2E2E31"}
                  index={item.shopCode}
                  title={item.shopName}
                  titleArray={[
                    ,
                    "Lương CĐ",
                    "CP Duy trì",
                    "CP Data KK",
                    "CP thay sim",
                    "Tổng CP",
                  ]}
                  item={[,
                    item.permanentSalary,
                    item.maintainceSalary,
                    item.incentiveSalary,
                    item.simSalary,
                    item.totalSalary
                  ]}
                  onPress={() =>
                    navigation.navigate("AdminMonthSalaryEmp", {
                      item: {
                        branchCode: route.params?.item.branchCode,
                        shopCode: item.shopCode,
                        month: month,
                      },
                    })
                  }
                />
                {index == data.length - 1 ? (
                  <GeneralListItem
                    view
                    style={{
                      marginBottom: fontScale(100),
                      marginTop: fontScale(38),
                    }}
                    monthSalary
                    index={-1}
                    backgroundColor={"#EFFEFF"}
                    title={generalData.shopName}
                    titleArray={[, "Lương CĐ", "CP Duy trì","CP Data KK", "CP thay sim", "Tổng CP"]}
                    item={generalData&&[,generalData.permanentSalary, generalData.maintainceSalary, generalData.incentiveSalary,generalData.simSalary, generalData.totalSalary]}
                    icon={images.store}
                  />
                ) : null}
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;