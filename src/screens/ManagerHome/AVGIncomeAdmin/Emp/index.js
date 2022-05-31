import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import {
  Body,
  GeneralListItem,
  Header,
  DoubleMonthPicker,
} from "../../../../comps";
import { styles } from "./style";
import { images } from "../../../../utils/Images";
import moment from "moment";
import {getAvgIncome} from "../../../../api/manager";
import { fontScale } from "../../../../utils/Fonts";
import { StatusBar } from "react-native";
import { text } from "../../../../utils/Text";
import { colors } from "../../../../utils/Colors";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native";
import {useNavigation,useRoute} from "@react-navigation/native";
import Toast from "react-native-toast-message";

const index = (props) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalData, setGeneralData] = useState({});
  const route = useRoute();

  const [beginMonth, setBeginMonth] = useState(
    route.params?.item.beginMonth ||
    moment(new Date()).subtract(3, "months").format("MM/YYYY")
  );
  const [endMonth, setEndMonth] = useState(
    route.params?.item.endMonth ||
    moment(new Date()).subtract(1, "months").format("MM/YYYY")
  );
  const navigation = useNavigation();
  const [notification, setNotification] = useState("");

  const getData = async (beginMonth, endMonth, branchCode, shopCode) => {
    setLoading(true);
    setMessage("");
    await getAvgIncome(beginMonth, endMonth, branchCode, shopCode).then((data) => {
      if (data.status == "success") {
        setLoading(false);
        if (data.length == 0) {
          setData([]);
          setMessage(text.dataIsNull);
        } else {
          setData(data.data.data);
          setNotification(data.data.notification);
          setGeneralData(data.data.general);
        }
      }

      if (data.status == "failed") {
        setLoading(false);
        Toast.show({
          text1: "Cảnh báo",
          text2: data.message,
          type: "error",
          visibilityTime: 1000,
          autoHide: true,
          onHide: () => navigation.goBack(),
        });
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
    }
    );
  };

  useEffect(() => {
    const { beginMonth, endMonth, branchCode, shopCode } = route.params?.item;
    getData(beginMonth, endMonth, branchCode, shopCode);
  }, [beginMonth, endMonth]);

  const errorNotif = (message) => {
    Toast.show({
      text1: "Lưu ý",
      text2: message,
      type: "error",
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const _onChangeMonth = async (value) => {
    const { branchCode, shopCode } = route.params?.item;
    await getData(value.beginMonth, value.endMonth, branchCode, shopCode);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor={colors.primary} />
      <Header title={text.averageIncome} />
      <View style={styles.dateContainer}>
        <DoubleMonthPicker
          beginMonth={beginMonth}
          endMonth={endMonth}
          onChangeMonth={(value) => _onChangeMonth(value)}
          onError={(message) => errorNotif(message)}
        />
      </View>
      <Text style={styles.notification}>{notification}</Text>
      <Body
        showInfo={false}
        style={{ marginTop: fontScale(9), zIndex: -10 }}
      />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        {loading == true ? (
          <ActivityIndicator
            size="small"
            color={colors.primary}
            style={{ marginTop: fontScale(20) }}
          />
        ) : null}
        <Text style={{ color: colors.primary, textAlign: "center" }}>
          {message && message}
        </Text>
        <View>
          <FlatList
            style={{ marginTop: -fontScale(20) }}
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <GeneralListItem
                  view
                  style={{
                    marginTop: index == 0 ? -fontScale(39) : fontScale(50),
                  }}
                  avgSalary
                  totalEmp={"( " + item.totalEmp + " NV" + " )"}
                  // backgroundColor={"#EFFEFF"}
                  textColor={"#2E2E31"}
                  id={item.shopCode}
                  title={item.shopName}
                  titleArray={[
                    ,
                    "Tổng CPCĐ",
                    "BQ CPCĐ",
                    "Tổng CPSP",
                    "BQ CPSP",
                    "Tổng CP",
                    "BQCP",
                  ]}
                  item={[
                    ,
                    item.totalPermanentSalary,
                    item.avgPermanentSalary,
                    item.totalProductSalary,
                    item.avgProductSalary,
                    item.totalSalary,
                    item.avgSalary,
                  ]}
                  // icon={images.branch}
                  //     navigation.navigate("AdminMonthSalaryShop", {
                  // item: {
                  //   "branchCode": item.shopCode,
                  //   "month": month
                  // }
                  //   })
                  onPress={() =>
                    navigation.navigate("AdminAVGIncomeEmp", {
                      item: {
                        branchCode: route.params?.item.branchCode,
                        shopCode: item.shopCode,
                        beginMonth: beginMonth,
                        endMonth: endMonth,
                      },
                    })
                  }
                />
                {index == data.length - 1 ? (
                  <GeneralListItem
                    view
                    style={{
                      marginBottom: fontScale(110),
                      marginTop: fontScale(38),
                    }}
                    avgSalary
                    totalEmp={"( " + generalData.totalEmp + " NV" + " )"}
                    backgroundColor={"#EFFEFF"}
                    id={-1}
                    title={generalData.shopName}
                    titleArray={[
                      ,
                      "Tổng CPCĐ",
                      "BQ CPCĐ",
                      "Tổng CPSP",
                      "BQ CPSP",
                      "Tổng CP",
                      "BQCP",
                    ]}
                    item={
                      generalData && [
                        ,
                        generalData.totalPermanentSalary,
                        generalData.avgPermanentSalary,
                        generalData.totalProductSalary,
                        generalData.avgProductSalary,
                        generalData.totalSalary,
                        generalData.avgSalary,
                      ]
                    }
                    icon={images.store}
                  />
                ) : null}
              </View>
            )}
          />
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default index;
