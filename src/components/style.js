import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column'
    },
    spinner: {
        width: 200,
        height: 200,
        marginTop: 20,
        alignSelf: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop:30
    },
    example: {
        flex: 1,
        position: 'relative'
    },
    flipViewExample: {
        width: 200,
        height: 200,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    flipView: {
        backgroundColor: '#3bcaff',
        backfaceVisibility: 'hidden',
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipViewBack: {
        position: 'absolute',
        backgroundColor: '#ff4200',
        top: 0,
    }
})