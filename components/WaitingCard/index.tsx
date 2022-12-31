import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Button, StyleSheet } from 'react-native';
import { movieService } from '../../services/movies.service';
import { shouldWait } from '../../utils/credits.utils';
import { ActivityIndicatorWrapper } from '../ActivityIndicatorWrapper';
import { Text, View } from '../Themed';
import { CreditsBar } from './CreditsBar';

type WaitingCardProps = {
  movieId: number;
  openSheet: () => void;
};

export const WaitingCard = ({ movieId, openSheet }: WaitingCardProps) => {
  const { data, status } = useQuery(['credits', movieId], () =>
    movieService.credits(movieId)
  );
  const should = useMemo(() => shouldWait(data?.movie) ?? 0, [data]);

  const style = (sts: typeof status) => {
    if (sts === 'loading') return styles.loading;
    return styles.container;
  };

  return (
    <View
      style={{
        ...style(status),
        backgroundColor: data && waitingColor[should],
      }}
    >
      <ActivityIndicatorWrapper status={status}>
        <Text style={styles.title}>Should you wait?</Text>
        <Text style={styles.answer}>{waitingText[should]}</Text>
        <CreditsBar type={'after'} count={data?.movie.after!} />
        <CreditsBar type={'during'} count={data?.movie.during!} />
        <Button title='vote' onPress={openSheet} />
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
  answer: {
    color: 'white',

    width: '100%',
    textAlign: 'left',
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 15,
  },
});

const waitingText = {
  0: 'Maybe',
  1: 'Yes',
  [-1]: 'No',
  2: 'Loading...',
};

const waitingColor = {
  0: '#6e85b2',
  1: '#4aa96c',
  [-1]: 'hsla(0, 84%, 64%, 1)',
  2: '#6e85b2',
};
