import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MovieList from '../component/MovieList';
import imagepath from '../Constant/imagepath';
import navigationString from '../Constant/navigationString';
import {getMovieListRequest} from '../utils/request';

const Home = props => {
  const {navigation} = props;

  const [movielist, setMovielist] = useState([]);
  const [isMoreData, setIsMoreData] = useState(true);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    if (isMoreData) getMovieList(pages);
  }, [pages]);

  const loadMoreMovie = () => setPages(pages + 1);
  const _onRefresh = () => {
    setIsMoreData(true);
    setPages(1);
  };
  const getMovieList = async pages => {
    try {
      const response = await getMovieListRequest(pages);
      const results = response.results;

      if (results.length > 0) {
        if (pages == 1) setMovielist(results);
        else {
          const previousMovie = [...movielist];
          setMovielist([...previousMovie, ...results]);
        }
      } else setIsMoreData(false);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.navigate(navigationString.SEARCH_SCREEN)}
        style={styles.searchContainer}>
        <Image source={imagepath.search} />
        <Text style={styles.searchText}>Search Movie...</Text>
      </TouchableOpacity>
      <FlatList
        onRefresh={_onRefresh}
        refreshing={false}
        showsHorizontalScrollIndicator={false}
        data={movielist}
        renderItem={({item, index}) => (
          <MovieList item={item} navigation={navigation} />
        )}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.loadButton}>
            {movielist.length ? (
              <Text onPress={loadMoreMovie} style={styles.btnText}>
                {isMoreData ? 'load more..' : 'no more data'}
              </Text>
            ) : (
              <Text style={styles.btnText}>try again..</Text>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View>
            <Text>Noting to show. Maybe something went wrong</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop:12,
  },
  searchText: {fontSize: 14, color: '#BFB5B3', paddingLeft: 12},
  contentContainerStyle: {
    padding: 16,
    marginBottom: 500,
  },
  loadButton: {
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: 'bold',
  },
});
