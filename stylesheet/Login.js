import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        // paddingTop: ( Platform.OS === 'ios' ) ? 80 : 0,
        backgroundColor: 'white',
    },
    container_head: {
        flex: 1.5,
        marginTop: "25%",
        marginLeft: "15%",
        // alignItems: 'center',
        // backgroundColor: 'red',
        // height: 100,
        // width: 300,
    },
    container_form: {
        flex: 3,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "-20%",
        flexDirection: 'column',
        alignContent: 'stretch',
        // backgroundColor: 'blue',
        // height: 100,
        // width: 300,
    },
    container_link: {
        flex: 0.5,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: 'green',
        // height: 100,
        // width: 300,
    },
    container_button: {
        flex: 1,
        width:"70%", 
        alignSelf: 'center',
        justifyContent: 'center', 
        marginBottom: "10%",
        // backgroundColor: 'yellow',
        // height: 100,
        // width: 300,
    },
    text_header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-start",
    },
    text_or: {
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_facebook: {
        width: "80%",
        alignSelf: 'center',
    }
})