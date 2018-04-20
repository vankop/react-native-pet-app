import { AppRegistry } from 'react-native';
import { SENDER_ID } from 'react-native-dotenv'
import { PushNotificationIOS, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import App from './App';
import Logger from './src/utils/logger';
import Device from './src/security/device';

AppRegistry.registerComponent('reactnativepetapp', () => App);

Logger.debug('SENDER_ID', SENDER_ID);

PushNotification.configure({
    onRegister: function onRegister({ token }) {
        Logger.info('TOKEN', token);
        Device.token = token;
    },
    onNotification: function onNotify(notification) {
        Logger.info('NOTIFICATION', notification);

        const {
            msgTitle,
            msgBody
        } = notification;

        PushNotification.localNotification({
            title: msgTitle,
            message: msgBody
        });

        if (Platform.OS === 'ios') {
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        } else {
            notification.finish();
        }
    },
    senderID: SENDER_ID
});
