import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    dateContainer: {
        flexDirection: "row",
        // position: "absolute",
        // top: fontScale(105),
        // backgroundColor:"red",
        width:width,
        height:20,

    },
    body: {
        flex:1,
        backgroundColor:colors.white,
    },
    notification: {
        color: colors.white,
        fontSize: fontScale(15),
        textAlign: "center",
        marginTop: fontScale(5)
    },
    bodyScr: {
        // marginTop: fontScale(14)
    },
    sumKpiContainer: { flexDirection: "row", justifyContent: "center" },
    sumKpiTitle: { color: colors.black, fontSize: fontScale(18), fontWeight: "bold" },
    sumKpi: { color: colors.lightBlue, fontSize: fontScale(18), marginLeft: fontScale(2), fontWeight: "bold" },
    detailInfo: {
        paddingVertical: fontScale(10), marginHorizontal: fontScale(17), shadowColor: "#000", backgroundColor: colors.white, marginTop: -fontScale(15), borderRadius: fontScale(17),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
})