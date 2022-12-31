import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { BaseMovie } from '../models/movie.model';
import { Text, View } from './Themed';
const placeholder = require('../assets/images/MoviePosterPlaceholder.png');

type MovieCardProps = BaseMovie & {
  onPress: () => void;
};

export const MovieCard = ({ ...props }: MovieCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [imagePath, setImagePath] = useState(placeholder);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(
        'https://image.tmdb.org/t/p/w500' + props.posterPath
      );
      if (res.ok) {
        setImagePath(res.url);
        setLoaded(true);
        return;
      }
    };
    fetchImage();
  }, [props.posterPath]);

  const source = loaded ? { uri: imagePath } : placeholder;
  const title =
    props.title.slice(0, 20) + `${props.title.length > 20 ? '...' : ''}`;

  return (
    <Pressable onPress={props.onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={source} />
        {!loaded && <Text style={styles.title}>{title}</Text>}
      </View>
    </Pressable>
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
  title: {
    position: 'absolute',
    color: '#261c2c',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 8,
    bottom: 0,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
});
