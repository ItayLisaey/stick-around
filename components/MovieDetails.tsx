import { Image, ScrollView, StyleSheet } from 'react-native';
import { Text, View } from './Themed';

type MovieDetailsProps = {
  overview: string;
  posterPath: string;
};

export const MovieDetails = ({ overview, posterPath }: MovieDetailsProps) => {
  const imagePath = 'https://image.tmdb.org/t/p/w500' + posterPath;
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imagePath }} />
      </View>
      <ScrollView>
        <Text style={styles.overview}>{overview}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // maxHeight: 225,
    // backgroundColor: 'red',
    borderRadius: 5,
    padding: 15,
    marginBottom: 5,
  },
  overview: {
    flex: 1,
    fontSize: 15,
    fontWeight: '300',
    paddingHorizontal: 15,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    aspectRatio: 0.75,
  },
  imageContainer: {
    borderRadius: 7,
    overflow: 'hidden',
  },
});
