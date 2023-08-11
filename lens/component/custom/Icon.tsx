import React from 'react';
import { FC } from 'react';
import { ColorValue, StyleProp, Text, TextStyle } from 'react-native';
export interface IconProps {
	value: string;
	size?: number;
	color?: ColorValue;
	outlined?: Boolean;
	style?: StyleProp<TextStyle>;
}

const Icon: FC<IconProps> = ({ value, color, size, outlined, style }) => {
	let iconstyle: TextStyle = {
		fontFamily: outlined
			? 'MaterialIconsOutlined-Regular'
			: 'MaterialIcons-Regular',
		fontSize: size ?? 24,
		color: color ?? 'white',
	};
	return <Text style={[iconstyle, style]}>{value}</Text>;
};

export default Icon;
