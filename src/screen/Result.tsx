import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux';
import { View } from '../core-ui'
import { Row, Col, Card, } from 'antd'

const { Meta } = Card

function Result() {
    const state = useSelector((state: RootState) => state)
    const { value, data } = state
    const selectedCurrency: any = useMemo(() => data.find((item: any) => item.value === value.toCurrency), [data])
    const resultData = {
        label: selectedCurrency?.label,
        /* @ts-ignore dont know how to define this*/
        total: value.rate[value.toCurrency],
        code: value.toCurrency
    }
    const { label, total, code } = resultData
    return (
        <View style={styles.container}>
            <Row justify="center" >
                <Col>
                    <Card style={{height: 100}}>
                        <Meta title={label} description={`${total} ${code.toLocaleUpperCase()}`}/>
                    </Card>
                </Col>
            </Row>
        </View>
    )
}

const styles = {
    container: {
        display: 'grid',
        padding: '20px 10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
}

export default Result