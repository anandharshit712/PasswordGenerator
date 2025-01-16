import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Form Validation
import * as Yup from 'yup';
import {Formik} from 'formik';

const PosswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 characters !!')
    .max(20, 'Should be max of 16 characters !!')
    .required('This is a required field !!'),
});

export default function App() {
  {
    const [password, setpassword] = useState('');
    const [isPassGenerated, setIsPassGenerated] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);

    const generatePasswordString = (passwordLength: number) => {
      let characterList = '';
      const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
      const digitChar = '0123456789';
      const symbolChar = '!@#$%^&*()_+';

      if (upperCase) characterList += upperCaseChar;

      if (lowerCase) characterList += lowerCaseChar;

      if (numbers) characterList += digitChar;

      if (symbols) characterList += symbolChar;

      const finalPassword = createPassword(characterList, passwordLength);

      setpassword(finalPassword);
      setIsPassGenerated(true);
    };

    const createPassword = (character: string, passwordLength: number) => {
      let result = '';
      for (let i = 0; i < passwordLength; i++) {
        const characterIndex = Math.round(Math.random() * character.length);
        result += character.charAt(characterIndex);
      }
      return result;
      // console.log('Password Generated !!!');
    };

    const resetPasswordState = () => {
      setpassword('');
      setIsPassGenerated(false);
      setLowerCase(false);
      setUpperCase(false);
      setNumbers(false);
      setSymbols(false);
    };

    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            <Formik
              initialValues={{passwordLength: ''}}
              validationSchema={PosswordSchema}
              onSubmit={values => {
                console.log(values);
                generatePasswordString(Number(values.passwordLength));
              }}>
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
                /* and other goodies */
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder="EX. 10"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.heading}>Include Lowercase Letter</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={lowerCase}
                      onPress={() => setLowerCase(!lowerCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase Letter</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={upperCase}
                      onPress={() => setUpperCase(!upperCase)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#29AB87"
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Special Character</Text>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#29AB87"
                    />
                  </View>

                  <View style={styles.formActions}>
                    <TouchableOpacity
                    disabled = {!isValid}
                    style = {styles.primaryBtn}
                    onPress={() => handleSubmit()}
                    >
                      <Text style = {styles.primarybtntext}>Generate Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}
                    >
                      <Text style = {styles.secondarybtntext}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
          {isPassGenerated ? (
              <View style={[styles.card, styles.cardElevated]}>
                <Text style={styles.subTitle}>Result:</Text>
                <Text style={styles.description}>Long Press to copy</Text>
                <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
              </View>
          ) : null}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 15,
  },
  subTitle:{
    fontSize: 25,
    fontWeight: 600,
    marginBottom: 15,
  },
  description:{
    color: '#758283',
    marginBottom: 8,
  },
  generatedPassword:{
    fontSize: 22,
    alignItems: 'center',
    marginBottom: 12,
    color: 'black',
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  heading: {
    fontSize: 12,
    width: '90%',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputStyle: {
    padding: 10,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  primarybtntext: {
    textAlign: 'center',
    fontWeight: 700,
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondarybtntext: {
    paddingTop: 6,
    textAlign: 'center',
    fontWeight: 700,
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: 'white',
    elevation: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowColor: 'black',
  },
});
