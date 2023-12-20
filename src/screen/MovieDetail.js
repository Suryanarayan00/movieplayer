import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import imagepath from '../Constant/imagepath';
import {getMovieDetailRequest} from '../utils/request';

const MovieDetail = props => {
  const {navigation} = props;
  const movieId = props.route.params?.movieId;
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    getMovieDetail();
  }, []);
  const getMovieDetail = async () => {
    try {
      const response = await getMovieDetailRequest(movieId);

      if (response) setMovieDetail(response);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backImage} source={imagepath.back} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{movieDetail?.original_title}</Text>
        <Text></Text>
      </View>
      <View style={{flex: 1}}>
        <Image
          style={styles.posterImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w1280${movieDetail.poster_path}`,
          }}
        />
        <View style={styles.detailContainer}>
          <View style={styles.descHeader}>
            <Text style={styles.likedText}>
              {Math.floor(movieDetail?.popularity)} liked
            </Text>
            <Text style={styles.yearText}>
              {movieDetail?.release_date?.split('-')[0]}
            </Text>
            <Text style={styles.ratingText}>
              {movieDetail.adult ? 'A' : '6+'}
            </Text>
            <Text style={styles.yearText}>{movieDetail?.runtime} minute</Text>
          </View>
          <Text>{movieDetail?.overview}</Text>
          <View style={styles.genreContainer}>
            <Text style={{fontWeight: 'bold'}}>Genre: </Text>
            {movieDetail?.genres?.map((item, index) => (
              <Text style={styles.yearText} key={index}>
                {item?.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backImage: {
    height: 24,
    width: 24,
  },
  headerText: {fontWeight: 'bold', fontSize: 16, flex: 1, marginLeft: 8},
  posterImage: {
    maxHeight: 500,
    minHeight: 300,
    resizeMode: 'stretch',
  },
  detailContainer: {padding: 16, flex: 1},
  descHeader: {flexDirection: 'row', alignItems: 'center', paddingBottom: 8},
  likedText: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  yearText: {marginRight: 8, color: '#BFB5B3'},
  ratingText: {
    backgroundColor: '#BFB5B3',
    marginHorizontal: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  genreContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 8,
  },
});

