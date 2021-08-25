import ky from 'ky'

const kyInstance = ky.create({ prefixUrl: 'http://localhost:8000' })

export default kyInstance
