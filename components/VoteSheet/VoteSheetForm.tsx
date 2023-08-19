import { FontAwesome5 } from '@expo/vector-icons';
import { Button, StyleSheet } from 'react-native';
import { VoteForm } from '.';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

type FormProps = {
  form: VoteForm;
  setForm: React.Dispatch<React.SetStateAction<VoteForm>>;
  handleSubmit: () => void;
};

export const VoteSheetForm = ({ form, setForm, handleSubmit }: FormProps) => {
  const scheme = useColorScheme();

  const handleCreditPart = (type: 'during' | 'after') => {
    return () => setForm((prev) => ({ ...prev, type }));
  };

  const handleHasScene = (value: 'true' | 'false') => {
    return () => {
      setForm((prev) => ({ ...prev, value: value === 'true' }));
      if (form.type && form.value) {
        handleSubmit();
      }
    };
  };

  // page 1
  if (form.type === undefined) {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>Which part of the credits?</Text>
        <Button title='During' onPress={handleCreditPart('during')} />
        <Button title='After' onPress={handleCreditPart('after')} />
      </View>
    );
  }

  // page 2

  if (form.type !== undefined && form.value === undefined) {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>
          Is there a scene {form.type} the credits?
        </Text>
        <View
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <Button title='Yes' onPress={handleHasScene('true')} />
          <Button title='No' onPress={handleHasScene('false')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.thanksContainer}>
      <FontAwesome5
        name='thumbs-up'
        color={Colors[scheme].background}
        size={36}
      />
      <Text style={{ ...styles.text, marginTop: 16 }}>Thanks For Voting!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  thanksContainer: {
    display: 'flex',
    backgroundColor: 'transparent',

    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors['light'].text,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
