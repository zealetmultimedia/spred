import { Text } from 'react-native';
import ThemeStyles from '../../theme/Fonts';


const CustomText = ({ children, style, fontSize, fontWeight, color, marginLeft, marginTop, lineHeight, marginRight, fontFamily, }) => {
  const textStyles = {
    color: color || 'white',
    fontSize: fontSize || 14,
    fontWeight: fontWeight || 'normal',
    lineHeight: lineHeight || 20,
    marginLeft: marginLeft || 0,
    marginRight: marginRight || 0,
    marginTop: marginTop || 0,
    fontFamily: fontFamily || ThemeStyles.textVideo,
    ...style,
  };
  return <Text style={textStyles}>{children}</Text>;
};

export default CustomText;
