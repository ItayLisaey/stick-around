import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Text, View } from './Themed';

type ActivityIndicatorWrapperProps = {
  status: 'loading' | 'success' | 'error';
};

export const ActivityIndicatorWrapper = ({
  status,
  children,
}: React.PropsWithChildren<ActivityIndicatorWrapperProps>) => {
  const scheme = useColorScheme();

  const getActivityIndicatorColor = () => {
    if (Platform.OS === 'ios') {
      return undefined;
    }
    return Colors[scheme].text;
  };

  const getActivityIndicatorSize = () => {
    if (Platform.OS === 'ios') {
      return undefined;
    }
    return 36;
  };

  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          color={getActivityIndicatorColor()}
          size={getActivityIndicatorSize()}
        />
      </View>
    );
  }
  if (status === 'error') {
    return (
      <View style={styles.container}>
        <Feather
          name='alert-triangle'
          size={36}
          style={{
            color: '#bc413e',
          }}
        />
        <Text
          style={{
            marginTop: 16,
            color: '#bc413e',
            maxWidth: 200,
            textAlign: 'center',
          }}
        >
          There was an error getting the data. Please try again later.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // top: '50%',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
