import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';
import React, { useState,useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../Assets/Icons/Icon';
import Color from '../../Assets/Color';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../../Redux/Selector/taskSelectors';
export default function Search() {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

 const filteredSelector = useMemo(() => selectFilteredTasks(searchText), [searchText]);
  const filteredTasks = useSelector(filteredSelector);
  const handleClearSearch = () => {
    setSearchText('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>
        {item.title}
        {item.Completed ? ' ✅' : ''}
      </Text>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Icon.BackArrow} style={styles.iconButton} />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Image source={Icon.Search} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Search here"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch}>
              <Image source={Icon.SearchCancel} style={styles.clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Display results */}
      {searchText.length > 0 && (
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.noResults}>No matching tasks found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    paddingTop: 50,
    paddingHorizontal: 15,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#333',
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#999',
    resizeMode: 'contain',
  },
  clearIcon: {
    width: 18,
    height: 18,
    tintColor: '#888',
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    marginTop: 20,
  },
  taskItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  taskDescription: {
    color: '#666',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontSize: 16,
  },
});
