import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
import { width } from "../../../../utils/Dimenssion";
import { fontScale } from "../../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    firstDateView:{ flex: 1, marginLeft: -width / 5 },
    secondDateView:{ flex: 1, marginLeft: -width / 4 }
});

export const reportstyles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    dateView: {
        flex: 1,
        flexDirection: "row"
    },
    bodyScr: { marginTop: fontScale(10) }
});

export const reportByUnitItem = StyleSheet.create({
    container: {

    },
    icon: {
        resizeMode: "cover",
        width: fontScale(50),
        height: fontScale(50),
        position: "absolute",
        right: fontScale(20),
        top: -fontScale(25),
        zIndex: 100
    },
    shopCode: {
        fontSize: fontScale(17),
        fontWeight: "bold",
        marginLeft: fontScale(10)
    },
    subContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        backgroundColor: "#fff",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: fontScale(10),
        alignSelf: "center",
        borderRadius: fontScale(20),
        width: width - fontScale(20)
    }
});