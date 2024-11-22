import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getModels } from '../../../service/models'
import { getCarsById, updateCars } from '../../../service/cars'
import Protected from '../../../components/Auth/Protected'

export const Route = createLazyFileRoute('/admin/cars/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditCars />
    </Protected>
  ),
})

function EditCars() {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const [plate, setPlate] = useState('')
  const [rentPerDay, setRentPerDay] = useState('')
  const [year, setYear] = useState('')
  const [availableAt, setAvailableAt] = useState('')
  const [available, setAvailable] = useState(true)
  const [image, setImage] = useState(undefined) // Make sure to initialize image as null
  const [currentImage, setCurrentImage] = useState('') // Initialize as null
  const [models, setModels] = useState([])
  const [modelsId, setModelsId] = useState(0)

  useEffect(() => {
    // Fetch model data to edit
    const fetchCarsData = async () => {
      const result = await getCarsById(id)
      if (!result?.success) {
        navigate({ to: '/cars' })
      }
      if (result?.success) {
        setPlate(result.data.plate)
        setRentPerDay(result.data.rentPerDay)
        setYear(result.data.year)
        setAvailableAt(
          new Date(result.data.availableAt).toISOString().split('T')[0],
        ) // Format date
        setAvailable(result.data.available)
        setImage(result.data.image)
        setCurrentImage(result.data.image || '')
        setModelsId(result.data.carsmodels_id)
      }
      console.log(result)
    }

    // Fetch types for dropdown selection
    const getModelsData = async () => {
      const result = await getModels()
      if (result?.success) {
        setModels(result?.data)
      }
    }
    fetchCarsData()
    getModelsData()
  }, [id, navigate])

  const onSubmit = async (event) => {
    event.preventDefault()

    console.log('modelsId:', modelsId)
    console.log('rentPerDay:', rentPerDay)
    console.log('year:', year)
    console.log('plate:', plate)
    console.log('availableAt:', availableAt)

    if (rentPerDay <= 0) {
      toast.error('Rent Per Day harus lebih dari 0')
      return
    }
    const platePattern = /^[A-Z]{3}-\d{4}$/
    if (!platePattern.test(plate)) {
      toast.error("Plate must be in the format 'ABC-1234'")
      return
    }
    if (year <= 1886 && year <= 0) {
      toast.error('Year must more than 1886')
      return
    }

    const result = await updateCars(id, {
      plate,
      rentPerDay: parseInt(rentPerDay, 10), // Ensure rentPerDay is an integer
      year: parseInt(year, 10), // Ensure year is an integer
      availableAt,
      available,
      carsmodels_id: modelsId,
      image: image ? image : null, // If no image, set to null
    })

    if (result.success) {
      toast.success('Cars updated successfully!')
      navigate({ to: `/cars` })
    } else {
      toast.error('Failed to update cars.')
    }
  }

  return (
    <>
      <Row className="ms-2 mb-3 mt-4 align-items-center">
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

      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header className="text-center">Edit Cars</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="plate">
                  <Form.Label column sm={3}>
                    Plate
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Plate Numbers"
                      required
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="modelName">
                  <Form.Label column sm={3}>
                    Model Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      aria-label="Select Type"
                      required
                      value={modelsId}
                      onChange={(event) => setModelsId(event.target.value)}
                    >
                      <option disabled value="">
                        Select Car Model
                      </option>
                      {models &&
                        models.length > 0 &&
                        models.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.model_name}, {c.manufacturer}
                          </option>
                        ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="available">
                  <Form.Label column sm={3}>
                    Available
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      value={available ? 'true' : 'false'}
                      onChange={(event) =>
                        setAvailable(event.target.value === 'true')
                      }
                      required
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Rent per Day Field */}
                <Form.Group as={Row} className="mb-3" controlId="rentPerDay">
                  <Form.Label column sm={3}>
                    Rent per Day
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Rent per Day"
                      required
                      value={rentPerDay}
                      onChange={(event) => setRentPerDay(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                {/* Year Field */}
                <Form.Group as={Row} className="mb-3" controlId="year">
                  <Form.Label column sm={3}>
                    Year
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="number"
                      placeholder="Year"
                      required
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="availableAt">
                  <Form.Label column sm={3}>
                    Available Date
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="date"
                      placeholder="Available Date"
                      required
                      value={availableAt}
                      onChange={(e) => setAvailableAt(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="Image">
                  <Form.Label column sm={3}>
                    Car Image
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="file"
                      placeholder="Choose File"
                      onChange={(event) => {
                        setImage(event.target.files[0])
                        setCurrentImage(
                          URL.createObjectURL(event.target.files[0]),
                        )
                      }}
                      accept=".jpg,.png"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="currentImage">
                  <Form.Label column sm={3}></Form.Label>
                  <Col sm={9}>
                    <Image src={currentImage} fluid />
                  </Col>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Update Cars
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EditCars
