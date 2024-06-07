import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';

const AddUpdateProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params || {};
  const [profile, setProfile] = useState({ Name: '', Phone: '', Department: '', Street: '', City: '', State: '', ZIP: '', Country: '' });
  const [departments, setDepartments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffResponse = await axios.get('http://10.0.0.165:3000/api/staff/staff');
        const departmentResponse = await axios.get('http://10.0.0.165:3000/api/staff/departments');
        console.log('Fetched staff data:', staffResponse.data);
        console.log('Fetched department data:', departmentResponse.data);
        setStaff(staffResponse.data);
        setDepartments(departmentResponse.data);

        if (id) {
          const existingProfile = staffResponse.data.find(p => p.ID === id);
          if (existingProfile) {
            setProfile(existingProfile);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, [id]);

  const saveProfile = async () => {
    try {
      let updatedStaff;
      if (id) {
        updatedStaff = staff.map(p => p.ID === id ? profile : p);
      } else {
        const newProfile = { ...profile, ID: staff.length + 1 };
        updatedStaff = [...staff, newProfile];
      }

      await axios.post('http:/10.0.0.165:3000/api/staff/savestaff', updatedStaff);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Error saving profile. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.Name}
        onChangeText={(text) => setProfile({ ...profile, Name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={profile.Phone}
        onChangeText={(text) => setProfile({ ...profile, Phone: text })}
      />
      <Picker
        selectedValue={profile.Department}
        style={styles.input}
        onValueChange={(itemValue) => setProfile({ ...profile, Department: itemValue })}
      >
        {departments.map(dep => (
          <Picker.Item key={dep.ID} label={dep.Name} value={dep.ID} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={profile.Street}
        onChangeText={(text) => setProfile({ ...profile, Street: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={profile.City}
        onChangeText={(text) => setProfile({ ...profile, City: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={profile.State}
        onChangeText={(text) => setProfile({ ...profile, State: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP"
        value={profile.ZIP}
        onChangeText={(text) => setProfile({ ...profile, ZIP: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={profile.Country}
        onChangeText={(text) => setProfile({ ...profile, Country: text })}
      />
      <Button title="Save" onPress={saveProfile} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default AddUpdateProfile;
