type CardProps = {
  name: string;
  gender: string;
  species: string;
  origin: {
    name: string;
    url: string;
  }
  image: string;
}

export default function Card({ name, gender, species, origin, image }: CardProps) {
  return (
    <div className="w-1/5 bg-white rounded p-2 min-w-[250px]">
      <div className="w-full flex justify-center p-2">
        <img src={image} alt="Card image" className="rounded" />
      </div>
      <div className="w-full flex justify-center flex-col">
        <h1 className="text-lg font-bold text-center">{ name }</h1>
        <div className="flex gap-5 justify-center">
          <p>{ gender} </p>
          <p>{ species }</p>
          <p>{ origin.name }</p>
        </div>
      </div>
    </div>
  )
}