import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getType } from '../../../service/carType'

import TypeTable from '../../../components/TypeTable'

export const Route = createLazyFileRoute('/admin/types/')({
  component: Types,
})

function Types() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)

  const [car_types, setTypes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getTypesData = async () => {
      setIsLoading(true)
      const result = await getType()
      if (result.success) {
        setTypes(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getTypesData()
    }
  }, [token])

  if (!token) {
    navigate({ to: '/login' })
    return
  }

  if (isLoading) {
    return (
      <Row className="mt-4">
        <h1>Loading...</h1>
      </Row>
    )
  }

  return (
    <div>
      <Row className="mt-4 align-items-center">
        <h1>Car Types List:</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: '150px', marginLeft: 'auto' }}
            onClick={() => {
              navigate({ to: '/types/create' })
            }}
          >
            Create New Type
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {car_types.length === 0 ? (
          <h1>Types data is not found!</h1>
        ) : (
          <TypeTable setTypes={setTypes} car_types={car_types} />
        )}
      </Row>
    </div>
  )
}
