import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const StaffList = ({ navigation }) => {
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/staff/staff');
        console.log('Fetched staff data:', response.data);
        
        const validStaff = response.data.filter(validateStaff);
        console.log('Valid staff data:', validStaff);
        
        setStaff(validStaff);
      } catch (error) {
        console.error('Error fetching staff data:', error);
        setError('Error fetching staff data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const validateStaff = (staff) => {
    return staff.ID && staff.Name && staff.Phone && staff.Department && staff.Street;
  };

  const filteredStaff = staff.filter(s => 
    s.Name && 
    s.Name.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  console.log('Filtered staff:', filteredStaff);

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      {filteredStaff.length > 0 ? (
        <FlatList
          data={filteredStaff}
          keyExtractor={(item) => item.ID.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('AddUpdateProfile', { id: item.ID })}>
              <Text style={styles.staffItem}>{item.Name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>No staff found.</Text>
      )}
      <Button
        title="Add Profile"
        onPress={() => navigation.navigate('AddUpdateProfile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  staffItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default StaffList;