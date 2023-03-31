import { Feather } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

type ErrorMessageProps = {
  message?: string;
  content?: string | JSX.Element;
};

export const ErrorMessage = ({ message, content }: ErrorMessageProps) => {
  const schema = useColorScheme();
  if (!message) {
    return null;
  }

  const contentElement =
    typeof content === 'string' ? (
      <Text style={styles.content}>{content}</Text>
    ) : (
      content
    );

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: Colors[schema].background,
      }}
    >
      <Feather size={36} color={Colors[schema].text} name='alert-triangle' />
      <Text style={styles.message}>{message}</Text>
      {message && contentElement}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    maxWidth: 300,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});
