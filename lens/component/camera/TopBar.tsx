import { FC } from 'react';
import { View } from 'react-native';
import IconButton, { IconButtonProps } from '../custom/IconButton';
export interface TopBarProps {
    action: IconButtonProps[],
    hide: boolean
}
const TopBar: FC<TopBarProps> = ({ action, hide }) => {
    return (
        <View>

            <View
                style={{
                    flexDirection: 'row',
                    display: hide ? "none" : "flex",
                    height: 60,
                    padding: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: '#00000055',
                }}>
                {
                    action.map(value => {
                        return <IconButton key={value.icon.value} {...value} />
                    })
                }
            </View>
        </View>
    );
};

export default TopBar;
