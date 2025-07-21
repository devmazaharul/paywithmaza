
interface TopinfoType {
  title:string,
  desc:string
}

export default function Topinfo({title,desc}:TopinfoType) {
  return (
    <div>
      <div className="w-fit mx-auto text-center leading-8 my-4">
        <h1 className="text-3xl  font-bold ">{title || "Title"}</h1>
        <p className="text-gray-400">{desc || "Desc"}</p>
      </div>
    </div>
  )
}
