import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
        // flexDirection: 'row',
        // alignItems: 'center',
    },
    containerStyle: {
        borderTopWidth: 0, 
        borderBottomWidth: 0,
    },
    titleStyle: {
        color: '#404040', 
        fontWeight: 'bold', 
        fontSize: 18
    },
    subtitleStyle: {
        color: '#858585', 
        fontSize: 12
    },
    inputText: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    save_btn: {
        justifyContent: 'center',
        backgroundColor: '#59C162',
        alignSelf: 'center',
        alignItems: 'center',
        width: 150,
        height: 45,
    },
    cancel_btn: {
        justifyContent: 'center',
        backgroundColor: '#FF7468',
        alignSelf: 'center',
        alignItems: 'center',
        width: 150,
        height: 45,
    },
    btn_text: {
        fontSize: 18,
        padding: 5,
        color: 'white',
    },
    btn_group: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        fontSize: 16,
        padding: 10,
        height: 45, 
        borderColor: '#DCDCDC', 
        borderWidth: 1,
        marginTop: 10,
    },
    input_group: {
        padding: 25,
    },
})