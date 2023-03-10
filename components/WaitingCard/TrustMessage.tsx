import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TRUST_MESSAGES } from '../../constants/credits.constants';
import { Trust } from '../../types/movies.interface';
import { Text, View } from '../Themed';

export interface TrustMessageProps {
  trust: Trust;
  total: number;
}

export const TrustMessage: React.VFC<TrustMessageProps> = ({
  trust,
  total,
}) => {
  switch (trust) {
    case 1:
      return <TrustItemCertified icon={'certificate'} total={total} />;
    case 2:
      return <TrustItem icon={'users'} message={TRUST_MESSAGES.Users} />;
    case 3:
      return <TrustItem icon={'database'} message={TRUST_MESSAGES.TMDB} />;
    case 4:
      return (
        <TrustItem
          icon={'exclamation-triangle'}
          message={TRUST_MESSAGES[404]}
        />
      );
    default:
      return (
        <TrustItem
          icon={'exclamation-triangle'}
          message={TRUST_MESSAGES[404]}
        />
      );
  }
};

interface TrustItemProps {
  icon: string;
  message: string;
}

export const TrustItem = ({ icon, message }: TrustItemProps) => (
  <View style={styles.root}>
    <View style={styles.iconContainer}>
      <FontAwesome5 style={styles.icon} size={28} name={icon} />
    </View>
    <Text style={styles.color}>{message}</Text>
  </View>
);

interface TrustItemCertifiedProps {
  icon: string;
  total: number;
}

export const TrustItemCertified: React.VFC<TrustItemCertifiedProps> = ({
  icon,
  total,
}) => {
  const totalVotes = (t: number) => {
    if (t < 50 || t > 5000) {
      return '';
    } else {
      return `, and over ${total} user votes`;
    }
  };
  return (
    <View style={styles.root}>
      <View style={styles.iconContainer}>
        <FontAwesome5 style={styles.icon} size={20} name='certificate' />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.color}>Certified</Text>
        <Text style={styles.color}>
          {'These results have been confirmed by our moderators' +
            totalVotes(total)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  iconContainer: {
    backgroundColor: 'transparent',
  },
  textContainer: {
    backgroundColor: 'transparent',
  },
  color: {
    color: 'white',
  },
  icon: {
    paddingRight: 16,
    color: 'white',
  },
});
