interface IProps {
  arr: Array<string>,
  itemName: string
}

const returnColor = (item: string) => {
  switch (item ) {
    case "Tags": return "warning"
    case "Synonyms": return "success"
    case "Antonyms": return "danger"
  }
}

export default function WordCardLi({ arr, itemName }: IProps) {
  return (
    <>
      <small>{itemName}:</small>
      <li className="list-group-item p-0 justify-content-end d-flex border-0 bg-transparent">

      {
          arr.length && arr.map((item) => 
              <span className={`
                badge mx-1 bg-${returnColor(itemName)} 
                text-${itemName === "Tags" ? "dark" : "light"}`}>
                  {item}
              </span>
          )
      }
      </li>
      <hr className="my-2"/>
    </>
  )
}