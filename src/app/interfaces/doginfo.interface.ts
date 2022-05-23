export interface DogInfoInterface {
  weight: Weight
  height: Height
  id: number
  name: string
  bred_for: string
  life_span: string
  temperament: string
  origin: string
  reference_image_id: string
}

export interface Weight {
  imperial: string
  metric: string
}

export interface Height {
  imperial: string
  metric: string
}
