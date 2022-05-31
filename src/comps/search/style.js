import { StyleSheet } from "react-native";
import { colors } from "../../utils/Colors";
import { fontScale } from "../../utils/Fonts";

export const styles = StyleSheet.create({
    container:{ backgroundColor: colors.lightGrey, marginHorizontal: fontScale(30), padding: fontScale(5), borderRadius: fontScale(15), marginTop: fontScale(20) },
    leftIco: {
        width: fontScale(28),
        left:fontScale(10),
        marginVertical:fontScale(6),
        height: fontScale(28),
    },
    rightIco: {
        width: fontScale(25),
        height: fontScale(25),
        right:fontScale(10)
    },
})