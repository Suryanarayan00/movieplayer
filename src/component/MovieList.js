import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import navigationString from '../Constant/navigationString';

const MovieList = props => {
  const {navigation, item} = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigationString.MOVIE_DETAIL, {movieId: item.id})
      }
      style={styles.continer}>
      <Image
        style={styles.imageStyle}
        source={{
            uri: `https://image.tmdb.org/t/p/w1280${item.poster_path}`,
          }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{item.original_title}</Text>
        <Text style={styles.releaseDateText}>{item.release_date}</Text>
        <Text style={styles.overviewText} numberOfLines={3}>
          {item.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  continer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    borderColor: 'green',
  },
  imageStyle: {
    height: 'auto',
    width: 100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    resizeMode:'stretch',
  },
  infoContainer: {
    padding: 12,
    justifyContent: 'space-around',
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  releaseDateText: {
    fontSize: 12,
    color: '#BFB5B3',
  },
  overviewText: {
    fontSize: 12,
    flex: 1,
    // color: '#BFB5B3',
  },
});
