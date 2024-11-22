import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { getModels } from '../../../service/models'
import ModelsTable from '../../../components/ModelsTable'

export const Route = createLazyFileRoute('/admin/models/')({
  component: Models,
})

function Models() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)

  const [carsModels, setCarsModels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getCarsModels = async () => {
      setIsLoading(true)
      const result = await getModels()
      if (result.success) {
        setCarsModels(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getCarsModels()
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
        <h1>Car Models List:</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: '160px', marginLeft: 'auto' }}
            onClick={() => {
              navigate({ to: '/models/create' })
            }}
          >
            Create New Model
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {carsModels.length === 0 ? (
          <h1>Cars Models is not found!</h1>
        ) : (
          <ModelsTable setCarsModels={setCarsModels} carsModels={carsModels} />
        )}
      </Row>
    </div>
  )
}
