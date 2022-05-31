import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { width } from "../../utils/Dimenssion";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container: { flexDirection: "row", backgroundColor: "#fff", borderRadius: fontScale(8), padding: fontScale(10) },
    selectContainer: { flexDirection: "row", backgroundColor: "#fff", borderRadius: fontScale(8), padding: fontScale(10) },
    monthLabel: { textAlign: "center", flex: 1, color: colors.darkYellow, fontWeight: "bold", fontSize: fontScale(14) },
    arrowDown: { flex: 1 / 10, width: fontScale(20), height: fontScale(20), alignSelf: "center", resizeMode: "contain" },
    bg: {
        backgroundColor: "#F5F5F5",
        borderRadius: fontScale(15),
        marginTop:fontScale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        width: width - fontScale(60),
        height: fontScale(60),
        flexDirection: 'row', alignSelf: "center", justifyContent: "center", alignItems: "center"
    },
})