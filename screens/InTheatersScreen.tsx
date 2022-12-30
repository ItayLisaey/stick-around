import { MasonryFlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicatorWrapper } from '../components/ActivityIndicatorWrapper';
import { MovieCard } from '../components/MovieCard';

import { View } from '../components/Themed';
import useNowPlaying from '../hooks/UseNowPlaying';
import { RootTabScreenProps } from '../types';

export default function InTheatersScreen({
  navigation,
}: RootTabScreenProps<'InTheaters'>) {
  const [page, setPage] = useState<number>(1);

  const { movies, hasMore, status } = useNowPlaying(page);

  const getMoreMovies = () => {
    if (hasMore) {
      setPage((p) => p + 1);
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicatorWrapper status={status}>
        <MasonryFlashList
          renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
          numColumns={3}
          // onEndReached={getMoreMovies}
          contentContainerStyle={{ padding: 5 }}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={20}
          data={movies}
        />
      </ActivityIndicatorWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',

    // marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,

    // backgroundColor: Colors['light'].tabIconDefault,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
