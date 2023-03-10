import { FontAwesome5 } from '@expo/vector-icons';
import { Button, StyleSheet } from 'react-native';
import { VoteForm } from '.';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

type FormProps = {
  form: VoteForm;
  setForm: React.Dispatch<React.SetStateAction<VoteForm>>;
};

export const VoteSheetForm = ({ form, setForm }: FormProps) => {
  const scheme = useColorScheme();

  // page 1
  if (form.type === undefined) {
    return (
      <View>
        <Text style={styles.text}>Which part of the credits?</Text>
        <Button
          title='During'
          onPress={() => setForm((prev) => ({ ...prev, type: 'during' }))}
        />
        <Button
          title='After'
          onPress={() => setForm((prev) => ({ ...prev, type: 'after' }))}
        />
      </View>
    );
  }

  // page 2

  if (form.type !== undefined && form.value === undefined) {
    return (
      <View>
        <Text style={styles.text}>
          Is there a scene {form.type} the credits?
        </Text>
        <View>
          <Button
            title='Yes'
            onPress={() => setForm((prev) => ({ ...prev, value: true }))}
          />
          <Button
            title='No'
            onPress={() => setForm((prev) => ({ ...prev, value: false }))}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.thanksContainer}>
      <FontAwesome5 name='thumbs-up' color={Colors[scheme].text} size={36} />
      <Text style={{ ...styles.text, marginTop: 16 }}>Thanks For Voting!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
  },
  thanksContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
