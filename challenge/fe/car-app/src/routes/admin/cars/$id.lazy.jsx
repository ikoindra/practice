import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { getCarsById, deleteCars } from '../../service/cars'
import { toast } from 'react-toastify'
import { confirmAlert } from 'react-confirm-alert'
import { useSelector } from 'react-redux'

export const Route = createLazyFileRoute('/admin/cars/$id')({
  component: CarDetail,
})

function CarDetail() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  const [car, setCar] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    const getDetailCarData = async (id) => {
      setIsLoading(true)
      const result = await getCarsById(id)
      if (result?.success) {
        setCar(result.data)
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
      setIsLoading(false)
    }

    if (id) {
      getDetailCarData(id)
    }
  }, [id])

  if (isLoading) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Loading...</h1>
        </Col>
      </Row>
    )
  }

  if (isNotFound) {
    return (
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">Car is not found!</h1>
        </Col>
      </Row>
    )
  }

  const onDelete = async (event) => {
    event.preventDefault()

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this data?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const result = await deleteCars(id)
            if (result?.success) {
              toast.success('Data deleted successfully!')
              navigate({ to: '/cars/' })
              return
            }

            toast.error(result?.message)
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    })
  }

  return (
    <>
      <Row className="ms-2 mt-4 align-items-center">
        <Button
          variant="outline-primary"
          style={{
            width: '150px',
            marginRight: 'auto',
          }}
          onClick={() => {
            navigate({ to: '/cars' })
          }}
        >
          Back
        </Button>
      </Row>

      <Row className="mt-3 mb-3">
        <Col className="offset-md-3">
          <Card>
            <Card.Img variant="top" src={car?.image} />
            <Card.Body>
              <Card.Title>{car?.rentPerDay}</Card.Title>
              <Card.Text>Plate: {car?.plate}</Card.Text>
              <Card.Text>Year: {car?.year}</Card.Text>
              <Card.Text>Available: {car?.available}</Card.Text>
              <Card.Text>AvailableAt{car?.availableAt}</Card.Text>
              <Card.Text>ID: {car?.id}</Card.Text>
              <Card.Text>Model: </Card.Text>
              <Card.Text>Model Name: {car?.carsModels?.model_name}</Card.Text>
              <Card.Text>
                Manufacturer: {car?.carsModels?.manufacturer}
              </Card.Text>
              <Card.Text>
                Transmission: {car?.carsModels?.transmission}
              </Card.Text>
              <Card.Text>Description: {car?.carsModels?.descrition}</Card.Text>
              <Card.Text>Specs: {car?.carsModels?.specs?.join(', ')}</Card.Text>
              <Card.Text>
                Options: {car?.carsModels?.options?.join(', ')}
              </Card.Text>
              <Card.Text>Type: </Card.Text>
              <Card.Text>
                Body Style: {car?.carsModels?.car_types.body_style}
              </Card.Text>
              <Card.Text>
                Capacity: {car?.carsModels?.car_types.capacity}
              </Card.Text>
              <Card.Text>
                Fuel Type: {car?.carsModels?.car_types.fuel_type}
              </Card.Text>

              {user?.role_id === 1 && (
                <>
                  <Card.Text>
                    <div className="d-grid gap-2">
                      <Button
                        as={Link}
                        href={`/cars/edit/${id}`}
                        variant="primary"
                        size="md"
                      >
                        Edit
                      </Button>
                    </div>
                  </Card.Text>
                  <Card.Text>
                    <div className="d-grid gap-2">
                      <Button onClick={onDelete} variant="danger" size="md">
                        Delete Car
                      </Button>
                    </div>
                  </Card.Text>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </>
  )
}
