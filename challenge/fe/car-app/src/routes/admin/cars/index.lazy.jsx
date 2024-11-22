import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { getCars } from '../../../service/cars'
import CarCard from '../../../components/CarCard'
export const Route = createLazyFileRoute('/admin/cars/')({
  component: CarsIndex,
})

function CarsIndex() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)
  const [cars, setCars] = useState([])
  const [models, setCarsModelsByid] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getCarsData = async () => {
      setIsLoading(true)
      const result = await getCars()
      if (result.success) {
        setCars(result.data)
      }
      setIsLoading(false)
    }

    if (token) {
      getCarsData()
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
        <h1>Cars List:</h1>
        {user?.role_id === 1 && (
          <Button
            className="me-2"
            style={{ width: '150px', marginLeft: 'auto' }}
            onClick={() => {
              navigate({ to: '/cars/create' })
            }}
          >
            Create New Car
          </Button>
        )}
      </Row>

      <Row className="mt-4">
        {cars.length === 0 ? (
          <h1>Cars not found!</h1>
        ) : (
          cars.map((car) => (
            <Col md={4} lg={3} key={car.id} className="ms-3 ms-lg-0">
              <CarCard setCars={setCars} cars={car} />
            </Col>
          ))
        )}
      </Row>
    </div>
  )
}
