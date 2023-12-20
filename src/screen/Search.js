import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import imagepath from '../Constant/imagepath';
import {getSearchMovieRequest} from '../utils/request';
import navigationString from '../Constant/navigationString';

const Search = props => {
  const {navigation} = props;

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(fetchSearchResults, 500);
    setTimeoutId(newTimeoutId);
    return () => {
      if (newTimeoutId) {
        clearTimeout(newTimeoutId);
      }
    };
  }, [searchText]);

  const fetchSearchResults = async () => {
    try {
      if (searchText) {
        const response = await getSearchMovieRequest(searchText);
        const results = response.results;

        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleResultPress(item)}>
      <Text>{item.original_title}</Text>
    </TouchableOpacity>
  );

  const handleResultPress = item => {
    navigation.navigate(navigationString.MOVIE_DETAIL, {movieId: item.id});
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backImage} source={imagepath.back} />
        </TouchableOpacity>
        <TextInput
          autoFocus
          value={searchText}
          onChangeText={value => setSearchText(value)}
          placeholder="Search Movie..."
          style={styles.textinput}
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // borderBottomWidth: 1,
  },
  backImage: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
  textinput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 6,
    flex: 1,
    padding: 12,
  },
  listItem: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  contentContainerStyle: {
    padding: 16,
  },
});
