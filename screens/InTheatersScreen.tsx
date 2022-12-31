import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MasonryFlashList } from '@shopify/flash-list';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ActivityIndicatorWrapper } from '../components/ActivityIndicatorWrapper';
import { MovieCard } from '../components/MovieCard';

import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import useNowPlaying from '../hooks/UseNowPlaying';
import { InTheatersStackParamList } from '../types';

export default function InTheatersScreen({
  navigation,
}: NativeStackScreenProps<InTheatersStackParamList>) {
  const scheme = useColorScheme();
  const { movies, status, fetchNext } = useNowPlaying();

  return (
    <View style={styles.container}>
      <ActivityIndicatorWrapper status={status}>
        <MasonryFlashList
          renderItem={({ item, index }) => {
            if (index === movies.length - 1) {
              return (
                <ActivityIndicator
                  color={Colors[scheme].background}
                  style={{
                    flex: 1,
                    backgroundColor: Colors[scheme].text,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    borderRadius: 5,
                    height: 200,
                  }}
                />
              );
            }

            return (
              <MovieCard
                key={item.id}
                {...item}
                onPress={() =>
                  navigation.push('Movie', {
                    id: item.id,
                    posterPath: item.posterPath,
                    overview: item.overview,
                    title: item.title,
                  })
                }
              />
            );
          }}
          numColumns={3}
          onEndReached={fetchNext}
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
    borderTopColor: 'transparent',
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',

    // marginBottom: 10,
    backgroundColor: 'transparent',

    // backgroundColor: Colors['light'].tabIconDefault,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
