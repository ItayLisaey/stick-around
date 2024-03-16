import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { MovieCard } from '../components/MovieCard';

import { BaseMovie } from '@/models/movie.model';
import { Link, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicatorWrapper } from '../components/ActivityIndicatorWrapper';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useMovieSearch } from '../hooks/useMovieSearch';

export default function InTheatersScreen() {
  const scheme = useColorScheme();
  const navigator = useNavigation();

  const { searchResults, status, fetchNext } = useMovieSearch('');
  const keyExtractor = useCallback((item: BaseMovie, i: number) => `${i}-${item.id}`, []);

  return (
    <View style={styles.container}>
      <ActivityIndicatorWrapper status={status}>
        <View
          style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
            paddingLeft: 10,
            paddingRight: 5,
          }}
        >
          <FlashList
            renderItem={({ item, index }) => {
              if (index === searchResults.length - 1) {
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
                      // width: Dimensions.get('screen').width / 3,
                      height: 200,
                    }}
                  />
                );
              }

              return (
                <Link href={`/(tabs)/movies/${item.id}`}>
                  <MovieCard
                    key={item.id}
                    {...item}
                  />
                </Link>
              );
            }}
            numColumns={3}
            onEndReached={fetchNext}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 5,
                  width: 5,
                }}
              />
            )}
            keyExtractor={keyExtractor}
            estimatedItemSize={20}
            data={searchResults}
          />
        </View>
      </ActivityIndicatorWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
