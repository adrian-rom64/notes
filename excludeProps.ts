interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
  stuff: string[]
}

interface Car {
  name: string
  engine: {
    name: string
    size: number
  }
  new: boolean
}

const person: Person = {
  name: 'ada',
  age: 25,
  gender: 'female',
  stuff: ['wallet']
}

const car: Car = {
  name: 'Audi A4',
  engine: {
    name: 'V1',
    size: 10
  },
  new: false
}

const excludeProps = <T extends Object, Y extends (keyof T)[]>(
  obj: T,
  fields: Y
): Omit<T, Y[number]> =>
  Object.entries(obj)
    .filter(([key]) => !fields.includes(key as any))
    .map(([key, value]) => ({ [key]: value }))
    .reduce((prev, curr) => ({ ...prev, ...curr }), {}) as any

const a = excludeProps(person, ['gender', 'stuff'])
const b = excludeProps(car, ['name'])

// Typescript type matches real values
//   a: Omit<Person, "gender" | "stuff">
//   b: Omit<Car, "name">

console.log(a, b)
