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
        fontSize: 16
    },
    textModalStyle: {
        color: '#404040', 
        fontSize: 16
    },
    textModalLocationStyle: {
        color: '#585858', 
        fontSize: 14
    },
    textModalReviewStyle: {
        color: '#989898', 
        fontSize: 12,
        marginTop: 5,
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
    image_btn: {
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        // color: 'blue',
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
    detailText: {
        fontSize: 12,
    },
    detailAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    functionAlign: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -10,
    },
})