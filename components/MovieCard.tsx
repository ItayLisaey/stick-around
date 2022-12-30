import { Image, StyleSheet } from 'react-native';
import { BaseMovie } from '../models/movie.model';
import { View } from './Themed';

export const MovieCard = ({ ...props }: BaseMovie) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://image.tmdb.org/t/p/w500' + props.posterPath,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 5,
    // marginRight: 0,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
});
