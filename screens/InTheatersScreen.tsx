import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { MovieCard } from '../components/MovieCard';

import { ActivityIndicatorWrapper } from '../components/ActivityIndicatorWrapper';
import { View } from '../components/Themed';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { InTheatersStackParamList } from '../types';

export default function InTheatersScreen({
  navigation,
}: NativeStackScreenProps<InTheatersStackParamList>) {
  const scheme = useColorScheme();

  const { searchResults, status, fetchNext } = useMovieSearch('');

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
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 5,
                  width: 5,
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
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
