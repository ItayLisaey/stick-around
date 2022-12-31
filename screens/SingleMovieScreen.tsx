import BottomSheet from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { MovieDetails } from '../components/MovieDetails';
import { Text, View } from '../components/Themed';
import { WaitingCard } from '../components/WaitingCard';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useMoviesQuery } from '../services/query/useMoviesQuery';
import { InTheatersStackParamList } from '../types';

export const SingleMovieScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<InTheatersStackParamList, 'Movie'>) => {
  const scheme = useColorScheme();
  const { getOneMovie } = useMoviesQuery();

  const baseMovie = getOneMovie(route.params.id);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, []);

  const openBottomSheet = () => bottomSheetRef.current?.snapToIndex(0);

  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View
      style={{
        backgroundColor: Colors[scheme].background,
        ...styles.container,
      }}
    >
      <MovieDetails
        posterPath={route.params.posterPath}
        overview={route.params.overview}
      />
      <WaitingCard movieId={route.params.id} openSheet={openBottomSheet} />
      <BottomSheet
        detached={true}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        bottomInset={20}
        onChange={handleSheetChanges}
        style={{
          // add horizontal space
          marginHorizontal: 24,
        }}
      >
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // gap: 10,
  },
});
