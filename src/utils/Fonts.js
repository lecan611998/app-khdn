// responsive font and size
import { RFValue } from "react-native-responsive-fontsize";

export const fontScale = (fSize) => {
    let value =  RFValue(fSize, 812);
    return value;
}