import { useState } from 'react'
import { View } from '.';

type Props = {
    children: JSX.Element,
};

function TouchableOpacity({ children }: Props) {
    let [touched, setTouched] = useState(false)
    let handleMouseUp = () => {
        setTimeout(() => {
            setTouched(false)
        }, 150);
    }
    return (
        <View
            style={touched ? styles.btnTouched : styles.btnDefault}
            onMouseDown={() => setTouched(true)}
            onMouseUp={handleMouseUp}
        >
            {children}
        </View>
    )
}

let styles = {
    btnDefault: {
        background: '#ededed',
        padding: '10px 15px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        fontSize: '15px',
        opacity: 1,
        transition: 'opacity 300ms ease',
    },
    btnTouched: {
        opacity: 0.5,
    }
}

export default TouchableOpacity