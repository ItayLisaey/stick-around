import { MaterialIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { movieService } from '../../services/movies.service';
import { shouldWait } from '../../utils/credits.utils';
import { ActivityIndicatorWrapper } from '../ActivityIndicatorWrapper';
import { Text, View } from '../Themed';
import { CreditsBar } from './CreditsBar';
import { TrustMessage } from './TrustMessage';

type WaitingCardProps = {
  movieId: number;
  openSheet: () => void;
};

export const WaitingCard = ({ movieId, openSheet }: WaitingCardProps) => {
  const { data, status } = useQuery(['credits', movieId], () =>
    movieService.credits(movieId)
  );
  const scheme = useColorScheme();
  const should = useMemo(() => shouldWait(data?.movie) ?? 0, [data]);

  const style = (sts: typeof status) => {
    if (sts === 'loading') return styles.loading;
    return styles.container;
  };

  const waitingColor = {
    0: Colors[scheme].indicator.neutral,
    1: Colors[scheme].indicator.positive,
    [-1]: Colors[scheme].indicator.negative,
    2: '#6e85b2',
  };

  return (
    <View
      style={{
        ...style(status),
        backgroundColor: data && waitingColor[should],
      }}
    >
      <ActivityIndicatorWrapper status={status}>
        <View style={styles.msgContainer}>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.title}>Should you wait?</Text>
            <Text style={styles.answer}>{waitingText[should]}</Text>
          </View>
          <Pressable
            style={({ pressed }) =>
              !pressed
                ? styles.voteButton
                : { ...styles.voteButton, backgroundColor: '#e0e0e0' }
            }
            onPress={openSheet}
          >
            <MaterialIcons size={18} name='how-to-vote' color={'black'} />
            <Text style={styles.voteButtonText}>Vote</Text>
          </Pressable>
        </View>
        <CreditsBar type={'after'} count={data?.movie.after!} />
        <CreditsBar type={'during'} count={data?.movie.during!} />
        <TrustMessage trust={data?.movie.trust!} total={data?.movie.total!} />
      </ActivityIndicatorWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 2,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 20,
    // flex: 1,
    // minHeight: 500,
  },
  title: {
    color: 'white',
    width: '100%',
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold',
  },
  msgContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answer: {
    color: 'white',

    width: '100%',
    textAlign: 'left',
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 15,
  },
  voteButton: {
    // borderColor: 'white',
    // borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    aspectRatio: 1,
    display: 'flex',

    // width: '50%',
    padding: 5,

    paddingHorizontal: 10,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voteButtonText: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

const waitingText = {
  0: 'Maybe',
  1: 'Yes',
  [-1]: 'No',
  2: 'Loading...',
};
