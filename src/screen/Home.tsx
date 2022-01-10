import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getData, getRateExchange } from '../redux'
import { Typography, Col, Row, Card, Divider, Button, Cascader, Spin } from 'antd';
import { View } from '../core-ui'
import { RootState } from '../redux';

const { Title } = Typography;
const { Meta } = Card

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [stateValue, setStateValue] = useState({
    fromCurrency: '',
    toCurrency: ''
  })
  const dataState = useSelector((state: RootState) => state)
  const { loading, value, data } = dataState
  
  const dataCurrency = data.length > 2 ? data : []
  
  useEffect(() => {
    if (dataCurrency.length < 2) {
      dispatch(getData())
    }
  }, [])

  const disabledButton = !stateValue.fromCurrency || !stateValue.toCurrency

  const submit = async() => {
    dispatch(getRateExchange({
      ...stateValue
    }, navigate))
  }
  return (
    <View style={styles.container}>
      <Row justify="center" gutter={16} style={{ alignItems: 'end' }}>
        <Col>
          <Title level={5}>From</Title>
          <Cascader
            onChange={(e: any) => setStateValue((state) => ({
              ...state,
              fromCurrency: e[0]
            }))}
            options={dataCurrency}
            allowClear={false}
            value={[stateValue.fromCurrency] || [value.fromCurrency]}
          />
        </Col>
        <Col>
          <Title level={5}>To</Title>
          <Cascader
            onChange={(e: any) => setStateValue((state) => ({
              ...state,
              toCurrency: e[0]
            }))}
            options={dataCurrency}
            allowClear={false}
            value={[stateValue.toCurrency] || [value.fromCurrency]}
          />
        </Col>
        <Button disabled={disabledButton} onClick={() => submit()}>Convert</Button>
      </Row>
      <Divider orientation='center' orientationMargin='20'>List Currency</Divider>
      <Row justify='center' gutter={[16, 16]} >
        {loading ? (
          <Spin size='large'/>
        ) : (
          dataCurrency.map((item: any, i: number) => {
            return (
              <Col key={i} span={7} >
                <Card hoverable style={{ height: 100 }}>
                  <Meta title={item.label} description={item.value} />
                </Card>
              </Col>
            )
          })
        )}
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

export default Home