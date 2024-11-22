import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getType } from '../../../service/carType'
import { getModelsById, updateModels } from '../../../service/models'
import Protected from '../../../components/Auth/Protected'
import { toast } from 'react-toastify'

export const Route = createLazyFileRoute('/admin/models/edit/$id')({
  component: () => (
    <Protected roles={[1]}>
      <EditModel />
    </Protected>
  ),
})

function EditModel() {
  const navigate = useNavigate()
  const { id } = Route.useParams()
  const [modelName, setModelName] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [transmission, setTransmission] = useState('')
  const [description, setDescription] = useState('')
  const [specs, setSpecs] = useState([''])
  const [options, setOptions] = useState([''])
  const [type, setType] = useState([])
  const [type_id, setTypeId] = useState(0)

  useEffect(() => {
    // Fetch model data to edit
    const fetchModelData = async () => {
      const result = await getModelsById(id)
      if (result?.success) {
        setModelName(result.data.model_name)
        setManufacturer(result.data.manufacturer)
        setTransmission(result.data.transmission)
        setDescription(result.data.description)
        setSpecs(result.data.specs || [''])
        setOptions(result.data.options || [''])
        setTypeId(result.data.type_id)
      } else {
        navigate({ to: `/models` })
      }
      console.log(result)
    }
    // Fetch types for dropdown selection
    const getTypeData = async () => {
      const result = await getType()
      if (result?.success) {
        setType(result?.data)
      }
    }
    fetchModelData()
    getTypeData()
  }, [id])

  // Add new empty spec and option
  const addSpecValue = () => setSpecs([...specs, ''])
  const addOptionValue = () => setOptions([...options, ''])

  // Remove spec or option by index
  const removeSpecValue = (index) => {
    const updatedSpecs = specs.filter((_, i) => i !== index)
    setSpecs(updatedSpecs)
  }

  const removeOptionValue = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index)
    setOptions(updatedOptions)
  }

  // Update value in specs or options
  const handleSpecChange = (index, event) => {
    const updatedSpecs = [...specs]
    updatedSpecs[index] = event.target.value
    setSpecs(updatedSpecs)
  }

  const handleOptionChange = (index, event) => {
    const updatedOptions = [...options]
    updatedOptions[index] = event.target.value
    setOptions(updatedOptions)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    //Check if already + put at least 1 specs and options
    if (specs.length === 0 && options.length === 0) {
      toast.error('Please select a spec and options')
      return
    }
    // Check if there are empty fields in specs or options
    if (specs.some((spec) => !spec) || options.some((option) => !option)) {
      toast.error('Please fill all specifications and options.')
      return
    }

    const result = await updateModels(id, {
      model_name: modelName,
      manufacturer: manufacturer,
      transmission: transmission,
      type_id: type_id,
      description: description,
      specs: specs,
      options: options,
    })

    if (result.success) {
      toast.success('Model updated successfully!')
      navigate({ to: `/models` })
    } else {
      toast.error('Failed to update model.')
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
            navigate({ to: '/models' })
          }}
        >
          Back
        </Button>
      </Row>
      <Row className="mt-5">
        <Col className="ms-lg-5">
          <Card>
            <Card.Header className="text-center">Edit Model</Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="model_name">
                  <Form.Label column sm={3}>
                    Model Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Model Name"
                      required
                      value={modelName}
                      onChange={(e) => setModelName(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="manufacturer">
                  <Form.Label column sm={3}>
                    Manufacturer
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Manufacturer"
                      required
                      value={manufacturer}
                      onChange={(e) => setManufacturer(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="transmission">
                  <Form.Label column sm={3}>
                    Transmission
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      placeholder="Transmission"
                      required
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="type">
                  <Form.Label column sm={3}>
                    Type
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select
                      aria-label="Select Type"
                      required
                      value={type_id}
                      onChange={(e) => setTypeId(e.target.value)}
                    >
                      <option disabled value="">
                        Select Type
                      </option>
                      {type.map((t) => (
                        <option key={t?.id} value={t?.id}>
                          {t?.body_style} ({t?.id})
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="description">
                  <Form.Label column sm={3}>
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      as="textarea"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Specifications</Form.Label>
                  {specs.map((value, index) => (
                    <Row key={index} className="mb-2">
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Spec Value"
                          value={value}
                          onChange={(e) => handleSpecChange(index, e)}
                        />
                      </Col>
                      <Col sm="4">
                        <Button
                          variant="danger"
                          onClick={() => removeSpecValue(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="secondary" onClick={addSpecValue}>
                    + Add Spec
                  </Button>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Options</Form.Label>
                  {options.map((value, index) => (
                    <Row key={index} className="mb-2">
                      <Col sm="8">
                        <Form.Control
                          type="text"
                          placeholder="Option Value"
                          value={value}
                          onChange={(e) => handleOptionChange(index, e)}
                        />
                      </Col>
                      <Col sm="4">
                        <Button
                          variant="danger"
                          onClick={() => removeOptionValue(index)}
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  ))}
                  <Button variant="secondary" onClick={addOptionValue}>
                    + Add Option
                  </Button>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Update Model
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

export default EditModel
