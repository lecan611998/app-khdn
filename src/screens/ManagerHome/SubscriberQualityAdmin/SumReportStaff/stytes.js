import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    dateView: {
        flex: 1,
        flexDirection: "row"
    },
    bodyScr: { marginTop: -fontScale(10) },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: fontScale(5),marginTop:-fontScale(20)
    },
    headerText: {
        color: colors.lightBlue,
        fontSize: fontScale(14),
        fontWeight: "bold",
        marginHorizontal: fontScale(5)
    },
    dateViewFirst:{ flex: 1, marginLeft: -width / 5 },
    dateViewSecond:{ flex: 1, marginLeft: -width / 4 },
    message:{textAlign:"center",color:colors.primary,marginTop:fontScale(5),fontSize:fontScale(13)},
    fieldItem:{ fontSize: fontScale(13), color: "#00BECC", textAlignVertical: "center", textAlign: "center", fontWeight: "bold", marginVertical: fontScale(10) }
});

export const itemStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between", 
        marginTop: fontScale(10),
        paddingVertical: fontScale(5)
        
    },
    headerText: {
        color: colors.lightBlue,
        fontSize: fontScale(14),
        fontWeight: "bold",
        marginHorizontal: fontScale(5)
    },
    item:{ textAlignVertical: "center", textAlign: "center",fontSize:fontScale(13) },
    message:{ fontSize: fontScale(13), color: colors.primary, textAlign: "center", marginTop: fontScale(5) }
})