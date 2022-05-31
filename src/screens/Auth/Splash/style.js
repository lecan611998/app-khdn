import { StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors";
import { height, width } from "../../../utils/Dimenssion";
import { fontScale } from "../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    logo: {
        marginTop: fontScale(height / 15),
        resizeMode: "contain",
        alignSelf: "center",
        width: fontScale(width * 2 / 3)
    },
    shape: {
        resizeMode: "contain",
        alignSelf: "center",
        width: fontScale(width * 2.5 / 5)
    },
    appName: {
        color: colors.white,
        fontSize: fontScale(20),
        textAlign: "center"
    },
    loadingIcon: {
        marginTop: fontScale(15)
    }
})