const email = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

const password = [
  v => !!v || 'Password is required',
  v => v.length >= 7 || 'Password required length is 7'
]

const name = [
  v => !!v || 'Name is required'
]

const surnames = [
  v => !!v || 'Surnames are required'
]

const postalCode = [
  v => !!v || 'Postal code is required'
]

const country = [
  v => !!v || 'Country is required'
]

const phone = [
  v => !!v || 'Phone is required'
]

export const validations = {
  email,
  password,
  name,
  surnames,
  postalCode,
  country,
  phone
}