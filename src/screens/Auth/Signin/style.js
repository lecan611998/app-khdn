import { StyleSheet } from "react-native";
import { colors } from "../../../utils/Colors";
import { height, statusbarHeight, width } from "../../../utils/Dimenssion";
import { fontScale } from "../../../utils/Fonts";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.primary },
    topShape: { flex: 7 },
    authTitle: { marginLeft: fontScale(35) },
    ipUsn: { marginHorizontal: fontScale(35), marginTop: fontScale(40) },
    ipPwd: { marginHorizontal: fontScale(35), marginTop: fontScale(40) },
    bottomShape: { flex: 2, width: width, bottom: -statusbarHeight },
    background: { width: width, height: height, bottom: 0, position: "absolute" },
    mbfLogoContainer: { flex: 1, top: -fontScale(30) },
    logo: { width: width * 2 / 3, alignSelf: "center" },
    forgotText: { alignSelf: "flex-end", fontSize: fontScale(17), color: colors.white },
    forgotTextContainer: {
        justifyContent: "flex-end", marginHorizontal: fontScale(35), width: width / 3, paddingVertical: fontScale(2)
    },
    trigleShape: { width: width + fontScale(20), left: -fontScale(10), top: height * 2 / 3 + fontScale(27) },
    loginButton: { marginTop: fontScale(50) },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        opacity: 0.3
    }
})