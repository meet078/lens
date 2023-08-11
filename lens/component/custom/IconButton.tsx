/* eslint-disable react-native/no-inline-styles */
import { FC } from 'react';
import {
	StyleProp,
	TouchableNativeFeedback,
	View,
	ViewStyle,
} from 'react-native';
import React from 'react';
import Icon, { IconProps } from './Icon';
export interface IconButtonProps {
	icon: IconProps,
	value?: string,
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
}
const IconButton: FC<IconButtonProps> = ({
	icon,
	value,
	onPress,
	style,
}) => {
	return (
		<View
			style={[
				{ margin: 5, justifyContent: 'center', alignItems: 'center' },
				style,
			]}>
			<TouchableNativeFeedback
				background={TouchableNativeFeedback.Ripple('#00000099', true)}
				onPress={onPress}>
				<View
					style={{ padding: 3, justifyContent: 'center', alignItems: 'center' }}>
					{icon && <Icon {...icon} />}
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};
export default IconButton;