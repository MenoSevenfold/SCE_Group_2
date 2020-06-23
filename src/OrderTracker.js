import React, { useEffect, useState }                                  from 'react'
import { server }                                                      from './api'
import { Link }                                                        from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
}                                                                      from 'recharts'
import {
  boundaryStyle, createChartDefaultDataByDate, getMonthsNames,
} from './utilities'
import OrderCard                                                       from './OrderCard'
import { differenceInCalendarDays }                                    from 'date-fns'

const OrderTracker = ({ match }) => {
  const [orderList, setOrderList] = useState([])

  const calcPrice                        = (order) => {
    const priceForDay = order.price / 30
    const days        = differenceInCalendarDays(
      new Date(order.toDate),
      new Date(order.fromDate),
    )
    return priceForDay * days
  }
  const creatChartApartmentsDataByMonths = (orderList) => {
    const dataList = createChartDefaultDataByDate()
    orderList.forEach((order) => {
      const orderDataIndex = dataList.findIndex(
        (data) =>
          data.name ===
          getMonthsNames()[new Date(order.purchaseDate).getMonth()],
      )
      dataList[orderDataIndex].sales += calcPrice(order)
    })
    return dataList
  }

  const createChartApartmentsDataByKey      = (orderList, key) => {
    const dataList = []
    orderList.forEach((order) => {
      const orderDataIndex = dataList.findIndex(
        (data) => data.name === order[key],
      )
      if (orderDataIndex === -1) {
        dataList.push({ name: order[key], sales: calcPrice(order) })
      } else {
        dataList[orderDataIndex].sales += calcPrice(order)
      }
    })
    return dataList
  }

  useEffect(() => {
    const fetch = async () => {
      server
        .get('/get_orders', {
          params: {
            userID: match.params.userID,
          },
        })
        .then(async (res) => {
          const returnedOrderList = res.data
          let newOrderList        = returnedOrderList.map(async (order) => {
            return server
              .get('/get_apartment', {
                params: { apartmentID: order.apartmentID },
              })
              .then((apartmentRes) => {
                return { ...order, ...apartmentRes.data }
              })
          })
          newOrderList            = await Promise.all(newOrderList)
          setOrderList(newOrderList)
        })
    }
    fetch()
  }, [match])

  const createApartmentCard = (order, ind) => {
    return <OrderCard key={ind} order={order}/>
  }
  const emptyApartment      = () => {
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">
            <label>There is no orders</label>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="ui cards">
        {orderList.length === 0
         ? emptyApartment()
         : orderList.map((order, ind) => {
            return createApartmentCard(order, ind)
          })}
      </div>
      <div
        style={boundaryStyle}
      >
        <BarChart
          width={500}
          height={300}
          data={creatChartApartmentsDataByMonths(orderList)}
          margin={{
            top:    5,
            right:  30,
            left:   20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar dataKey="sales" fill="#8884d8" background={{ fill: '#EEEEEE' }}/>
        </BarChart>
      </div>
      <div
        style={boundaryStyle}
      >
        <BarChart
          width={500}
          height={300}
          data={createChartApartmentsDataByKey(orderList, 'location')}
          margin={{
            top:    5,
            right:  30,
            left:   20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar dataKey="sales" fill="#8884d8" background={{ fill: '#eee' }}/>
        </BarChart>
      </div>
      <div
        style={boundaryStyle}
      >
        <BarChart
          width={500}
          height={300}
          data={createChartApartmentsDataByKey(orderList, 'type')}
          margin={{
            top:    5,
            right:  30,
            left:   20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar dataKey="sales" fill="#8884d8" background={{ fill: '#eee' }}/>
        </BarChart>
      </div>
      <div className="ui bottom attached button">
        <Link
          to={{ pathname: `/Main/${match.params.type}&${match.params.userID}` }}
          className="ui button blue match-buttons"
        >
          Back To Main Page
        </Link>
      </div>
    </div>
  )
}

export default OrderTracker
