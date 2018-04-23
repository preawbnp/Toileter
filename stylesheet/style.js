import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    // container
    container_default: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    // text
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'normal',
        margin: 20
    },
    text_header: {
        fontSize: 30,
        fontWeight: 'bold',
        // marginLeft: 10,

    },
    text_error: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    text_or: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    // button
    btn_facebook: {
        position: 'relative',
        marginTop: 10,
        margin: 50
    },
    btn_start_welcome: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#74DAFF',
        // opacity: 0.8,
        marginBottom: 80,
        borderRadius: 10,
        borderColor: '#ffffff'
    },

    // image
    
    container_auth: {
        marginTop: 100,
        marginLeft: 40,
        marginRight: 40
    }, 
    container_input_auth: {
        marginLeft: -10,
        marginRight: -10,
        marginTop: 20
    },
    text_input: {
        fontSize: 10
    },

})
