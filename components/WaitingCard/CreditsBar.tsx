import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Text, View } from '../Themed';

type CreditsBarProps = {
  type: 'after' | 'during';
  count: number;
};

export const CreditsBar = ({ type, count }: CreditsBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.type}>{type.toUpperCase()}</Text>
        <Text style={styles.text}>the credits?</Text>
      </View>
      <CreditsMark count={count} />
    </View>
  );
};

type CreditsMarkProps = {
  count: number;
};
const CreditsMark = ({ count }: CreditsMarkProps) => {
  const scheme = useColorScheme();
  const status = () => {
    if (count > 0) return 1;
    if (count === 0) return 0;
    return -1;
  };

  const icon = {
    1: 'check',
    0: 'question',
    [-1]: 'times',
  } as const;

  const color = {
    1: Colors[scheme].indicator.positive,
    0: Colors[scheme].indicator.neutral,
    [-1]: Colors[scheme].indicator.negative,
  };

  const countLength = count.toString().length;
  const countContainerWidth = countLength * 7;

  return (
    <View style={styles.markContainer}>
      <View
        style={{ ...styles.iconContainer, backgroundColor: color[status()] }}
      >
        <FontAwesome5 style={styles.icon} name={icon[status()]} />
      </View>
      <View style={{ ...styles.countContainer, minWidth: countContainerWidth }}>
        <Text style={styles.count}>{count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 5,
  },
  textContainer: {
    display: 'flex',
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  type: {
    color: 'black',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 4,
  },
  text: {
    color: 'black',
    fontWeight: '300',
    fontSize: 16,
  },

  markContainer: {
    display: 'flex',
    backgroundColor: 'transparent',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    aspectRatio: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  countContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    position: 'absolute',
    height: 20,
    top: -5,
    transform: [{ translateX: -10 }],
  },
  count: {
    marginHorizontal: 5,
    color: 'black',
    fontWeight: '800',
  },
});
