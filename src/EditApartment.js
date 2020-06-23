import React, { useEffect, useState } from 'react'
import { server }                     from './api'
import { useHistory }                 from 'react-router-dom'
import ApartmentForm                  from './ApartmentForm'
import axios                          from 'axios'
import { createDictionaryForm }       from 'src/utilities'

const EditApartment = ({ match }) => {
  let history = useHistory()

  const [apartment, setApartment] = useState()
  useEffect(() => {
    const fetch = async () => {
      server
        .get('/get_apartment', {
          params: { apartmentID: match.params.apartmentID },
        })
        .then((res) => {
          setApartment(res.data)
        })
    }
    fetch()
  }, [match])

  const editAttractions       = async (attractionObject) => {
    if (attractionObject.attractionID !== 'undefined') {
      return server.post('/attraction_update', attractionObject).then((res) => {
        const attractionID = res.data
        return attractionID
      })
    } else {
      delete attractionObject['attractionID']
      return server.post('/add_attraction', attractionObject).then((res) => {
        const attractionID = res.data
        return attractionID
      })
    }
  }
  const createAttractionsList = async (event) => {
    let attractionList = [
      ...event.target.querySelectorAll('.attraction_fields'),
    ].map(async (e, i) => {
      const attractionImageFile = e.querySelector('[name=attraction_image]')
        .files[0]
      const attractionObject    = {}

      if (attractionImageFile !== undefined) {
        const imageData = new FormData()
        imageData.append('image', attractionImageFile)
        const response           = await axios.post(
          'https://api.imgur.com/3/image',
          imageData,
          {
            headers: {
              Authorization: `Client-ID 1df0cefcf599ac8`,
              Accept:        'application/json',
            },
          },
        )
        attractionObject.picture = response.data.data.link
      }
      attractionObject.name         = e.querySelector('[name=attraction_name]').value
      attractionObject.price        = e.querySelector('[name=attraction_price]').value
      attractionObject.attractionID = e.getAttribute('attractionid')
      const attractionID            = await editAttractions(attractionObject)
      const discount                = e.querySelector('[name=attraction_discount]').value

      return { attractionID, discount }
    })
    attractionList     = await Promise.all(attractionList)
    return attractionList
  }

  const submitForm = async (event) => {
    event.preventDefault()
    let formData = createDictionaryForm(event)
    delete formData['attraction_image']
    delete formData['']
    const apartmentImageFile = event.target.querySelector(
      '[name=apartment_image]',
    ).files[0]
    formData.apartmentID     = match.params.apartmentID
    try {
      formData.attractions = await createAttractionsList(event)
    } catch (err) {
      alert(err.request.responseText)
      return
    }

    if (apartmentImageFile !== undefined) {
      let imageData = new FormData()
      imageData.append('image', apartmentImageFile)
      const response   = await axios.post(
        'https://api.imgur.com/3/image',
        imageData,
        {
          headers: {
            Authorization: `Client-ID 1df0cefcf599ac8`,
            Accept:        'application/json',
          },
        },
      )
      formData.picture = response.data.data.link
    }

    server
      .post('/apartment_update', formData)
      .then(function (response) {
        history.push(`/Main/${match.params.type}&${match.params.userID}`)
      })
      .catch(function (error) {
        alert(error.request.responseText)
      })
  }

  return <ApartmentForm submitForm={submitForm} apartmentData={apartment}/>
}

export default EditApartment
