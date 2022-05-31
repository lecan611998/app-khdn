import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/Colors";
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
    bodyScr: { marginTop: fontScale(15) },
})