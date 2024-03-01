interface IProps {
  arr: Array<string>,
  itemName: string
}

const returnColor = (item: string) => {
  switch (item ) {
    case "Tags": return "warning"
    case "Synonyms": return "success"
    case "Antonyms": return "danger"
    case "Definitions": return "secondary"
  }
}

export default function WordCardLi({ arr, itemName }: IProps) {
  return (
    <div>
      <small>{itemName}:</small>
      <li className="list-group-item p-0 justify-content-end border-0">

      {
          arr.length && arr.map((item) => 
              <span className= {`
                badge mx-1 bg-${returnColor(itemName)} 
                text-${itemName === "Tags" ? "dark" : "light"}`}
                key={0}
              >
                {item}
              </span>
          )
      }
      </li>
      <hr className="my-2"/>
    </div>
  )
}