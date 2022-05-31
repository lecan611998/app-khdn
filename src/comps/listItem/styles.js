import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container: { flexDirection: "row", marginHorizontal: fontScale(15), marginVertical: fontScale(7) },
    titleContain: { flexDirection: "row", flex: 1},
    mainTitle: { fontWeight: "bold", fontSize: fontScale(19), marginLeft: fontScale(5), color: '#2E2E31', textAlignVertical: "center", width: width / 2 },
    title: { fontWeight: "bold", marginLeft: fontScale(5), color: colors.grey, fontWeight: "bold" },
    price: { textAlign: "right", fontSize: fontScale(15), color: "#00BECC", fontWeight: "bold", alignSelf: "center",bottom:fontScale(3) },
    icon: { width: fontScale(22), alignItems: "center", justifyContent: "center", height: fontScale(22), marginRight: fontScale(5), marginTop: fontScale(1) }
});
